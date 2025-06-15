"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { useLinearContext } from "@/lib/hooks";

// Sample data - would be replaced with actual API data
const ticketsData = [
  {
    id: "LIN-492",
    title: "Implement authentication flow",
    status: "In Progress",
    priority: "High",
    assignee: "Alex Johnson",
    assigneeAvatar: "/placeholder.svg?height=32&width=32",
    project: "User Management",
    createdAt: new Date(2023, 5, 15),
    updatedAt: new Date(2023, 5, 18),
    labels: ["feature", "frontend"],
  },
  {
    id: "LIN-491",
    title: "Fix dashboard loading state",
    status: "Done",
    priority: "Medium",
    assignee: "Sarah Miller",
    assigneeAvatar: "/placeholder.svg?height=32&width=32",
    project: "Dashboard",
    createdAt: new Date(2023, 5, 14),
    updatedAt: new Date(2023, 5, 16),
    labels: ["bug", "frontend"],
  },
  {
    id: "LIN-490",
    title: "Add export to CSV feature",
    status: "Todo",
    priority: "Low",
    assignee: "Chris Davis",
    assigneeAvatar: "/placeholder.svg?height=32&width=32",
    project: "Analytics",
    createdAt: new Date(2023, 5, 13),
    updatedAt: new Date(2023, 5, 13),
    labels: ["feature", "backend"],
  },
  {
    id: "LIN-489",
    title: "Optimize API response time",
    status: "In Progress",
    priority: "High",
    assignee: "Jamie Smith",
    assigneeAvatar: "/placeholder.svg?height=32&width=32",
    project: "API",
    createdAt: new Date(2023, 5, 12),
    updatedAt: new Date(2023, 5, 17),
    labels: ["performance", "backend"],
  },
  {
    id: "LIN-488",
    title: "Update documentation",
    status: "Done",
    priority: "Medium",
    assignee: "Taylor Wilson",
    assigneeAvatar: "/placeholder.svg?height=32&width=32",
    project: "Documentation",
    createdAt: new Date(2023, 5, 11),
    updatedAt: new Date(2023, 5, 15),
    labels: ["documentation"],
  },
  {
    id: "LIN-487",
    title: "Fix mobile responsive issues",
    status: "Done",
    priority: "Medium",
    assignee: "Morgan Lee",
    assigneeAvatar: "/placeholder.svg?height=32&width=32",
    project: "UI/UX",
    createdAt: new Date(2023, 5, 10),
    updatedAt: new Date(2023, 5, 14),
    labels: ["bug", "frontend", "mobile"],
  },
  {
    id: "LIN-486",
    title: "Implement dark mode",
    status: "In Progress",
    priority: "Low",
    assignee: "Alex Johnson",
    assigneeAvatar: "/placeholder.svg?height=32&width=32",
    project: "UI/UX",
    createdAt: new Date(2023, 5, 9),
    updatedAt: new Date(2023, 5, 16),
    labels: ["feature", "frontend"],
  },
  {
    id: "LIN-485",
    title: "Add user roles and permissions",
    status: "Todo",
    priority: "High",
    assignee: "Sarah Miller",
    assigneeAvatar: "/placeholder.svg?height=32&width=32",
    project: "User Management",
    createdAt: new Date(2023, 5, 8),
    updatedAt: new Date(2023, 5, 8),
    labels: ["feature", "backend", "security"],
  },
  {
    id: "LIN-484",
    title: "Fix login error handling",
    status: "Done",
    priority: "High",
    assignee: "Chris Davis",
    assigneeAvatar: "/placeholder.svg?height=32&width=32",
    project: "User Management",
    createdAt: new Date(2023, 5, 7),
    updatedAt: new Date(2023, 5, 12),
    labels: ["bug", "frontend", "security"],
  },
  {
    id: "LIN-483",
    title: "Implement data visualization charts",
    status: "In Progress",
    priority: "Medium",
    assignee: "Jamie Smith",
    assigneeAvatar: "/placeholder.svg?height=32&width=32",
    project: "Analytics",
    createdAt: new Date(2023, 5, 6),
    updatedAt: new Date(2023, 5, 15),
    labels: ["feature", "frontend"],
  },
];

type SortField =
  | "id"
  | "title"
  | "status"
  | "priority"
  | "assignee"
  | "project"
  | "updatedAt";
type SortDirection = "asc" | "desc";

export function TicketsTable() {
  const { linearData } = useLinearContext();

  const [sortField, setSortField] = useState<SortField>("updatedAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter tickets based on search query
  const filteredTickets = ticketsData.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.labels.some((label) =>
        label.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  // Sort tickets based on sort field and direction
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortField === "id") {
      const aNum = Number.parseInt(a.id.split("-")[1]);
      const bNum = Number.parseInt(b.id.split("-")[1]);
      return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
    }

    if (sortField === "updatedAt") {
      return sortDirection === "asc"
        ? a.updatedAt.getTime() - b.updatedAt.getTime()
        : b.updatedAt.getTime() - a.updatedAt.getTime();
    }

    if (
      sortField === "title" ||
      sortField === "status" ||
      sortField === "priority" ||
      sortField === "assignee" ||
      sortField === "project"
    ) {
      return sortDirection === "asc"
        ? a[sortField].localeCompare(b[sortField])
        : b[sortField].localeCompare(a[sortField]);
    }

    return 0;
  });

  // Paginate tickets
  const totalPages = Math.ceil(sortedTickets.length / itemsPerPage);
  const paginatedTickets = sortedTickets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tickets..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("id")}
                  className="flex items-center gap-1 font-medium"
                >
                  ID
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("title")}
                  className="flex items-center gap-1 font-medium"
                >
                  Title
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead className="w-[120px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("status")}
                  className="flex items-center gap-1 font-medium"
                >
                  Status
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              {/* <TableHead className="w-[100px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("priority")}
                  className="flex items-center gap-1 font-medium"
                >
                  Priority
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead> */}
              <TableHead className="w-[150px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("assignee")}
                  className="flex items-center gap-1 font-medium"
                >
                  Assignee
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              {/* <TableHead className="w-[150px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("project")}
                  className="flex items-center gap-1 font-medium"
                >
                  Project
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead> */}
              <TableHead className="w-[150px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("updatedAt")}
                  className="flex items-center gap-1 font-medium"
                >
                  Updated
                  <ArrowUpDown className="h-3 w-3" />
                </Button>
              </TableHead>
              {/* <TableHead className="w-[120px]">Labels</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {linearData ? (
              linearData.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.identifier}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        ticket.state.name === "Done" && "bg-green-500",
                        ticket.state.name === "In Progress" && "bg-purple-500",
                        ticket.state.name === "Triage" && "bg-blue-500"
                      )}
                    >
                      {ticket.state.name}
                    </Badge>
                  </TableCell>
                  {/* <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        ticket.priority === "High" &&
                          "border-red-500 text-red-500",
                        ticket.priority === "Medium" &&
                          "border-yellow-500 text-yellow-500",
                        ticket.priority === "Low" &&
                          "border-blue-500 text-blue-500"
                      )}
                    >
                      {ticket.priority}
                    </Badge>
                  </TableCell> */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {/* <div className="h-6 w-6 rounded-full overflow-hidden">
                        <img
                          src={ticket.assigneeAvatar || "/placeholder.svg"}
                          alt={ticket.assignee}
                          className="h-full w-full object-cover"
                        />
                      </div> */}
                      <span className="text-sm">{ticket.assignee?.name || 'Not Assigned'}</span>
                    </div>
                  </TableCell>
                  {/* <TableCell>{ticket.project}</TableCell> */}
                  <TableCell className="text-muted-foreground text-sm">
                    {formatDistanceToNow(ticket.updatedAt, { addSuffix: true })}
                  </TableCell>
                  {/* <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {ticket.labels.map((label) => (
                        <Badge
                          key={label}
                          variant="secondary"
                          className="text-xs"
                        >
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </TableCell> */}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No tickets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {paginatedTickets.length > 0
            ? (currentPage - 1) * itemsPerPage + 1
            : 0}{" "}
          to {Math.min(currentPage * itemsPerPage, filteredTickets.length)} of{" "}
          {filteredTickets.length} tickets
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
