import { useState } from 'react';

export default function Accordion({ items }) {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null);
        } else {
            setActiveIndex(index);
        }
    };

    return (
        <div className="space-y-4">
            {items.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                    <div 
                        key={item.id} 
                        className={`border rounded-2xl transition-all duration-300 overflow-hidden ${
                            isActive ? 'border-primary-base bg-surface shadow-sm' : 'border-[#EAE3DB] bg-[#FAF8F5] hover:border-primary-base/50'
                        }`}
                    >
                        <button
                            className="w-full px-6 py-5 flex items-center justify-between focus:outline-none"
                            onClick={() => toggleAccordion(index)}
                        >
                            <h3 className={`text-left font-serif font-bold text-lg ${isActive ? 'text-primary-base' : 'text-text-main'}`}>
                                {item.pertanyaan}
                            </h3>
                            <span className={`ml-4 flex-shrink-0 transition-transform duration-300 ${isActive ? 'rotate-180 text-primary-base' : 'text-text-muted'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg>
                            </span>
                        </button>
                        <div 
                            className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                                isActive ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                        >
                            <p className="text-text-muted leading-relaxed">
                                {item.jawaban}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
