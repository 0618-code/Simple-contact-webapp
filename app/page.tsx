import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";

export default async function HomePage() {
  const user = await currentUser();
  if (!user) {
    return <Guest/>
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">ContactApp</h1>
      <div className="text-green-500">Homepage</div>
    </div>
  );  
}