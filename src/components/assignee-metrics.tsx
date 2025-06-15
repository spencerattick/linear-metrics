"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLinearContext } from "@/lib/hooks";
import { getTicketsByAssignee } from "@/lib/utils";

type SortField = "name" | "inProgressCount" | "doneCount" | "totalCount";
type SortDirection = "asc" | "desc";

export default function AgentMetricsTable() {
  const [sortField, setSortField] = useState<SortField>("totalCount");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const { linearData } = useLinearContext();

  const byAssignee = getTicketsByAssignee(linearData || []);

  const sortedData = [...byAssignee].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc"
        ? a.assigneeName.localeCompare(b.assigneeName)
        : b.assigneeName.localeCompare(a.assigneeName);
    }

    return sortDirection === "asc"
      ? a[sortField] - b[sortField]
      : b[sortField] - a[sortField];
  });

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">
              <Button
                variant="ghost"
                onClick={() => handleSort("name")}
                className="flex items-center gap-1 font-medium"
              >
                Assignee
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="text-center">
              <Button
                variant="ghost"
                onClick={() => handleSort("inProgressCount")}
                className="flex items-center gap-1 font-medium"
              >
                In Progress
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="text-center">
              <Button
                variant="ghost"
                onClick={() => handleSort("doneCount")}
                className="flex items-center gap-1 font-medium"
              >
                Done
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="text-center">
              <Button
                variant="ghost"
                onClick={() => handleSort("totalCount")}
                className="flex items-center gap-1 font-medium"
              >
                Total
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((assignee) => (
            <TableRow key={assignee.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {/* <div className="h-8 w-8 rounded-full overflow-hidden">
                  </div> */}
                  <span>{assignee.assigneeName}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  variant="outline"
                  className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                >
                  {assignee.inProgressCount}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Badge
                  variant="outline"
                  className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800"
                >
                  {assignee.doneCount}
                </Badge>
              </TableCell>
              <TableCell className="text-center font-medium">
                {assignee.totalCount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
