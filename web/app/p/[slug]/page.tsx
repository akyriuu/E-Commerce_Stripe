import Link from 'next/link';
import { BuyButton } from '@/app/buy-button';

type Props = {
  params: Promise<{ slug: string }>;
};

type Product = {
  id: string;
  title: string;
  description: string;
  price: string | number;
  imageUrl: string | null;
  salesCount: number;
  author?: { name: string };
};

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/share/${slug}`,
      { next: { revalidate: 20 } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function SharePage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div>
        <p>Produto não encontrado.</p>
        <Link href="/" className="mt-4 inline-block underline">
          Voltar
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-xl">
      {product.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.imageUrl}
          alt={product.title}
          className="mb-4 h-56 w-full object-cover"
        />
      ) : null}
      <h1 className="text-2xl font-semibold tracking-tight">{product.title}</h1>
      <p className="mt-2 text-zinc-600">{product.description}</p>
      <p className="mt-4 text-lg font-semibold">
        {Number(product.price).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </p>
      <p className="text-sm text-zinc-500">
        {product.salesCount} vendas
        {product.author?.name ? ` · ${product.author.name}` : ''}
      </p>
      <div className="mt-5">
        <BuyButton productId={product.id} />
      </div>
    </article>
  );
}
