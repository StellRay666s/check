import React from "react";

function useSwitchPhrase() {
  const [isLoad, setIsLoad] = React.useState();

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoad(!isLoad);
    }, 10000);
    setTimeout(() => {
      setIsLoad(!isLoad);
    }, 10000);
  }, [isLoad]);

  return { isLoad };
}

export { useSwitchPhrase };
