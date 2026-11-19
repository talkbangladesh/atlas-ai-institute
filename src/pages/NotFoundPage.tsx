import { Button } from '../components/Button';
import { Eyebrow } from '../components/Eyebrow';

export function NotFoundPage() {
  return (
    <section aria-labelledby="not-found-heading" className="py-20 sm:py-28">
      <div className="atlas-container">
        <Eyebrow cobalt className="mb-4">
          404 / PAGE NOT FOUND
        </Eyebrow>
        <h1 id="not-found-heading" className="mb-6 max-w-[16ch]">
          Page Not Found
        </h1>
        <p className="atlas-lead mb-8">
          The requested page could not be located on Atlas AI Institute.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button to="/" variant="primary">
            Return to Homepage
          </Button>
          <Button to="/research/" variant="ghost">
            Explore Research
          </Button>
        </div>
      </div>
    </section>
  );
}
