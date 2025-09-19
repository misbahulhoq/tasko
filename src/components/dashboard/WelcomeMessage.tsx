import { IUser } from "@/interfaces/user.inter";
import React from "react";

const WelcomeMessage = ({
  user,
  isLoading,
}: {
  user: IUser | null;
  isLoading: boolean;
}) => {
  if (isLoading || !user) {
    return <div className="pt-15"></div>;
  }
  return (
    <div>
      <h3 className="text-primary text-2xl font-semibold">Hi, {user?.name}</h3>
      <h2 className="pt-2 text-4xl font-semibold text-white">
        Welcome to Dashboard
      </h2>
    </div>
  );
};

export default WelcomeMessage;
