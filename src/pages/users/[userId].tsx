import { Header } from "@/components";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import { useUser } from "@/hooks";
import Head from "next/head";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const UserView = () => {
  const router = useRouter();
  const { userId } = router.query;

  const { data: fetchedUser, isLoading } = useUser(userId as string);

  if (isLoading || !fetchedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{fetchedUser?.name ?? "User"}&apos;s profile</title>
      </Head>
      <Header showBackArrow label={fetchedUser?.name ?? "User"} />
      <UserHero user={fetchedUser} />
      <UserBio userId={fetchedUser.id} />
    </>
  );
};

export default UserView;
