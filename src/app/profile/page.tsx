import { redirect } from "next/navigation";
import Image from "next/image";
import MainContainer from "@/components/main-container";
import { auth, signOut } from "@/auth";
import SignoutButton from "./signout-button";

export default async function Profile() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }
  return (
    <MainContainer>
      <>
        {session.user.name}
        {session.user.email}

        <SignoutButton
          signOut={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        />
      </>
    </MainContainer>
  );
}
