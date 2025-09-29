
import React from 'react';
import type { TestCase } from '../types';

interface TabsProps {
  items: Pick<TestCase, 'id' | 'name'>[];
  activeId: string;
  onSelect: (id: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ items, activeId, onSelect }) => {
  return (
    <div className="flex flex-wrap border-b border-slate-300">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className={`px-4 py-2 text-sm font-semibold transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            ${
              activeId === item.id
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-t-md'
            }`}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
