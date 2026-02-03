'use client';

import { useState, useEffect } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { src: string; autoplay?: boolean; loop?: boolean; style?: React.CSSProperties }, HTMLElement>;
    }
  }
}

export default function PageLoader({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background">
        <dotlottie-wc 
            src="https://lottie.host/e77a7057-00fa-4005-87a6-9e4cf5d9f4c1/JoYgNJl1b6.lottie" 
            style={{ width: '300px', height: '300px' }} 
            autoplay 
            loop>
        </dotlottie-wc>
      </div>
    );
  }

  return <div className="animate-fade-in">{children}</div>;
}
