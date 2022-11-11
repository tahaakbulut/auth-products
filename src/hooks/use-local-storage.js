import { useEffect, useState } from 'react';

const useLocalStorage = (key, defaultVal) => {
  const [value, setValue] = useState(() => {
    const json = localStorage.getItem(key);
    if (json != null) return JSON.parse(json);
    if (typeof defaultVal == 'function') {
      return defaultVal();
    } else {
      return defaultVal;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
