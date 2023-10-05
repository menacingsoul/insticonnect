// utils/useApi.js

import { useState, useEffect } from 'react';
import config from './config';

const useApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url, options = {}) => {
    try {
      setLoading(true);
      const response = await fetch(`${config.apiUrl}${url}`, options);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setData(responseData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useApi;
