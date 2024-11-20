import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage.jsx';

const useColorMode = () => {
  // State to track color mode, default is 'light'
  const [colorMode, setColorMode] = useLocalStorage('color-theme', 'light');

  useEffect(() => {
    const className = 'dark';
    const bodyClass = window.document.body.classList;

    // Add or remove the 'dark' class based on the current color mode
    if (colorMode === 'dark') {
      bodyClass.add(className);
    } else {
      bodyClass.remove(className);
    }
  }, [colorMode]); // Runs whenever colorMode changes

  return [colorMode, setColorMode];
};

export default useColorMode;
