import { useEffect, useMemo, useState } from 'react';
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
  FileText,
  Globe2,
  Headphones,
  Hotel,
  Luggage,
  Mail,
  MapPin,
  Menu,
  Plane,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Star,
  TicketCheck,
  UserRound,
  WalletCards,
  X
} from 'lucide-react';
import tmytLogo from './assets/tmyt-svg-logo.svg';
import { countryVisaPackages } from './data/visaCatalog.js';

const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const companyContact = {
  company: 'Trip My Tour India Pvt Ltd',
  email: 'hello@tripmytour.com',
  phones: ['9880371756', '7795541756', '9900025912'],
  address:
    "799, 15th Main Rd, next to Domino's Pizza, Mico Layout, BTM Layout 2nd Stage, BTM Layout, Bengaluru, Karnataka 560076"
};
const leadEmail = import.meta.env.VITE_LEAD_EMAIL || companyContact.email;

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Holidays', path: '/holidays' },
  { label: 'Visa', path: '/visa' },
  { label: 'About', path: '/about' },
  { label: 'Inquiry', path: '/inquiry' }
];

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

const serviceCards = [
  {
    icon: TicketCheck,
    title: 'Visa Applications',
    text: 'Tourist, business, family visit, transit, eVisa and appointment-based embassy support.'
  },
  {
    icon: Luggage,
    title: 'Holiday Packages',
    text: 'Domestic and international itineraries with stays, transfers, sightseeing and activities.'
  },
  {
    icon: Plane,
    title: 'Flights and Transfers',
    text: 'Flight options, airport pickups, intercity transfers and route planning.'
  },
  {
    icon: Hotel,
    title: 'Hotels and Resorts',
    text: 'Handpicked stays for families, honeymooners, business travelers and groups.'
  },
  {
    icon: ShieldCheck,
    title: 'Travel Insurance',
    text: 'Insurance guidance for visa files, medical cover, baggage and trip cancellation.'
  },
  {
    icon: Briefcase,
    title: 'Corporate Travel',
    text: 'MICE trips, employee travel, group visas, hotel blocks and account support.'
  }
];

const holidayPackages = [
  {
    name: 'Dubai Family Escape',
    place: 'Dubai, UAE',
    duration: '5 Nights / 6 Days',
    price: 'INR 54,999',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=80',
    includes: ['Dubai visa assistance', '4-star hotel stay', 'Desert safari', 'Airport transfers']
  },
  {
    name: 'Singapore City Break',
    place: 'Singapore',
    duration: '4 Nights / 5 Days',
    price: 'INR 62,500',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=900&q=80',
    includes: ['Visa guidance', 'Sentosa day plan', 'City tour', 'Hotel with breakfast']
  },
  {
    name: 'Maldives Honeymoon',
    place: 'Maldives',
    duration: '4 Nights / 5 Days',
    price: 'INR 89,999',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=900&q=80',
    includes: ['Island resort', 'Speedboat transfer', 'Meal plan options', 'Honeymoon setup']
  },
  {
    name: 'Europe Starter Tour',
    place: 'France, Switzerland, Italy',
    duration: '8 Nights / 9 Days',
    price: 'INR 1,85,000',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=80',
    includes: ['Schengen file support', 'Multi-city itinerary', 'Hotels and trains', 'Travel insurance guidance']
  },
  {
    name: 'Kashmir Scenic Holiday',
    place: 'Srinagar, Gulmarg, Pahalgam',
    duration: '5 Nights / 6 Days',
    price: 'INR 28,999',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    includes: ['Houseboat option', 'Private cab', 'Local sightseeing', 'Family-friendly stay']
  },
  {
    name: 'Thailand Beach Run',
    place: 'Phuket and Krabi',
    duration: '5 Nights / 6 Days',
    price: 'INR 48,500',
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=80',
    includes: ['Island tours', 'Hotel with breakfast', 'Transfers', 'Visa-on-arrival guidance']
  }
];

const processSteps = [
  'Requirement capture and destination match',
  'Visa checklist, package quote and document review',
  'Bookings, appointment support and payment coordination',
  'Final vouchers, travel brief and support handover'
];

function normalizePath(pathname) {
  if (!pathname || pathname === '/index.html') return '/';
  return navItems.some((item) => item.path === pathname) ? pathname : '/';
}

function App() {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => setCurrentPath(normalizePath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  function navigate(path) {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMenuOpen(false);
  }

  const page = {
    '/': <HomePage navigate={navigate} />,
    '/services': <ServicesPage navigate={navigate} />,
    '/holidays': <HolidaysPage navigate={navigate} />,
    '/visa': <VisaPage navigate={navigate} />,
    '/about': <AboutPage navigate={navigate} />,
    '/inquiry': <InquiryPage />
  }[currentPath];

  return (
    <div className="app-shell">
      <Header
        currentPath={currentPath}
        menuOpen={menuOpen}
        navigate={navigate}
        setMenuOpen={setMenuOpen}
      />
      <main>{page}</main>
      <Footer navigate={navigate} />
    </div>
  );
}

function Header({ currentPath, menuOpen, navigate, setMenuOpen }) {
  return (
    <header className="site-header">
      <button className="brand" type="button" onClick={() => navigate('/')} aria-label="TripMyTour home">
        <span className="brand-mark">
          <img src={tmytLogo} alt="" aria-hidden="true" />
        </span>
        <span>
          <strong>TripMyTour</strong>
          <small>Visa and travel desk</small>
        </span>
      </button>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a
            className={currentPath === item.path ? 'active' : ''}
            href={item.path}
            key={item.path}
            onClick={(event) => {
              event.preventDefault();
              navigate(item.path);
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <button className="nav-cta" type="button" onClick={() => navigate('/visa')}>
        Search visa
        <Search size={17} aria-hidden="true" />
      </button>

      <button
        className="icon-button menu-toggle"
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a
              className={currentPath === item.path ? 'active' : ''}
              href={item.path}
              key={item.path}
              onClick={(event) => {
                event.preventDefault();
                navigate(item.path);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function HomePage({ navigate }) {
  return (
    <>
      <section className="home-hero">
        <div className="page-wrap hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">
              <Sparkles size={16} aria-hidden="true" />
              180+ country visa support and complete holiday planning
            </span>
            <h1>Book visas, holidays and travel services from one clean travel desk.</h1>
            <p>
              A modern customer portal for visa file support, holiday packages, hotels,
              flights, insurance and end-to-end travel assistance.
            </p>
            <div className="hero-actions">
              <button className="primary-button" type="button" onClick={() => navigate('/visa')}>
                Find visa details
                <Search size={18} aria-hidden="true" />
              </button>
              <button className="ghost-button" type="button" onClick={() => navigate('/holidays')}>
                Browse holidays
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="hero-media">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
              alt="Travelers planning a holiday near a beach"
            />
            <div className="floating-proof">
              <BadgeCheck size={20} aria-hidden="true" />
              <span>File review before visa submission</span>
            </div>
          </div>
        </div>

        <div className="page-wrap">
          <TravelSearchPanel navigate={navigate} />
        </div>
      </section>

      <section className="section-soft">
        <div className="page-wrap quick-stats">
          <Stat value="180+" label="Countries searchable for visa support" />
          <Stat value="6" label="Core travel service categories" />
          <Stat value="24 hr" label="Lead response target" />
          <Stat value="360" label="End-to-end tourism workflow" />
        </div>
      </section>

      <section className="section">
        <SectionHeading
          kicker="Popular services"
          title="Everything a traveler asks before booking."
          text="Customers can compare visa support, holiday planning, flights, hotels, insurance and corporate travel from a single interface."
        />
        <ServiceGrid />
      </section>

      <section className="section section-soft">
        <SectionHeading
          kicker="Trending holiday packages"
          title="Ready-to-sell packages with simple inquiry flow."
          text="Use these as featured cards and update package pricing anytime before launch."
        />
        <HolidayGrid limit={3} />
        <div className="center-action">
          <button className="secondary-button" type="button" onClick={() => navigate('/holidays')}>
            View all holiday packages
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </section>
    </>
  );
}

function TravelSearchPanel({ navigate }) {
  return (
    <section className="search-panel" aria-label="Travel service search">
      <div className="search-tabs">
        <button className="active" type="button" onClick={() => navigate('/visa')}>
          <TicketCheck size={20} aria-hidden="true" />
          Visa
        </button>
        <button type="button" onClick={() => navigate('/holidays')}>
          <Luggage size={20} aria-hidden="true" />
          Holidays
        </button>
        <button type="button" onClick={() => navigate('/services')}>
          <Hotel size={20} aria-hidden="true" />
          Hotels
        </button>
        <button type="button" onClick={() => navigate('/services')}>
          <Plane size={20} aria-hidden="true" />
          Flights
        </button>
      </div>
      <VisaExplorer compact navigate={navigate} />
    </section>
  );
}

function ServicesPage({ navigate }) {
  return (
    <>
      <PageHero
        kicker="Services"
        title="Visa, holiday and travel services built for repeat customer inquiries."
        text="A dedicated page for the complete TripMyTour service catalog, with clear next steps for every customer type."
        actionLabel="Start inquiry"
        onAction={() => navigate('/inquiry')}
      />
      <section className="section">
        <ServiceGrid />
      </section>
      <section className="section section-soft">
        <SectionHeading
          kicker="How we process leads"
          title="A practical workflow from inquiry to confirmed travel."
        />
        <div className="page-wrap process-grid">
          {processSteps.map((step, index) => (
            <article className="process-card" key={step}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{step}</h3>
              <p>
                The travel desk keeps customers updated with requirements, documents,
                timelines and payment checkpoints.
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function HolidaysPage({ navigate }) {
  return (
    <>
      <PageHero
        kicker="Holiday packages"
        title="Domestic and international packages ready for customer inquiries."
        text="Showcase curated package cards with inclusions, duration, starting price and visa notes."
        actionLabel="Plan custom trip"
        onAction={() => navigate('/inquiry')}
      />
      <section className="section">
        <HolidayGrid />
      </section>
    </>
  );
}

function VisaPage({ navigate }) {
  return (
    <>
      <PageHero
        kicker="Visa applications"
        title="Search visa support packages for 180+ countries."
        text="Customers can find indicative assistance fees, timelines, visa types and document checklists before submitting an inquiry."
        actionLabel="Send visa inquiry"
        onAction={() => navigate('/inquiry')}
      />
      <section className="section no-top-padding">
        <VisaExplorer navigate={navigate} />
      </section>
    </>
  );
}

function AboutPage({ navigate }) {
  return (
    <>
      <PageHero
        kicker="About TripMyTour"
        title="A travel desk focused on clarity, documentation and human follow-up."
        text="TripMyTour supports travelers with visa files, holiday planning and end-to-end tourism services from first inquiry to final handover."
        actionLabel="Contact team"
        onAction={() => navigate('/inquiry')}
      />
      <section className="section">
        <div className="page-wrap about-grid">
          <div>
            <span className="eyebrow">Why this matters</span>
            <h2>Travel customers need trust before they share documents or pay for a trip.</h2>
            <p>
              The website is designed to make TripMyTour feel organized, transparent
              and responsive. It explains service coverage, captures complete lead
              details and gives customers a searchable starting point for visa planning.
            </p>
          </div>
          <div className="about-card">
            <h3>What the team handles</h3>
            <ul>
              <li>Visa document checklist and file review</li>
              <li>Holiday itinerary, hotel and transfer planning</li>
              <li>Insurance guidance and travel requirement checks</li>
              <li>Corporate, group and family travel coordination</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function InquiryPage() {
  return (
    <>
      <PageHero
        kicker="Inquiry"
        title="Capture complete travel requirements in one form."
        text="Every form submission can be sent to your lead inbox through EmailJS after Vercel environment variables are added."
      />
      <section className="section no-top-padding">
        <InquiryForm />
      </section>
    </>
  );
}

function PageHero({ kicker, title, text, actionLabel, onAction }) {
  return (
    <section className="page-hero">
      <div className="page-wrap">
        <span className="eyebrow">{kicker}</span>
        <h1>{title}</h1>
        {text && <p>{text}</p>}
        {actionLabel && (
          <button className="primary-button" type="button" onClick={onAction}>
            {actionLabel}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title, text }) {
  return (
    <div className="page-wrap section-heading">
      <span className="eyebrow">{kicker}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function ServiceGrid() {
  return (
    <div className="page-wrap service-grid">
      {serviceCards.map((service) => {
        const Icon = service.icon;
        return (
          <article className="service-card" key={service.title}>
            <span className="service-icon">
              <Icon size={23} aria-hidden="true" />
            </span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        );
      })}
    </div>
  );
}

function HolidayGrid({ limit }) {
  const packages = limit ? holidayPackages.slice(0, limit) : holidayPackages;

  return (
    <div className="page-wrap holiday-grid">
      {packages.map((item) => (
        <article className="holiday-card" key={item.name}>
          <img src={item.image} alt={`${item.name} package`} loading="lazy" />
          <div className="holiday-body">
            <span>{item.place}</span>
            <h3>{item.name}</h3>
            <div className="meta-row">
              <CalendarDays size={16} aria-hidden="true" />
              {item.duration}
            </div>
            <ul>
              {item.includes.map((include) => (
                <li key={include}>
                  <CheckCircle2 size={16} aria-hidden="true" />
                  {include}
                </li>
              ))}
            </ul>
            <div className="card-footer">
              <strong>{item.price}</strong>
              <small>per person from</small>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function VisaExplorer({ compact = false, navigate }) {
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countryVisaPackages[0].country);

  const filteredCountries = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return countryVisaPackages;
    return countryVisaPackages.filter((item) => {
      return [item.country, item.region, item.visaType, item.processingTime]
        .concat(item.aliases || [])
        .join(' ')
        .toLowerCase()
        .includes(term);
    });
  }, [query]);

  const selectedPackage = useMemo(() => {
    return (
      filteredCountries.find((item) => item.country === selectedCountry) ||
      filteredCountries[0] ||
      countryVisaPackages[0]
    );
  }, [filteredCountries, selectedCountry]);

  const visibleCountries = compact ? filteredCountries.slice(0, 6) : filteredCountries;

  function selectPackage(country) {
    setSelectedCountry(country);
    if (compact && navigate) navigate('/visa');
  }

  return (
    <div className={compact ? 'visa-explorer compact' : 'page-wrap visa-explorer'}>
      <div className="visa-search-card">
        <label htmlFor={compact ? 'home-visa-search' : 'visa-search'}>
          Search visa application by country
        </label>
        <div className="search-input-wrap">
          <Search size={20} aria-hidden="true" />
          <input
            id={compact ? 'home-visa-search' : 'visa-search'}
            list="visa-country-list"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Type country name, e.g. Dubai, United States, France"
          />
          <datalist id="visa-country-list">
            {countryVisaPackages.map((item) => (
              <option key={item.country} value={item.country} />
            ))}
          </datalist>
        </div>
        <div className="visa-note">
          <ShieldCheck size={17} aria-hidden="true" />
          Indicative service fees and document lists. Embassy fees, rules and appointment
          availability must be verified for the final file.
        </div>
      </div>

      <div className={compact ? 'visa-results compact-results' : 'visa-results'}>
        <div className="visa-list">
          <div className="result-count">
            <strong>{filteredCountries.length}</strong>
            <span>country packages found</span>
          </div>
          {visibleCountries.map((item) => (
            <button
              className={selectedPackage.country === item.country ? 'visa-row active' : 'visa-row'}
              key={item.country}
              type="button"
              onClick={() => selectPackage(item.country)}
            >
              <span>
                <strong>{item.country}</strong>
                <small>{item.region} - {item.visaType}</small>
              </span>
              <em>{item.serviceFee}</em>
            </button>
          ))}
          {compact && (
            <button className="view-all-row" type="button" onClick={() => navigate('/visa')}>
              View 180+ countries
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          )}
        </div>

        {!compact && <VisaDetailsCard item={selectedPackage} />}
      </div>
    </div>
  );
}

function VisaDetailsCard({ item }) {
  return (
    <aside className="visa-detail-card">
      <div className="detail-header">
        <div>
          <span>{item.region}</span>
          <h3>{item.country} visa support</h3>
        </div>
        <TicketCheck size={28} aria-hidden="true" />
      </div>

      <div className="detail-grid">
        <DetailItem icon={WalletCards} label="Service fee from" value={item.serviceFee} />
        <DetailItem icon={Clock3} label="Processing estimate" value={item.processingTime} />
        <DetailItem icon={FileText} label="Visa type" value={item.visaType} />
        <DetailItem icon={CalendarDays} label="Typical stay" value={item.typicalStay} />
      </div>

      <h4>Required documents</h4>
      <ul className="doc-list">
        {item.documents.map((doc) => (
          <li key={doc}>
            <CheckCircle2 size={16} aria-hidden="true" />
            {doc}
          </li>
        ))}
      </ul>

      <h4>TripMyTour assistance includes</h4>
      <ul className="doc-list">
        {item.supportIncludes.map((task) => (
          <li key={task}>
            <BadgeCheck size={16} aria-hidden="true" />
            {task}
          </li>
        ))}
      </ul>
    </aside>
  );
}

function DetailItem({ icon: Icon, label, value }) {
  return (
    <div className="detail-item">
      <Icon size={18} aria-hidden="true" />
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function InquiryForm() {
  const [form, setForm] = useState(initialInquiry);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [fallbackHref, setFallbackHref] = useState('');

  const emailConfigured = Boolean(emailServiceId && emailTemplateId && emailPublicKey);

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
    } catch {
      setStatus({
        type: 'error',
        message: 'We could not send this inquiry right now. Please try again or contact the travel desk directly.'
      });
    }
  }

  return (
    <div className="page-wrap inquiry-grid">
      <div className="inquiry-aside">
        <span className="eyebrow">Lead inbox</span>
        <h2>Send customer requirements to your travel desk.</h2>
        <p>
          The form captures service type, destination, month, budget and customer
          contact details so the team can respond with a quote.
        </p>
        <div className="contact-stack">
          <span>
            <Mail size={18} aria-hidden="true" />
            {leadEmail}
          </span>
          <span>
            <Headphones size={18} aria-hidden="true" />
            {companyContact.phones.join(' / ')}
          </span>
          <span>
            <Building2 size={18} aria-hidden="true" />
            {companyContact.company}
          </span>
          <span>
            <MapPin size={18} aria-hidden="true" />
            {companyContact.address}
          </span>
        </div>
      </div>

      <form className="inquiry-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <Field icon={UserRound} label="Full name">
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={updateField}
              placeholder="Customer name"
              autoComplete="name"
              required
            />
          </Field>
          <Field icon={Mail} label="Email">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={updateField}
              placeholder="customer@email.com"
              autoComplete="email"
              required
            />
          </Field>
        </div>

        <div className="form-row">
          <Field icon={Headphones} label="Phone">
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={updateField}
              placeholder="+91 98765 43210"
              autoComplete="tel"
              required
            />
          </Field>
          <Field icon={Briefcase} label="Service">
            <select name="service" value={form.service} onChange={updateField}>
              {serviceCards.map((service) => (
                <option key={service.title} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="form-row">
          <Field icon={MapPin} label="Destination">
            <input
              type="text"
              name="destination"
              value={form.destination}
              onChange={updateField}
              placeholder="Dubai, Europe, Kashmir..."
              required
            />
          </Field>
          <Field icon={UserRound} label="Travelers">
            <input
              type="number"
              name="travelers"
              min="1"
              value={form.travelers}
              onChange={updateField}
              required
            />
          </Field>
        </div>

        <div className="form-row">
          <Field icon={CalendarDays} label="Travel month">
            <input
              type="text"
              name="travelMonth"
              value={form.travelMonth}
              onChange={updateField}
              placeholder="August 2026"
              required
            />
          </Field>
          <Field icon={WalletCards} label="Approx. budget">
            <input
              type="text"
              name="budget"
              value={form.budget}
              onChange={updateField}
              placeholder="Example: INR 80,000"
            />
          </Field>
        </div>

        <label className="textarea-label">
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
  );
}

function Field({ icon: Icon, label, children }) {
  return (
    <label className="field-label">
      {label}
      <span>
        <Icon size={17} aria-hidden="true" />
        {children}
      </span>
    </label>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="site-footer">
      <div className="page-wrap footer-grid">
        <div>
          <button className="brand footer-brand" type="button" onClick={() => navigate('/')}>
            <span className="brand-mark">
              <img src={tmytLogo} alt="" aria-hidden="true" />
            </span>
            <span>
              <strong>TripMyTour</strong>
              <small>Visa and travel desk</small>
            </span>
          </button>
          <p>Visa support, holiday packages, flights, hotels, insurance and corporate travel services.</p>
          <address className="footer-contact">
            <span>{companyContact.company}</span>
            <a href={`mailto:${companyContact.email}`}>{companyContact.email}</a>
            <a href={`tel:${companyContact.phones[0]}`}>{companyContact.phones.join(' / ')}</a>
            <span>{companyContact.address}</span>
          </address>
        </div>
        <div className="footer-links">
          {navItems.map((item) => (
            <a
              href={item.path}
              key={item.path}
              onClick={(event) => {
                event.preventDefault();
                navigate(item.path);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default App;
