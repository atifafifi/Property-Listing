import React from 'react';

export const Logo = ({ className = "" }: { className?: string }) => {
    return (
        <svg
            viewBox="0 0 300 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="Atsen Property Logo"
        >
            {/* Roof Icon - Purple */}
            <path
                d="M25 10 L45 28 H38 L25 16 L12 28 H5 L25 10Z"
                fill="currentColor"
                className="text-primary"
            />
            <path
                d="M42 20 L55 20"
                stroke="currentColor"
                strokeWidth="3"
                className="text-primary"
            />

            {/* Text 'Atsen' - White */}
            <text
                x="60"
                y="32"
                fontFamily="sans-serif"
                fontWeight="bold"
                fontSize="28"
                fill="currentColor"
                className="text-white"
            >
                Atsen
            </text>

            {/* Text 'Property' - Light Gray */}
            <text
                x="145"
                y="32"
                fontFamily="sans-serif"
                fontWeight="normal"
                fontSize="28"
                fill="currentColor"
                className="text-white"
            >
                Property
            </text>
        </svg>
    );
};
