import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { toast } from "react-hot-toast";
import axios from "axios";

const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentUser } = useCurrentUser();
  const { data: fetchedPost, mutate: mutateFetchedPost } = usePost(postId);
  const { mutate: mutateFetchedPosts } = usePosts(userId);
  const loginModal = useLoginModal();

  const isLiked = useMemo(() => {
    const list = fetchedPost?.likedIds || [];

    return list.includes(currentUser?.id ?? "");
  }, [currentUser?.id, fetchedPost]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isLiked) {
        request = () => axios.delete("/api/like", { data: { postId } });
      } else {
        request = () => axios.post("/api/like", { postId });
      }

      await request();

      mutateFetchedPost();
      mutateFetchedPosts();

      toast.success("Success!");
    } catch (e) {
      toast.error("Something went wrong.");
    }
  }, [
    currentUser,
    isLiked,
    postId,
    mutateFetchedPost,
    mutateFetchedPosts,
    loginModal,
  ]);

  return { isLiked, toggleLike };
};

export default useLike;
