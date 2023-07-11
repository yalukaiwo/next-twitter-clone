import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import type { User } from "@prisma/client";

const useUser = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR<
    User & { followersCount: number }
  >(id ? `/api/users/${id}` : null, fetcher);

  return { data, error, isLoading, mutate };
};

export default useUser;
