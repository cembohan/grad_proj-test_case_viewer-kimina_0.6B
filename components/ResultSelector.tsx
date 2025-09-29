
import React from 'react';
import type { Result } from '../types';

interface ResultSelectorProps {
  results: Result[];
  selectedId: string;
  onSelect: (id: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}

const ResultSelector: React.FC<ResultSelectorProps> = ({ results, selectedId, onSelect, onPrevious, onNext }) => {
  const currentIndex = results.findIndex(r => r.id === selectedId);
  const isFirstResult = currentIndex <= 0;
  const isLastResult = currentIndex >= results.length - 1;

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="result-select" className="font-medium text-slate-700 whitespace-nowrap">
        Select Result:
      </label>
      <select
        id="result-select"
        value={selectedId}
        onChange={(e) => onSelect(e.target.value)}
        className="block w-full sm:w-auto pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
      >
        {results.map((result) => (
          <option key={result.id} value={result.id}>
            {result.name}
          </option>
        ))}
      </select>
      <div className="flex items-center gap-1">
        <button
          onClick={onPrevious}
          disabled={isFirstResult}
          className="p-2 rounded-md transition-colors duration-200 ease-in-out bg-white border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label="Previous Result"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={onNext}
          disabled={isLastResult}
          className="p-2 rounded-md transition-colors duration-200 ease-in-out bg-white border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label="Next Result"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ResultSelector;
