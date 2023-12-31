import Link from "next/link";
import Image from "next/image";

import timeAgoShort from "@/utils/timeAgoShort";

import { type Post } from "@/db/queries/postList";

import DeleteButton from "./delete-button";

type PostProps = {
  post: Post;
};

export default function PostItem({ post }: PostProps) {
  return (
    <article className="flex flex-col gap-4 py-4 px-4 relative rounded-lg">
      <div className="flex gap-4 items-start">
        <Link href={`/profile/${post.user.name}`}>
          <div className="rounded-full h-10 w-10 overflow-hidden relative">
            <Image
              className="object-cover"
              src={post.user.image || "/images/default-profile.png"}
              alt={post.user.name || ""}
              priority={true}
              fill={true}
            />
          </div>
        </Link>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex justify-between">
            <Link href={`/profile/${post.user.name?.replace(" ", "-")}`}>
              <div>{post.user.name}</div>
            </Link>
            <p className="dark:text-neutral-400 text-neutral-600">
              {timeAgoShort(new Date(post.createdAt))}
            </p>
          </div>
          <Link href={`/post/${post.id}`}>
            <p className="font-light">{post.content}</p>
          </Link>
          {post.media && post.media.type === "image" && (
            <div className="rounded-lg overflow-hidden relative w-80 h-80">
              <Image
                src={post.media.url}
                alt={post.media.url}
                fill
                className="object-cover"
              />
            </div>
          )}
          {post.media && post.media.type === "video" && (
            <div className="rounded-lg overflow-hidden relative w-80 h-80">
              <video src={post.media.url} controls />
            </div>
          )}

          <div className="flex gap-2 my-5">
            <DeleteButton id={post.id} />
          </div>
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
