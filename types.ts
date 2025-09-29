
export interface Result {
  id: string;
  name: string;
  content: string;
}

export interface TestCase {
  id: string;
  name: string;
  problem: string;
  systemPrompt: string;
  results: Result[];
}
