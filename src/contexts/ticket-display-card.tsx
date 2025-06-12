import React from "react";
import { LinearTicket } from "@/lib/types";

type TicketDisplayCardProps = {
  ticket: LinearTicket;
};

export default function TicketDisplayCard({ ticket }: TicketDisplayCardProps) {
  return (
    <div key={ticket.id} className="border p-4 mb-4">
      <h2 className="text-xl font-bold">{ticket.title}</h2>
      {ticket.assignee && <h3>Assignee: {ticket.assignee.name}</h3>}
      <p>
        <strong>ID:</strong> {ticket.identifier}
      </p>
      <p>
        <strong>Description:</strong>{" "}
        {ticket.description || "No description provided"}
      </p>
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(ticket.createdAt).toLocaleDateString()}
      </p>
      <p>
        <strong>Updated At:</strong>{" "}
        {new Date(ticket.updatedAt).toLocaleDateString()}
      </p>
      <p>
        <strong>Priority:</strong> {ticket.priority}
      </p>
      <p>
        <strong>State:</strong> {ticket.state.name}
      </p>
    </div>
  );
}
