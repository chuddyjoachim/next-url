import { useRouter } from "next/router";
import { connectDb } from "../util/mongodbConfig";
import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const post = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { url } = router.query;

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Nexturl Redirectiing......" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          {data == "null" ? (
            <h1>
              invalid link <a href="/"> go to home</a>
            </h1>
          ) : (
            <div>
              <h1>Redirecting.......</h1>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { url } = context.query;

  let data;
  try {
    const { db } = await connectDb();
    data = await db.collection("url").findOne({ shortid: url });
    return {
      props: { data: JSON.stringify(data), url: url },
      redirect: {
        destination: data !== "null" ? data.url : "",
        permanent: false,
      },
    };
  } catch (error) {
    data = null;
    return {
      props: { data: JSON.stringify(data), url: url },
    };
  }
};

export default post;
