interface FlowStep {
  index: string;
  title: string;
  description: string;
}

interface FlowStepsProps {
  steps: readonly FlowStep[];
}

export function FlowSteps({ steps }: FlowStepsProps) {
  return (
    <div className="relative">
      {/* Desktop horizontal 2px ink timeline track */}
      <div
        aria-hidden="true"
        className="hidden lg:block absolute top-[5px] left-0 right-0 h-[2px] bg-[var(--ink)]"
      />

      <ol className="relative list-none p-0 m-0 grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-6 border-l-2 border-[var(--ink)] lg:border-l-0 pl-6 lg:pl-0">
        {steps.map((step) => (
          <li key={step.index} className="relative lg:pt-8">
            {/* Square node */}
            <span
              aria-hidden="true"
              className="absolute -left-[31px] top-[6px] lg:left-0 lg:top-0 w-3 h-3 bg-[var(--paper)] border-2 border-[var(--ink)]"
            />
            <span className="font-[var(--font-mono)] text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--cobalt)] block mb-2 tabular-nums">
              {step.index}
            </span>
            <h3 className="text-[19px] leading-[1.25] font-semibold text-[var(--ink)] mb-2">
              {step.title}
            </h3>
            <p className="text-[15px] leading-[1.6] text-[var(--muted)]">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
