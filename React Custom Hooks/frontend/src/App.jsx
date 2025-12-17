// frontend/src/App.jsx
import React from "react";
import usePaginatedFetch from "./hooks/usePaginatedFetch";
import "./App.css";

const API_URL = "/api/products"; // Vite proxy -> backend

function App() {
  const { data: products, loading, error, hasMore, loadMore } = usePaginatedFetch(API_URL, 1, 8);

  return (
    <div className="app">
      <header className="header">
        <h1>Task 5 – React Custom Hook (MERN)</h1>
        <p>Data fetched from our own Express + MongoDB API using paginated useFetch</p>
      </header>

      {error && <div className="info error">Error: {error}</div>}
      <div className="grid">
        {products.map((item) => (
          <div className="card" key={item._id || item.id || item.title}>
            <div className="image-wrapper">
              <img src={item.image} alt={item.title} />
            </div>
            <h3 className="title">{item.title}</h3>
            <p className="category">{item.category}</p>
            <p className="price">₹ {item.price}</p>
          </div>
        ))}
      </div>

      {loading && <div className="info">Loading...</div>}

      <div style={{ textAlign: "center", marginTop: 16 }}>
        {hasMore && !loading && (
          <button className="btn" onClick={loadMore}>Load more</button>
        )}
        {!hasMore && <div className="info">No more items</div>}
      </div>
    </div>
  );
}

export default App;
