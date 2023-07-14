import {Painting} from "@/data/types";
async function getData(): Promise<Painting[]> {
  const res = await fetch('http://localhost:3000/data.json');

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  console.log(data)

  return <main className="w-full">
    <ul>
      {data.map(painting => <li key={painting.name}>{painting.name}</li>)}
    </ul>
  </main>;
}
