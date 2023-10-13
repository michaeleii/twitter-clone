import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getUserByUsername } from "@/db/queries/profile";
import ErrorMessage from "@/components/error-message";
import MainContainer from "@/components/main-container";

type ProfileProps = {
  params: {
    username: string;
  };
};

export default async function Profile({ params }: ProfileProps) {
  const { user, userError } = await getUserByUsername(params.username);
  if (userError) {
    console.error(userError);
    return <ErrorMessage message="Error connecting to database." />;
  }

  if (!user) {
    notFound();
  }

  return (
    <MainContainer>
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <div>{user.username}</div>
        </div>
        <Link href={user.avatar}>
          <div className="rounded-full h-20 w-20 overflow-hidden relative">
            <Image
              className="object-cover"
              src={user.avatar}
              alt={user.username}
              quality={100}
              priority={true}
              fill={true}
            />
          </div>
        </Link>
      </div>

      {/* <div className="mt-7">
        <div className="w-full border-b mb-5">
          <div className="mb-2">Posts</div>
        </div>
        <div className="flex flex-col divide-y">
          {posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))}
        </div>
      </div> */}
    </MainContainer>
  );
}
