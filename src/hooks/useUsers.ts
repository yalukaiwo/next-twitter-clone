import useSWR from "swr";
import fetcher from "@/libs/fetcher";
import type { User } from "@prisma/client";

const useUsers = () => {
  const { data, error, isLoading, mutate } = useSWR<User[]>(
    "/api/users",
    fetcher
  );

  return { data, error, isLoading, mutate };
};

export default useUsers;
