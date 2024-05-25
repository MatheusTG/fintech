import React from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(
  url: RequestInfo | URL,
  options?: RequestInit | undefined
): FetchState<T> {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const optionsRef = React.useRef(options);
  optionsRef.current = options;

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    async function fetchData() {
      let json;
      try {
        setError(null);
        setLoading(true);
        setData(null);
        const response = await fetch(url, {
          ...optionsRef.current,
          signal,
        });
        json = await response.json();
        console.log(json);
      } catch (error) {
        json = null;
        if (error instanceof Error) setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
        setData(json);
      }
    }
    fetchData();

    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
