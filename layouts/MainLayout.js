import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/header";
import Footer from "../components/footer";
import { setUser } from "../redux/slices/userSlice";
import { fetchMatches, fetchMatchesHockey } from "../redux/slices/matchesSlice";

import axios from "axios";
import { axiosClient } from "../axiosClient";
import { fetchLeagues } from "../redux/slices/leagueSlice";
export const MainLayout = ({
  children,
  title = "Title",
  charSet = "utf-8",
  description = "description",
  keyWords = "keyWords",
  viewport = "width=device-width, initial-scale=1",
}) => {
  const token = typeof window !== "undefined" && localStorage.getItem("token");
  const isAuth = useSelector((state) => state.user.isAuth);
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
    getMe();
    dispatch(fetchMatches())
  }, [isAuth]);


  React.useEffect(() => {
    dispatch(fetchLeagues())
    dispatch(fetchMatchesHockey())
  }, [])
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
