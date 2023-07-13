import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import { Prisma } from "@prisma/client";

type Post = Prisma.PostGetPayload<{ include: { user: true; comments: true } }>;

interface IPostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<IPostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post) => (
        <PostItem userId={userId} key={post.id} data={post as Post} />
      ))}
    </>
  );
};

export default PostFeed;
