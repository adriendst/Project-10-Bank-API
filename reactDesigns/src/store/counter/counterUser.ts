import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../../User/User";

export const emptyUser = {
    createdAt: "",
    updatedAt: "",
    email: "",
    firstName: "",
    lastName: "",
    id: "",
};

// Define a type for the slice state
interface userState {
    token: string;
    user: User;
}

// Define the initial state using that type
const initialState: userState = {
    token: "",
    user: emptyUser,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        signOut: (state) => {
            state.token = initialState.token;
            state.user = initialState.user;
        },
    },
});

export const { setToken, setUser, signOut } = userSlice.actions;

/* // Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value; */

export default userSlice.reducer;
