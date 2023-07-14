import { Prisma } from "@prisma/client";
import CommentItem from "./CommentItem";

type Comment = Prisma.CommentGetPayload<{ include: { user: true } }>;

interface ICommentFeedProps {
  comments?: Comment[];
}

const CommentFeed: React.FC<ICommentFeedProps> = ({ comments = [] }) => {
  return (
    <>
      {comments?.map((comment) => (
        <CommentItem key={comment.id} data={comment} />
      ))}
    </>
  );
};

export default CommentFeed;
