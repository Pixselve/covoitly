import { rowdies } from "@/lib/font";
import IcRoundDirectionsCarFilled from "@/components/IcRoundDirectionsCarFilled";

export default function LoadingNew() {
  return (
    <>
      <main
        className={`h-screen bg-primary text-secondary ${rowdies.className}`}
      >
        <div className="max-w-5xl m-auto p-12 h-full">
          <nav>
            <div className={`font-bold text-5xl`}>Covoitly</div>
          </nav>

          <div className="h-full grid place-items-center">
            <div className="flex items-center flex-col">
              <IcRoundDirectionsCarFilled className="fill-current h-24 w-24 animate-bounce"></IcRoundDirectionsCarFilled>
              <h1 className="font-bold text-2xl">Chargement...</h1>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
