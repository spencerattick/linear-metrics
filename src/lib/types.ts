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
}