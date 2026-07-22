import React from "react";

const useLoading = () => {
  const [loadingStates, setLoadingStates] = React.useState({});

  const startLoading = (key) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [key]: true,
    }));
  };

  const stopLoading = (key) => {
    setLoadingStates((prevLoadingStates) => ({
      ...prevLoadingStates,
      [key]: false,
    }));
  };

  return {
    loadingStates,
    startLoading,
    stopLoading,
  };
};

export default useLoading;
