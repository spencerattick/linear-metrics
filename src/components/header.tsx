import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <div className="flex gap-4 p-5 border-b border-gray-200">
      <Button>
        <Link href="/">Home</Link>
      </Button>
      <Button>
        <Link href="/all-data">All Ticket Data</Link>
      </Button>
      <Button>
        <Link href="/by-assignee">Ticket Metrics by Assignee</Link>
      </Button>
    </div>
  );
}
