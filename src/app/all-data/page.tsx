"use client";

import TicketDisplayCard from "@/components/ticket-display-card";
import { useLinearContext } from "@/lib/hooks";
import { LinearTicket } from "@/lib/types";

export default function Home() {
  const { linearData } = useLinearContext();
  return (
    <div>
      {linearData &&
        linearData.map((ticket: LinearTicket) => {
          return <TicketDisplayCard ticket={ticket} key={ticket.id} />;
        })}
    </div>
  );
}
