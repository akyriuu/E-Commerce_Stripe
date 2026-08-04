import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly products: ProductsService) {}

  @Get()
  list() {
    return this.products.listPublished();
  }

  @Get('share/:slug')
  bySlug(@Param('slug') slug: string) {
    return this.products.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Get('mine')
  mine(@Req() req: { user: { id: string } }) {
    return this.products.listMine(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req: { user: { id: string } }, @Body() dto: CreateProductDto) {
    return this.products.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: { user: { id: string } },
    @Body() dto: UpdateProductDto,
  ) {
    return this.products.update(id, req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: { user: { id: string } }) {
    return this.products.remove(id, req.user.id);
  }
}
