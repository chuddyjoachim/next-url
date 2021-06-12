import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Modal.module.css";
// import * as copy from "./../lib/svg/copy-svgrepo-com.svg"

interface ModalProps {
  shortUrl: string;
  disableModal: () => void;
}
type urlInput = string;

const Modal: React.FC<ModalProps> = ({ shortUrl, disableModal }) => {
  const addToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href + shortUrl);
      document.execCommand("Copy");
      alert("Link coppied to Clipboard");
    } catch (err) {
      alert("Failed to copy!");
    }
  };
  return (
    <>
      <div className={styles.modal_shadow} onClick={disableModal}>
        <div
          className={styles.Modal_box + ` shadow-lg bg-white rounded-lg h-18`}
        >
          <button className={styles.close_btn} onClick={disableModal}>
            X
          </button>
          <div className={"flex-row space-x-2 flex py-8 "}>
            <p className="cnt">
              <a
                href={window.location.href + shortUrl}
                className={"text-blue-600"}
              >
                {window.location.href + shortUrl}
              </a>
            </p>
            <button
              className="copy_btn w-1/2 flex px-2 py-1 h-15 items-center justify-center rounded-md border border-gray-300 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 text-purple-600"
              onClick={() => {
                addToClipBoard();
              }}
            >
              <p>Copy</p>
              {/* <Image
                src="/copy-svgrepo-com.svg"
                alt="Picture of the author"
                width={"100%"}
                height={"100%"}
              /> */}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const linkSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  console.log({ event: e });
  console.log("closetdfug");
};
/* 
export const getServerSideProps: GetServerSideProps = async (context) => {
  let data;
  try {
    const { db } = await connectDb();
    data = await db.collection("url").findOne({ shortid: "33324" });
    // console.log(data);
    // console.log(db);
  } catch (error) {
    // console.log({ errorzz: error });
    data = null;
  }

  return {
    props: { data: JSON.stringify(data) },
  };
}; */

export default Modal;

/* export const getStaticProps: GetStaticProps = async (context) => {
  let posts = "group";

  // interface ParsedUrlQuery extends NodeJS.Dict<string | string[]> { }
  // type NewType =  ParsedUrlQuery | undefined;

  // const param = context.params?.url;

  return {
    props: { posts },
  };
};
export const getStaticPaths: GetStaticPaths = async () => {
  // let post = "group";
  const lkl = await fetch("http://localhost:3000/api/url");
  const data = await lkl.json();
  const param = data.map((scholarship: { shortid: any }) => {
    return {
      params: {
        url: scholarship.shortid,
      },
    };
  });

  console.log(param);

  return {
    paths: param,
    fallback: false,
    // props:{post}
  };
};
 */
