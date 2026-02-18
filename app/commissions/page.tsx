import { getAllCommissions } from "@/lib/mdx";
import CommissionCard from "@/components/CommissionCard";

export const metadata = {
  title: "Commissions | Made Wrong",
  description: "Browse past commissions and custom pieces by Made Wrong.",
};

export default function CommissionsPage() {
  const commissions = getAllCommissions();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
        Commissions
      </h1>
      <p className="mt-2 text-zinc-500">
        A look at past custom pieces. 
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {commissions.map((commission) => (
          <CommissionCard key={commission.slug} commission={commission} />
        ))}
      </div>

      {commissions.length === 0 && (
        <p className="mt-10 text-center text-zinc-400">
          No commissions yet. Check back soon!
        </p>
      )}
    </div>
  );
}
