import { BrowserRouter } from "react-router";
import Content from "../Content/Content";
import Header from "../Header/Header";
import "./App.scss";
import { useEffect } from "react";
import { checkAuthAsync } from "../../store/features/auth";
import { useAppDispatch } from "../../store/hooks";

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
