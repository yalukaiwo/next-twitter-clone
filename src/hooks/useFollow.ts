import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import { toast } from "react-hot-toast";
import axios, { AxiosResponse } from "axios";
import { User } from "@prisma/client";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list: string[] = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [userId, currentUser?.followingIds]);

  const toggleFollow = useCallback(async () => {
    if (!currentUser) return loginModal.onOpen();

    let request: () => Promise<AxiosResponse<User, any>>;

    try {
      if (isFollowing) {
        request = () => axios.delete<User>(`/api/follow`, { data: { userId } });
      } else {
        request = () => axios.post<User>(`/api/follow`, { userId });
      }

      await request();
      mutateCurrentUser();
      mutateFetchedUser();
      toast.success("Success!");
    } catch (e) {
      toast.error("Something went wrong.");
    }
  }, [
    currentUser,
    isFollowing,
    userId,
    mutateCurrentUser,
    mutateFetchedUser,
    loginModal,
  ]);

  return {
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
