import {useState, useEffect, useRef} from 'react';

export default function useComponentVisible(initialVisible: boolean) {
  const [isComponentVisible, setIsComponentVisible] = useState<boolean>(initialVisible);
  const ref = useRef<any>(null);

  const handleClickOutside = (event: MouseEvent): any => {
    if (ref.current && !(ref.current as any).contains(event.target as Node)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, isComponentVisible, setIsComponentVisible };
}