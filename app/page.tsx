import { Rowdies } from "next/font/google";
import { twc } from "react-twc";
import Link from "next/link";
import MdiCar2Plus from "@/components/mdiCar2Plus";

const rowdies = Rowdies({ subsets: ["latin"], weight: ["700"] });

export default function Home() {
  return (
    <main className="h-screen bg-primary text-secondary">
      <div className="max-w-5xl m-auto p-12 h-full">
        <nav>
          <div className={`font-bold text-5xl ${rowdies.className}`}>
            Covoitly
          </div>
        </nav>

        <div className="flex flex-col justify-center h-full gap-12">
          <h1 className={`text-4xl md:text-7xl ${rowdies.className}`}>
            Organisez simplement vos covoiturages entre amis.
          </h1>

          <StartButton href={"/new"}>
            <MdiCar2Plus className="fill-current h-6"></MdiCar2Plus> Commencer
          </StartButton>
        </div>
      </div>
    </main>
  );
}

const StartButton = twc(
  Link,
)`bg-secondary text-primary font-bold py-2 px-4 rounded-full flex items-center gap-2 justify-center hover:scale-105 transition-transform`;
