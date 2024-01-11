import { Rowdies } from "next/font/google";
import Image from "next/image";
import { notFound } from "next/navigation";
import { NewDiverModal } from "@/app/[id]/new-driver-modal";
import { fetchPool } from "@/app/[id]/actions";
import Link from "next/link";
import Heading from "@/components/Heading";
import MdiDotsVertical from "@/components/mdi-dots-vertical";

const rowdies = Rowdies({ subsets: ["latin"], weight: ["700"] });

function getOpportunities(
  schedules: {
    from: Date;
    to: Date;
    name: string;
  }[],
): {
  from: Date;
  to: Date;
  drivers: string[];
}[] {
  // group schedules by day
  const groupedSchedules = schedules.reduce(
    (acc, schedule) => {
      const date = new Date(schedule.from);
      date.setHours(0, 0, 0, 0);

      if (!acc[date.getUTCDate()]) {
        acc[date.getUTCDate()] = [];
      }

      acc[date.getUTCDate()].push(schedule);

      return acc;
    },
    {} as Record<number, typeof schedules>,
  );

  return Object.values(groupedSchedules).flatMap((schedules) => {
    // a opportunity is when at least 2 drivers have the same `from` and `to`
    const opportunities = schedules.reduce(
      (acc, schedule) => {
        const opportunity = acc.find(
          (opportunity) =>
            opportunity.from.getTime() === schedule.from.getTime() &&
            opportunity.to.getTime() === schedule.to.getTime(),
        );

        if (opportunity) {
          opportunity.drivers.push(schedule.name);
        } else {
          acc.push({
            from: schedule.from,
            to: schedule.to,
            drivers: [schedule.name],
          });
        }

        return acc;
      },
      [] as {
        from: Date;
        to: Date;
        drivers: string[];
      }[],
    );

    // remove opportunities with only one driver
    return opportunities.filter(
      (opportunity) => opportunity.drivers.length > 1,
    );
  });
}

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const currentPool = await fetchPool(params.id);

  if (!currentPool) {
    return notFound();
  }

  const opportunities = getOpportunities(
    currentPool.schedules.map((schedule) => ({
      name: schedule.member.name,
      from: schedule.from,
      to: schedule.to,
    })),
  );

  return (
    <>
      <section className="space-y-6">
        <Heading>Conducteurs</Heading>

        <div className="gap-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-cols-1">
          {currentPool.members.map((driver) => (
            <DriverCard
              memberId={driver.id}
              poolId={driver.poolId}
              key={driver.id}
              name={driver.name}
            ></DriverCard>
          ))}
          <div>
            <NewDiverModal poolId={params.id}></NewDiverModal>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <Heading>
          Opportunités de covoit <span className="text-lg"></span>
        </Heading>

        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <OpportunityCard
              key={opportunity.from.getTime()}
              dateTripFrom={opportunity.from}
              dateTripTo={opportunity.to}
              drivers={opportunity.drivers}
            />
          ))}
        </div>
      </section>
    </>
  );
}

function DriverCard({
  name,
  memberId,
  poolId,
}: {
  name: string;
  poolId: string;
  memberId: number;
}) {
  return (
    <Link
      href={`/${poolId}/${memberId}`}
      className="bg-secondary rounded-xl p-4 text-neutral-950 flex items-center gap-4 shadow-lg hover:scale-105 transition-transform cursor-pointer"
    >
      <Image
        className="rounded-full overflow-hidden"
        src={`https://api.dicebear.com/7.x/big-smile/svg?seed=${name}`}
        width={50}
        height={50}
        alt="avatar"
      ></Image>
      <div className={`${rowdies.className} text-2xl`}>{name}</div>
    </Link>
  );
}

function OpportunityCard(props: {
  dateTripFrom: Date;
  dateTripTo: Date;
  drivers: string[];
}) {
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
    <div className="bg-secondary p-4 rounded-xl shadow-lg text-neutral-950 flex justify-between flex-col sm:flex-row items-center gap-4">
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
      <div>
        <StackedAvatar names={props.drivers}></StackedAvatar>
      </div>
    </div>
  );
}

function StackedAvatar(props: { names: string[] }) {
  return (
    <div className="flex items-center -space-x-12">
      {props.names.map((name) => (
        <Image
          key={name}
          className="rounded-full overflow-hidden border-secondary bg-secondary"
          src={`https://api.dicebear.com/7.x/big-smile/svg?seed=${name}`}
          width={100}
          height={100}
          alt="avatar"
        ></Image>
      ))}
    </div>
  );
}
