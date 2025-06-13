import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import AgentMetricsTable from "@/components/assignee-metrics";

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="table" className="space-y-4">
        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Metrics</CardTitle>
              <CardDescription>
                Detailed breakdown of tickets per agent with status distribution
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AgentMetricsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Comparative Performance</CardTitle>
              <CardDescription>
                Visual comparison of ticket distribution across team members
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
