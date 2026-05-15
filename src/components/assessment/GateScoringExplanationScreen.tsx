type Props = {
  onContinue: () => void
}

export default function GateScoringExplanationScreen({ onContinue }: Props) {
  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-12 text-center">
      <h2 className="font-serif text-2xl text-text-primary">
        How your score is calculated
      </h2>

      <p className="text-base leading-relaxed text-text-muted">
        Your level is the highest level where{' '}
        <strong className="text-text-primary">every dimension</strong> meets its
        threshold — not an average.
      </p>

      <p className="text-base leading-relaxed text-text-muted">
        One dimension can hold you back even if the rest are strong. This is by
        design: it surfaces the one specific thing that is limiting your overall
        practice — your <em>binding constraint</em>.
      </p>

      <p className="text-base leading-relaxed text-text-muted">
        Here is where you landed and exactly why.
      </p>

      <button
        onClick={onContinue}
        className="mt-4 rounded-md bg-accent px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent-hover"
        type="button"
      >
        See my results
      </button>
    </div>
  )
}
