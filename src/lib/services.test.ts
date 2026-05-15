/**
 * Compile-time type verification for services.ts
 *
 * RED: this file imports from a module that doesn't exist yet → tsc fails.
 * GREEN: once services.ts is written with the correct shape, tsc passes.
 *
 * Type-level proof that the services registry includes the AI Readiness
 * Assessment entry (href: '/services/ai-readiness-assessment').
 */

import type { ServiceEntry } from './services'
import { services } from './services'

// ---------------------------------------------------------------------------
// Shape checks
// ---------------------------------------------------------------------------

// services must be a ReadonlyArray<ServiceEntry>
const _services: ReadonlyArray<ServiceEntry> = services
void _services

// ServiceEntry must have the required fields
const _shapeCheck: ServiceEntry = {
  title: 'Test',
  description: 'Test description',
  href: '/test',
  cta: 'Learn more'
}
void _shapeCheck

// ---------------------------------------------------------------------------
// Content correctness — type-level proof that the AI Readiness Assessment
// entry is present in the registry. This fails to compile if the href
// '/services/ai-readiness-assessment' is not in the services array.
// ---------------------------------------------------------------------------

type ServiceHrefs = (typeof services)[number]['href']
type HasAIReadinessEntry =
  '/services/ai-readiness-assessment' extends ServiceHrefs ? true : false
const _hasEntry: HasAIReadinessEntry = true
void _hasEntry
