"use client";

import { useLinearContext } from "@/lib/hooks";
import { getTicketsByAssignee } from "@/lib/utils";

export default function ByAssignee() {
  const { linearData } = useLinearContext();

  const byAssignee = getTicketsByAssignee(linearData || []);

  return (
    <>
      <h1 className="text-2xl text-center">Tickets by Assignee</h1>
      {byAssignee.map((assignee) => (
        <div key={assignee.id} className="m-4">
          <h1 className="text-2xl">{assignee.assigneeName}</h1>
          <div>
            <p>Total: {assignee.totalCount}</p>
            <p>In Progress: {assignee.inProgressCount}</p>
            <p>Done: {assignee.doneCount}</p>
          </div>
        </div>
      ))}
    </>
  );
}
