import { lazy, Suspense, useEffect } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { getCoalitionMemberBySlug } from './data/coalitionCommittee';
import { useRouteSeo } from './lib/seo';

const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((module) => ({ default: module.AboutPage }))
);
const FrameworksPage = lazy(() =>
  import('./pages/CapabilityPages').then((module) => ({
    default: module.FrameworksPage,
  }))
);
const ProjectsPage = lazy(() =>
  import('./pages/CapabilityPages').then((module) => ({
    default: module.ProjectsPage,
  }))
);
const ToolsPage = lazy(() =>
  import('./pages/CapabilityPages').then((module) => ({
    default: module.ToolsPage,
  }))
);
const CoalitionCommitteeProfilePage = lazy(() =>
  import('./pages/CoalitionCommitteeProfilePage').then((module) => ({
    default: module.CoalitionCommitteeProfilePage,
  }))
);
const CoalitionPage = lazy(() =>
  import('./pages/CoalitionPage').then((module) => ({
    default: module.CoalitionPage,
  }))
);
const CareersPage = lazy(() =>
  import('./pages/EnquiryPages').then((module) => ({
    default: module.CareersPage,
  }))
);
const ContactPage = lazy(() =>
  import('./pages/EnquiryPages').then((module) => ({
    default: module.ContactPage,
  }))
);
const PartnershipsPage = lazy(() =>
  import('./pages/EnquiryPages').then((module) => ({
    default: module.PartnershipsPage,
  }))
);
const HomePage = lazy(() =>
  import('./pages/HomePage').then((module) => ({ default: module.HomePage }))
);
const InsightsPage = lazy(() =>
  import('./pages/InsightsPage').then((module) => ({
    default: module.InsightsPage,
  }))
);
const LeadershipPage = lazy(() =>
  import('./pages/LeadershipPage').then((module) => ({
    default: module.LeadershipPage,
  }))
);
const LeadershipProfilePage = lazy(() =>
  import('./pages/LeadershipProfilePage').then((module) => ({
    default: module.LeadershipProfilePage,
  }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((module) => ({
    default: module.NotFoundPage,
  }))
);
const AiEducationPage = lazy(() =>
  import('./pages/AiEducationPage').then((module) => ({
    default: module.AiEducationPage,
  }))
);
const AiForGoodPage = lazy(() =>
  import('./pages/ProgrammePages').then((module) => ({
    default: module.AiForGoodPage,
  }))
);
const PublicationDevelopmentPage = lazy(() =>
  import('./pages/PublicationDevelopmentPage').then((module) => ({
    default: module.PublicationDevelopmentPage,
  }))
);
const PublicationsPage = lazy(() =>
  import('./pages/PublicationsPage').then((module) => ({
    default: module.PublicationsPage,
  }))
);
const ReportsPage = lazy(() =>
  import('./pages/ReportsPage').then((module) => ({
    default: module.ReportsPage,
  }))
);
const ResearchPage = lazy(() =>
  import('./pages/ResearchPage').then((module) => ({
    default: module.ResearchPage,
  }))
);

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.slice(1);
      let observer: MutationObserver | null = null;
      let timer = 0;
      const scrollToTarget = () => {
        const el = document.getElementById(targetId);
        if (!el) return false;
        el.scrollIntoView();
        observer?.disconnect();
        window.clearTimeout(timer);
        return true;
      };

      if (scrollToTarget()) return;

      observer = new MutationObserver(scrollToTarget);
      observer.observe(document.getElementById('main-content') ?? document.body, {
        childList: true,
        subtree: true,
      });
      timer = window.setTimeout(() => {
        scrollToTarget();
        observer?.disconnect();
      }, 2000);

      return () => {
        window.clearTimeout(timer);
        observer?.disconnect();
      };
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export function AppShell() {
  const location = useLocation();
  useRouteSeo(location.pathname);
  const normalizedPath = location.pathname.replace(/\/+$/, '');
  const isLegacyProgrammesAnchor =
    location.pathname === '/' && location.hash === '#programmes';
  const committeeMatch = normalizedPath.match(
    /^\/atlas-global-south-ai-policy-coalition\/committee\/([^/]+)$/
  );
  const isCoalitionRoute =
    normalizedPath === '/atlas-global-south-ai-policy-coalition' ||
    Boolean(committeeMatch && getCoalitionMemberBySlug(committeeMatch[1]));

  return (
    <div className="min-h-screen flex flex-col bg-[var(--paper)] text-[var(--ink)]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-[var(--ink)] focus:text-[var(--white)] focus:px-4 focus:py-2"
      >
        Skip to main content
      </a>

      <Header />

      <main id="main-content" tabIndex={-1} className="atlas-site-main flex-1 bg-[var(--paper)] text-[var(--ink)]">
        <Suspense
          fallback={
            <div className="min-h-[40vh]" aria-busy="true" role="status">
              <span className="sr-only">Loading page</span>
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                isLegacyProgrammesAnchor ? (
                  <Navigate to="/projects/#learning-development" replace />
                ) : (
                  <HomePage />
                )
              }
            />
            <Route path="/about-atlas-ai-institute/" element={<AboutPage />} />
            <Route path="/leadership/" element={<LeadershipPage />} />
            <Route path="/leadership/:slug/" element={<LeadershipProfilePage />} />
            <Route path="/research/" element={<ResearchPage />} />
            <Route path="/frameworks/" element={<FrameworksPage />} />
            <Route
              path="/atlas-ai-governance/"
              element={<Navigate to="/research/" replace />}
            />
            <Route path="/tools/" element={<ToolsPage />} />
            <Route path="/projects/" element={<ProjectsPage />} />
            <Route path="/publications/" element={<PublicationsPage />} />
            <Route path="/reports/" element={<ReportsPage />} />
            <Route
              path="/publication-development/"
              element={<PublicationDevelopmentPage />}
            />
            <Route path="/ai-for-good/" element={<AiForGoodPage />} />
            <Route
              path="/ai-policy-governance-education/"
              element={<AiEducationPage />}
            />
            <Route
              path="/atlas-global-ai-dialogue/"
              element={
                <Navigate to="/projects/#learning-development" replace />
              }
            />
            <Route
              path="/atlas-global-south-ai-policy-coalition/"
              element={<CoalitionPage />}
            />
            <Route
              path="/atlas-global-south-ai-policy-coalition/committee/:slug/"
              element={<CoalitionCommitteeProfilePage />}
            />
            <Route path="/insights/" element={<InsightsPage />} />
            <Route path="/careers/" element={<CareersPage />} />
            <Route path="/partnerships/" element={<PartnershipsPage />} />
            <Route path="/contact/" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      {!isCoalitionRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <AppShell />
    </BrowserRouter>
  );
}
