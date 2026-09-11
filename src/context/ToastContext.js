import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

const TOAST_DURATION_MS = 3500;

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);

  const notify = useCallback((text) => {
    clearTimeout(timeoutRef.current);
    setToast({ text, id: Date.now() });
    timeoutRef.current = setTimeout(() => setToast(null), TOAST_DURATION_MS);
  }, []);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <div className="toast-region" role="status" aria-live="polite">
        {toast && (
          <p className="toast" key={toast.id}>
            {toast.text}
          </p>
        )}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
