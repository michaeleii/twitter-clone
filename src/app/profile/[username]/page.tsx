import MainContainer from "@/components/main-container";
import UserProfile from "@/components/user-profile";
import { db, eq } from "@/db";
import { users } from "@/db/schema/users";
import Image from "next/image";

export default async function UserProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username.replace("-", " ");
  const [user] = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      image: users.image,
    })
    .from(users)
    .where(eq(users.name, username))
    .limit(1);
  if (!user) {
    return <div>Not found</div>;
  }
  return (
    <MainContainer>
      <UserProfile user={user} />
    </MainContainer>
  );
}
