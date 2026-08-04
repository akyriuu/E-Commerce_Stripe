import Link from 'next/link';

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-semibold tracking-tight">
        Pagamento concluído
      </h1>
      <p className="mt-2 text-zinc-600">
        Obrigado pela compra. A venda será confirmada assim que o Stripe
        notificar a API.
      </p>
      <Link href="/" className="mt-4 inline-block underline underline-offset-2">
        Voltar aos produtos
      </Link>
    </div>
  );
}
