import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [PrismaModule, AuthModule, ProductsModule, PaymentsModule],
})
export class AppModule {}
