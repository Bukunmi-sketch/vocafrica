import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const usePreventBackNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = () => {
      navigate(1); // Force forward navigation
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);
};

export default usePreventBackNavigation;
