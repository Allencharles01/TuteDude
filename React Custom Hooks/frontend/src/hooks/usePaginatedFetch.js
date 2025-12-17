import { useState, useEffect, useCallback } from "react";

const BASE_URL = "https://tutedude-react-hooks.onrender.com";

const usePaginatedFetch = (endpoint, initialPage = 1, limit = 8) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback(async () => {
    if (!endpoint || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${BASE_URL}${endpoint}?page=${page}&limit=${limit}`
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const json = await res.json();

      if (json.length === 0) {
        setHasMore(false);
      } else {
        setData((prev) => [...prev, ...json]);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [endpoint, page, limit, hasMore]);

  useEffect(() => {
    fetchData();
  }, []); // load first page once

  return {
    data,
    loading,
    error,
    loadMore: fetchData,
    hasMore,
  };
};

export default usePaginatedFetch;
