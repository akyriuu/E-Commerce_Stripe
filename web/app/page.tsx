import Link from 'next/link';
import { BuyButton } from './buy-button';

type Product = {
  id: string;
  title: string;
  description: string;
  price: string | number;
  imageUrl: string | null;
  salesCount: number;
  shareSlug: string;
  author?: { name: string };
};

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      next: { revalidate: 20 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

function formatPrice(price: string | number) {
  return Number(price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Produtos</h1>
      {products.length === 0 ? (
        <p className="text-zinc-600">
          Nenhum produto publicado ainda. Entre e publique o primeiro.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="flex flex-col border border-zinc-200 bg-white p-4"
            >
              {product.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="mb-3 h-40 w-full object-cover"
                />
              ) : (
                <div className="mb-3 flex h-40 items-center justify-center bg-zinc-100 text-sm text-zinc-400">
                  Sem imagem
                </div>
              )}
              <h2 className="text-lg font-medium">{product.title}</h2>
              <p className="mt-1 line-clamp-3 text-sm text-zinc-600">
                {product.description}
              </p>
              <p className="mt-3 font-semibold">{formatPrice(product.price)}</p>
              <p className="text-xs text-zinc-500">
                {product.salesCount} vendas
                {product.author?.name ? ` · ${product.author.name}` : ''}
              </p>
              <div className="mt-4 flex items-center gap-3">
                <BuyButton productId={product.id} />
                <Link
                  href={`/p/${product.shareSlug}`}
                  className="text-sm underline underline-offset-2"
                >
                  Compartilhar
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
