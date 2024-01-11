import { Rowdies } from "next/font/google";
const rowdies = Rowdies({ subsets: ["latin"], weight: ["700"] });
export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary h-full text-secondary">
      <main className="max-w-7xl m-auto p-4 md:p-12 space-y-12 ">
        <nav className="mb-12">
          <div className={`font-bold text-2xl ${rowdies.className}`}>
            Covoitly
          </div>
        </nav>
        {children}
      </main>
    </div>
  );
}
