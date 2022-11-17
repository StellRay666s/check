import React from "react";

function useTogglePassword() {
  const [passwordShow, setPasswordShow] = React.useState(false);

  function togglePasswordVisiblity() {
    setPasswordShow(!passwordShow);
  }

  return { passwordShow, togglePasswordVisiblity };
}

export { useTogglePassword };
