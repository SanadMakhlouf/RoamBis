import React, { useState, useEffect } from "react";
import "./styles/Blog.css";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalError, setModalError] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("bearerToken");

      const response = await fetch(
        `http://127.0.0.1:8000/api/blogs?page=${currentPage}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: token,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const result = await response.json();
      console.log("API Response for blogs list:", result);
      setBlogs(result.data);
      setPagination(result.meta);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReadMore = (post) => {
    setModalLoading(true);
    setSelectedBlog(post);
    setModalLoading(false);
  };

  const handleCloseModal = () => {
    setSelectedBlog(null);
    setModalError(null);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination?.last_page) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return (
      <div className="blog-container">
        <div className="loading">Loading blogs...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>Notre Blog</h1>
        <p>
          Découvrez nos derniers articles et actualités sur les eSIM et le
          voyage
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="no-blogs">
          <p>Aucun article de blog disponible pour le moment.</p>
        </div>
      ) : (
        <>
          <div className="blog-grid">
            {blogs.map((post) => (
              <div key={post.id} className="blog-card">
                <div className="blog-card-image">
                  <img
                    src={post.featured_image || "https://picsum.photos/400/400"}
                    alt={post.title}
                  />
                </div>
                <div className="blog-card-content">
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <div className="blog-card-footer">
                    <div className="blog-card-stats">
                      <span className="date">
                        <i className="fas fa-calendar"></i>{" "}
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      className="read-more"
                      onClick={() => handleReadMore(post)}
                    >
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pagination && pagination.last_page > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left"></i> Previous
              </button>

              <div className="pagination-numbers">
                {pagination.links.map((link, index) => {
                  if (index === 0 || index === pagination.links.length - 1)
                    return null;

                  return (
                    <button
                      key={index}
                      className={`pagination-number ${
                        link.active ? "active" : ""
                      }`}
                      onClick={() => handlePageChange(parseInt(link.label))}
                      disabled={link.active}
                    >
                      {link.label}
                    </button>
                  );
                })}
              </div>

              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pagination.last_page}
              >
                Next <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          )}
        </>
      )}

      {/* Blog Post Modal */}
      {(selectedBlog || modalLoading) && (
        <div className="blog-modal-overlay" onClick={handleCloseModal}>
          <div className="blog-modal" onClick={(e) => e.stopPropagation()}>
            {modalLoading ? (
              <div className="modal-loading">Loading article...</div>
            ) : modalError ? (
              <div className="modal-error">
                <p>{modalError}</p>
                <button className="modal-close" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            ) : (
              selectedBlog && (
                <>
                  <button className="modal-close" onClick={handleCloseModal}>
                    <i className="fas fa-times"></i>
                  </button>
                  <div className="modal-content">
                    {/* Title */}
                    <h1 className="modal-title">{selectedBlog.title}</h1>

                    {/* Meta information */}
                    <div className="modal-meta">
                      <span className="date">
                        <i className="fas fa-calendar"></i>{" "}
                        {new Date(selectedBlog.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Description - Short introduction */}
                    <div className="modal-description">
                      <p>{selectedBlog.description}</p>
                    </div>

                    {/* Featured Image */}
                    {selectedBlog.featured_image && (
                      <div className="modal-image">
                        <img
                          src={selectedBlog.featured_image}
                          alt={selectedBlog.title}
                        />
                      </div>
                    )}

                    {/* Excerpt - Preview of the content */}
                    {selectedBlog.excerpt && (
                      <div className="modal-excerpt">
                        <p>
                          <em>{selectedBlog.excerpt}</em>
                        </p>
                      </div>
                    )}

                    {/* Main Content */}
                    <div className="modal-body">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: selectedBlog.content,
                        }}
                      />
                    </div>
                  </div>
                </>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Blog;
