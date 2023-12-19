import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InitialState, User } from "./interfaces";

const initialState: InitialState = {
  isEditing: false,
  users: [],
  list: [],
  draftUser: {
    draftId: 0,
    user: {
      userId: 0,
      name: "",
      surname: "",
      age: "",
      city: "",
    },
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers: (state, { payload }: PayloadAction<User[]>) => {
      state.users = payload;
    },
    updateUser: (
      state,
      { payload }: PayloadAction<{ draftId: number; user: User }>
    ) => {
      state.list[payload.draftId][payload.user.userId] = payload.user;
    },
    setEditingTo: (state, { payload }: PayloadAction<boolean>) => {
      state.isEditing = payload;
    },
    copyUsers: (state) => {
      const copied: User[] = JSON.parse(JSON.stringify(state.users));
      state.list.push(copied);
    },
    makeDraft: (
      state,
      { payload }: PayloadAction<InitialState["draftUser"]>
    ) => {
      state.draftUser = payload;
    },
    editDraft: (
      state,
      {
        payload,
      }: PayloadAction<{
        userId: number;
        draftId?: number;
        name: string;
        value: string;
      }>
    ) => {
      if (payload.draftId !== undefined) {
        state.list[payload.draftId][payload.userId][payload.name] =
          payload.value;
      } else {
        state.users[payload.userId][payload.name] = payload.value;
      }
    },
    deleteUser: (
      state,
      { payload }: PayloadAction<{ draftId: number; userId: number }>
    ) => {
      const excluded = state.list[payload.draftId].filter(
        (user) => user.userId !== payload.userId
      );
      state.list[payload.draftId] = excluded;
    },
    deleteTable: (state) => {
      state.list.pop();
    },
  },
});

export const {
  setUsers,
  setEditingTo,
  updateUser,
  editDraft,
  makeDraft,
  copyUsers,
  deleteUser,
  deleteTable,
} = userSlice.actions;
