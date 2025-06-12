"use client";

import { useLinearContext } from "@/lib/hooks";
import { getTicketsByAssignee } from "@/lib/utils";

export default function ByAssignee() {
  const { linearData } = useLinearContext();

  const byAssignee = getTicketsByAssignee(linearData || []);
  const assignees = Object.keys(byAssignee);
  console.log("byAssignee", byAssignee);

  return (
    <>
      <h1 className="text-2xl text-center">Tickets by Assignee</h1>
      {assignees.map((assignee) => (
          <div key={assignee} className="m-4">
            <h1 className="text-2xl">{assignee}</h1>
            <p>In Progress: </p>
            <p>Done: </p>
            <p>Total: </p>
          </div>
        ))}
    </>
  );
}
