import { useEffect, useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // State to store the value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get the stored value from localStorage
      const item = window.localStorage.getItem(key);
      // Parse the JSON or return the initial value if none exists
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Effect to update localStorage whenever the value changes
  useEffect(() => {
    try {
      // Save the value to localStorage
      const valueToStore =
        typeof storedValue === 'function' ? storedValue(storedValue) : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
