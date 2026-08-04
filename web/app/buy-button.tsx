'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export function BuyButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function buy() {
    setLoading(true);
    setError('');
    try {
      const { url } = await api.checkout(productId);
      if (url) window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no checkout');
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        type="button"
        onClick={buy}
        disabled={loading}
        className="rounded bg-zinc-900 px-3 py-1.5 text-sm text-white disabled:opacity-60"
      >
        {loading ? 'Redirecionando…' : 'Comprar'}
      </button>
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </div>
  );
}
