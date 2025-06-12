import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <Link href='/all-data'>See All Ticket Data</Link>
      <Link href='/by-assignee'>See Data By Assignee</Link>
    </div>
  );
}