import React, { useState } from "react";
import { Button, Modal, Checkbox, Label, TextInput } from "flowbite-react";
import loginImage from "../../assets/images/login-and-signup-image.jpg";
import { LOGIN_URL } from "../../constants";
import { headers } from "../../constants";
import Loader from "../../components/Loader";

const Login = ({
  toggleLoginModel,
  toggleRegisterModel,
  openLoginModal,
  updateName,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ email: "", password: "" });

  const [loader, setLoader] = useState(false);

  function onCloseModal() {
    toggleLoginModel();
    setEmail("");
  }

  const formValidation = () => {
    let result = true;

    setError((prev) => {
      return { ...prev, email: "", password: "", name: "" };
    });

    if (!email.includes("@") || !email.includes(".com")) {
      setError((prev) => {
        return { ...prev, email: "Invalid email" };
      });
      result = false;
    }

    if (password.length < 5 || password.length > 15) {
      setError((prev) => {
        return { ...prev, password: "Invalid password" };
      });
      result = false;
    }

    return result;
  };

  const submitForm = async () => {
    setLoader(true);
    const result = formValidation();

    if (result === false) {
      console.log("Returning from result");
      return;
    }

    const payload = JSON.stringify({
      email,
      password,
      appType: "ecommerce",
    });

    const res = await fetch(LOGIN_URL, {
      method: "POST",
      headers,
      body: payload,
    });
    const resJSON = await res.json();

    if (resJSON.status === "success") {
      // updateName(resJSON.data.name);
      // console.log("Json", resJSON.data.name);
      localStorage.setItem("beyoung_token", resJSON.token);
      localStorage.setItem("beyoung_name", resJSON.data.name.toUpperCase());
      setLoader(false);
      updateName(resJSON.data.name);
      toggleLoginModel();
      window.location.reload();
    }

    console.log(resJSON);
  };

  return (
    <>
      <Modal
        dismissible
        show={openLoginModal}
        size="md"
        onClose={onCloseModal}
        popup
      >
        <Modal.Header className="relative">
          <img className="h-48" src={loginImage} alt="" />
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex flex-col">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                LOG IN
              </h3>
              <span className="font-light">
                Get Exciting Offers & Track Order
              </span>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email" />
              </div>
              <TextInput
                id="email"
                value={email}
                shadow
                onChange={(event) => setEmail(event.target.value)}
                required
                color={error.email ? "failure" : "gray"}
                helperText={
                  error.email ? (
                    <>
                      <span className="font-medium">Enter valid email</span>
                    </>
                  ) : (
                    ""
                  )
                }
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput
                id="password"
                type="password"
                shadow
                required
                onChange={(event) => setPassword(event.target.value)}
                color={error.password ? "failure" : "gray"}
                helperText={
                  error.password ? (
                    <>
                      <span className="font-medium">
                        Password should be between 5 and 15 characters
                      </span>
                    </>
                  ) : (
                    ""
                  )
                }
              />
            </div>
            <div>
              <Button className="w-full" onClick={submitForm}>
                LOGIN
              </Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
                onClick={() => {
                  toggleLoginModel();
                  toggleRegisterModel();
                }}
              >
                Create account
              </a>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Login;
