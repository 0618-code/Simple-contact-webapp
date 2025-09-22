import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";
import AddNewContact from "@/components/addnewcontact";

export default async function HomePage() {
  const user = await currentUser();

  if (!user) {
    return <Guest />;
  }
  return (
    <AddNewContact />
  );
}