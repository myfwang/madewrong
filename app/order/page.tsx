import OrderForm from "@/components/OrderForm";

export const metadata = {
  title: "Order | Made Wrong",
  description: "Commission a custom piece from Made Wrong.",
};

export default function OrderPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Place an Order
      </h1>
      <p className="mt-2 text-zinc-500">
        Tell us what you want made and we&apos;ll get back to you with a quote.
      </p>

      <div className="mt-10">
        <OrderForm />
      </div>
    </div>
  );
}
