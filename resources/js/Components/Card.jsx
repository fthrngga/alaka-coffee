import React from 'react';

export default function Card({ children, className = '' }) {
    return (
        <div className={`bg-surface rounded-2xl border border-[#EAE3DB] overflow-hidden group hover:shadow-[0_10px_20px_rgba(92,61,46,0.08)] transition-all duration-300 ${className}`}>
            {children}
        </div>
    );
}
