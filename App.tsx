
import React, { useState, useMemo, useEffect } from 'react';
import { TEST_CASES } from './constants';
import type { TestCase } from './types';
import Tabs from './components/Tabs';
import ResultSelector from './components/ResultSelector';
import DisplayBox from './components/DisplayBox';

const App: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<string>(TEST_CASES[0]?.id || '');
  const [selectedResultId, setSelectedResultId] = useState<string>(
    TEST_CASES[0]?.results[0]?.id || ''
  );

  const activeTestCase = useMemo(
    () => TEST_CASES.find((tc) => tc.id === activeTabId),
    [activeTabId]
  );

  const selectedResult = useMemo(
    () => activeTestCase?.results.find((r) => r.id === selectedResultId),
    [activeTestCase, selectedResultId]
  );
  
  useEffect(() => {
    const newActiveTestCase = TEST_CASES.find((tc) => tc.id === activeTabId);
    if (newActiveTestCase && newActiveTestCase.results.length > 0) {
      setSelectedResultId(newActiveTestCase.results[0].id);
    } else {
      setSelectedResultId('');
    }
  }, [activeTabId]);

  const handlePreviousResult = () => {
    if (!activeTestCase) return;
    const currentIndex = activeTestCase.results.findIndex(r => r.id === selectedResultId);
    if (currentIndex > 0) {
      setSelectedResultId(activeTestCase.results[currentIndex - 1].id);
    }
  };

  const handleNextResult = () => {
    if (!activeTestCase) return;
    const currentIndex = activeTestCase.results.findIndex(r => r.id === selectedResultId);
    if (currentIndex < activeTestCase.results.length - 1) {
      setSelectedResultId(activeTestCase.results[currentIndex + 1].id);
    }
  };

  if (!activeTestCase) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100">
        <div className="text-xl text-slate-600">No test cases found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800">Test Case Viewer</h1>
          <p className="text-slate-600 mt-2">
            Select a test case and a result to view the details.
          </p>
        </header>

        <main>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 mb-6">
              <Tabs
                items={TEST_CASES}
                activeId={activeTabId}
                onSelect={setActiveTabId}
              />
              {activeTestCase.results.length > 0 && (
                <ResultSelector
                  results={activeTestCase.results}
                  selectedId={selectedResultId}
                  onSelect={setSelectedResultId}
                  onPrevious={handlePreviousResult}
                  onNext={handleNextResult}
                />
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-6">
                <DisplayBox
                  title="Problem"
                  content={activeTestCase.problem}
                />
                <DisplayBox
                  title="System Prompt"
                  content={activeTestCase.systemPrompt}
                />
              </div>
              <DisplayBox
                title="Selected Result"
                content={selectedResult ? selectedResult.content : 'No results for this test case.'}
              />
            </div>
          </div>
        </main>
        
        <footer className="text-center mt-8 text-sm text-slate-500">
          <p>Powered by React & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
