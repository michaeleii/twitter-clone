import Link from "next/link";
import Image from "next/image";

import timeAgoShort from "@/utils/timeAgoShort";
import { Post } from "@/db/schema/post";
import { User } from "@/db/schema/user";
import { Media } from "@/db/schema/media";

type PostProps = {
  post: Post;
  user: User;
  media: Media;
};

export default function PostItem({ post, user, media }: PostProps) {
  return (
    <article className="flex flex-col gap-4 py-4 px-4 relative border rounded-lg">
      <div className="flex gap-4 items-start">
        <Link href={`/${user.username}`}>
          <div className="rounded-full h-10 w-10 overflow-hidden relative">
            <Image
              className="object-cover"
              src={user.avatar}
              alt={user.username}
              priority={true}
              fill={true}
            />
          </div>
        </Link>
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <Link href={`/${user.username}`}>
              <div>{user.username}</div>
            </Link>
            <p className="dark:text-neutral-400 text-neutral-600">
              {timeAgoShort(new Date(post.createdAt))}
            </p>
          </div>
          <Link href={`/post/${post.id}`}>
            <p className="font-light">{post.content}</p>
          </Link>
          {media.type === "image" && (
            <Image
              src={media.url}
              alt={media.url}
              width={media.width}
              height={media.height}
              className="rounded-xl"
            />
          )}
          {/* <PostActions /> */}
        </div>
      </div>
      <div className="flex gap-2 dark:text-neutral-400 text-neutral-600">
        <p>{0} likes</p>
        <p>·</p>
        <p>{0} replies</p>
        {/* <p>{post.retweets} retweets</p> */}
      </div>
    </article>
  );
}
