import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AssigneeStats, LinearTicket, LinearTicketAssigneeMap } from "./types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function getTicketsByAssignee(
  tickets: LinearTicket[]
): LinearTicketAssigneeMap[] {
  const assigneeMap: Record<string, AssigneeStats> = {};
  let incrementingId = 0;
  tickets.forEach((ticket) => {
    const assigneeName = ticket.assignee?.name || "Unassigned";
    if (!assigneeMap[assigneeName]) {
      assigneeMap[assigneeName] = {
        id: incrementingId,
        assigneeName,
        tickets: [],
        totalCount: 0,
        doneCount: 0,
        inProgressCount: 0,
      };
    }

    incrementingId += 1;
    assigneeMap[assigneeName].tickets.push(ticket);
    assigneeMap[assigneeName].totalCount += 1;
    if (ticket.state.name === "Done") {
      assigneeMap[assigneeName].doneCount += 1;
    }
    if (ticket.state.name === "In Progress") {
      assigneeMap[assigneeName].inProgressCount += 1;
    }
  });
  return Object.values(assigneeMap);
}
