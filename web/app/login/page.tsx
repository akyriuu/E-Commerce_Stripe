'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data =
        mode === 'login'
          ? await api.login({ email, password })
          : await api.register({ name, email, password });
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha na autenticação');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">
        {mode === 'login' ? 'Login' : 'Criar conta'}
      </h1>

      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => setMode('login')}
          className={`rounded px-3 py-1.5 text-sm ${
            mode === 'login'
              ? 'bg-zinc-900 text-white'
              : 'border border-zinc-300 bg-white'
          }`}
        >
          Entrar
        </button>
        <button
          type="button"
          onClick={() => setMode('register')}
          className={`rounded px-3 py-1.5 text-sm ${
            mode === 'register'
              ? 'bg-zinc-900 text-white'
              : 'border border-zinc-300 bg-white'
          }`}
        >
          Registrar
        </button>
      </div>

      <form onSubmit={onSubmit} className="grid gap-3">
        {mode === 'register' ? (
          <input
            className="border border-zinc-300 bg-white px-3 py-2"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        ) : null}
        <input
          className="border border-zinc-300 bg-white px-3 py-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border border-zinc-300 bg-white px-3 py-2"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-zinc-900 px-3 py-2 text-sm text-white disabled:opacity-60"
        >
          {loading
            ? 'Aguarde…'
            : mode === 'login'
              ? 'Entrar'
              : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}
