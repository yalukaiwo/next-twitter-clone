import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import { Notification } from "@prisma/client";

const useNotifications = (userId?: string) => {
  const url = userId ? `/api/notifications/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR<Notification[]>(
    url,
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useNotifications;
