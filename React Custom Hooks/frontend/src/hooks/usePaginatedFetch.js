// frontend/src/hooks/usePaginatedFetch.js
import { useState, useEffect, useCallback } from "react";

/**
 * usePaginatedFetch(baseUrl, initialPage = 1, limit = 8)
 * baseUrl: e.g. "/api/products" (we append ?page=...&limit=...)
 */
const usePaginatedFetch = (baseUrl, initialPage = 1, limit = 8) => {
  const [data, setData] = useState([]);        // accumulated items
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true); // whether next page likely has items

  const fetchPage = useCallback(async (p) => {
    setLoading(true);
    setError(null);
    try {
      const url = `${baseUrl}?page=${p}&limit=${limit}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      const json = await res.json();

      // If returned list is shorter than limit, assume no more pages
      if (!Array.isArray(json)) throw new Error("Invalid response format");
      setData(prev => (p === initialPage ? json : [...prev, ...json]));
      setHasMore(json.length >= limit);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [baseUrl, limit, initialPage]);

  // load initial page or when baseUrl changes
  useEffect(() => {
    setData([]);
    setPage(initialPage);
    setHasMore(true);
    fetchPage(initialPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl, initialPage, fetchPage]);

  // when page increments, fetch that page (but skip initial page re-fetch since handled above)
  useEffect(() => {
    if (page === initialPage) return;
    fetchPage(page);
  }, [page, fetchPage, initialPage]);

  const loadMore = () => setPage(p => p + 1);
  const reset = () => { setData([]); setPage(initialPage); setHasMore(true); };

  return { data, loading, error, hasMore, loadMore, reset };
};

export default usePaginatedFetch;
