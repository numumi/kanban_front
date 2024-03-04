import { useEffect, useRef } from "react";

// ref: コンポーネントの参照, callback: 外側をクリックした時に実行する関数
export const useOutsideClick = (ref: any, callback: () => void) => {
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
