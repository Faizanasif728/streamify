import axios from 'axios';
import { useEffect, useState } from 'react';

import { useContentStore } from '../store/content.store';

const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState(null);
  const { contentType } = useContentStore();

  useEffect(() => {
    // Fetch trending content based on the current content type
    const getTrendingContent = async () => {
      const BASE_URL = import.meta.env.DEV
        ? import.meta.env.VITE_API_URL_LOCAL
        : import.meta.env.VITE_API_URL_PRODUCTION;
      const res = await axios.get(`${BASE_URL}/${contentType}/trending`);
      setTrendingContent(res.data.content);
    };

    getTrendingContent();
  }, [contentType]);

  return { trendingContent };
};

export default useGetTrendingContent;
