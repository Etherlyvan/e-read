'use client';

import { useEffect, useRef, useState } from 'react';

const CardClient = ({ title, genre }: { title: string, genre: string }) => {
  const [isMarqueeActive, setIsMarqueeActive] = useState(false);
  const titleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const containerWidth = titleRef.current.parentElement?.offsetWidth ?? 0;
      const textWidth = titleRef.current.scrollWidth;
      setIsMarqueeActive(textWidth > containerWidth);
    }
  }, [title]);

  return (
    <div className="p-3">
      <div className={`marquee-container ${isMarqueeActive ? 'marquee-active' : ''}`}>
        <span className="marquee-content" ref={titleRef} >
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-600">{genre}</p>
    </div>
  );
};

export default CardClient;
