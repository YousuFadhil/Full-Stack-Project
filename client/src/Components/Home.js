//import logo from "../Images/logo-t.png";

import Posts from "./Posts";
import SharePosts from "./SharePost";

import { Container, Row, Col } from "reactstrap"; //import the Reactstrap Components

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();

  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email]);

  return (
    <>
      <Row>
        <Col md={12}>
          <SharePosts />
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Posts />
        </Col>
      </Row>
    </>
  );
};

export default Home;
