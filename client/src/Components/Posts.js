import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getPosts } from "../Features/PostSlice";
import axios from "axios";
import moment from "moment";

const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const totalPosts = posts.length;

  const filteredPosts = posts.filter((post) =>
    post.postMsg.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = async (id) => {
    const newMessage = prompt("Enter the new message:");
    if (newMessage) {
      try {
        await axios.put(`http://localhost:3001/updatePost/${id}`, { postMsg: newMessage });
        alert("Book updated successfully");
        dispatch(getPosts());
      } catch (error) {
        console.error("Error updating book:", error.message);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`http://localhost:3001/deletePost/${id}`);
        alert("Book deleted successfully");
        dispatch(getPosts());
      } catch (error) {
        console.error("Error deleting Books:", error.message);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4" style={{ color: "#333", fontWeight: "bold" }}>
        Manage Books
      </h2>

      {/* شريط البحث */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control"
          style={{ maxWidth: "400px", margin: "0 auto" }}
        />
      </div>

      {/* مجموع المنشورات */}
      <p className="text-center mb-3">
        <strong>Total Books:</strong> {totalPosts}
      </p>

      {/* جدول المنشورات */}
      <div className="table-responsive" style={{ margin: "0 auto", maxWidth: "900px" }}>
        <table className="table table-bordered text-center align-middle">
          <thead className="table-light">
            <tr>
              <th>Email</th>
              <th>Book details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <tr key={post._id}>
                <td>{post.email}</td>
                <td>
                  <p className="text-muted mb-1" style={{ fontSize: "12px" }}>
                    {moment(post.createdAt).fromNow()}
                  </p>
                  {post.postMsg}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEdit(post._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filteredPosts.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center text-muted">
                  No Books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Posts;
