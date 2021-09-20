import Head from "next/head";
import React from "react";
import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(() => import("../components/modal"), {
  ssr: false,
});

interface HomeProps {}
type urlInput = string;

interface HomeStateProps {
  urlState: string;
  showModal: boolean;
  shortCode: string;
}

const Home: React.FC<HomeProps> = () => {
  const [{ urlState, showModal, shortCode }, seturlState] =
    React.useState<HomeStateProps>({
      urlState: "",
      showModal: false,
      shortCode: "",
    });

  const urlInputFn = (value: urlInput) => {
    seturlState((_) => ({ ..._, urlState: value }));
  };

  /* submit link form */
  const linkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const getLink = fetch("/api/shorten_link", {
      method: "POST",
      body: JSON.stringify({ link: urlState }),
    });
    const data = await (await getLink).json();
    seturlState((_) => ({ ..._, shortCode: data.shortid }));
    seturlState((_) => ({ ..._, showModal: true }));
  };

  const disableModal = async () => {
    seturlState((_) => ({ ..._, showModal: false }));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Nexturl --link shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full flex flex-col justify-center items-center">
        <h1 className="text-2xl font-headline tracking-wider text-gray-600 font-semibold flex items-center justify-center rounded-lg py-2 px-3 mb-2 my-2">
          NextUrl Shortner
        </h1>

        <form action="" onSubmit={linkSubmit}>
          <div className="inputField mt-2">
            <input
              type="text"
              className="linkInput rounded-md border border-gray-300 py-1.5 px-1 mx-2"
              placeholder="https://my-link.com/name=?id-linker/lorem-lipsum/lorem-lipsum"
              value={urlState}
              onChange={(e) => {
                urlInputFn(e.target.value);
              }}
            />
            <button
              type="submit"
              className={
                "rounded-md bg-green-500 font-semibold text-white py-1.5 px-2 border-gray-300"
              }
            >
              Shorten
            </button>
          </div>
        </form>
      </main>
      {showModal ? (
        <DynamicComponentWithNoSSR
          shortUrl={shortCode}
          disableModal={disableModal}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
