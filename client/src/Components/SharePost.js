import {
  Button,
  Col,
  Container,
  Row,
  Input,
} from "reactstrap";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { savePost } from "../Features/PostSlice";

const SharePosts = () => {
  const [postMsg, setpostMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.users.user.email);

  const handlePost = async () => {
    // Validate that postMsg is not empty
    if (!postMsg.trim()) {
      alert("Post message is required."); // Display an alert or set an error state
      return; // Exit the function early if validation fails
    }
    const postData = {
      postMsg: postMsg,
      email: email,
    };
    dispatch(savePost(postData)); // Dispatch the savePost thunk from the Posts Slice.
    setpostMsg("");
  };

  return (
    <Container className="mt-5"> {/* إضافة هامش علوي */}
      <Row className="justify-content-center">
        <Col md={8} className="p-4 rounded shadow bg-white">
          <h3 className="text-center text-primary mb-4">Share a Book</h3>
          <Input
            id="share"
            name="share"
            placeholder="Share your Book"
            type="textarea"
            rows="4"
            value={postMsg}
            onChange={(e) => setpostMsg(e.target.value)}
            className="mb-3"
          />
          <div className="text-center">
            <Button color="primary" onClick={() => handlePost()}>
              Share it
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SharePosts;
