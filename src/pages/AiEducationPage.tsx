import { Button } from '../components/Button';
import { Eyebrow } from '../components/Eyebrow';
import { ProgrammeCard } from '../components/ProgrammeCard';
import {
  ATLAS_AI_EDUCATION_URL,
  EDUCATION_PROGRAMMES,
} from '../data/aiEducation';

const educationBenefits = [
  {
    title: 'Practical and policy-informed',
    description:
      "Learning grounded in Atlas AI Institute's research and governance work.",
  },
  {
    title: 'Accessible to everyone',
    description: 'Clear language, no technical background required.',
  },
  {
    title: 'Responsible by design',
    description: 'Safety, ethics and public interest in every programme.',
  },
] as const;

export function AiEducationPage() {
  const featuredProgrammes = EDUCATION_PROGRAMMES.filter(
    (programme) => programme.variant === 'featured'
  );
  const popularProgrammes = EDUCATION_PROGRAMMES.filter(
    (programme) => programme.variant === 'compact'
  );

  return (
    <div className="atlas-ai-education-page">
      <section
        aria-labelledby="ai-education-title"
        className="atlas-education-hero"
      >
        <div className="atlas-container">
          <Eyebrow className="mb-5">
            LEARNING &amp; DEVELOPMENT / ATLAS AI EDUCATION
          </Eyebrow>
          <h1 id="ai-education-title" className="mb-6 max-w-[18ch]">
            AI Education for Everyone
          </h1>
          <p className="mb-8 max-w-[66ch] text-[18px] leading-[1.6] text-[var(--muted)] sm:text-[20px]">
            Practical, responsible AI learning for citizens, students,
            professionals and institutions, from Atlas AI Institute.
          </p>

          <div className="mb-7 flex flex-col gap-3 sm:flex-row">
            <Button
              href={ATLAS_AI_EDUCATION_URL}
              external
              className="w-full sm:w-auto"
            >
              Explore Programmes
            </Button>
            <Button
              to="/"
              variant="ghost"
              showArrow={false}
              className="w-full sm:w-auto"
            >
              Back to Atlas AI Institute
            </Button>
          </div>

          <ul
            aria-label="Atlas AI Education programme information"
            className="atlas-education-trust-list"
          >
            <li>Live online classes</li>
            <li>Bangla and English</li>
            <li>Certificate on completion</li>
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="featured-programmes-title"
        className="atlas-education-section"
      >
        <div className="atlas-container">
          <Eyebrow className="mb-3">01 / FEATURED PROGRAMMES</Eyebrow>
          <h2 id="featured-programmes-title" className="mb-8 sm:mb-10">
            Featured Programmes
          </h2>
          <div className="atlas-education-programme-grid">
            {featuredProgrammes.map((programme) => (
              <ProgrammeCard key={programme.title} programme={programme} />
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="popular-programmes-title"
        className="atlas-education-section"
      >
        <div className="atlas-container">
          <Eyebrow className="mb-3">02 / POPULAR PROGRAMMES</Eyebrow>
          <h2 id="popular-programmes-title" className="mb-8 sm:mb-10">
            Popular Programmes
          </h2>
          <div className="atlas-education-programme-grid">
            {popularProgrammes.map((programme) => (
              <ProgrammeCard key={programme.title} programme={programme} />
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="why-atlas-education-title"
        className="atlas-education-section"
      >
        <div className="atlas-container">
          <Eyebrow className="mb-3">ATLAS AI EDUCATION</Eyebrow>
          <h2 id="why-atlas-education-title" className="mb-8 sm:mb-10">
            Why Atlas AI Education
          </h2>
          <ul className="atlas-education-benefits-grid">
            {educationBenefits.map((benefit) => (
              <li key={benefit.title} className="atlas-education-benefit">
                <h3 className="mb-2 text-[21px] font-semibold leading-[1.25]">
                  {benefit.title}
                </h3>
                <p className="text-[16px] leading-[1.6] text-[var(--muted)]">
                  {benefit.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        aria-labelledby="education-final-cta-title"
        className="atlas-education-section atlas-education-final-section"
      >
        <div className="atlas-container">
          <div className="atlas-education-final-cta">
            <div className="max-w-[62ch]">
              <Eyebrow className="mb-3 atlas-education-final-eyebrow">
                ATLAS AI INSTITUTE
              </Eyebrow>
              <h2
                id="education-final-cta-title"
                className="mb-4 text-[clamp(30px,4vw,44px)] text-white"
              >
                Start learning with Atlas AI Education
              </h2>
              <p className="text-[16px] leading-[1.65] text-white/90 sm:text-[17px]">
                Browse all programmes, check enrolment details and join the next
                cohort.
              </p>
            </div>
            <Button
              href={ATLAS_AI_EDUCATION_URL}
              external
              className="w-full shrink-0 sm:w-auto"
            >
              Visit Atlas AI Education
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
