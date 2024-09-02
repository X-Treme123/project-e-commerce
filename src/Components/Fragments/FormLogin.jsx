import InputForm from "../Elements/Input";
import Button from "../Elements/Button/Button";
import { useEffect, useRef, useState } from "react";
import login from "../../Services/auth.service";

const FormLogin = () => {
  const [loginfailed, setLoginFailed] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    // localStorage.setItem("username", e.target.username.value)
    // localStorage.setItem("password", e.target.password.value)
    login(data, (status, res) => {
      if (status) {
        localStorage.setItem("token", res);
        window.location.href = "/products";
      } else {
        console.log(res)
        setLoginFailed("username or password is incorrect");
      }
    });
  };

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
      <form onSubmit={handleLogin}>
        <InputForm
          type="text"
          placeholder="Username"
          label="Username"
          name="username"
          ref={usernameRef}
        />
        <InputForm
          type="password"
          placeholder="*****"
          label="Password"
          name="password"
        />
        <Button classname="bg-green-500 w-full text-white" type="submit">
          Login
        </Button>
        {loginfailed && (
          <p className="text-red-500 font-bold mt-1 absolute">{loginfailed}</p>
        )}
      </form>
  );
};

export default FormLogin;
