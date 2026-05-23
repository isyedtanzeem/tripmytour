import { useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Globe2,
  Headphones,
  Hotel,
  Mail,
  MapPin,
  Menu,
  Plane,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  TicketCheck,
  UserRound,
  WalletCards,
  X
} from 'lucide-react';

const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const leadEmail = import.meta.env.VITE_LEAD_EMAIL || 'leads@tripmytour.com';

const initialInquiry = {
  fullName: '',
  email: '',
  phone: '',
  service: 'Visa Assistance',
  destination: '',
  travelers: '2',
  travelMonth: '',
  budget: '',
  message: ''
};

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Process', href: '#process' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Inquiry', href: '#inquiry' }
];

const services = [
  {
    icon: TicketCheck,
    title: 'Visa Assistance',
    copy: 'Documentation, appointments, file review, cover letters, and submission support for tourist and business visas.'
  },
  {
    icon: Plane,
    title: 'Flights and Transfers',
    copy: 'Smart flight options, airport transfers, baggage guidance, and route planning for smooth arrivals.'
  },
  {
    icon: Hotel,
    title: 'Hotels and Stays',
    copy: 'Handpicked stays by budget, location, family comfort, honeymoon experience, or corporate convenience.'
  },
  {
    icon: Globe2,
    title: 'Holiday Packages',
    copy: 'Custom domestic and international itineraries with sightseeing, local transport, activities, and support.'
  },
  {
    icon: ShieldCheck,
    title: 'Travel Insurance',
    copy: 'Coverage guidance for medical, baggage, cancellation, and destination-specific insurance requirements.'
  },
  {
    icon: Building2,
    title: 'Corporate Travel',
    copy: 'MICE, incentive trips, employee travel, visa coordination, hotel blocks, and reliable account handling.'
  }
];

const destinations = [
  {
    name: 'Dubai',
    tag: 'Family holidays, visa and shopping',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Europe',
    tag: 'Schengen guidance and multi-city tours',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Singapore',
    tag: 'City breaks, attractions and cruises',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Maldives',
    tag: 'Honeymoon stays and island transfers',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Thailand',
    tag: 'Beach holidays and group travel',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80'
  },
  {
    name: 'Kashmir',
    tag: 'Domestic escapes and family packages',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80'
  }
];

const processSteps = [
  {
    title: 'Share Requirements',
    copy: 'Tell us your destination, travel dates, travelers, budget, and visa needs.'
  },
  {
    title: 'Get A Plan',
    copy: 'Our team prepares visa checklists, package options, and a clear cost estimate.'
  },
  {
    title: 'Book With Support',
    copy: 'We coordinate documents, bookings, payments, confirmations, and reminders.'
  },
  {
    title: 'Travel Confidently',
    copy: 'Receive vouchers, contact support, destination notes, and last-mile guidance.'
  }
];

const proofPoints = [
  'End-to-end visa and travel handling',
  'Personalized itineraries, not generic bundles',
  'Documentation review before submission',
  'Support before, during, and after travel'
];

const reviews = [
  {
    name: 'Aisha Khan',
    trip: 'Dubai family trip',
    quote: 'They handled the visa checklist, hotel, transfers, and day tours. Everything was clear and on time.'
  },
  {
    name: 'Rohit Mehta',
    trip: 'Schengen visa assistance',
    quote: 'The document review was very useful. The team explained every requirement and kept follow-ups simple.'
  },
  {
    name: 'Neha Arora',
    trip: 'Maldives honeymoon',
    quote: 'The resort options were matched to our budget and the final itinerary felt premium without confusion.'
  }
];

const serviceOptions = [
  'Visa Assistance',
  'International Tour Package',
  'Domestic Tour Package',
  'Flights and Hotels',
  'Corporate Travel',
  'Travel Insurance'
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState(initialInquiry);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [fallbackHref, setFallbackHref] = useState('');

  const emailConfigured = useMemo(
    () => Boolean(emailServiceId && emailTemplateId && emailPublicKey),
    []
  );

  const leadSummary = useMemo(() => {
    return [
      `Name: ${form.fullName || '-'}`,
      `Email: ${form.email || '-'}`,
      `Phone: ${form.phone || '-'}`,
      `Service: ${form.service || '-'}`,
      `Destination: ${form.destination || '-'}`,
      `Travelers: ${form.travelers || '-'}`,
      `Travel Month: ${form.travelMonth || '-'}`,
      `Budget: ${form.budget || '-'}`,
      `Message: ${form.message || '-'}`
    ].join('\n');
  }, [form]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Sending your inquiry...' });
    setFallbackHref('');

    const templateParams = {
      to_email: leadEmail,
      from_name: form.fullName,
      reply_to: form.email,
      phone: form.phone,
      service: form.service,
      destination: form.destination,
      travelers: form.travelers,
      travel_month: form.travelMonth,
      budget: form.budget,
      message: form.message,
      lead_summary: leadSummary
    };

    if (!emailConfigured) {
      const subject = encodeURIComponent(`New TripMyTour inquiry from ${form.fullName}`);
      const body = encodeURIComponent(leadSummary);
      setFallbackHref(`mailto:${leadEmail}?subject=${subject}&body=${body}`);
      setStatus({
        type: 'warning',
        message: 'Email delivery is ready to connect. Add your EmailJS keys in Vercel, or use the email draft below for now.'
      });
      return;
    }

    try {
      await emailjs.send(emailServiceId, emailTemplateId, templateParams, {
        publicKey: emailPublicKey
      });

      setStatus({
        type: 'success',
        message: 'Inquiry sent. Our travel desk will contact you shortly.'
      });
      setForm(initialInquiry);
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'We could not send this inquiry right now. Please try again or contact the travel desk directly.'
      });
    }
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="TripMyTour home">
          <span className="brand-mark">
            <Plane size={22} aria-hidden="true" />
          </span>
          <span>
            <strong>TripMyTour</strong>
            <small>Visa and Travel Desk</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#inquiry">
          Start Inquiry
          <ArrowRight size={17} aria-hidden="true" />
        </a>

        <button
          className="icon-button menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      )}

      <main>
        <section className="hero-section" id="home">
          <div className="hero-overlay" />
          <div className="hero-content page-grid">
            <div className="hero-copy">
              <span className="eyebrow">
                <Sparkles size={16} aria-hidden="true" />
                Visa, tours and complete travel assistance
              </span>
              <h1>End-to-end travel planning for visas, holidays and business trips.</h1>
              <p>
                TripMyTour helps customers plan stress-free travel with visa documentation,
                flights, stays, insurance, transfers, sightseeing and support from inquiry to return.
              </p>
              <div className="hero-actions">
                <a className="primary-button" href="#inquiry">
                  Get a travel plan
                  <Send size={18} aria-hidden="true" />
                </a>
                <a className="secondary-button" href="#services">
                  View services
                  <ChevronRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>

            <aside className="trip-card" aria-label="Popular trip planner summary">
              <div className="trip-card-top">
                <span>Popular request</span>
                <BadgeCheck size={20} aria-hidden="true" />
              </div>
              <h2>Dubai Family Holiday</h2>
              <ul>
                <li>
                  <TicketCheck size={18} aria-hidden="true" />
                  Tourist visa checklist and file review
                </li>
                <li>
                  <Hotel size={18} aria-hidden="true" />
                  4-star stay with airport transfers
                </li>
                <li>
                  <CalendarDays size={18} aria-hidden="true" />
                  5 nights with city tour and desert safari
                </li>
              </ul>
              <a href="#inquiry">
                Request similar plan
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </aside>
          </div>
        </section>

        <section className="stats-band" aria-label="Company highlights">
          <div className="stats-grid page-grid">
            <div>
              <strong>20+</strong>
              <span>Visa categories handled</span>
            </div>
            <div>
              <strong>50+</strong>
              <span>Domestic and international destinations</span>
            </div>
            <div>
              <strong>24 hr</strong>
              <span>Lead response target</span>
            </div>
            <div>
              <strong>360 deg</strong>
              <span>Travel support workflow</span>
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="section-heading page-grid">
            <span className="eyebrow dark">What we manage</span>
            <h2>One travel desk for every moving part.</h2>
            <p>
              Customers can ask for a single service or let the team combine visa,
              transport, stay, activities and insurance into one coordinated plan.
            </p>
          </div>

          <div className="service-grid page-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="service-card" key={service.title}>
                  <div className="service-icon">
                    <Icon size={24} aria-hidden="true" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.copy}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="split-section">
          <div className="split-content page-grid">
            <div className="feature-copy">
              <span className="eyebrow dark">Why customers choose us</span>
              <h2>Built for travelers who want clarity before they commit.</h2>
              <p>
                From the first inquiry, the experience is designed around clear documents,
                realistic budgets, practical timelines and human support when plans change.
              </p>
              <div className="proof-list">
                {proofPoints.map((point) => (
                  <div key={point}>
                    <CheckCircle2 size={20} aria-hidden="true" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="feature-panel">
              <div className="support-metric">
                <Headphones size={28} aria-hidden="true" />
                <div>
                  <strong>Dedicated support</strong>
                  <span>For visa queries, trip changes and pre-travel checks.</span>
                </div>
              </div>
              <div className="timeline-mini">
                <span />
                <div>
                  <strong>Day 1</strong>
                  <p>Inquiry and requirement capture</p>
                </div>
                <span />
                <div>
                  <strong>Day 2</strong>
                  <p>Visa checklist and package options</p>
                </div>
                <span />
                <div>
                  <strong>Before travel</strong>
                  <p>Vouchers, documents and final briefing</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="destinations">
          <div className="section-heading page-grid">
            <span className="eyebrow dark">Featured destinations</span>
            <h2>High-demand trips your customers can request today.</h2>
          </div>

          <div className="destination-grid page-grid">
            {destinations.map((destination) => (
              <article className="destination-card" key={destination.name}>
                <img src={destination.image} alt={`${destination.name} travel package`} loading="lazy" />
                <div>
                  <h3>{destination.name}</h3>
                  <p>{destination.tag}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process-section" id="process">
          <div className="section-heading page-grid">
            <span className="eyebrow">How it works</span>
            <h2>A simple process from first call to confirmed trip.</h2>
          </div>
          <div className="process-grid page-grid">
            {processSteps.map((step, index) => (
              <article className="process-card" key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="reviews-section" id="reviews">
          <div className="section-heading page-grid">
            <span className="eyebrow dark">Traveler notes</span>
            <h2>Trust signals for first-time visitors.</h2>
          </div>
          <div className="review-grid page-grid">
            {reviews.map((review) => (
              <article className="review-card" key={review.name}>
                <div className="stars" aria-label="5 star review">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} size={16} fill="currentColor" aria-hidden="true" />
                  ))}
                </div>
                <p>{review.quote}</p>
                <div>
                  <strong>{review.name}</strong>
                  <span>{review.trip}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="inquiry-section" id="inquiry">
          <div className="inquiry-layout page-grid">
            <div className="inquiry-copy">
              <span className="eyebrow dark">Inquiry form</span>
              <h2>Capture travel leads directly from the website.</h2>
              <p>
                The form collects customer details, service type, destination,
                travel month, budget and message. When EmailJS is configured,
                every submission is delivered to your lead inbox.
              </p>
              <div className="contact-strip">
                <div>
                  <Mail size={19} aria-hidden="true" />
                  <span>{leadEmail}</span>
                </div>
                <div>
                  <Clock3 size={19} aria-hidden="true" />
                  <span>Response target: within 24 hours</span>
                </div>
              </div>
            </div>

            <form className="inquiry-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>
                  Full name
                  <span>
                    <UserRound size={17} aria-hidden="true" />
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={updateField}
                      placeholder="Customer name"
                      autoComplete="name"
                      required
                    />
                  </span>
                </label>
                <label>
                  Email
                  <span>
                    <Mail size={17} aria-hidden="true" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={updateField}
                      placeholder="customer@email.com"
                      autoComplete="email"
                      required
                    />
                  </span>
                </label>
              </div>

              <div className="form-row">
                <label>
                  Phone
                  <span>
                    <Headphones size={17} aria-hidden="true" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={updateField}
                      placeholder="+91 98765 43210"
                      autoComplete="tel"
                      required
                    />
                  </span>
                </label>
                <label>
                  Service
                  <span>
                    <Briefcase size={17} aria-hidden="true" />
                    <select name="service" value={form.service} onChange={updateField}>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
              </div>

              <div className="form-row">
                <label>
                  Destination
                  <span>
                    <MapPin size={17} aria-hidden="true" />
                    <input
                      type="text"
                      name="destination"
                      value={form.destination}
                      onChange={updateField}
                      placeholder="Dubai, Europe, Kashmir..."
                      required
                    />
                  </span>
                </label>
                <label>
                  Travelers
                  <span>
                    <UserRound size={17} aria-hidden="true" />
                    <input
                      type="number"
                      name="travelers"
                      min="1"
                      value={form.travelers}
                      onChange={updateField}
                      required
                    />
                  </span>
                </label>
              </div>

              <div className="form-row">
                <label>
                  Travel month
                  <span>
                    <CalendarDays size={17} aria-hidden="true" />
                    <input
                      type="text"
                      name="travelMonth"
                      value={form.travelMonth}
                      onChange={updateField}
                      placeholder="August 2026"
                      required
                    />
                  </span>
                </label>
                <label>
                  Approx. budget
                  <span>
                    <WalletCards size={17} aria-hidden="true" />
                    <input
                      type="text"
                      name="budget"
                      value={form.budget}
                      onChange={updateField}
                      placeholder="Example: INR 80,000"
                    />
                  </span>
                </label>
              </div>

              <label>
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={updateField}
                  placeholder="Tell us about visa status, preferred dates, hotel category or special requirements."
                  rows="5"
                />
              </label>

              {status.message && (
                <div className={`form-status ${status.type}`} role="status">
                  {status.message}
                  {fallbackHref && (
                    <a href={fallbackHref}>
                      Open email draft
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              )}

              <button className="submit-button" type="submit" disabled={status.type === 'loading'}>
                {status.type === 'loading' ? 'Sending...' : 'Send inquiry'}
                <Send size={18} aria-hidden="true" />
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-grid footer-grid">
          <div>
            <a className="brand footer-brand" href="#home">
              <span className="brand-mark">
                <Plane size={22} aria-hidden="true" />
              </span>
              <span>
                <strong>TripMyTour</strong>
                <small>Visa and Travel Desk</small>
              </span>
            </a>
            <p>Tourism services for visas, holidays, corporate travel, flights, hotels and travel insurance.</p>
          </div>
          <div className="footer-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
