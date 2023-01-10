import React from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import Header from "../components/header";
import Footer from "../components/footer";
import { setUser } from "../redux/slices/userSlice";

import { axiosClient } from "../axiosClient";
import { fetchPrewMatch } from "../redux/slices/prevMatchesSlice";
export const MainLayout = ({
  children,
  title = "Title",
  charSet = "utf-8",
  description = "description",
  keyWords = "keyWords",
  viewport = "width=device-width, initial-scale=1",
}) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const dispatch = useDispatch();

  async function getMe() {
    if (token) {
      const response = await axiosClient.get(`${process.env.URL}/getMe`, {
        headers: {
          authorization: token,
        },
      });

      if (response.status === 200) {
        dispatch(setUser(response.data));
      }
    }
  }

  React.useEffect(() => {
    if (token) {
      getMe();
    }
  }, []);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keyWords} />
        <meta name="description" content={description} />
        <meta name="viewport" content={viewport} />
        <meta charSet={charSet} />
      </Head>
      <Header />
      {!children ? (
        <Loader
          type="Rings"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      ) : (
        children
      )}
      <Footer />
    </>
  );
};
