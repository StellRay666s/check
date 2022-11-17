import { useSelector } from "react-redux";

function useGetToTheMatch() {
  const tariffs = useSelector((state) => state.user.user.tariffs);
  const isAuth = useSelector((state) => state.user.isAuth);

  return function getToTheMatch() {
    if (tariffs === 0) {
      return "/match-premium";
    }
    if (tariffs === 1) {
      return "/match-partner";
    }
    if (tariffs === 2 || isAuth === false) {
      return "/match";
    }
  };
}

export { useGetToTheMatch };
