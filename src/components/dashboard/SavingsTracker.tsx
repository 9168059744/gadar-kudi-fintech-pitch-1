import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function SavingsTracker() {
  // TODO: Fetch real data
  const goals = [
    { name: "New Farmland", current: 75000, target: 150000 },
    { name: "Children's School Fees", current: 40000, target: 100000 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span>{goal.name}</span>
              <span>\u20a6{goal.current.toLocaleString()} / \u20a6{goal.target.toLocaleString()}</span>
            </div>
            <Progress value={(goal.current / goal.target) * 100} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
