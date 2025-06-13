"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useLinearContext } from "@/lib/hooks"
import { getTicketsByAssignee } from "@/lib/utils"

// Sample data - would be replaced with actual API data
const agentData = [
  {
    id: 1,
    name: "Alex Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    inProgress: 8,
    done: 42,
    total: 56,
    backlog: 6,
    efficiency: 75,
    trend: "up",
  },
  {
    id: 2,
    name: "Sarah Miller",
    avatar: "/placeholder.svg?height=40&width=40",
    inProgress: 5,
    done: 38,
    total: 47,
    backlog: 4,
    efficiency: 81,
    trend: "up",
  },
  {
    id: 3,
    name: "Chris Davis",
    avatar: "/placeholder.svg?height=40&width=40",
    inProgress: 12,
    done: 31,
    total: 52,
    backlog: 9,
    efficiency: 60,
    trend: "down",
  },
  {
    id: 4,
    name: "Jamie Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    inProgress: 7,
    done: 45,
    total: 58,
    backlog: 6,
    efficiency: 78,
    trend: "up",
  },
  {
    id: 5,
    name: "Taylor Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    inProgress: 10,
    done: 36,
    total: 51,
    backlog: 5,
    efficiency: 71,
    trend: "neutral",
  },
  {
    id: 6,
    name: "Morgan Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    inProgress: 6,
    done: 29,
    total: 42,
    backlog: 7,
    efficiency: 69,
    trend: "down",
  },
]

type SortField = "name" | "inProgress" | "done" | "total" | "efficiency"
type SortDirection = "asc" | "desc"

export default function AgentMetricsTable() {
  const [sortField, setSortField] = useState<SortField>("total")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

    const { linearData } = useLinearContext();
  
    const byAssignee = getTicketsByAssignee(linearData || []);

  const sortedData = [...byAssignee].sort((a, b) => {
    if (sortField === "name") {
      return sortDirection === "asc" ? a.assigneeName.localeCompare(b.assigneeName) : b.assigneeName.localeCompare(a.assigneeName)
    }

    return sortDirection === "asc" ? a[sortField] - b[sortField] : b[sortField] - a[sortField]
  })

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

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
                Agent
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="text-center">
              <Button
                variant="ghost"
                onClick={() => handleSort("inProgress")}
                className="flex items-center gap-1 font-medium"
              >
                In Progress
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="text-center">
              <Button
                variant="ghost"
                onClick={() => handleSort("done")}
                className="flex items-center gap-1 font-medium"
              >
                Done
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            <TableHead className="text-center">
              <Button
                variant="ghost"
                onClick={() => handleSort("total")}
                className="flex items-center gap-1 font-medium"
              >
                Total
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead>
            {/* <TableHead className="text-right">
              <Button
                variant="ghost"
                onClick={() => handleSort("efficiency")}
                className="flex items-center gap-1 font-medium justify-end w-full"
              >
                Efficiency
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((assignee) => (
            <TableRow key={assignee.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full overflow-hidden">
                    {/* <img
                      src={assignee.avatar || "/placeholder.svg"}
                      alt={assignee.assigneeName}
                      className="h-full w-full object-cover"
                    /> */}
                  </div>
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
              <TableCell className="text-center font-medium">{assignee.totalCount}</TableCell>
              {/* <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-[80px]">
                    <Progress value={agent.efficiency} className="h-2" />
                  </div>
                  <span className="text-sm font-medium">{agent.efficiency}%</span>
                  {agent.trend === "up" && <ArrowUp className="h-3 w-3 text-green-500" />}
                  {agent.trend === "down" && <ArrowDown className="h-3 w-3 text-red-500" />}
                </div>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
