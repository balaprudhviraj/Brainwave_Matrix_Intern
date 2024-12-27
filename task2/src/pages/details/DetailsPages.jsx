import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { BsPencilSquare } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import "./details.css";
import "../../components/header/header.css";

export const DetailsPages = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const [error, setError] = useState(null); // State to track errors
  const navigate = useNavigate(); // Hook for navigating to other pages

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog(docSnap.data());
        } else {
          setError("Blog not found!");
        }
      } catch (error) {
        setError("Failed to fetch blog details. Please try again.");
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      const docRef = doc(db, "blogs", id);
      await deleteDoc(docRef);
      navigate("/"); // Navigate to home page after deleting the blog
    } catch (error) {
      console.error("Error deleting blog: ", error);
      setError("Failed to delete the blog. Please try again.");
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`); // Navigate to the edit page for the blog
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading message or spinner
  }

  if (error) {
    return <p>{error}</p>; // Show error message if any
  }

  return (
    <>
      {blog ? (
        <section className="singlePage">
          <div className="container">
            <div className="left">
              <img src={blog.url} alt="Blog Cover" />
            </div>
            <div className="right">
              <div className="buttons">
                <button className="button" onClick={handleEdit}>
                  <BsPencilSquare />
                  Edit
                </button>
                <button className="button" onClick={handleDelete}>
                  <AiOutlineDelete />
                  Delete
                </button>
              </div>
              <h1>{blog.title}</h1>
              <p>{blog.content}</p>
              <p><strong>Author:</strong> {blog.author}</p>
            </div>
          </div>
        </section>
      ) : (
        <p>No blog found</p>
      )}
    </>
  );
};
