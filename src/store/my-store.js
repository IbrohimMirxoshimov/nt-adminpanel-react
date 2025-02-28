import { create } from "zustand";

const useAuthStore = create(() => {
  const ls_string = localStorage.getItem("auth");

  if (!ls_string) {
    return {
      token: "",
      user: null,
    };
  }

  const ls = JSON.parse(ls_string);

  return {
    token: ls.token,
    user: ls.user,
  };
});

export default useAuthStore;
