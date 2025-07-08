import { useEffect, useState } from 'react';
import axios from 'axios';

import Slider from './Slider';
import CategoryCard from './CategoryCard';
import { useContentStore } from '../store/content.store.js';

const Category = ({ category }) => {
  const [content, setContent] = useState([]);
  const { contentType } = useContentStore();
  const formattedContentType = contentType === 'movie' ? 'Movies' : 'TV Shows';
  const formattedCategoryName = category.replaceAll('_', ' ')[0].toUpperCase() + category.replaceAll('_', ' ').slice(1);

  const categoryTitle = `${formattedCategoryName} ${formattedContentType}`;

  const BASE_URL = import.meta.env.DEV
    ? import.meta.env.VITE_API_URL_LOCAL
    : import.meta.env.VITE_API_URL_PRODUCTION;

  useEffect(() => {
    // Fetch content based on category and set it in the content store
    const getContent = async () => {
      const res = await axios.get(`${BASE_URL}/${contentType}/${category}`);
      setContent(res.data.content);
    };
    getContent();
  }, [category, contentType]);

  return (
    <Slider title={categoryTitle}>
      {content?.map((item) => (!item.backdrop_path ? null : <CategoryCard key={item.id} item={item} />))}
    </Slider>
  );
};

export default Category;
