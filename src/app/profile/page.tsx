import { redirect } from "next/navigation";
import MainContainer from "@/components/main-container";
import { auth, signOut } from "@/auth";
import SignoutButton from "./signout-button";
import Image from "next/image";

export default async function Profile() {
  const session = await auth();

  if (!session?.user) {
    redirect("/api/auth/signin?callbackUrl=/profile");
  }
  return (
    <MainContainer>
      <>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-5">
            <span> {session.user.name}</span>
            <span>{session.user.email}</span>
          </div>
          <Image
            src={session.user.image || ""}
            alt={session.user.name || ""}
            width={100}
            height={100}
            className="rounded-full mb-3"
          />
        </div>

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
