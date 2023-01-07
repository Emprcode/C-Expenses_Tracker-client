import React, { useRef } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { CustomField } from "../components/customField/CustomField";
import { MainLayout } from "../components/mainLayout/MainLayout";
import { loginUser } from "../helpers/axiosHelpers";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const emailRef = useRef("");
  const pinRef = useRef("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const loginObj = {
      email: emailRef.current.value,
      pin: pinRef.current.value,
    };
    const { status, message, result } = await loginUser(loginObj);
    toast[status](message);

    if (status === "success" && result?._id) {
      sessionStorage.setItem("user", JSON.stringify(result));
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/dashboard");
    }
  };

  const fields = [
    {
      label: "Email",
      placeholder: "sam@emial.com",
      name: "email",
      type: "email",
      required: true,
      forwaredref: emailRef,
    },
    {
      label: "Pin",
      placeholder: "*******",
      name: "pin",
      type: "password",
      required: true,
      forwaredref: pinRef,
    },
  ];
  return (
    <MainLayout>
      <Container className="mt-5 pt-5">
        <Row className="login-page shadow-lg ">
          <Col className="bg-primary d-none d-md-flex  direction-column justify-content-center align-items-center ">
            <div className="info  text-white p-2 pt-5 ">
              <h1>Welcome Back!</h1>
              <p className="mt-5">
                Login to your account and mange your financial by tracking daily
                transaction
              </p>
            </div>
          </Col>
          <Col className="p-5 ">
            <div className="form">
              <h2 className="text-primary">
                <i class="fa-solid fa-file-pen"></i> Login
              </h2>
              <hr />
              <Form onSubmit={handleOnSubmit}>
                {fields.map((item, i) => (
                  <CustomField key={i} {...item} />
                ))}
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </div>
              </Form>
              <div className="text-end mt-5">
                New Here? <Link to="/register">Register Now</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </MainLayout>
  );
};

export default Login;
