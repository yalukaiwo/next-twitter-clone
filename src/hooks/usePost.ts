import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { Prisma } from "@prisma/client";

const usePost = (postId?: string) => {
  const url = postId ? `/api/posts/${postId}` : null;
  const { data, error, isLoading, mutate } = useSWR<
    Prisma.PostGetPayload<{
      include: { user: true; comments: { include: { user: true } } };
    }>
  >(url, fetcher);

  return { data, error, isLoading, mutate };
};

export default usePost;
