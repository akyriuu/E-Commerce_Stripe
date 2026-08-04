'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, Product } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setProducts(await api.myProducts());
      setError('');
    } catch {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/login');
      return;
    }
    void load();
  }, [router]);

  async function onCreate(e: FormEvent) {
    e.preventDefault();
    setError('');
    try {
      await api.createProduct({
        title,
        description,
        price: Number(price),
        imageUrl: imageUrl || undefined,
      });
      setTitle('');
      setDescription('');
      setPrice('');
      setImageUrl('');
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao publicar');
    }
  }

  async function onRemove(id: string) {
    try {
      await api.removeProduct(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao deletar');
    }
  }

  function shareUrl(slug: string) {
    return `${window.location.origin}/p/${slug}`;
  }

  async function copyShare(slug: string) {
    await navigator.clipboard.writeText(shareUrl(slug));
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  }

  if (loading) {
    return <p className="text-zinc-600">Carregando…</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">Meus produtos</h1>
        <button
          type="button"
          onClick={logout}
          className="text-sm text-zinc-600 underline underline-offset-2"
        >
          Sair
        </button>
      </div>

      <form
        onSubmit={onCreate}
        className="mb-8 grid max-w-lg gap-3 border border-zinc-200 bg-white p-4"
      >
        <h2 className="text-lg font-medium">Novo produto</h2>
        <input
          className="border border-zinc-300 px-3 py-2"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="min-h-24 border border-zinc-300 px-3 py-2"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          className="border border-zinc-300 px-3 py-2"
          type="number"
          step="0.01"
          min="0.5"
          placeholder="Preço"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          className="border border-zinc-300 px-3 py-2"
          placeholder="URL da imagem (opcional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          className="rounded bg-zinc-900 px-3 py-2 text-sm text-white"
        >
          Publicar
        </button>
      </form>

      <ul className="grid list-none gap-3 p-0">
        {products.map((product) => (
          <li
            key={product.id}
            className="border border-zinc-200 bg-white p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <strong className="text-base">{product.title}</strong>
                <p className="mt-1 text-sm text-zinc-600">
                  {Number(product.price).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}{' '}
                  · {product.salesCount} vendas
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void copyShare(product.shareSlug)}
                  className="rounded border border-zinc-300 px-3 py-1.5 text-sm"
                >
                  Copiar link
                </button>
                <button
                  type="button"
                  onClick={() => void onRemove(product.id)}
                  className="rounded border border-red-300 px-3 py-1.5 text-sm text-red-700"
                >
                  Deletar
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {products.length === 0 ? (
        <p className="text-zinc-600">Você ainda não publicou produtos.</p>
      ) : null}
    </div>
  );
}
