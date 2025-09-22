import { IUser } from "@/interfaces/user.inter";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: IUser | null;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    startLoading: (state) => {
      state.isLoading = true;
    },
  },
});

export const { setUser, startLoading } = userSlice.actions;
export default userSlice.reducer;
