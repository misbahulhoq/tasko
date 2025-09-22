import { useFetchUser } from "@/hooks/user.hook";

const UserProvider = () => {
  useFetchUser();
  return null;
};

export default UserProvider;
