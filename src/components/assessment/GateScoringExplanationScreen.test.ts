/**
 * Compile-time type verification for GateScoringExplanationScreen.tsx
 *
 * RED: imports from a module that doesn't exist yet → tsc fails.
 * GREEN: once the component is written with the correct props shape, tsc passes.
 *
 * TDD goal: verify the component module exists and exports a callable that
 * accepts { onContinue: () => void }. No React import required — shape
 * check is sufficient for compile-time verification without @types/react hoisting.
 */

import GateScoringExplanationScreen from './GateScoringExplanationScreen'

type Props = { onContinue: () => void }

// Component must be callable (function component) accepting the expected props.
// Assigning to a function type verifies the export is a callable with correct signature.
const _component: (props: Props) => unknown = GateScoringExplanationScreen
void _component
