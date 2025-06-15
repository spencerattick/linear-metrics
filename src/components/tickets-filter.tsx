"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X } from "lucide-react"

export function TicketsFilter() {
  const [showFilters, setShowFilters] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>(["Todo", "In Progress", "Done"])
  const [selectedPriorities, setSelectedPriorities] = useState<string[]>(["Low", "Medium", "High"])
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<string>("all")

  const toggleStatus = (status: string) => {
    setSelectedStatuses((current) =>
      current.includes(status) ? current.filter((s) => s !== status) : [...current, status],
    )
  }

  const togglePriority = (priority: string) => {
    setSelectedPriorities((current) =>
      current.includes(priority) ? current.filter((p) => p !== priority) : [...current, priority],
    )
  }

  const toggleProject = (project: string) => {
    setSelectedProjects((current) =>
      current.includes(project) ? current.filter((p) => p !== project) : [...current, project],
    )
  }

  const clearFilters = () => {
    setSelectedStatuses(["Todo", "In Progress", "Done"])
    setSelectedPriorities(["Low", "Medium", "High"])
    setSelectedProjects([])
    setDateRange("all")
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-1"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              Status
              <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
                {selectedStatuses.length}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("Todo")}
              onCheckedChange={() => toggleStatus("Todo")}
            >
              Todo
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("In Progress")}
              onCheckedChange={() => toggleStatus("In Progress")}
            >
              In Progress
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedStatuses.includes("Done")}
              onCheckedChange={() => toggleStatus("Done")}
            >
              Done
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              Priority
              <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
                {selectedPriorities.length}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Filter by Priority</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={selectedPriorities.includes("Low")}
              onCheckedChange={() => togglePriority("Low")}
            >
              Low
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedPriorities.includes("Medium")}
              onCheckedChange={() => togglePriority("Medium")}
            >
              Medium
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedPriorities.includes("High")}
              onCheckedChange={() => togglePriority("High")}
            >
              High
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              Project
              {selectedProjects.length > 0 && (
                <span className="ml-1 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
                  {selectedProjects.length}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Filter by Project</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={selectedProjects.includes("User Management")}
              onCheckedChange={() => toggleProject("User Management")}
            >
              User Management
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedProjects.includes("Dashboard")}
              onCheckedChange={() => toggleProject("Dashboard")}
            >
              Dashboard
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedProjects.includes("Analytics")}
              onCheckedChange={() => toggleProject("Analytics")}
            >
              Analytics
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedProjects.includes("API")}
              onCheckedChange={() => toggleProject("API")}
            >
              API
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedProjects.includes("Documentation")}
              onCheckedChange={() => toggleProject("Documentation")}
            >
              Documentation
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={selectedProjects.includes("UI/UX")}
              onCheckedChange={() => toggleProject("UI/UX")}
            >
              UI/UX
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Select value={dateRange} onValueChange={setDateRange}>
          <SelectTrigger className="w-[180px] h-9">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="yesterday">Yesterday</SelectItem>
            <SelectItem value="week">This week</SelectItem>
            <SelectItem value="month">This month</SelectItem>
            <SelectItem value="quarter">This quarter</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" size="sm" onClick={clearFilters} className="flex items-center gap-1">
          <X className="h-4 w-4" />
          Clear filters
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-md bg-muted/40">
          <div className="space-y-2">
            <Label htmlFor="assignee">Assignee</Label>
            <Select>
              <SelectTrigger id="assignee">
                <SelectValue placeholder="All assignees" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All assignees</SelectItem>
                <SelectItem value="alex">Alex Johnson</SelectItem>
                <SelectItem value="sarah">Sarah Miller</SelectItem>
                <SelectItem value="chris">Chris Davis</SelectItem>
                <SelectItem value="jamie">Jamie Smith</SelectItem>
                <SelectItem value="taylor">Taylor Wilson</SelectItem>
                <SelectItem value="morgan">Morgan Lee</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="label">Label</Label>
            <Select>
              <SelectTrigger id="label">
                <SelectValue placeholder="All labels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All labels</SelectItem>
                <SelectItem value="feature">Feature</SelectItem>
                <SelectItem value="bug">Bug</SelectItem>
                <SelectItem value="documentation">Documentation</SelectItem>
                <SelectItem value="frontend">Frontend</SelectItem>
                <SelectItem value="backend">Backend</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="security">Security</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="created">Created</Label>
            <Select>
              <SelectTrigger id="created">
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This week</SelectItem>
                <SelectItem value="month">This month</SelectItem>
                <SelectItem value="quarter">This quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="search-filter">Search in tickets</Label>
            <Input id="search-filter" placeholder="Search by keyword..." />
          </div>
        </div>
      )}
    </div>
  )
}
