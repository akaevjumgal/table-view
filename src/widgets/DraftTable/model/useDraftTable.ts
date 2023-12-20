import { useAppDispatch, useAppSelector } from "@/app/providers/store";
import {
  USER_CREATION_SCHEMA,
  User,
  updateUser,
  setEditingTo,
  setUsers,
  copyUsers,
  deleteTable,
  makeDraft,
} from "@/entities/User";
import { useFormik } from "formik";
import { useEffect } from "react";

export const useDraftTable = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const userList = useAppSelector((state) => state.user.list);
  const isEditing = useAppSelector((state) => state.user.isEditing);
  const { draftId, ...draftUser } = useAppSelector(
    (state) => state.user.draftUser
  );

  useEffect(() => {
    const seed = Array.from(Array(10), (_, idx) => ({
      userId: idx,
      name: "",
      surname: "",
      age: "",
      city: "",
    }));
    dispatch(setUsers(seed));
  }, []);

  const form = useFormik<User>({
    initialValues: draftUser.user,
    validationSchema: USER_CREATION_SCHEMA,
    enableReinitialize: true,
    onSubmit(values, { resetForm }) {
      dispatch(updateUser({ draftId, user: values }));
      dispatch(setEditingTo(false));
      resetForm();
    },
  });

  const closeEditModal = () => {
    dispatch(
      makeDraft({
        draftId,
        user: {
          userId: draftUser.user.userId,
          name: "",
          surname: "",
          age: "",
          city: "",
        },
      })
    );
    form.resetForm();
    dispatch(setEditingTo(false));
  };

  const makeCopy = () => {
    dispatch(copyUsers());
  };

  const deleteLastTable = () => {
    dispatch(deleteTable());
  };

  return {
    form,
    users,
    userList,
    isEditing,
    closeEditModal,
    makeCopy,
    deleteLastTable,
  };
};
