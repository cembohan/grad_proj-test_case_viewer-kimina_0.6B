import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface DisplayBoxProps {
  title: string;
  content: string;
}

const DisplayBox: React.FC<DisplayBoxProps> = ({ title, content }) => {
  return (
    <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 h-full overflow-auto">
      <h2 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">
        {title}
      </h2>
      <div className="text-slate-700 leading-relaxed">
        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-4 mb-3 text-slate-800 border-b pb-2" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-4 mb-2 text-slate-800" {...props} />,
            p: ({node, ...props}) => <p className="mb-4" {...props} />,
            pre: ({node, ...props}) => <pre className="bg-slate-200 text-sm p-4 rounded-md overflow-x-auto my-4" {...props} />,
            code({node, inline, className, children, ...props}) {
              return !inline ? (
                <code className={className} {...props}>
                  {children}
                </code>
              ) : (
                <code className="bg-slate-200 rounded-sm px-1 py-0.5 font-mono text-sm" {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default DisplayBox;
