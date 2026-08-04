import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  listPublished() {
    return this.prisma.product.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { id: true, name: true } } },
    });
  }

  listMine(authorId: string) {
    return this.prisma.product.findMany({
      where: { authorId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findBySlug(shareSlug: string) {
    const product = await this.prisma.product.findUnique({
      where: { shareSlug },
      include: { author: { select: { id: true, name: true } } },
    });
    if (!product?.published)
      throw new NotFoundException('Produto não encontrado');
    return product;
  }

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product?.published)
      throw new NotFoundException('Produto não encontrado');
    return product;
  }

  create(authorId: string, dto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        title: dto.title,
        description: dto.description,
        price: dto.price,
        imageUrl: dto.imageUrl,
        published: dto.published ?? true,
        authorId,
      },
    });
  }

  async update(id: string, authorId: string, dto: UpdateProductDto) {
    await this.ensureOwner(id, authorId);
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: string, authorId: string) {
    await this.ensureOwner(id, authorId);
    await this.prisma.product.delete({ where: { id } });
    return { ok: true };
  }

  private async ensureOwner(id: string, authorId: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException('Produto não encontrado');
    if (product.authorId !== authorId) {
      throw new ForbiddenException('Sem permissão');
    }
    return product;
  }
}
