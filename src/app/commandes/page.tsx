import dynamic from "next/dynamic";

const CommandesTable = dynamic(
  () => import("@/components/commandes/CommandesTable"),
  { ssr: false }
);

export default function CommandesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold mb-8 text-[#a84b2b]">
        Mes commandes
      </h1>
      <CommandesTable />
    </div>
  );
}
