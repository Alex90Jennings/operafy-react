import { useEffect } from 'react';

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · Operafy` : 'Operafy';
  }, [title]);
}

export default useDocumentTitle;
