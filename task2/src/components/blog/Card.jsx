import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import { collection, onSnapshot, deleteDoc, doc, addDoc } from "firebase/firestore";
import { AiOutlineTags} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import "./blog.css";

export const Card = () => {
  const [blogs, setBlogs] = useState([]);
  const [newComment, setNewComment] = useState({}); // Store new comment input for each blog
  const [comments, setComments] = useState({}); // Store existing comments for each blog
  const [showAllComments, setShowAllComments] = useState({}); // Manage visibility of comments
  const navigate = useNavigate();

  // Fetch blogs and comments from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
      const blogData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogData);

      // Fetch comments for each blog
      blogData.forEach((blog) => {
        const commentUnsubscribe = onSnapshot(collection(db, "blogs", blog.id, "comments"), (commentSnapshot) => {
          const blogComments = commentSnapshot.docs.map((doc) => doc.data());
          setComments((prevComments) => ({
            ...prevComments,
            [blog.id]: blogComments,
          }));
        });

        return () => commentUnsubscribe();
      });
    });

    return () => unsubscribe();
  }, []);

  // Handle delete of blog post
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "blogs", id));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  // Handle edit of blog post
  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  // Handle comment change for a specific blog
  const handleCommentChange = (id, value) => {
    setNewComment((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle comment submission for a specific blog
  const handleCommentSubmit = async (blogId) => {
    const commentText = newComment[blogId]?.trim();

    if (commentText) {
      try {
        await addDoc(collection(db, "blogs", blogId, "comments"), {
          text: commentText,
          createdAt: new Date(),
        });

        // Clear the comment input after submission
        setNewComment((prev) => ({
          ...prev,
          [blogId]: "", // Reset the specific blog's comment
        }));
      } catch (error) {
        console.error("Error adding comment: ", error);
      }
    }
  };

  // Toggle visibility of comments for a specific blog
  const toggleShowComments = (blogId) => {
    setShowAllComments((prev) => ({
      ...prev,
      [blogId]: !prev[blogId], // Toggle the visibility for this specific blog's comments
    }));
  };

  return (
    <section className="blog">
      <div className="container grid3">
        {blogs.map((item) => (
          <div className="box boxItems" key={item.id}>
            <div className="img">
              <img src={item.url} alt="" />
            </div>
            <div className="details">
              <div className="tag">
                <AiOutlineTags className="icon" />
                <span>#Blog</span>
              </div>
              <Link to={`/details/${item.id}`} className="link">
                <h3>{item.title}</h3>
              </Link>
              <p>{item.content.slice(0, 180)}...</p>
              <div className="date">
               
                <button className="add-blog-btn" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
                <button className="add-blog-btn" onClick={() => handleEdit(item.id)}>
                  Edit
                </button>
                <Link to={`/details/${item.id}`}>
                  <button className="add-blog-btn">Read More</button>
                </Link>
              </div>

              {/* Comment Section */}
              <div className="comments-section">
                <h4>Comments</h4>

                {/* Comment Input */}
                <div className="comment-input">
                  <textarea
                    value={newComment[item.id] || ""}
                    onChange={(e) => handleCommentChange(item.id, e.target.value)}
                    placeholder="Add a comment..."
                  ></textarea>
                  <button onClick={() => handleCommentSubmit(item.id)}>Submit</button>
                </div>

                {/* Toggle to Show All Comments */}
                <button onClick={() => toggleShowComments(item.id)}>
                  {showAllComments[item.id] ? "Hide All Comments" : "Show All Comments"}
                </button>

                {/* Display Comments */}
                <div className="comments-list">
                  {comments[item.id] && comments[item.id].length > 0 ? (
                    <>
                      {/* Display only the first comment initially */}
                      {!showAllComments[item.id] && comments[item.id][0] && (
                        <div className="comment">
                          <p>{comments[item.id][0].text}</p>
                        </div>
                      )}

                      {/* Display all comments if 'Show All' is clicked */}
                      {showAllComments[item.id] &&
                        comments[item.id].map((comment, index) => (
                          <div className="comment" key={index}>
                            <p>{comment.text}</p>
                          </div>
                        ))}
                    </>
                  ) : (
                    <p>No comments yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
