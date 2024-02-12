import { fetchPoolMember, handleNewMemberSchedule } from "@/lib/action";
import { notFound } from "next/navigation";
import Heading from "@/components/icons/Heading";
import Image from "next/image";
import Link from "next/link";
import { Rowdies } from "next/font/google";
import MdiDotsVertical from "@/components/icons/mdi-dots-vertical";
import DeleteMemberButton from "@/app/[id]/[memberId]/delete-member-button";
import MemberScheduleForm from "@/app/[id]/[memberId]/member-schedule-form";

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
      <Heading className="flex items-center gap-2 justify-between">
        <div className="flex items-center">
          <Image
            className="rounded-full overflow-hidden"
            src={`https://api.dicebear.com/7.x/big-smile/svg?seed=${member.name}`}
            width={50}
            height={50}
            alt="avatar"
          ></Image>
          {member.name}
        </div>
        <DeleteMemberButton memberId={member.id}></DeleteMemberButton>
      </Heading>

      <section>
        <MemberScheduleForm memberId={member.id}></MemberScheduleForm>
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
