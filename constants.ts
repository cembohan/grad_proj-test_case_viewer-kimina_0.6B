import type { TestCase } from './types';

const systemPromptContent = `"""You are an expert programmer and mathematician specializing in the Lean 4 theorem prover. Your sole task is to translate natural language mathematical problems into formal, syntactically correct Lean 4 statements. Do not provide explanations or any text other than the formal statement itself.

### Example Problem:
Let n be an integer. If n^2 is even, then n is even.

### Example Formal Statement:
\`\`\`lean
theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n :=
\`\`\`

---
"""`;

const testCase1Problem = `The sum of two even integers is an even integer.

**Expected Lean 4 Output:**
\`\`\`lean
theorem sum_of_evens_is_even (m n : ℤ) : Even m → Even n → Even (m + n) :=
\`\`\``;

const testCase2Problem = `The product of two non-negative real numbers is non-negative.

**Expected Lean 4 Output:**
\`\`\`lean
theorem product_of_non_neg_is_non_neg (x y : ℝ) : x ≥ 0 → y ≥ 0 → x * y ≥ 0 :=
\`\`\``;

// --- Content for Test Case 1 (Raw) ---

const testCase1Result1Content = `# Kimina Model:
<think>
# Solving the Even Square Problem in Lean 4

We need to prove that if $n^2$ is even, then $n$ must be even. Let's think about how to approach this.

First, what does it mean for $n^2$ to be even? A number is even if it's divisible by 2. So $n^2 \\equiv 0 \\pmod{2}$. 

Now, if $n$ were odd, then $n \\equiv 1 \\pmod{2}$. Let's compute $n^2 \\pmod{2}$ when $n \\equiv 1 \\pmod{2}$:
$n^2 \\equiv 1^2 \\equiv 1 \\pmod{2}$.

So if $n^2 \\equiv 0 \\pmod{2}$, then $n^2 \\equiv 1 \\pmod{2}$, which is a contradiction. Therefore, $n$ cannot be odd, so $n$ must be even.

Now, let's translate this into Lean 4:

\`\`\`tactics
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
\`\`\`

We need to prove that if $n^2$ is even, then $n$ is even. Let's introduce the hypothesis that $n^2$ is even.

\`\`\`tactics
intro h
\`\`\`

Now we need to show that $n$ is even. To do this, we need to prove that $n \\equiv 0 \\pmod{2}$.

Let's think about how to approach this. If $n^2$ is even, then $n^2 \\equiv 0 \\pmod{2}$. We need to show that this implies $n \\equiv 0 \\pmod{2}$.

So we need to prove that $n$ is even. Let's write the definition of even in Lean.

\`\`\`tactics
have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
  omega
\`\`\`

So we have that $n \\equiv 0 \\pmod{2}$ or $n \\equiv 1 \\pmod{2}$. Let's consider both cases.

If $n \\equiv 0 \\pmod{2}$, then $n$ is even, which is what we want to prove.

If $n \\equiv 1 \\pmod{2}$, then $n^2 \\equiv 1^2 \\equiv 1 \\pmod{2}$, which contradicts the fact that $n^2$ is even (so $n^2 \\equiv 0 \\pmod{2}$). Let's formalize this.

\`\`\`tactics
rcases h1 with (h1 | h1)
\`\`\`

Case 1: $n \\equiv 0 \\pmod{2}$

In this case, $n$ is even, so we need to prove that $n$ is even. Let's write the definition of even in Lean.

\`\`\`tactics
· -- n is even
  have h2 : Even n := by
    refine' ⟨n / 2, by omega⟩
  exact h2
\`\`\`

Case 2: $n \\equiv 1 \\pmod{2}$

In this case, we need to derive a contradiction. If $n \\equiv 1 \\pmod{2}$, then $n^2 \\equiv 1^2 \\equiv 1 \\pmod{2}$, which contradicts the fact that $n^2$ is even (so $n^2 \\equiv 0 \\pmod{2}$). Let's formalize this.

\`\`\`tactics
· -- n is odd
  have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
    have h3 : n % 2 = 1 := h1
    simp [pow_two, Int.add_emod, Int.mul_emod, h3]
    <;> omega
\`\`\`

So we have that $n^2 \\equiv 1 \\pmod{2}$, which means $n^2$ is odd. But we have the hypothesis that $n^2$ is even. This is a contradiction.

\`\`\`tactics
have h3 : (n ^ 2 : ℤ) % 2 = 0 := by
  obtain ⟨k, hk⟩ := h
  omega
\`\`\`

So we have that $n^2 \\equiv 0 \\pmod{2}$ and $n^2 \\equiv 1 \\pmod{2}$, which is a contradiction.

\`\`\`tactics
omega
\`\`\`

So this completes the proof. Therefore, if $n^2$ is even, then $n`;

// --- Content for Test Case 2 (Raw) ---
// Moved to Test Case 4

// --- Content for Test Case 3 (Cleaned) ---

const testCase1Result2Content = `# Kimina Model (Cleaned)

**Note:** We made it output cleaner results by tweaking the code.

\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
    omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact h2
  · -- n is odd
    have h2 : (n : ℤ) % 2 = 1 := h1
    have h3 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h4 : n % 2 = 1 := h2
      have h5 : n ^ 2 % 2 = 1 := by
        simp [pow_two, Int.add_emod, Int.mul_emod, h4]
      omega
    have h4 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\`
`;
const testCase1Result3Content = `# Kimina Model (Cleaned)

No Lean code block found in the output.`;
const testCase1Result4Content = `# Kimina Model (Cleaned)

No Lean code block found in the output.`;
const testCase1Result6Content = `# Kimina Model (Cleaned)

\`\`\`lean
all_goals ring
\`\`\``;
const testCase1Result7Content = `# Kimina Model (Cleaned)

\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
    omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact h2
  · -- n is odd
    have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h3 : n % 2 = 1 := h1
      have h4 : n ^ 2 % 2 = 1 := by
        simp [pow_two, Int.add_emod, Int.mul_emod, h3]
      omega
    have h3 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;
const testCase3Result6Content = `# Kimina Model (Cleaned)

\`\`\`lean
intro h
\`\`\``;
const testCase3Result7Content = `**User Problem:** The sum of two even integers is an even integer.

# Kimina Model (Cleaned)

\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
    omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : (n : ℤ) % 2 = 0 := by
      omega
    exact ⟨n / 2, by omega⟩
  · -- n is odd
    have h2 : (n : ℤ) % 2 = 1 := by
      omega
    have h3 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h4 : (n : ℤ) % 2 = 1 := h2
      simp [pow_two, Int.add_emod, Int.mul_emod, h4]
    have h4 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;
const testCase1Result11Content = `# Kimina Model (Cleaned)
\`\`\`lean
intro h
\`\`\``;
const testCase3Result9Content = `# Kimina Model (Cleaned)
\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
    omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact h2
  · -- n is odd
    have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h3 : n % 2 = 1 := h1
      have h4 : n ^ 2 % 2 = 1 := by
        simp [pow_two, Int.add_emod, Int.mul_emod, h3]
      omega
    have h3 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;
const testCase3Result10Content = `# Kimina Model (Cleaned)
\`\`\`lean
omega
\`\`\``;

const testCase3Result11Content = `# Kimina Model (Cleaned)
\`\`\`lean
omega
\`\`\``;

const testCase3Result12Content = `# Kimina Model (Cleaned)
\`\`\`lean
intro h
\`\`\``;

const testCase3Result13Content = `# Kimina Model (Cleaned)
\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
    omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact h2
  · -- n is odd
    have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h3 : n % 2 = 1 := h1
      simp [pow_two, Int.add_emod, Int.mul_emod, h3]
      <;> omega
    have h3 : Even (n ^ 2) := h
    rcases h3 with ⟨k, hk⟩
    omega
\`\`\``;

const testCase3Result14Content = `# Kimina Model (Cleaned)
<think>
# Solving the Even Integers Sum Problem in Lean 4

We need to prove that the sum of two even integers is even. Let's think about how to approach this.

First, what does it mean for an integer to be even? An even integer is divisible by 2. So, we can write an integer $n$ as $2k$ for some integer $k$.

Now, if we have two even integers, let's say $a$ and $b$. Both $a$ and $b$ are even, so we can write $a = 2m$ and $b = 2p$ for some integers $m$ and $p$.

Then, the sum $a + b = 2m + 2p = 2(m + p)$, which is clearly even because it's divisible by 2.

So, we need to formalize this in Lean 4. Let's look at how we can structure the proof.

We need to show that if $n^2$ is even, then $n$ is even. Wait, actually, the problem is that we need to prove that the sum of two even integers is even. Let's think about how to express this.

Wait, the problem statement says "If n^2 is even, then n is even". But we need to prove that the sum of two even integers is even. Let's check the formal statement again.

The formal statement is: \`theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n :=\`

So, this is saying that if $n^2$ is even, then $n$ is even. But this is not what we need to prove. We need to prove that the sum of two even integers is even. Let's check the formal statement again.

Wait, maybe the formal statement is written incorrectly. Let's check the original problem again.

Original problem: "Let n be an integer. If n^2 is even, then n is even."

But this is not what we need to prove. We need to prove that the sum of two even integers is even. Let's check the formal statement again.

Wait, maybe the formal statement is written correctly, and we need to prove that if $n^2$ is even, then $n$ is even. Let's think about this.

If $n^2$ is even, then $n^2 \\equiv 0 \\pmod{2}$. But $n^2 \\equiv 0 \\pmod{2}$ implies that $n^2$ is even. But $n^2$ is even only if $n$ is even. Wait, let's check.

If $n$ is even, then $n = 2k$ for some integer $k$, so $n^2 = (2k)^2 = 4k^2$ which is even. So $n^2$ is even implies $n$ is even. So this is the right implication. So the theorem is correct. So we need to prove that if $n^2$ is even, then $n$ is even.

So how to prove this. Let's think.

If $n^2$ is even, then $n^2 \\equiv 0 \\pmod{2}$. But $n^2 \\equiv 0 \\pmod{2}$ implies that $n^2$ is even. But $n^2$ is even only if $n$ is even. Wait, let's check.

If $n$ is odd, then $n \\equiv 1 \\pmod{2}$, so $n^2 \\equiv 1^2 \\equiv 1 \\pmod{2}$. So $n^2 \\equiv 1 \\pmod{2}$, which is odd. So if $n^2$ is even, then $n$ must be even. So this is the right implication. So we need to prove that if $n^2$ is even, then $n$ is even.

So how to prove this. Let's think.

If $n^2$ is even, then $n^2 \\equiv 0 \\pmod{2}$. But $n^2 \\equiv 0 \\pmod{2}$ implies that $n^2$ is even. But $n^2$ is even only if $n$ is even. Wait, let's check.

If $n$ is even, then $n = 2k$ for some integer $k$, so $n^2 = 4k^2$ which is even. So $n^2$ is even implies $n$ is even. So this is the right implication. So we need to prove that if $n^2$ is even, then $n$ is even.

So how to prove this. Let's think.

If $n^2$ is even, then $n^2 \\equiv 0 \\pmod{2}$. But $n^2 \\equiv 0 \\pmod{2}$ implies that $n^2$ is even. But $n^2$ is even only if $n$ is even. Wait, let's check.

If $n$ is even, then $n = 2k$ for some integer $k$, so $n^2 = 4k^2$ which is even. So $n^2$ is even implies $n$ is even. So this is the right implication. So we need to prove that if $n^2$ is even, then $n$ is even.

So how to prove this. Let's think.

If $n^2$ is even, then $n^2 \\equiv 0 \\pmod{2}$. But $n^2 \\equiv 0 \\pmod{2}$ implies that $n^2$ is even. But $n^2$ is even only if $n$ is even. Wait, let's check.

If $n$ is odd, then $n \\equiv 1 \\pmod{2}$, so $n^2 \\equiv 1^2 \\equiv 1 \\pmod{2}$. So $n^2 \\equiv 1 \\pmod{2}$, which is odd. So if $n^2$ is even, then $n$ must be even. So this is the right implication. So we need to prove that if $n^2$ is even, then $n$ is even.

So how to prove this. Let's think.

If $n^2$ is even, then $n^2 \\equiv 0 \\pmod{2}$. But $n^2 \\equiv 0 \\pmod{2}$ implies that $n^2$ is even. But $n^2$ is even only if $n$ is even. Wait, let's check.

If $n$ is even, then $n^2$ is even. If $n$ is odd, then $n^2$ is odd. So if $n^2$ is even, then $n$ must be even. So this is the right implication. So we need to prove that if $n^2$ is even, then $n$ is even.

So how to prove this. Let's think.

If $n^2$ is even, then $n^2 \\equiv 0 \\pmod{2}$. But $n^2 \\equiv 0 \\pmod{2}$ implies that $n^2$ is even. But $n^2$ is even only if $n$ is even. Wait, let's check.

If $n$ is even, then $n^2$ is even. If $n$ is odd, then $n^2$ is odd. So if $n^2$ is even, then $n$ must be even. So this is the right implication. So we need to prove that if $n^2$ is even, then $n$ is even.

So how to prove this. Let's think.

If $n^2$ is even, then $n^2 \\equiv 0 \\pmod{2}$. But $n^2 \\equiv 0 \\pmod{2}$ implies that $n^2$ is even. But $n^2$ is even only if $n$ is even. Wait, let's check.

If $n$ is even, then $n^2$ is even. If $n$ is odd, then $n^2$ is odd. So if $n^2$ is even, then $n$ must be even. So this is the right implication. So we need to prove that if $n^2$ is even, then $n$ is even.

So how to prove this. Let's think.

If $n^2$ is even, then $n^2 \\equiv 0 \\pmod{2}$. But $
</think>`;

const testCase3Result15Content = `# Kimina Model (Cleaned)
\`\`\`lean
contradiction
\`\`\``;

const testCase3Result16Content = `# Kimina Model (Cleaned)
\`\`\`lean
intro h
\`\`\``;

const testCase3Result17Content = `# Kimina Model (Cleaned)
\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
    omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact h2
  · -- n is odd
    have h2 : (n : ℤ) % 2 = 1 := h1
    have h3 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h4 : n % 2 = 1 := h2
      have h5 : n ^ 2 % 2 = 1 := by
        simp [pow_two, Int.add_emod, Int.mul_emod, h4]
      omega
    have h4 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;

const testCase3Result18Content = `# Kimina Model (Cleaned)
\`\`\`lean
intro h
rcases h with ⟨k, hk⟩
\`\`\``;

const testCase3Result19Content = `# Kimina Model (Cleaned)
\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
    omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact h2
  · -- n is odd
    have h2 : n % 2 = 1 := h1
    have h3 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h4 : n % 2 = 1 := h2
      simp [pow_two, Int.add_emod, Int.mul_emod, h4]
    have h4 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;

const testCase3Result20Content = `# Kimina Model (Cleaned)
\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
    omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact h2
  · -- n is odd
    have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h3 : n % 2 = 1 := h1
      have h4 : n ^ 2 % 2 = 1 := by
        simp [pow_two, Int.add_emod, Int.mul_emod, h3]
      omega
    have h3 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;


// --- Content for Test Case 4 (Cleaned) ---

const testCase4Result1Content = `\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    have h3 : n % 2 = 0 := by
      have h4 : n % 2 = 0 ∨ n % 2 = 1 := h1
      rcases h4 with (h4 | h4)
      · exact h4
      · -- n is odd
        have h5 : (n ^ 2 : ℤ) % 2 = 1 := by
          simp [pow_two, Int.add_emod, Int.mul_emod, h4]
          <;> omega
        omega
    exact ⟨n / 2, by omega⟩
  · -- n is odd
    have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h4 : n % 2 = 1 := h1
      simp [pow_two, Int.add_emod, Int.mul_emod, h4]
      <;> omega
    have h3 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;

const testCase4Result2Content = `\`\`\`lean
omega
\`\`\``;
const testCase4Result3Content = `\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
    omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : (n : ℤ) % 2 = 0 := by
      omega
    exact ⟨n / 2, by omega⟩
  · -- n is odd
    have h2 : n % 2 = 1 := by
      omega
    have h3 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h4 : n % 2 = 1 := h2
      simp [pow_two, Int.add_emod, Int.mul_emod, h4]
    have h4 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;
const testCase4Result4Content = `\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
    omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : (n : ℤ) % 2 = 0 := by
      omega
    exact ⟨n / 2, by omega⟩
  · -- n is odd
    have h2 : (n : ℤ) % 2 = 1 := by
      omega
    have h3 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h4 : n % 2 = 1 := h2
      have h5 : (n ^ 2 : ℤ) % 2 = 1 := by
        simp [pow_two, Int.add_emod, Int.mul_emod, h4]
      exact h5
    have h4 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;
const testCase4Result5Content = `\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : (n ^ 2 : ℤ) % 2 = 0 := by
      have h3 : n % 2 = 0 := h1
      simp [pow_two, Int.add_emod, Int.mul_emod, h3]
    have h3 : n % 2 = 0 := by
      by_contra h4
      push_neg at h4
      have h4' : n % 2 = 1 := by
        omega
      have h5 : (n ^ 2 : ℤ) % 2 = 1 := by
        simp [pow_two, Int.add_emod, Int.mul_emod, h4']
      omega
    have : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact this
  · -- n is odd
    have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h3 : n % 2 = 1 := h1
      simp [pow_two, Int.add_emod, Int.mul_emod, h3]
    have h3 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;
const testCase4Result6Content = `\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
    omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact this
  · -- n is odd
    have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h3 : n % 2 = 1 := h1
      simp [pow_two, Int.add_emod, Int.mul_emod, h3]
      <;> omega
    have h3 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;
const testCase4Result7Content = `\`\`\`lean
have h3 : (n ^ 2 : ℤ) % 2 = 1 := by
  have h4 : n % 2 = 1 := h2
  have h5 : n ^ 2 % 2 = 1 := by
    simp [pow_two, Int.add_emod, Int.mul_emod, h4]
  omega
\`\`\``;
const testCase4Result8Content = `\`\`\`lean
rcases h with ⟨k, hk⟩
\`\`\``;
const testCase4Result9Content = `\`\`\`lean
have h3 : (n ^ 2) % 2 = 1 := by
  have h4 : n % 2 = 1 := h2
  have h5 : n ^ 2 % 2 = 1 := by
    simp [pow_two, Int.add_emod, Int.mul_emod, h4]
  omega
\`\`\``;
const testCase4Result10Content = `\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
    omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact h2
  · -- n is odd
    have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h3 : n % 2 = 1 := h1
      have h4 : n ^ 2 % 2 = 1 := by
        simp [pow_two, Int.add_emod, Int.mul_emod, h3]
      omega
    have h3 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;
const testCase4Result11Content = `\`\`\`lean
exact ⟨n / 2, by omega⟩
\`\`\``;
const testCase4Result12Content = `\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact h2
  · -- n is odd
    have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h3 : n % 2 = 1 := h1
      simp [pow_two, Int.add_emod, Int.mul_emod, h3]
      <;> omega
    have h3 : Even (n ^ 2) := h
    have h4 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h3
      omega
    omega
\`\`\``;
const testCase4Result13Content = `\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact h2
  · -- n is odd
    have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h3 : n % 2 = 1 := h1
      have h4 : n ^ 2 % 2 = 1 := by
        simp [pow_two, Int.add_emod, Int.mul_emod, h3]
      omega
    have h3 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;
const testCase4Result14Content = `\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
    omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact h2
  · -- n is odd
    have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h3 : n % 2 = 1 := h1
      have h4 : n ^ 2 % 2 = 1 := by
        simp [pow_two, Int.add_emod, Int.mul_emod, h3]
      omega
    have h3 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;
const testCase4Result15Content = `\`\`\`lean
have h3 : (n ^ 2 : ℤ) % 2 = 1 := by
  have h4 : n % 2 = 1 := h2
  have h5 : n ^ 2 % 2 = 1 := by
    simp [pow_two, Int.add_emod, Int.mul_emod, h4]
  omega
\`\`\``;
const testCase4Result16Content = `\`\`\`lean
omega
\`\`\``;
const testCase4Result17Content = `\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
    omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact h2
  · -- n is odd
    have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h3 : n % 2 = 1 := h1
      have h4 : n ^ 2 % 2 = 1 := by
        simp [pow_two, Int.add_emod, Int.mul_emod, h3]
      omega
    have h3 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;
const testCase4Result18Content = `\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : (n ^ 2 : ℤ) % 2 = 0 := by
      have h3 : n % 2 = 0 := h1
      simp [pow_two, Int.add_emod, Int.mul_emod, h3]
    have h4 : Even n := by
      have h5 : n % 2 = 0 := h1
      exact ⟨n / 2, by omega⟩
    exact h4
  · -- n is odd
    have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h3 : n % 2 = 1 := h1
      simp [pow_two, Int.add_emod, Int.mul_emod, h3]
    have h3 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;
const testCase4Result19Content = `\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by
    omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact h2
  · -- n is odd
    have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h3 : n % 2 = 1 := h1
      simp [pow_two, Int.add_emod, Int.mul_emod, h3]
      <;> omega
    have h3 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;
const testCase4Result20Content = `\`\`\`lean
import Mathlib

theorem even_square_implies_even (n : ℤ) : Even (n ^ 2) → Even n := by
  intro h
  have h1 : n % 2 = 0 ∨ n % 2 = 1 := by omega
  rcases h1 with (h1 | h1)
  · -- n is even
    have h2 : Even n := by
      refine' ⟨n / 2, by omega⟩
    exact h2
  · -- n is odd
    have h2 : (n ^ 2 : ℤ) % 2 = 1 := by
      have h3 : n % 2 = 1 := h1
      simp [pow_two, Int.add_emod, Int.mul_emod, h3]
      <;> omega
    have h3 : (n ^ 2 : ℤ) % 2 = 0 := by
      obtain ⟨k, hk⟩ := h
      omega
    omega
\`\`\``;
const testCase4Result21Content = `\`\`\`lean
omega
\`\`\``;


export const TEST_CASES: TestCase[] = [
  {
    id: 'testcase1',
    name: 'Test Case 1',
    problem: testCase1Problem,
    systemPrompt: systemPromptContent,
    results: [
      { id: `t1_r1`, name: `Result 1`, content: testCase1Result1Content },
    ],
  },
  {
    id: 'testcase2',
    name: 'Test Case 2',
    problem: testCase2Problem,
    systemPrompt: systemPromptContent,
    results: [],
  },
  {
    id: 'testcase3',
    name: 'Test Case 3 (Cleaned)',
    problem: testCase1Problem,
    systemPrompt: systemPromptContent,
    results: [
      { id: 't3_r1', name: 'Result 1', content: testCase1Result2Content },
      { id: 't3_r2', name: 'Result 2', content: testCase1Result3Content },
      { id: 't3_r3', name: 'Result 3', content: testCase1Result4Content },
      { id: 't3_r4', name: 'Result 4', content: testCase1Result6Content },
      { id: 't3_r5', name: 'Result 5', content: testCase1Result7Content },
      { id: 't3_r6', name: 'Result 6', content: testCase3Result6Content },
      { id: 't3_r7', name: 'Result 7', content: testCase3Result7Content },
      { id: 't3_r8', name: 'Result 8', content: testCase1Result11Content },
      { id: 't3_r9', name: 'Result 9', content: testCase3Result9Content },
      { id: 't3_r10', name: 'Result 10', content: testCase3Result10Content },
      { id: 't3_r11', name: 'Result 11', content: testCase3Result11Content },
      { id: 't3_r12', name: 'Result 12', content: testCase3Result12Content },
      { id: 't3_r13', name: 'Result 13', content: testCase3Result13Content },
      { id: 't3_r14', name: 'Result 14', content: testCase3Result14Content },
      { id: 't3_r15', name: 'Result 15', content: testCase3Result15Content },
      { id: 't3_r16', name: 'Result 16', content: testCase3Result16Content },
      { id: 't3_r17', name: 'Result 17', content: testCase3Result17Content },
      { id: 't3_r18', name: 'Result 18', content: testCase3Result18Content },
      { id: 't3_r19', name: 'Result 19', content: testCase3Result19Content },
      { id: 't3_r20', name: 'Result 20', content: testCase3Result20Content },
    ],
  },
  {
    id: 'testcase4',
    name: 'Test Case 4 (Cleaned)',
    problem: testCase2Problem,
    systemPrompt: systemPromptContent,
    results: [
      { id: 't4_r1', name: 'Result 1', content: testCase4Result1Content },
      { id: 't4_r2', name: 'Result 2', content: testCase4Result2Content },
      { id: 't4_r3', name: 'Result 3', content: testCase4Result3Content },
      { id: 't4_r4', name: 'Result 4', content: testCase4Result4Content },
      { id: 't4_r5', name: 'Result 5', content: testCase4Result5Content },
      { id: 't4_r6', name: 'Result 6', content: testCase4Result6Content },
      { id: 't4_r7', name: 'Result 7', content: testCase4Result7Content },
      { id: 't4_r8', name: 'Result 8', content: testCase4Result8Content },
      { id: 't4_r9', name: 'Result 9', content: testCase4Result9Content },
      { id: 't4_r10', name: 'Result 10', content: testCase4Result10Content },
      { id: 't4_r11', name: 'Result 11', content: testCase4Result11Content },
      { id: 't4_r12', name: 'Result 12', content: testCase4Result12Content },
      { id: 't4_r13', name: 'Result 13', content: testCase4Result13Content },
      { id: 't4_r14', name: 'Result 14', content: testCase4Result14Content },
      { id: 't4_r15', name: 'Result 15', content: testCase4Result15Content },
      { id: 't4_r16', name: 'Result 16', content: testCase4Result16Content },
      { id: 't4_r17', name: 'Result 17', content: testCase4Result17Content },
      { id: 't4_r18', name: 'Result 18', content: testCase4Result18Content },
      { id: 't4_r19', name: 'Result 19', content: testCase4Result19Content },
      { id: 't4_r20', name: 'Result 20', content: testCase4Result20Content },
      { id: 't4_r21', name: 'Result 21', content: testCase4Result21Content },
    ],
  },
];