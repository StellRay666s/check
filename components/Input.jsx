import React from "react";

function Input({
  togglePasswordVisiblity,
  passwordShow,
  type,
  placeholder,
  value,
  setValue,
}) {
  return (
    <div className="auth-item position-relative">
      <input
        value={value}
        type={
          type != "password"
            ? type
            : "password" && passwordShow
            ? "text"
            : "password"
        }
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
      />
      {type != "password" ? (
        ""
      ) : (
        <span
          role="button"
          onClick={togglePasswordVisiblity}
          className={`toggle-vis d-flex align-items-center justify-content-center position-absolute`}
        >
          {passwordShow ? (
            <img src="../images/hide.svg" alt="" />
          ) : (
            <img src="../images/show.svg" alt="" />
          )}
        </span>
      )}
    </div>
  );
}

export default Input;
