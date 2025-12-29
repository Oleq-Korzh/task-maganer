import { useEffect } from "react";
import { BrowserRouter } from "react-router";
import { checkAuthAsync } from "@store/features/auth/auth";
import { getUsersAsync } from "@store/features/users/users";
import { useAppDispatch } from "@store/hooks";

import Content from "../Content/Content";
import Header from "../Header/Header";

import "./App.scss";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAsync());
    dispatch(getUsersAsync());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Content />
      </BrowserRouter>
    </>
  );
};

export default App;
