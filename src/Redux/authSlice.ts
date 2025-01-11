"use client";
import { ID } from "@/types/global";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuthState {
	authState: boolean;
	userID: ID;
	userName: string;
	email: string;
	number: string;
	gender?: string;
	state?: string;
	city?: string;
	interestedCourse?: string;
	token: string;
}

const initialState: IAuthState = {
	authState: false,
	userID: null,
	userName: "",
	email: "",
	number: "",
	gender: "",
	state: "",
	city: "",
	interestedCourse: "",
	token: "",
};

let clearSessionTimer: NodeJS.Timeout | null = null;

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthState: (state, action: PayloadAction<IAuthState>) => {
			state.authState = action.payload.authState;
			state.userID = action.payload.userID;
			state.userName = action.payload.userName;
			state.email = action.payload.email;
			state.number = action.payload.number;
			state.gender = action.payload.gender;
			state.state = action.payload.state;
			state.city = action.payload.city;
			state.interestedCourse = action.payload.interestedCourse;
			state.token = action.payload.token;

			if (clearSessionTimer) {
				clearTimeout(clearSessionTimer);
			}
			clearSessionTimer = setTimeout(() => {
				clearSession();
			}, 60 * 60 * 1000);
		},
		clearAuthState: (state) => {
			state.authState = false;
			state.userID = null;
			state.userName = "";
			state.email = "";
			state.number = "";
			state.interestedCourse = "";
			state.state = "";
			state.city = "";
			state.gender = "";
			state.token = "";
			clearSession();
		},
	},
});

export const { setAuthState, clearAuthState } = authSlice.actions;

const clearSession = () => {
	localStorage.removeItem("persist:auth");
	localStorage.clear();
	clearSessionTimer = null;
};

export const authReducer = authSlice.reducer;
