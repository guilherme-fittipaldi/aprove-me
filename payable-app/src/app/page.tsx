import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Link href="payables">Pagáveis</Link>
      <Link href="assignor">Cedentes</Link>
    </div>
  );
}
