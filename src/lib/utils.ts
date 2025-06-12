import { LinearTicket, LinearTicketAssigneeMap } from "./types";

// export function getTicketsByAssignee(tickets: LinearTicket[]) {
//   const assigneeMap: Record<string, LinearTicket[]> = {};
//   tickets.forEach((ticket) => {
//     //sort tickets based on assignee name
//     const assigneeName = ticket.assignee?.name || "Unassigned";
//     if (!assigneeMap[assigneeName]) {
//       assigneeMap[assigneeName] = [];
//     } else {
//       assigneeMap[assigneeName].push(ticket);
//     }

//     //
//   });
//   return assigneeMap;
// }

export function getTicketsByAssignee(tickets: LinearTicket[]) {
  const assigneeMap: any = {};
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
