export type LinearTicket = {
  id: string;
  title: string;
  identifier: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  priority: number;
  state: {
    id: string;
    name: string;
  };
  assignee: {
    name: string | null;
  };
  team: {
    name: "Technical Consulting";
  };
};

export type LinearTicketAssigneeMap = {
  id: number;
  assigneeName: string;
  tickets: LinearTicket[];
  totalCount: number;
  doneCount: number;
  inProgressCount: number;
};

export type AssigneeStats = {
    id: number;
    assigneeName: string;
    tickets: LinearTicket[];
    totalCount: number;
    doneCount: number;
    inProgressCount: number;
  };
