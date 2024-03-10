import { useEffect } from "react";

// 要素の外側クリックでコールバックを実行
export const useOutsideClick = (
  ref: React.MutableRefObject<HTMLElement | null>,
  callback: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
};
