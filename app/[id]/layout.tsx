import { Rowdies } from "next/font/google";
import OcticonLogoGithub16 from "@/components/OcticonLogoGithub16";
import Link from "next/link";
const rowdies = Rowdies({ subsets: ["latin"], weight: ["700"] });
export default function ({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-primary h-full text-secondary">
      <main className="max-w-7xl m-auto p-4 md:p-12 space-y-12 flex flex-col h-full">
        <nav className="mb-12">
          <div className={`font-bold text-2xl ${rowdies.className}`}>
            Covoitly
          </div>
        </nav>
        <main className="grow space-y-12">{children}</main>
        <footer className="flex items-center justify-center gap-2">
          Open source sur
          <Link href={"https://github.com/Pixselve/covoitly"} target="_blank">
            <OcticonLogoGithub16 className="h-6"></OcticonLogoGithub16>
          </Link>
        </footer>
      </main>
    </div>
  );
}
