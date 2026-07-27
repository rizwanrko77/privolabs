import React, { useState } from 'react';

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorRole: string;
  company: string;
  companyLogo?: string;
}

export default function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) {
    return <div className="p-8 text-center text-muted">No testimonials available.</div>;
  }

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const current = testimonials[currentIndex];

  return (
    <div className="testimonial-slider" aria-roledescription="carousel">
      <div className="slider-controls" aria-label="Carousel Navigation">
        <button className="control-btn" onClick={prev} aria-label="Previous quote">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="slider-count font-mono text-muted">
          {currentIndex + 1} / {testimonials.length}
        </span>
        <button className="control-btn" onClick={next} aria-label="Next quote">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div 
        className="testimonial-card"
        key={current.id} // Forces re-animation on key change
        role="group" 
        aria-roledescription="slide"
      >
        <blockquote className="quote font-display">
          "{current.quote}"
        </blockquote>
        
        <div className="author-meta mt-8">
          <div className="author-info">
            <cite className="author-name font-mono label text-brand">{current.authorName}</cite>
            <span className="author-role text-muted font-body">
              {current.authorRole}, {current.company}
            </span>
          </div>
        </div>
      </div>

      <style>{`
        .testimonial-slider {
          display: flex;
          flex-direction: column;
          gap: var(--s-6);
        }
        .slider-controls {
          display: flex;
          align-items: center;
          gap: var(--s-4);
        }
        .control-btn {
          background: none;
          border: 1px solid var(--rule);
          border-radius: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text);
          cursor: pointer;
          transition: border-color var(--t-fast) var(--ease-out), color var(--t-fast) var(--ease-out);
        }
        .control-btn:hover {
          border-color: var(--brand-500);
          color: var(--brand-500);
        }
        .control-btn:focus-visible {
          outline: 2px solid var(--brand-500);
          outline-offset: 2px;
        }
        .slider-count {
          font-size: var(--small);
        }
        .testimonial-card {
          padding: var(--s-8);
          border: 1px solid var(--rule);
          border-radius: var(--r-md);
          background: var(--surface);
          animation: fade-in var(--t-medium) var(--ease-out);
        }
        .quote {
          font-size: var(--heading);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .author-meta {
          display: flex;
          align-items: center;
          gap: var(--s-4);
        }
        .author-info {
          display: flex;
          flex-direction: column;
          gap: var(--s-1);
        }
        .author-name {
          font-style: normal;
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
