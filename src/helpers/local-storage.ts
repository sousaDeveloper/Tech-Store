const safeLocalStorage = () => {
  return typeof window !== "undefined" ? window.localStorage : undefined;
};

export default safeLocalStorage;
