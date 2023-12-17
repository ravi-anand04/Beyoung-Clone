import React, { useState } from "react";
import { Button, Modal, Checkbox, Label, TextInput } from "flowbite-react";
import loginImage from "../../assets/images/login-and-signup-image.jpg";

const Register = ({openRegisterModal, toggleRegisterModel}) => {
  const [email, setEmail] = useState("");

  function onCloseModal() {
    toggleRegisterModel();
    setEmail("");
  }
  return (
    <>
      <Modal
        dismissible
        show={openRegisterModal}
        size="md"
        onClose={onCloseModal}
        popup
      >
        <Modal.Header>
          <img className="h-48" src={loginImage} alt="" />
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-2">
            <div className="flex flex-col">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                SIGN UP
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
                placeholder="name@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput id="name" type="text" required />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password" />
              </div>
              <TextInput id="password" type="password" required />
            </div>
            <div className="flex justify-between"></div>
            <div>
              <Button className="w-full">REGISTER</Button>
            </div>
            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
              Already registered?&nbsp;
              <a
                href="#"
                className="text-cyan-700 hover:underline dark:text-cyan-500"
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

export default Register;
