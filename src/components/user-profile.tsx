import Image from "next/image";
import { Session } from "next-auth/types";

type UserProfileProps = {
  user: Session["user"];
};

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-5">
          <span> {user.name}</span>
          <span>{user.email}</span>
        </div>
        <Image
          src={user.image || ""}
          alt={user.name || ""}
          width={100}
          height={100}
          className="rounded-full mb-3"
        />
      </div>
    </>
  );
}
