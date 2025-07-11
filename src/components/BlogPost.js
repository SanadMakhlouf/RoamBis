import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles/BlogPost.css";

function BlogPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("BlogPost component mounted with ID:", id);
    fetchBlogPost();
  }, [id]);

  const fetchBlogPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("bearerToken");

      console.log("Fetching blog post with ID:", id);
      const response = await fetch(`http://127.0.0.1:8000/api/blogs/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: token,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error Response:", errorData);
        throw new Error(errorData.message || "Failed to fetch blog post");
      }

      const result = await response.json();
      console.log("Fetched blog post data:", result);
      setPost(result.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching blog post:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="blog-post-container">
        <div className="loading">Loading article...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-post-container">
        <div className="error-message">{error}</div>
        <button className="back-button" onClick={() => navigate("/blog")}>
          Retour aux articles
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-post-container">
        <div className="error-message">Article non trouvé</div>
        <button className="back-button" onClick={() => navigate("/blog")}>
          Retour aux articles
        </button>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <button className="back-button" onClick={() => navigate("/blog")}>
        <i className="fas fa-arrow-left"></i> Retour aux articles
      </button>

      <article className="blog-post">
        <div className="blog-post-header">
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <span className="date">
              <i className="fas fa-calendar"></i>{" "}
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {post.featured_image && (
          <div className="blog-post-image">
            <img src={post.featured_image} alt={post.title} />
          </div>
        )}

        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}

export default BlogPost;
