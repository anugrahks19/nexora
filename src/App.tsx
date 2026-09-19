import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, Check, ChevronRight, Menu, Paperclip, X } from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { KineticText } from '@/components/ui/kinetic-text';
import { ArrowFillButton } from '@/components/ui/arrow-fill-button';
import { AnimatedTestimonials } from '@/components/ui/testimonial';
import { CircularRevealHeading } from '@/components/ui/circular-reveal-heading';
import CircularSplitRoll from '@/components/ui/circular-split-roll';
import { NexoraSharedTabs } from '@/components/ui/nexora-shared-tabs';
import { cn } from '@/lib/utils';

const queryClient = new QueryClient();
const auditorium = '/assets/nexora-acoustic-hero.jpg';

const services = [
  {
    id: 1,
    number: '[ 01 ]',
    title: 'Architectural Acoustics',
    sub: 'Designing spaces that sound right',
    subtitle: 'Designing spaces that sound right',
    body: 'Statutory compliance, speech privacy thresholds, and partition sound insulation across commercial, civic, and residential spaces.',
    description: 'Statutory compliance, speech privacy thresholds, and partition sound insulation across commercial, civic, and residential spaces.',
    tags: 'Room Acoustics  •  Sound Insulation  •  Reverberation Control  •  Speech Privacy',
    image: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=800&q=80',
    badge: 'Building Design',
  },
  {
    id: 2,
    number: '[ 02 ]',
    title: 'Mechanical Acoustics',
    sub: 'Controlling building services noise',
    subtitle: 'Controlling building services noise',
    body: 'Targeted noise and vibration attenuation for HVAC chillers, plant rooms, ductwork paths, and MEP riser penetrations.',
    description: 'Targeted noise and vibration attenuation for HVAC chillers, plant rooms, ductwork paths, and MEP riser penetrations.',
    tags: 'HVAC Attenuation  •  Plant Rooms  •  Duct-Borne Noise  •  Vibration Isolation',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    badge: 'MEP Engineering',
  },
  {
    id: 3,
    number: '[ 03 ]',
    title: 'Noise & Vibration Control',
    sub: 'Identify. Assess. Predict. Control.',
    subtitle: 'Identify. Assess. Predict. Control.',
    body: 'Environmental noise surveys, 3D ray-tracing sound propagation models, and structural vibration isolation strategies.',
    description: 'Environmental noise surveys, 3D ray-tracing sound propagation models, and structural vibration isolation strategies.',
    tags: 'Noise Assessment  •  3D Ray Tracing  •  Prediction  •  Mitigation',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    badge: 'Environmental & Site',
  },
  {
    id: 4,
    number: '[ 04 ]',
    title: 'Acoustic Testing',
    sub: 'Measure performance. Verify results.',
    subtitle: 'Measure performance. Verify results.',
    body: 'On-site precision commissioning testing for sound insulation (DnTw / ASTC), room reverberation (RT60), and noise criteria (NC / NR).',
    description: 'On-site precision commissioning testing for sound insulation (DnTw / ASTC), room reverberation (RT60), and noise criteria (NC / NR).',
    tags: 'Sound Insulation (DnTw)  •  RT60 Testing  •  NC/NR Verification  •  Certification',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    badge: 'Commissioning',
  },
  {
    id: 5,
    number: '[ 05 ]',
    title: 'Specialist Venues',
    sub: 'High-clarity acoustic environments',
    subtitle: 'High-clarity acoustic environments',
    body: 'Tuned timber acoustic baffles, flutter echo mitigation, and studio-grade sound isolation for auditoriums, studios, and cinemas.',
    description: 'Tuned timber acoustic baffles, flutter echo mitigation, and studio-grade sound isolation for auditoriums, studios, and cinemas.',
    tags: 'Auditoriums  •  Recording Studios  •  Cinemas  •  Performance Halls',
    image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80',
    badge: 'Acoustic Architecture',
  },
];

const sectors = [
  {
    name: 'Residential & Mixed-Use',
    title: 'Residential & Mixed-Use',
    quote: 'Statutory acoustic compliance, internal speech privacy thresholds, and sound insulation detailing for multi-residential towers, apartments, residential estates, and mixed-use developments to ensure peaceful living spaces.',
    src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Hotels & Hospitality',
    title: 'Hotels & Hospitality',
    quote: 'High-performance inter-room partition isolation, mechanical plant vibration control, and quiet air distribution ensuring five-star acoustic comfort for luxury guestrooms, dining venues, and conference facilities.',
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Commercial & Workspaces',
    title: 'Commercial & Workspaces',
    quote: 'Speech privacy engineering, room reverberation tuning, and facade noise control for corporate headquarters, open-plan workspaces, confidential meeting rooms, and modern tenant fit-outs.',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Entertainment & Public Buildings',
    title: 'Entertainment & Public Buildings',
    quote: 'Room acoustic shaping, tailored acoustic absorption, and building envelope sound isolation designed specifically for auditoriums, cinemas, theatres, public libraries, and civic assembly spaces.',
    src: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=1200&q=80',
  },
  {
    name: 'Infrastructure & Specialised Facilities',
    title: 'Infrastructure & Specialised Facilities',
    quote: 'Industrial noise mitigation, heavy MEP structural vibration isolation, and precision acoustic testing for hospital wards, data centres, transport interchanges, and testing laboratories.',
    src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  },
];

const whyNexoraItems = [
  {
    number: '[ 01 ]',
    title: 'Specialised acoustic engineering expertise',
    body: 'Focused technical knowledge across architectural and mechanical acoustics.',
  },
  {
    number: '[ 02 ]',
    title: 'Performance-driven acoustic design',
    body: 'Evidence-based design ensuring compliance, comfort, and operational excellence.',
  },
  {
    number: '[ 03 ]',
    title: 'Practical, cost-effective solutions',
    body: 'Solutions selected to balance acoustic performance, constructability, and project cost.',
  },
  {
    number: '[ 04 ]',
    title: 'Detailed technical analysis',
    body: 'Acoustic calculations, assessments, reports, and design recommendations.',
  },
  {
    number: '[ 05 ]',
    title: 'International acoustic standards',
    body: 'Solutions developed with applicable project criteria and recognized standards in mind.',
  },
  {
    number: '[ 06 ]',
    title: 'Project-focused collaboration',
    body: 'Close coordination with architects, engineers, contractors, developers, and owners.',
  },
];

const processItems = [
  {
    text: 'UNDERSTAND',
    title: 'Understand',
    number: '01',
    summary: 'Set goals and constraints.',
    description: 'Statutory acoustic criteria, architectural intentions, privacy thresholds, and noise baselines.',
    deliverables: 'Acoustic brief · Benchmark targets',
  },
  {
    text: 'ANALYSE',
    title: 'Analyse',
    number: '02',
    summary: 'Study sources and paths.',
    description: '3D ray tracing, computational reverberation (RT60), transmission loss, and HVAC paths.',
    deliverables: '3D ray models · RT60 simulations',
  },
  {
    text: 'ENGINEER',
    title: 'Engineer',
    number: '03',
    summary: 'Build the right strategy.',
    description: 'Bespoke partition buildups, floating floors, timber absorption baffles, and attenuators.',
    deliverables: 'Partition schedules · Material specs',
  },
  {
    text: 'COORDINATE',
    title: 'Coordinate',
    number: '04',
    summary: 'Integrate with the design.',
    description: 'Cross-disciplinary detailing with architects, MEP consultants, and contractors.',
    deliverables: 'BIM integration · Flanking detailing',
  },
  {
    text: 'VERIFY',
    title: 'Verify',
    number: '05',
    summary: 'Measure the result.',
    description: 'On-site precision commissioning for sound insulation (DnTw) and background noise (NC/NR).',
    deliverables: 'Insulation testing · RT60 verification',
  },
];

function Reveal({ children, className = '', delay = '' }: { children: ReactNode; className?: string; delay?: string }) {
  const [visible, setVisible] = useState(false);
  return <div className={`reveal ${visible ? 'visible' : ''} ${delay} ${className}`} ref={(element) => {
    if (!element || visible) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: .08 });
    observer.observe(element);
  }}>{children}</div>;
}

function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <a href="#home" className="flex items-center" data-testid="link-logo">
      <div 
        className={`h-6 sm:h-7 md:h-8 w-48 sm:w-56 ${inverted ? 'bg-white' : 'bg-[hsl(var(--primary))]'}`}
        style={{ 
          maskImage: 'url(/logo.png)', 
          WebkitMaskImage: 'url(/logo.png)', 
          maskSize: 'contain', 
          WebkitMaskSize: 'contain', 
          maskRepeat: 'no-repeat', 
          WebkitMaskRepeat: 'no-repeat', 
          maskPosition: 'left center', 
          WebkitMaskPosition: 'left center' 
        }} 
      />
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    const observers = ['home', 'about', 'services', 'sectors', 'process', 'why-nexora', 'contact'].map((id) => {
      const node = document.getElementById(id);
      if (!node) return null;
      const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setActive(id); }, { rootMargin: '-25% 0px -60% 0px' });
      observer.observe(node); return observer;
    });
    return () => { window.removeEventListener('scroll', onScroll); observers.forEach((observer) => observer?.disconnect()); };
  }, []);
  const links = [['home', 'Home'], ['about', 'About'], ['services', 'Services'], ['sectors', 'Sectors'], ['process', 'Process'], ['why-nexora', 'Why Nexora'], ['contact', 'Contact']];
  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${scrolled ? 'bg-[hsl(var(--background)/75%)] backdrop-blur-xl border-b border-[hsl(var(--border)/40%)] shadow-sm' : 'bg-transparent border-b border-transparent'}`}>
        <div className="container-nx flex h-[68px] sm:h-[72px] lg:h-[76px] items-center justify-between">
          <Logo />
          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-7 lg:gap-8 xl:gap-9 lg:flex" aria-label="Primary navigation">
            {links.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={`nav-link mono text-[.64rem] ${active === id ? 'active' : ''}`} data-testid={`link-nav-${id}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            {/* "Start an enquiry" button shown on sm tablet and desktop */}
            <ArrowFillButton
              href="#contact"
              variant="primary"
              size="sm"
              className="hidden sm:inline-flex"
              data-testid="link-nav-enquiry"
              btnText="Start an enquiry"
            />
            {/* Mobile menu toggle (three slash / hamburger button) */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="border border-[hsl(var(--foreground)/.25)] p-2 lg:hidden cursor-pointer hover:bg-[hsl(var(--card))] transition-colors rounded-sm"
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              data-testid="button-mobile-menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer (Opened via the hamburger button) */}
      {open && (
        <div className="fixed inset-x-0 top-[68px] sm:top-[72px] lg:hidden bottom-0 z-50 overflow-y-auto bg-[hsl(var(--background))] border-t border-[hsl(var(--border))] shadow-2xl">
          <nav className="container-nx py-6 sm:py-8 flex flex-col justify-between min-h-[calc(100dvh-68px)] sm:min-h-[calc(100dvh-72px)]" aria-label="Mobile navigation menu">
            <div className="flex flex-col divide-y divide-[hsl(var(--border)/60%)]">
              {links.map(([id, label]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`mono flex items-center justify-between py-4 text-sm tracking-wider uppercase transition-colors ${
                    active === id ? 'text-[hsl(var(--accent))] font-bold' : 'text-[hsl(var(--foreground))] hover:text-[hsl(var(--accent))]'
                  }`}
                  data-testid={`link-mobile-${id}`}
                >
                  <span>{label}</span>
                  <span className="text-xs opacity-40">→</span>
                </a>
              ))}
            </div>
            <div className="pt-8 pb-12 mt-6 border-t border-[hsl(var(--border))] shrink-0">
              <ArrowFillButton
                href="#contact"
                onClick={() => setOpen(false)}
                variant="primary"
                size="default"
                className="w-full justify-center"
                data-testid="link-mobile-enquiry"
                btnText="Start an enquiry"
              />
              <p className="mt-4 text-center mono text-[0.62rem] text-[hsl(var(--muted-foreground))]">
                Nexora Acoustic Engineering Services
              </p>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

function Hero() {
  return <section id="home" className="relative min-h-[calc(100vh-68px)] lg:min-h-[calc(100vh-76px)] overflow-hidden pt-[68px] sm:pt-[72px] lg:pt-[76px] flex flex-col justify-start">

    <div className="container-nx relative z-10 w-full pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-16">
      <div className="grid lg:grid-cols-12 gap-8 xl:gap-12 items-start">
        <div className="lg:col-span-6 xl:col-span-5 pr-0 relative">
          <Reveal delay="reveal-delay-1"><KineticText as="h1" className="display text-[clamp(2.2rem,4vw,3.5rem)] leading-[1.05] tracking-[-0.02em] [font-optical-sizing:auto]" data-testid="heading-hero">Creating better<br />spaces through<br />acoustic<br />excellence.</KineticText></Reveal>
          <Reveal delay="reveal-delay-2"><p className="mt-5 sm:mt-6 max-w-[480px] text-[1.05rem] leading-relaxed text-[hsl(var(--muted-foreground))]">Engineering-driven acoustic solutions for quieter, better-performing spaces.</p></Reveal>
          <Reveal delay="reveal-delay-3"><div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4"><ArrowFillButton href="#contact" variant="primary" size="default" data-testid="link-hero-contact" btnText="Discuss your project" /></div></Reveal>
          <div className="mt-8 hidden items-center gap-3 lg:flex"><span className="mono text-[.6rem] text-[hsl(var(--muted-foreground))]">Scroll to explore</span><span className="h-px w-14 bg-[hsl(var(--border))]" /></div>

          {/* Mobile responsive image display */}
          <div className="mt-8 relative w-full h-[280px] sm:h-[380px] overflow-hidden border border-[hsl(var(--border))] rounded-2xl lg:hidden">
            <img src={auditorium} alt="World-class acoustic auditorium with curved timber sound diffusion architecture" className="cinematic-img h-full w-full object-cover object-center" referrerPolicy="no-referrer" data-testid="img-hero-auditorium-mobile" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2.5 bg-[hsl(var(--background)/92%)] backdrop-blur-sm px-3 py-1.5 border border-[hsl(var(--border))] rounded-lg">
              <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
              <span className="mono text-[.55rem]">Sound, shaped by space</span>
            </div>
          </div>
        </div>
        
        {/* Desktop right-aligned image as a rounded floating card */}
        <div className="hidden lg:block lg:col-span-6 xl:col-span-7 relative h-[45vh] min-h-[380px] max-h-[500px] mt-2 -mr-8 lg:-mr-12 xl:-mr-20 2xl:-mr-32 rounded-[2rem] overflow-hidden shadow-[0_40px_100px_rgba(40,30,20,0.15)] border border-[hsl(var(--border)/40%)]">
          <img src={auditorium} alt="World-class acoustic auditorium" className="hero-image cinematic-img h-full w-full object-cover object-center" referrerPolicy="no-referrer" data-testid="img-hero-auditorium" />
          <div className="absolute bottom-6 right-6 flex items-center gap-3 bg-[hsl(var(--background)/92%)] backdrop-blur-md px-4 py-2 rounded-xl border border-[hsl(var(--border))] text-[hsl(var(--foreground))] shadow-md">
            <span className="h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
            <span className="mono text-[.58rem]">Sound, shaped by space</span>
          </div>
        </div>
      </div>
    </div>

  </section>;
}

function Intro() {
  return (
    <section id="about" className="border-y border-[hsl(var(--border))] py-16 md:py-24">
      <div className="container-nx">
        <Reveal>
          <NexoraSharedTabs />
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="relative border-b border-[hsl(var(--border))] py-12 md:py-16 overflow-hidden">
      {/* Circular Split Roll: One side heading, the other side a box with details */}
      <div className="w-full">
        <CircularSplitRoll
          items={services}
          radius={380}
          cardWidth={370}
          cardHeight={270}
          sectionHeight={70}
          titleSize="clamp(1.85rem, 3.2vw, 3.15rem)"
          columnSpreadVw={3.5}
          columnOffsetPx={420}
          className="w-full"
        />
      </div>
    </section>
  );
}

function Sectors() {
  return <section id="sectors" className="py-20 md:py-28">
    <div className="container-nx">
      <div>
        <AnimatedTestimonials
          testimonials={sectors}
          autoplay={false}
          themeAware={true}
          className="w-full px-0 py-6 font-sans antialiased"
        />
      </div>
    </div>
  </section>;
}

function Process() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section id="process" className="relative border-b border-[hsl(var(--border))] py-20 md:py-28 lg:py-32 overflow-hidden">
      <div className="container-nx">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8 xl:gap-14">
          {/* Left Column: Heading, Description & Stage Selectors */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal>
              <h2 className="display text-[clamp(1.85rem,3.2vw,3.15rem)] leading-[1.08] tracking-[-0.02em]">
                Our methodology.
              </h2>
              <p className="mt-6 text-[1.02rem] sm:text-[1.08rem] leading-7 text-[hsl(var(--muted-foreground))] max-w-[480px]">
                From initial acoustic benchmarking to final on-site verification, explore each phase of our structured process around the circular dial.
              </p>
            </Reveal>

            {/* Quick Stage Selector Bar for Touch and Desktop Navigation */}
            <Reveal delay="reveal-delay-2" className="mt-8 sm:mt-10">
              <div className="flex flex-wrap items-center gap-2">
                {processItems.map((step, idx) => {
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={step.number}
                      type="button"
                      onMouseEnter={() => setActiveStep(idx)}
                      onClick={() => setActiveStep(activeStep === idx ? null : idx)}
                      className={cn(
                        "mono px-3 py-1.5 text-[0.68rem] sm:text-xs transition-all duration-200 border cursor-pointer",
                        isActive
                          ? "border-[hsl(var(--accent))] bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] font-bold shadow-sm"
                          : "border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--foreground)/0.4)] hover:text-[hsl(var(--foreground))]"
                      )}
                      aria-label={`Select stage ${step.number} ${step.title}`}
                    >
                      <span className="opacity-75 mr-1.5">{step.number}</span>
                      <span>{step.title}</span>
                    </button>
                  );
                })}
              </div>

              <p className="mono mt-5 text-[0.62rem] uppercase tracking-widest text-[hsl(var(--muted-foreground))]">
                {activeStep !== null
                  ? `Active: Stage ${processItems[activeStep].number} — ${processItems[activeStep].title}`
                  : "Interactive Dial · Hover or click a stage"}
              </p>
            </Reveal>
          </div>

          {/* Right Column: Circular Methodology Dial */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end">
            <Reveal delay="reveal-delay-2" className="w-full flex items-center justify-center lg:justify-end">
              <div className="relative flex items-center justify-center p-2 sm:p-4">
                <CircularRevealHeading
                  items={processItems}
                  activeItem={activeStep}
                  onActiveChange={setActiveStep}
                  size="xl"
                  mode="text"
                  variant="theme"
                  centerText={
                    <div className="flex flex-col items-center justify-center p-2 select-none">
                      <span className="mono text-[0.55rem] sm:text-[0.62rem] tracking-[0.24em] uppercase text-[hsl(var(--accent))] mb-1 font-semibold">
                        Methodology
                      </span>
                      <span className="display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[hsl(var(--foreground))]">
                        Our Process
                      </span>
                      <p className="mt-2 text-[0.66rem] sm:text-[0.74rem] text-[hsl(var(--muted-foreground))] max-w-[240px] leading-relaxed">
                        Hover each stage along the circumference to inspect details.
                      </p>
                      <div className="mt-3 flex items-center gap-1.5 mono text-[0.52rem] sm:text-[0.58rem] text-[hsl(var(--accent))] uppercase tracking-widest">
                        <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--accent))] animate-pulse" />
                        5 Interactive Stages
                      </div>
                    </div>
                  }
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyNexora() {
  return (
    <section id="why-nexora" className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted))] py-20 md:py-28">
      <div className="container-nx">
        <Reveal>
          <div>
            <span className="mono text-[.64rem] tracking-[.2em] uppercase text-[hsl(var(--accent))]">
              Why Nexora
            </span>
            <h2 className="display mt-3 max-w-[680px] text-[clamp(1.85rem,3.2vw,3.15rem)] leading-[1.08] tracking-[-0.02em]">
              Built around<br />performance, practicality,<br />and precision.
            </h2>
            <p className="mt-5 max-w-[550px] text-[1.05rem] leading-7 text-[hsl(var(--muted-foreground))]">
              Practical acoustic solutions for real project requirements.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 grid-border-t grid-border-l">
          {whyNexoraItems.map((item, index) => (
            <Reveal key={item.number} delay={`reveal-delay-${(index % 3) + 1}`} className="h-full">
              <article
                className="group relative flex h-full flex-col justify-between grid-border-b grid-border-r bg-[hsl(var(--background)/40%)] p-8 sm:p-10 transition-all duration-300 ease-out hover:bg-[hsl(var(--card))] cursor-default overflow-hidden"
                data-testid={`why-nexora-card-${item.number}`}
              >
                {/* Subtle top indicator on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[hsl(var(--accent))] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="mono text-[.65rem] font-semibold tracking-[0.2em] text-[hsl(var(--muted-foreground))] transition-colors duration-300 group-hover:text-[hsl(var(--accent))]">
                      {item.number}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--foreground)/.15)] transition-colors duration-300 group-hover:bg-[hsl(var(--accent))]" />
                  </div>

                  <h3 className="display text-xl sm:text-[1.35rem] leading-[1.25] text-[hsl(var(--foreground))] transition-colors duration-200">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-[0.92rem] sm:text-[0.98rem] leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {item.body}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { setError('Please complete the required fields before submitting.'); form.reportValidity(); return; }
    setError(''); setSubmitted(true); form.reset(); setStep(1);
  };

  const handleNext = () => {
    const form = document.getElementById('contact-form') as HTMLFormElement;
    if (form) {
      const name = form.elements.namedItem('name') as HTMLInputElement;
      const company = form.elements.namedItem('company') as HTMLInputElement;
      const email = form.elements.namedItem('email') as HTMLInputElement;
      
      if (!name.checkValidity()) { name.reportValidity(); return; }
      if (!company.checkValidity()) { company.reportValidity(); return; }
      if (!email.checkValidity()) { email.reportValidity(); return; }
    }
    setStep(2);
  };

  return (
    <section id="contact" className="bg-[hsl(var(--primary))] py-20 text-[hsl(var(--primary-foreground))] md:py-28">
      <div className="container-nx">
        <div className="grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <Reveal>
              <h2 className="display text-[clamp(1.85rem,3.2vw,3.15rem)] leading-[1.08] tracking-[-0.02em]">Let's create<br />better acoustic<br />environments.</h2>
              <p className="mt-9 max-w-[440px] leading-7 text-[hsl(var(--primary-foreground)/.68)]">Design, assessment, noise control, or testing—we can help.</p>
              <div className="mt-12 border-t border-[hsl(var(--primary-foreground)/.18)] pt-6">
                <p className="mono text-[.62rem] text-[hsl(var(--accent))]">What can we help with?</p>
                <p className="mt-4 max-w-[400px] text-[.9rem] leading-7 text-[hsl(var(--primary-foreground)/.66)]">Design  ·  HVAC  ·  Noise  ·  Vibration  ·  Testing  ·  Sound insulation</p>
              </div>
            </Reveal>
          </div>
          
          <Reveal delay="reveal-delay-1">
            <div className="bg-[hsl(var(--background))] p-8 text-[hsl(var(--foreground))] md:p-12 rounded-3xl shadow-xl">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <h3 className="display text-[clamp(1.6rem,2.8vw,2.2rem)] leading-[1.12]">Tell us about<br />your project.</h3>
                </div>
                <span className="mono hidden text-[.6rem] text-[hsl(var(--muted-foreground))] sm:block">Step {step} of 2</span>
              </div>
              
              {submitted ? (
                <div className="flex min-h-[350px] flex-col items-center justify-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]"><Check size={25} /></span>
                  <h3 className="display mt-7 text-4xl">Thank you.</h3>
                  <p className="mt-4 max-w-[340px] leading-7 text-[hsl(var(--muted-foreground))]">Your enquiry has been received.</p>
                  <ArrowFillButton type="button" onClick={() => setSubmitted(false)} variant="quiet" size="default" className="mt-8" data-testid="button-new-enquiry" btnText="Send another enquiry" />
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} className="flex flex-col min-h-[350px]">
                  
                  {/* Step 1 */}
                  <div className={step === 1 ? 'block' : 'hidden'}>
                    <div className="grid gap-7 sm:grid-cols-2">
                      <label><span className="form-label">Name <b aria-hidden="true">*</b></span><input className="input-nx" name="name" required placeholder="Your name" data-testid="input-name" /></label>
                      <label><span className="form-label">Company <b aria-hidden="true">*</b></span><input className="input-nx" name="company" required placeholder="Company name" data-testid="input-company" /></label>
                      <label><span className="form-label">Email <b aria-hidden="true">*</b></span><input className="input-nx" type="email" name="email" required placeholder="you@company.com" data-testid="input-email" /></label>
                      <label><span className="form-label">Phone</span><input className="input-nx" type="tel" name="phone" placeholder="+00 000 000 000" data-testid="input-phone" /></label>
                    </div>
                    <div className="mt-10 flex justify-end">
                      <ArrowFillButton type="button" onClick={handleNext} variant="primary" size="default" className="w-full sm:w-auto" btnText="Next step" />
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className={step === 2 ? 'block' : 'hidden'}>
                    <div className="grid gap-7 sm:grid-cols-2">
                      <label><span className="form-label">Project type <b aria-hidden="true">*</b></span>
                        <select className="input-nx" name="projectType" required defaultValue="" data-testid="select-project-type">
                          <option value="" disabled>Select a project type</option>
                          <option>Residential & Mixed-Use</option>
                          <option>Hotels & Hospitality</option>
                          <option>Commercial</option>
                          <option>Entertainment & Public Buildings</option>
                          <option>Infrastructure & Specialised Facilities</option>
                          <option>Other</option>
                        </select>
                      </label>
                      <label><span className="form-label">Location <b aria-hidden="true">*</b></span><input className="input-nx" name="location" required placeholder="City, country" data-testid="input-location" /></label>
                    </div>
                    
                    <label className="mt-8 block"><span className="form-label">Acoustic requirements <b aria-hidden="true">*</b></span><textarea className="input-nx min-h-[90px]" name="requirements" required placeholder="Tell us about your project" data-testid="textarea-requirements" /></label>
                    
                    <label className="mt-6 flex cursor-pointer items-center gap-3 text-[.8rem] text-[hsl(var(--muted-foreground))]"><Paperclip size={15} /><span>Attach project information</span><input type="file" name="attachment" className="sr-only" data-testid="input-attachment" /><span className="mono border border-[hsl(var(--border))] px-2 py-1 text-[.56rem]">Choose file</span></label>
                    
                    {error && <p role="alert" className="form-error mt-5">{error}</p>}
                    
                    <div className="mt-9 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
                      <button type="button" onClick={() => setStep(1)} className="text-[.8rem] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] underline underline-offset-4">← Back</button>
                      <ArrowFillButton type="submit" variant="primary" size="default" className="w-full sm:w-auto justify-center" data-testid="button-submit-enquiry" btnText="Submit enquiry" />
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-6">
                    <p className="text-[.7rem] text-[hsl(var(--muted-foreground))] text-center sm:text-left">Your project details stay with Nexora.</p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative flex flex-col items-center justify-center overflow-hidden bg-[hsl(var(--primary))] pt-24 md:pt-32 pb-0 text-[hsl(var(--primary-foreground))]">
      <div className="container-nx relative z-10 w-full rounded-[32px] bg-[hsl(var(--background))] p-8 md:pt-10 md:px-12 md:pb-6 text-[hsl(var(--foreground))] mb-24 shadow-[0_40px_100px_rgba(40,30,20,0.25),0_15px_40px_rgba(40,30,20,0.15)]">
        
        {/* Top CTA Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-10 mb-10 border-b border-[hsl(var(--border))]">
          <div className="flex flex-col gap-2">
            <h3 className="display text-[1.8rem]">Have an acoustic challenge?</h3>
            <p className="text-[hsl(var(--muted-foreground))] text-[1rem]">Let's engineer the right solution.</p>
          </div>
          <ArrowFillButton href="#contact" variant="primary" size="default" btnText="Start an enquiry" />
        </div>

        <div className="grid gap-8 md:grid-cols-12">
          
          <div className="md:col-span-7 lg:col-span-6 flex flex-col">
            <Logo />
            <div className="mt-6">
              <h3 className="display text-[1.6rem] leading-[1.15]">Acoustic engineering<br />for better-performing spaces.</h3>
              <p className="mono text-[.6rem] text-[hsl(var(--muted-foreground))] tracking-[0.1em] uppercase mt-5">
                Design • Assessment • Noise Control • Testing
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <a href="https://www.instagram.com/nexoraacoustics" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 border border-[hsl(var(--border))] rounded-full text-[.75rem] font-medium transition-colors hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]">
                Instagram <span className="opacity-50 text-[.6rem]">↗</span>
              </a>
              <a href="https://www.linkedin.com/in/nexoraacoustics" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2 border border-[hsl(var(--border))] rounded-full text-[.75rem] font-medium transition-colors hover:bg-[hsl(var(--foreground))] hover:text-[hsl(var(--background))]">
                LinkedIn <span className="opacity-50 text-[.6rem]">↗</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-5 lg:col-span-6 grid grid-cols-2 gap-6 md:pl-12 pt-2">
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-[.85rem] tracking-wide uppercase text-[hsl(var(--muted-foreground))]">Services</h4>
              <div className="flex flex-col gap-3 text-[.85rem] font-medium text-[hsl(var(--foreground))]">
                <a href="#services" className="hover:text-[hsl(var(--accent))] transition-colors">Design</a>
                <a href="#services" className="hover:text-[hsl(var(--accent))] transition-colors">Assessment</a>
                <a href="#services" className="hover:text-[hsl(var(--accent))] transition-colors">Noise Control</a>
                <a href="#services" className="hover:text-[hsl(var(--accent))] transition-colors">Testing</a>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="font-bold text-[.85rem] tracking-wide uppercase text-[hsl(var(--muted-foreground))]">Company</h4>
              <div className="flex flex-col gap-3 text-[.85rem] font-medium text-[hsl(var(--foreground))]">
                <a href="#about" className="hover:text-[hsl(var(--accent))] transition-colors">About</a>
                <a href="#sectors" className="hover:text-[hsl(var(--accent))] transition-colors">Sectors</a>
                <a href="#process" className="hover:text-[hsl(var(--accent))] transition-colors">Process</a>
                <a href="#contact" className="hover:text-[hsl(var(--accent))] transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-[hsl(var(--border))] flex flex-col md:flex-row justify-between items-center gap-4 text-[.7rem] text-[hsl(var(--muted-foreground))] opacity-60">
          <p>© 2026 Nexora Acoustics. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-[hsl(var(--foreground))] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[hsl(var(--foreground))] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-[-60px] md:bottom-[-90px] left-1/2 -translate-x-1/2 pointer-events-none flex select-none justify-center z-0">
        <span 
          className="whitespace-nowrap font-bold tracking-[-0.06em] text-[hsl(var(--primary-foreground)/.15)]" 
          style={{ fontSize: 'clamp(220px, 25vw, 500px)', fontFamily: 'var(--app-font-heading)' }}
        >
          NEXORA
        </span>
      </div>
    </footer>
  );
}

function InteractiveBackground() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let rafId: number;
    
    const updatePosition = (x: number, y: number) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setPosition({ x, y });
        setIsHovering(true);
      });
    };

    const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX, e.clientY);
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    
    const handleMouseLeave = () => setIsHovering(false);
    const handleTouchEnd = () => {
      // Keep it visible on mobile at the last touched position
      // Alternatively, we could fade it out, but keeping it looks better on mobile
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouch, { passive: true });
    window.addEventListener('touchmove', handleTouch, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('touchmove', handleTouch);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchend', handleTouchEnd);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-1000"
      style={{ opacity: isHovering ? 1 : 0 }}
    >
      <div 
        className="absolute inset-0"
        style={{ background: `radial-gradient(circle 400px at ${position.x}px ${position.y}px, hsl(var(--accent)/0.06), transparent 70%)` }}
      />
      <div 
        className="absolute inset-0"
        style={{
          backgroundSize: '320px 320px, 320px 320px, 80px 80px, 80px 80px',
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)/0.15) 1px, transparent 1px), 
            linear-gradient(to bottom, hsl(var(--foreground)/0.15) 1px, transparent 1px),
            linear-gradient(to right, hsl(var(--foreground)/0.08) 1px, transparent 1px), 
            linear-gradient(to bottom, hsl(var(--foreground)/0.08) 1px, transparent 1px)
          `,
          maskImage: `radial-gradient(circle 400px at ${position.x}px ${position.y}px, black 10%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(circle 400px at ${position.x}px ${position.y}px, black 10%, transparent 80%)`,
        }}
      />
    </div>
  );
}

function Home() {
  return (
    <div className="grain nexora-page min-h-[100dvh]">
      <InteractiveBackground />
      <Nav />
      <main className="relative z-10"><Hero /><Intro /><Services /><Sectors /><Process /><WhyNexora /><Contact /></main>
      <Footer />
    </div>
  );
}

function Router() {
  return <ErrorBoundary resetKey={useLocation()[0]}><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;