import { useEffect, useRef } from "react";

// Stateの直前の値を保持するカスタムhook
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const usePrevious = (value: any) => {
  const ref = useRef(null);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ref.current = value;
  }, [value]);
  return ref.current;
};
