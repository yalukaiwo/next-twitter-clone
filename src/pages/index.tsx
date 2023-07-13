import { Form, Header } from "@/components";
import PostFeed from "@/components/posts/PostFeed";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  );
};
export default Home;
