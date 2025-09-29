
import React, { useState, useMemo, useEffect } from 'react';
import type { TestCase } from './types.ts';
import Tabs from './components/Tabs.tsx';
import ResultSelector from './components/ResultSelector.tsx';
import DisplayBox from './components/DisplayBox.tsx';

interface TestCaseInfo {
  id: string;
  name: string;
  path: string;
}

const App: React.FC = () => {
  const [testCases, setTestCases] = useState<TestCaseInfo[]>([]);
  const [loadedData, setLoadedData] = useState<{ [key: string]: TestCase }>({});
  const [activeTabId, setActiveTabId] = useState<string>('');
  const [selectedResultId, setSelectedResultId] = useState<string>('');
  const [isLoadingManifest, setIsLoadingManifest] = useState<boolean>(true);
  const [isLoadingTestCase, setIsLoadingTestCase] = useState<boolean>(false);

  useEffect(() => {
    const fetchTestCases = async () => {
      try {
        setIsLoadingManifest(true);
        const response = await fetch('data/test-cases.json');
        const data = await response.json();
        const cases = data.testCases || [];
        setTestCases(cases);
        if (cases.length > 0) {
          setActiveTabId(cases[0].id);
        }
      } catch (error) {
        console.error("Failed to load test cases manifest:", error);
      } finally {
        setIsLoadingManifest(false);
      }
    };
    fetchTestCases();
  }, []);

  useEffect(() => {
    if (!activeTabId) return;

    if (loadedData[activeTabId]) {
      const currentCase = loadedData[activeTabId];
      if (currentCase.results.length > 0 && !currentCase.results.find(r => r.id === selectedResultId)) {
        setSelectedResultId(currentCase.results[0].id);
      } else if (currentCase.results.length === 0) {
        setSelectedResultId('');
      }
      return;
    }

    const fetchTestCaseData = async () => {
      const testCaseInfo = testCases.find(tc => tc.id === activeTabId);
      if (!testCaseInfo) return;

      try {
        setIsLoadingTestCase(true);
        const response = await fetch(testCaseInfo.path);
        const data: TestCase = await response.json();
        setLoadedData(prev => ({ ...prev, [activeTabId]: data }));
        setSelectedResultId(data.results[0]?.id || '');
      } catch (error) {
        console.error(`Failed to load test case ${activeTabId}:`, error);
      } finally {
        setIsLoadingTestCase(false);
      }
    };

    fetchTestCaseData();
  }, [activeTabId, testCases, loadedData, selectedResultId]);
  
  const activeTestCase = useMemo(() => loadedData[activeTabId], [loadedData, activeTabId]);

  const selectedResult = useMemo(
    () => activeTestCase?.results.find((r) => r.id === selectedResultId),
    [activeTestCase, selectedResultId]
  );

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

  if (isLoadingManifest) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100">
        <div className="text-xl text-slate-600">Loading Application...</div>
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
                items={testCases}
                activeId={activeTabId}
                onSelect={setActiveTabId}
              />
              {activeTestCase && activeTestCase.results.length > 0 && (
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
             {isLoadingTestCase || !activeTestCase ? (
                <div className="md:col-span-2 text-center p-8 text-slate-600">Loading test case data...</div>
             ) : (
                <>
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
                </>
             )}
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