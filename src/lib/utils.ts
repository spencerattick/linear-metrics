import { LinearTicket } from "./types";

export function getTicketsByAssignee(tickets: LinearTicket[]) {
  const assigneeMap: Record<string, LinearTicket[]> = {};
  tickets.forEach((ticket) => {
    const assigneeName = ticket.assignee?.name || "Unassigned";
    if (!assigneeMap[assigneeName]) {
      assigneeMap[assigneeName] = [];
    } else {
      assigneeMap[assigneeName].push(ticket);
    }
  });
  return assigneeMap;
}
