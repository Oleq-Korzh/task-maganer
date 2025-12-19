import { useEffect } from "react";
import { BrowserRouter } from "react-router";

import { checkAuthAsync } from "../../store/features/auth";
import { useAppDispatch } from "../../store/hooks";
import Content from "../Content/Content";
import Header from "../Header/Header";

import "./App.scss";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Content />
      </BrowserRouter>
    </>
  );
}

export default App;
