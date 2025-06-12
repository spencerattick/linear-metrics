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
    tickets.forEach((ticket) => {
      //sort tickets based on assignee name
      const assigneeName = ticket.assignee?.name || "Unassigned";
      if (!assigneeMap[assigneeName]) {
        assigneeMap[assigneeName] = {
            tickets: [ticket],
            totalCount: 1,
            doneCount: ticket.state.name === "Done" ? 1 : 0,
            inProgressCount: ticket.state.name === "In Progress" ? 1 : 0
        };
      } else {
        assigneeMap[assigneeName].tickets.push(ticket);
        assigneeMap[assigneeName].totalCount += 1;
        if (ticket.state.name === "Done") { 
          assigneeMap[assigneeName].doneCount += 1; 
        }
        if (ticket.state.name === "In Progress") {  
          assigneeMap[assigneeName].inProgressCount += 1; 
        }
      }
    });
    return assigneeMap;
  }
  
