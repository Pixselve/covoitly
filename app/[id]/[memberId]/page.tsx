import { fetchPoolMember } from "@/app/[id]/actions";
import { notFound } from "next/navigation";
import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";
import { Rowdies } from "next/font/google";
import { handleNewMemberSchedule } from "@/app/[id]/[memberId]/actions";
import MdiDotsVertical from "@/components/mdi-dots-vertical";

const rowdies = Rowdies({ subsets: ["latin"], weight: ["700"] });

export default async function ({
  params,
}: {
  params: {
    id: string;
    memberId: string;
  };
}) {
  const member = await fetchPoolMember(Number(params.memberId));

  if (member === undefined) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href={`/${params.id}`}
        className="bg-secondary text-primary w-full p-2 rounded-full font-bold block text-center"
      >
        Retour
      </Link>
      <Heading className="flex items-center gap-2">
        <Image
          className="rounded-full overflow-hidden"
          src={`https://api.dicebear.com/7.x/big-smile/svg?seed=${member.name}`}
          width={50}
          height={50}
          alt="avatar"
        ></Image>
        {member.name}
      </Heading>

      <section>
        <form
          action={handleNewMemberSchedule}
          className={`${rowdies.className} text-2xl space-y-4 border-4 rounded-xl p-4 w-full`}
        >
          <div className="max-w-2xl">
            <label htmlFor="date">Je souhaite partir le</label>
            <input
              required
              name="date"
              className="bg-primary border-b-2"
              id="date"
              type="date"
            />
            <label htmlFor="from">pour arriver à mon lieu de travail à </label>
            <input
              required
              name="from"
              className="bg-primary border-b-2"
              id="from"
              type="time"
            />
            <label htmlFor="to">et repartir à</label>
            <input
              required
              name="to"
              className="bg-primary border-b-2"
              id="to"
              type="time"
            />
            <input
              required
              type="hidden"
              className="hidden"
              name="memberId"
              value={params.memberId}
            />
            <span>.</span>
          </div>

          <button className="bg-secondary text-primary px-4 py-2 rounded-full">
            Ajouter
          </button>
        </form>
      </section>

      <Heading>Trajets enregistrés</Heading>

      <section>
        {member.schedules.length === 0 && (
          <div
            className={`bg-secondary p-4 rounded-xl shadow-lg text-neutral-950 flex justify-between ${rowdies.className} text-primary text-2xl`}
          >
            Vous n'avez pas encore enregistré de trajet.
          </div>
        )}
        {member.schedules.map((schedule) => (
          <OpportunityCard
            key={schedule.id}
            dateTripFrom={schedule.from}
            dateTripTo={schedule.to}
          ></OpportunityCard>
        ))}
      </section>
    </div>
  );
}

function OpportunityCard(props: { dateTripFrom: Date; dateTripTo: Date }) {
  const formattedDay = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
  }).format(props.dateTripFrom);
  const formattedMonth = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
  }).format(props.dateTripFrom);
  const formattedDate = new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
  }).format(props.dateTripFrom);

  const timeFrom = new Intl.DateTimeFormat("fr-FR", {
    hour: "numeric",
    minute: "numeric",
  }).format(props.dateTripFrom);

  const timeTo = new Intl.DateTimeFormat("fr-FR", {
    hour: "numeric",
    minute: "numeric",
  }).format(props.dateTripTo);

  return (
    <div className="bg-secondary p-4 rounded-xl shadow-lg text-neutral-950 flex justify-between">
      <div className="flex items-center gap-4">
        <div
          className={`flex flex-col items-center uppercase ${rowdies.className}`}
        >
          <div>{formattedDay}</div>
          <div className="text-5xl">{formattedDate}</div>
          <div>{formattedMonth}</div>
        </div>
        <div className="border-r-4 border-r-primary h-full"></div>
        <div
          className={`flex flex-col justify-between h-full items-center ${rowdies.className}`}
        >
          <div className="text-xl font-bold">{timeFrom}</div>
          <MdiDotsVertical className="h-6"></MdiDotsVertical>
          <div className="text-xl font-bold">{timeTo}</div>
        </div>
      </div>
      <div></div>
    </div>
  );
}
