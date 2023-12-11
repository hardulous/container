import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const hostSlice = createSlice({
  name: "host",
  initialState,
  reducers: {
    fromChild: (state, action) => {
      console.log("Incomming Data From Child");
      state[action.payload.name] = action.payload.data;
    },
  },
});

export default hostSlice;
export const { fromChild } = hostSlice.actions;
