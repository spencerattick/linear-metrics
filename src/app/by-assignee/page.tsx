"use client";

import { useLinearContext } from "@/lib/hooks";
import { getTicketsByAssignee } from "@/lib/utils";

export default function ByAssignee() {
    const { linearData } = useLinearContext();

    const byAssignee = getTicketsByAssignee(linearData || []);


  return (
    <div>ByAssignee</div>
  )
}
