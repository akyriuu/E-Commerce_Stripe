import Link from 'next/link';

export default function CheckoutCancelPage() {
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-semibold tracking-tight">
        Checkout cancelado
      </h1>
      <p className="mt-2 text-zinc-600">
        O pagamento não foi finalizado. Você pode tentar novamente quando
        quiser.
      </p>
      <Link href="/" className="mt-4 inline-block underline underline-offset-2">
        Voltar aos produtos
      </Link>
    </div>
  );
}
