import React from 'react';
import './ClassificationBanner.css';

interface ClassificationBannerProps {
  classification?: string;
}

export default function ClassificationBanner({ classification = 'SECRET // NOFORN' }: ClassificationBannerProps) {
  return (
    <div className="classification-banner">
      <span className="classification-text">{classification}</span>
    </div>
  );
}
