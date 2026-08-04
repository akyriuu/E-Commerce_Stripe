import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from '../products/products.service';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  constructor(
    private readonly prisma: PrismaService,
    private readonly products: ProductsService,
  ) {}

  async createCheckout(productId: string) {
    const product = await this.products.findById(productId);
    const amountCents = Math.round(Number(product.price) * 100);

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      success_url: process.env.STRIPE_SUCCESS_URL!,
      cancel_url: process.env.STRIPE_CANCEL_URL!,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'brl',
            unit_amount: amountCents,
            product_data: {
              name: product.title,
              description: product.description,
              images: product.imageUrl ? [product.imageUrl] : undefined,
            },
          },
        },
      ],
      metadata: { productId: product.id },
    });

    await this.prisma.order.create({
      data: {
        productId: product.id,
        stripeSessionId: session.id,
        amount: product.price,
        status: 'PENDING',
      },
    });

    return { url: session.url, sessionId: session.id };
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    const event = this.stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const order = await this.prisma.order.findUnique({
        where: { stripeSessionId: session.id },
      });
      if (!order || order.status === 'PAID') return { received: true };

      await this.prisma.$transaction([
        this.prisma.order.update({
          where: { id: order.id },
          data: {
            status: 'PAID',
            buyerEmail: session.customer_details?.email ?? undefined,
          },
        }),
        this.prisma.product.update({
          where: { id: order.productId },
          data: { salesCount: { increment: 1 } },
        }),
      ]);
    }

    return { received: true };
  }
}
