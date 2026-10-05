import { cn } from '@/lib/utils';

type JourneyStep = {
  number: string;
  title: string;
  description: string;
};

type PatientJourneyProps = {
  steps: JourneyStep[];
  className?: string;
};

export function PatientJourney({ steps, className }: PatientJourneyProps) {
  return (
    <section className={cn('py-20 lg:py-32', className)}>
      <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-border" />

            <div className="grid grid-cols-4 gap-4">
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center text-center px-2">
                  {/* Number circle */}
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-background border-2 border-primary/20">
                    <span className="font-display text-xl font-500 text-primary">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-lg font-500 text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden">
          <div className="relative pl-12">
            {/* Vertical line */}
            <div className="absolute left-6 top-2 bottom-2 w-px bg-border" />

            <div className="space-y-8">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  {/* Number circle */}
                  <div className="absolute -left-12 flex h-12 w-12 items-center justify-center rounded-full bg-background border-2 border-primary/20">
                    <span className="font-display text-base font-500 text-primary">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-500 text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
