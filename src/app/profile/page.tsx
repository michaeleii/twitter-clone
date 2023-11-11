import { redirect } from "next/navigation";
import MainContainer from "@/components/main-container";
import { auth, signOut } from "@/auth";
import SignoutButton from "./signout-button";
import Image from "next/image";
import UserProfile from "@/components/user-profile";

export default async function Profile() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }
  return (
    <MainContainer>
      <>
        <UserProfile user={session.user} />
        <div className="mt-5">
          <SignoutButton
            signOut={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          />
        </div>
      </>
    </MainContainer>
  );
}
