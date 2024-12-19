import React, { useState, useEffect } from "react";
import logo from "../Images/logo-t.png";
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/UserSlice.js";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (isSuccess) {
      navigate("/");
    }
  }, [user, isError, isSuccess, navigate]);

  const handleLogin = () => {
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <div className="login-page">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={4} className="text-center">
            <img src={logo} alt="Logo" className="login-logo mb-4" />
            <h2 className="text-primary mb-4">Login</h2>
            <Form>
              <FormGroup>
                <Label for="eMail">Email</Label>
                <Input
                  id="eMail"
                  name="eMail"
                  placeholder="Enter email..."
                  type="email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter password..."
                  type="password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </FormGroup>
              <Button color="primary" className="w-100 mt-3" onClick={handleLogin}>
                Login
              </Button>
              <p className="smalltext mt-3">
                No Account? <Link to="/register">Sign Up</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
