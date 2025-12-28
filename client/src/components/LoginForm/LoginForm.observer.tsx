import { useEffect } from "react";
import { resetError } from "@store/features/auth";
import { LoginCredentials } from "@store/features/types/auth.types";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useFormikContext } from "formik";

const LoginFormObserver = (): null => {
  const dispatch = useAppDispatch();
  const { values } = useFormikContext<LoginCredentials>();
  const { error } = useAppSelector((store) => store.auth);

  useEffect(() => {
    if (error) {
      dispatch(resetError());
    }
  }, [values, dispatch]);

  return null;
};

export default LoginFormObserver;
