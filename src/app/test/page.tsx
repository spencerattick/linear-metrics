import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TicketsFilter } from "@/components/tickets-filter"
import { TicketsTable } from "@/components/tickets-table"

export default function TicketsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Recent Tickets</h1>
        <p className="text-muted-foreground">View and manage all tickets across your projects.</p>
      </div>

      <TicketsFilter />

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Tickets</CardTitle>
          <CardDescription>A comprehensive list of all tickets with their current status and details.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <TicketsTable />
        </CardContent>
      </Card>
    </div>
  )
}
