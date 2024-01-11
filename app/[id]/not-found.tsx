import { rowdies } from "@/lib/font";
import BxsCarCrash from "@/components/BxsCarCrash";

export default function () {
  return (
    <div
      className={`${rowdies.className} h-full flex flex-col items-center justify-center space-y-12`}
    >
      <BxsCarCrash className="h-36 fill-secondary"></BxsCarCrash>
      <h1 className="font-bold text-5xl">Le covoit n'a pas été trouvé</h1>
    </div>
  );
}
