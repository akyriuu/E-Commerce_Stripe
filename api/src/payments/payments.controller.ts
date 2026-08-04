import {
  Body,
  Controller,
  Headers,
  Post,
  Req,
  BadRequestException,
} from '@nestjs/common';
import type { RawBodyRequest } from '@nestjs/common';
import type { Request } from 'express';
import { PaymentsService } from './payments.service';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  @Post('checkout')
  checkout(@Body() dto: CheckoutDto) {
    return this.payments.createCheckout(dto.productId);
  }

  @Post('webhook')
  webhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    if (!req.rawBody) throw new BadRequestException('Raw body ausente');
    if (!signature) throw new BadRequestException('Assinatura ausente');
    return this.payments.handleWebhook(req.rawBody, signature);
  }
}
