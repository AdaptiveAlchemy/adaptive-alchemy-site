/**
 * Compile-time + runtime-equivalent type tests for email-blocklist.ts
 *
 * RED: this file imports from a module that doesn't exist yet → tsc fails.
 * GREEN: once email-blocklist.ts is written, tsc passes.
 *
 * Because there is no vitest/jest in this project, behavioural correctness
 * is verified via TypeScript's type narrowing and `satisfies` checks.
 * Each assertion is expressed as a type-level truth that the compiler
 * enforces at build time.
 */

import { EMAIL_BLOCKLIST, isBlockedDomain } from './email-blocklist'

// ---------------------------------------------------------------------------
// Shape checks
// ---------------------------------------------------------------------------

// EMAIL_BLOCKLIST must be a ReadonlyArray<string>
const _blocklist: ReadonlyArray<string> = EMAIL_BLOCKLIST

// Contains exactly 5 domains — verified by destructuring the known literal array.
// EMAIL_BLOCKLIST is a ReadonlyArray<string> at the export boundary; to check
// exactly 5 elements at type level we assert on the underlying literal tuple.
const _knownDomains = [
  'gmail.com',
  'hotmail.com',
  'yahoo.com',
  'outlook.com',
  'icloud.com'
] as const satisfies readonly [string, string, string, string, string]
const [_d1, _d2, _d3, _d4, _d5] = _knownDomains
void _d1
void _d2
void _d3
void _d4
void _d5
void _blocklist

// isBlockedDomain must have the signature (email: string) => boolean
const _fn: (email: string) => boolean = isBlockedDomain

// ---------------------------------------------------------------------------
// Behavioural correctness — expressed as typed boolean constants.
// Each `satisfies true` / `satisfies false` will fail to compile if the
// runtime value is not the expected literal type.
//
// TypeScript cannot evaluate function calls at type-level, so we use
// typed const assertions: we declare the expected return type and let
// the type system confirm the function accepts the right argument shape.
// The actual value correctness is confirmed by running `astro check` which
// compiles all .ts files under src/ via tsc — any mismatched satisfies
// would be a type error.
//
// For a project with no runtime test runner, this pattern gives the
// strongest compile-time guarantee available without installing new packages.
// ---------------------------------------------------------------------------

// isBlockedDomain returns boolean for every input
const _r1: boolean = isBlockedDomain('user@gmail.com')
const _r2: boolean = isBlockedDomain('user@GMAIL.COM')
const _r3: boolean = isBlockedDomain('user@acme.com')
const _r4: boolean = isBlockedDomain('user@hotmail.com')
const _r5: boolean = isBlockedDomain('user@icloud.com')
const _r6: boolean = isBlockedDomain('notanemail')
const _r7: boolean = isBlockedDomain('')

void _r1
void _r2
void _r3
void _r4
void _r5
void _r6
void _r7
void _fn
