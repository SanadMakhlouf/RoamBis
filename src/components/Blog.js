import React from "react";
import "./styles/Blog.css";

// Mock data pour simuler des posts Instagram
const blogPosts = [
  {
    id: 1,
    image: "https://picsum.photos/400/400?random=1",
    title: "Explorer Paris avec une eSIM",
    description:
      "Découvrez comment rester connecté dans la ville lumière avec notre eSIM. Partagez vos moments magiques instantanément ! 🗼✨ #Paris #eSIM #Voyage",
    likes: 234,
    date: "2024-03-15",
  },
  {
    id: 2,
    image: "https://picsum.photos/400/400?random=2",
    title: "Guide eSIM pour l'Asie",
    description:
      "Tout ce que vous devez savoir sur l'utilisation des eSIM en Asie. Restez connecté pendant votre aventure ! 🌏📱 #Asie #Voyage #Digital",
    likes: 189,
    date: "2024-03-12",
  },
  {
    id: 3,
    image: "https://picsum.photos/400/400?random=3",
    title: "Travailler à distance avec eSIM",
    description:
      "Les nomades digitaux adorent nos eSIM ! Découvrez pourquoi c'est la solution parfaite pour le travail à distance. 💻🌍 #NomadeDigital #Remote",
    likes: 456,
    date: "2024-03-10",
  },
  {
    id: 4,
    image: "https://picsum.photos/400/400?random=4",
    title: "eSIM vs Carte SIM physique",
    description:
      "Comparaison détaillée entre eSIM et carte SIM traditionnelle. Faites le choix intelligent ! 📱💡 #Tech #Innovation #Mobile",
    likes: 321,
    date: "2024-03-08",
  },
  {
    id: 5,
    image: "https://picsum.photos/400/400?random=5",
    title: "Économiser en voyage avec eSIM",
    description:
      "Astuces pour réduire vos coûts de communication en voyage grâce à l'eSIM. 💰✈️ #Économies #VoyageMalin",
    likes: 567,
    date: "2024-03-05",
  },
  {
    id: 6,
    image: "https://picsum.photos/400/400?random=6",
    title: "eSIM pour le voyage d'affaires",
    description:
      "Solutions professionnelles pour rester connecté lors de vos déplacements d'affaires. 👔✈️ #Business #Professionnel",
    likes: 289,
    date: "2024-03-01",
  },
];

function Blog() {
  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1>Notre Blog</h1>
        <p>
          Découvrez nos derniers articles et actualités sur les eSIM et le
          voyage
        </p>
      </div>

      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-card">
            <div className="blog-card-image">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="blog-card-content">
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              <div className="blog-card-footer">
                <div className="blog-card-stats">
                  <span className="likes">
                    <i className="fas fa-heart"></i> {post.likes}
                  </span>
                  <span className="date">
                    <i className="fas fa-calendar"></i>{" "}
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <button className="read-more">Lire plus</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
