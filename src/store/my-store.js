import { create } from "zustand";
import api from "../api/api";

const useAuthStore = create(() => {
  const ls_string = localStorage.getItem("auth");

  if (!ls_string) {
    return {
      token: "",
      user: null,
    };
  }

  const ls = JSON.parse(ls_string);

  api.defaults.headers.Authorization = `Bearer ${ls.token}`;

  return {
    token: ls.token,
    user: ls.user,
  };
});

export default useAuthStore;
