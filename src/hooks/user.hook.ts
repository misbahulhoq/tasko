import { IUser } from "@/interfaces/user.inter";
import { useGetUserInfoMutation } from "@/redux/features/auth/authApiSlice";
import { useEffect, useState } from "react";

export const useGetUser = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [getUserInfo, { isLoading }] = useGetUserInfoMutation();
  useEffect(() => {
    getUserInfo()
      .unwrap()
      .then((res) => {
        setUser(res?.data);
      })
      .catch((err) => console.log(err));
  }, [getUserInfo]);

  return { user, isLoading };
};
