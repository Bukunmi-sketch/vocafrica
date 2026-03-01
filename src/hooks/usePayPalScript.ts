
// src/hooks/usePayPalScript.ts
import { useEffect, useState } from 'react';

export const usePayPalScript = (clientId: string) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?components=card-fields&client-id=${clientId}`;
    script.async = true;
    script.onload = () => setIsLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [clientId]);

  return isLoaded ? (window as any).paypal : null;
};