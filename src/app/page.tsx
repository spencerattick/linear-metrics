export default async function Home() {
  const response = await fetch("http://localhost:3001/api/linear-data");
  const data = await response.json();
  console.log(data)
  return <div>HOME</div>;
}


