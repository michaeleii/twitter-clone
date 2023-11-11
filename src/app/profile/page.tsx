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
        <div className="flex flex-col gap-5">
          <span> {session.user.name}</span>
          <span>{session.user.email}</span>
        </div>
        <div className="mt-5 text-right">
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
