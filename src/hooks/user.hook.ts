import { useGetUserInfoMutation } from "@/redux/features/auth/authApiSlice";
import { useEffect } from "react";
import { useAppDispatch } from "./redux.hook";
import { setUser } from "@/redux/store/userSlice";

export const useFetchUser = () => {
  const dispatch = useAppDispatch();
  const [getUserInfo] = useGetUserInfoMutation();
  useEffect(() => {
    function fetchUser() {
      getUserInfo()
        .unwrap()
        .then((res) => {
          dispatch(setUser(res?.data));
        })
        .catch((err) => {
          dispatch(setUser(null));
        });
    }

    fetchUser();
  }, [dispatch, getUserInfo]);
};
