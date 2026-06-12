import { useState, type FormEvent } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Handshake,
  Newspaper,
  BookOpen,
  Send,
  Globe,
  AlertCircle,
  Check,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const easeOutExpo = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const inquiryTypes = [
  'General Inquiry',
  'Partnership',
  'Press & Media',
  'Research',
  'Job Application',
];

const regionalOffices = [
  {
    id: '1',
    country: 'San Marova',
    city: 'Freetown',
    address: '12 Development Avenue, Freetown',
    phone: '+94 11 234 5678',
    email: 'sanmarova@meridianglobal.dev',
  },
  {
    id: '2',
    country: 'Kaledonia',
    city: 'Nairobi',
    address: '45 Unity Boulevard, Nairobi',
    phone: '+234 1 876 5432',
    email: 'kaledonia@meridianglobal.dev',
  },
  {
    id: '3',
    country: 'Terres Vertes',
    city: 'Libreville',
    address: '78 Centro Plaza, Libreville',
    phone: '+503 25 678 901',
    email: 'terresvertes@meridianglobal.dev',
  },
  {
    id: '4',
    country: 'Nubara Coast',
    city: 'Manila',
    address: '23 Coastal Road, Manila',
    phone: '+20 3 456 7890',
    email: 'nubaracoast@meridianglobal.dev',
  },
  {
    id: '5',
    country: 'Ostmark',
    city: 'Prague',
    address: '91 Independence Square, Prague',
    phone: '+381 11 234 5678',
    email: 'ostmark@meridianglobal.dev',
  },
];

const inquiryCards = [
  {
    id: '1',
    icon: MessageCircle,
    title: 'General Inquiries',
    description:
      'Questions about the program, our work, or how to get involved.',
    contact: 'info@meridianglobal.dev',
    responseTime: 'Within 2 business days',
  },
  {
    id: '2',
    icon: Handshake,
    title: 'Partnership Opportunities',
    description:
      'Explore joining the consortium, funding partnerships, or technical collaboration.',
    contact: 'partnerships@meridianglobal.dev',
    responseTime: 'Within 3 business days',
  },
  {
    id: '3',
    icon: Newspaper,
    title: 'Press & Media',
    description:
      'Interview requests, press kits, media briefings, and statement inquiries.',
    contact: 'press@meridianglobal.dev',
    responseTime: 'Within 1 business day',
  },
  {
    id: '4',
    icon: BookOpen,
    title: 'Research Collaboration',
    description:
      'Data access requests, academic partnerships, and research collaboration proposals.',
    contact: 'research@meridianglobal.dev',
    responseTime: 'Within 5 business days',
  },
];

const faqItems = [
  {
    id: '1',
    question: 'What is Meridian Global Development?',
    answer:
      'Meridian Global Development is a multi-stakeholder development partnership that brings together six international organizations to deliver integrated infrastructure, community empowerment, and climate resilience programs across five focus countries.',
  },
  {
    id: '2',
    question: 'How is Meridian funded?',
    answer:
      'Meridian is primarily funded through Atlas International Foundation ($280M commitment), with additional contributions from bilateral donors ($95M), national government co-funding ($50M), and private sector partnerships ($25M), totaling $450M.',
  },
  {
    id: '3',
    question: 'How can my organization partner with Meridian?',
    answer:
      'We welcome partnerships with organizations that share our mission. Please contact us at partnerships@meridianglobal.dev with a brief description of your organization and proposed collaboration area.',
  },
  {
    id: '4',
    question: 'Where does Meridian work?',
    answer:
      'Meridian currently operates in five focus countries: San Marova (Southeast Asia), Kaledonia (Sub-Saharan Africa), Terres Vertes (Latin America & Caribbean), Nubara Coast (Middle East & North Africa), and Ostmark (Eastern Europe & Central Asia).',
  },
  {
    id: '5',
    question: 'How can I access program data and reports?',
    answer:
      'All public reports, studies, and data are available in our Resources section. Researchers seeking raw data can submit a request to research@meridianglobal.dev.',
  },
  {
    id: '6',
    question: 'Does Meridian offer employment or consulting opportunities?',
    answer:
      'We periodically advertise positions on our Careers page and through partner organizations. You can also send a speculative application to careers@meridianglobal.dev.',
  },
];

interface FormData {
  name: string;
  email: string;
  organization: string;
  inquiryType: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    organization: '',
    inquiryType: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({
        name: '',
        email: '',
        organization: '',
        inquiryType: '',
        subject: '',
        message: '',
      });
      setErrors({});
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: easeOutExpo,
      },
    }),
  };

  return (
    <div>
      {/* ============ HERO ============ */}
      <section
        className="w-full flex items-center"
        style={{
          backgroundColor: 'var(--primary-blue)',
          minHeight: 200,
        }}
      >
        <div className="container-main py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
          >
            <nav className="flex items-center gap-2 text-sm mb-4">
              <Link
                to="/"
                className="hover:underline"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                Home
              </Link>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>/</span>
              <span style={{ color: 'rgba(255,255,255,0.9)' }}>Contact</span>
            </nav>
            <h1
              className="text-3xl md:text-4xl font-normal mb-2"
              style={{
                color: '#fff',
                fontFamily: 'Merriweather, serif',
              }}
            >
              Contact Us
            </h1>
            <p
              className="text-base md:text-lg max-w-2xl"
              style={{ color: 'rgba(255,255,255,0.8)' }}
            >
              We'd love to hear from you. Reach out for partnership, press, or
              general inquiries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============ CONTACT FORM + SIDEBAR ============ */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container-main section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              <span
                className="label-caption block mb-2"
                style={{ color: 'var(--medium-blue)' }}
              >
                SEND US A MESSAGE
              </span>
              <h2
                className="text-xl md:text-2xl font-bold mb-8"
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'Merriweather, serif',
                }}
              >
                Get in touch
              </h2>

              {submitted && (
                <motion.div
                  className="mb-6 p-4 flex items-center gap-3"
                  style={{
                    backgroundColor: '#2E8B5720',
                    border: '1px solid #2E8B57',
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <Check size={20} style={{ color: '#2E8B57' }} />
                  <span className="text-sm font-medium" style={{ color: '#2E8B57' }}>
                    Thank you! Your message has been sent successfully.
                  </span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    className="label-caption block mb-1.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Name <span style={{ color: '#C0392B' }}>*</span>
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your full name"
                    className="h-12 w-full rounded-none border"
                    style={{
                      borderColor: errors.name ? '#C0392B' : 'var(--border)',
                      backgroundColor: 'var(--bg-white)',
                    }}
                  />
                  {errors.name && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertCircle size={12} style={{ color: '#C0392B' }} />
                      <span className="text-xs" style={{ color: '#C0392B' }}>
                        {errors.name}
                      </span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    className="label-caption block mb-1.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Email <span style={{ color: '#C0392B' }}>*</span>
                  </label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className="h-12 w-full rounded-none border"
                    style={{
                      borderColor: errors.email ? '#C0392B' : 'var(--border)',
                      backgroundColor: 'var(--bg-white)',
                    }}
                  />
                  {errors.email && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertCircle size={12} style={{ color: '#C0392B' }} />
                      <span className="text-xs" style={{ color: '#C0392B' }}>
                        {errors.email}
                      </span>
                    </div>
                  )}
                </div>

                {/* Organization */}
                <div>
                  <label
                    className="label-caption block mb-1.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Organization
                  </label>
                  <Input
                    value={formData.organization}
                    onChange={(e) =>
                      handleChange('organization', e.target.value)
                    }
                    placeholder="Your organization (optional)"
                    className="h-12 w-full rounded-none border"
                    style={{
                      borderColor: 'var(--border)',
                      backgroundColor: 'var(--bg-white)',
                    }}
                  />
                </div>

                {/* Inquiry Type */}
                <div>
                  <label
                    className="label-caption block mb-1.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Inquiry Type
                  </label>
                  <Select
                    value={formData.inquiryType}
                    onValueChange={(value) =>
                      handleChange('inquiryType', value)
                    }
                  >
                    <SelectTrigger
                      className="h-12 w-full rounded-none border"
                      style={{
                        borderColor: 'var(--border)',
                        backgroundColor: 'var(--bg-white)',
                      }}
                    >
                      <SelectValue placeholder="Select inquiry type" />
                    </SelectTrigger>
                    <SelectContent>
                      {inquiryTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject */}
                <div>
                  <label
                    className="label-caption block mb-1.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Subject <span style={{ color: '#C0392B' }}>*</span>
                  </label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    placeholder="What is this about?"
                    className="h-12 w-full rounded-none border"
                    style={{
                      borderColor: errors.subject ? '#C0392B' : 'var(--border)',
                      backgroundColor: 'var(--bg-white)',
                    }}
                  />
                  {errors.subject && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertCircle size={12} style={{ color: '#C0392B' }} />
                      <span className="text-xs" style={{ color: '#C0392B' }}>
                        {errors.subject}
                      </span>
                    </div>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    className="label-caption block mb-1.5"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Message <span style={{ color: '#C0392B' }}>*</span>
                  </label>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    placeholder="Your message..."
                    rows={6}
                    className="w-full rounded-none border resize-none"
                    style={{
                      borderColor: errors.message ? '#C0392B' : 'var(--border)',
                      backgroundColor: 'var(--bg-white)',
                    }}
                  />
                  {errors.message && (
                    <div className="flex items-center gap-1 mt-1">
                      <AlertCircle size={12} style={{ color: '#C0392B' }} />
                      <span className="text-xs" style={{ color: '#C0392B' }}>
                        {errors.message}
                      </span>
                    </div>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full h-12 flex items-center justify-center gap-2 text-sm font-medium text-white transition-all duration-200 hover:shadow-lg active:scale-[0.99]"
                  style={{
                    backgroundColor: 'var(--medium-blue)',
                  }}
                >
                  <Send size={16} />
                  Send Message
                </button>

                <p
                  className="text-xs text-center"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Your information will be handled in accordance with our Privacy
                  Policy.
                </p>
              </form>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: easeOutExpo }}
            >
              <Card
                className="border-0 rounded-none"
                style={{
                  backgroundColor: 'var(--bg-grey)',
                  border: 'none',
                }}
              >
                <CardContent className="p-6 space-y-6">
                  <h3
                    className="text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Direct Contact
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail
                        size={18}
                        className="shrink-0 mt-0.5"
                        style={{ color: 'var(--medium-blue)' }}
                      />
                      <div>
                        <span
                          className="label-caption block"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          General
                        </span>
                        <span
                          className="text-sm font-medium"
                          style={{ color: 'var(--medium-blue)' }}
                        >
                          info@meridianglobal.dev
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Newspaper
                        size={18}
                        className="shrink-0 mt-0.5"
                        style={{ color: 'var(--medium-blue)' }}
                      />
                      <div>
                        <span
                          className="label-caption block"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Press
                        </span>
                        <span
                          className="text-sm font-medium"
                          style={{ color: 'var(--medium-blue)' }}
                        >
                          press@meridianglobal.dev
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Handshake
                        size={18}
                        className="shrink-0 mt-0.5"
                        style={{ color: 'var(--medium-blue)' }}
                      />
                      <div>
                        <span
                          className="label-caption block"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Partnerships
                        </span>
                        <span
                          className="text-sm font-medium"
                          style={{ color: 'var(--medium-blue)' }}
                        >
                          partnerships@meridianglobal.dev
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone
                        size={18}
                        className="shrink-0 mt-0.5"
                        style={{ color: 'var(--medium-blue)' }}
                      />
                      <div>
                        <span
                          className="label-caption block"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Phone
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          +41 22 123 4567
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock
                        size={18}
                        className="shrink-0 mt-0.5"
                        style={{ color: 'var(--medium-blue)' }}
                      />
                      <div>
                        <span
                          className="label-caption block"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Hours
                        </span>
                        <span
                          className="text-sm"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Monday–Friday, 9:00 AM – 6:00 PM CET
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ REGIONAL OFFICES ============ */}
      <section style={{ backgroundColor: 'var(--bg-grey)' }}>
        <div className="container-main section-padding">
          <span
            className="label-caption block mb-2"
            style={{ color: 'var(--medium-blue)' }}
          >
            REGIONAL OFFICES
          </span>
          <h2
            className="text-xl md:text-2xl font-bold mb-8"
            style={{
              color: 'var(--text-primary)',
              fontFamily: 'Merriweather, serif',
            }}
          >
            Our country coordination units
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionalOffices.map((office, i) => (
              <motion.div
                key={office.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={fadeInUp}
              >
                <Card
                  className="h-full border bg-white p-6"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <h3
                    className="text-base font-semibold mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {office.country}
                  </h3>
                  <p
                    className="text-xs font-medium mb-4"
                    style={{ color: 'var(--medium-blue)' }}
                  >
                    {office.city}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin
                        size={14}
                        className="shrink-0 mt-0.5"
                        style={{ color: 'var(--text-muted)' }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {office.address}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Phone
                        size={14}
                        className="shrink-0 mt-0.5"
                        style={{ color: 'var(--text-muted)' }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {office.phone}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail
                        size={14}
                        className="shrink-0 mt-0.5"
                        style={{ color: 'var(--text-muted)' }}
                      />
                      <span
                        className="text-sm font-medium"
                        style={{ color: 'var(--medium-blue)' }}
                      >
                        {office.email}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HEADQUARTERS ============ */}
      <section style={{ backgroundColor: 'var(--bg-white)' }}>
        <div className="container-main py-12 md:py-16">
          <span
            className="label-caption block mb-2"
            style={{ color: 'var(--medium-blue)' }}
          >
            HEADQUARTERS
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Map placeholder */}
            <motion.div
              className="flex items-center justify-center"
              style={{
                backgroundColor: 'var(--bg-grey)',
                aspectRatio: '16/9',
                border: '1px solid var(--border)',
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              <div className="text-center">
                <MapPin
                  size={36}
                  className="mx-auto mb-2"
                  style={{ color: 'var(--medium-blue)' }}
                />
                <span
                  className="text-sm font-medium block"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Geneva, Switzerland
                </span>
                <span
                  className="text-xs block mt-1"
                  style={{ color: 'var(--text-muted)' }}
                >
                  18 Rue de Lausanne, 1201 Geneva
                </span>
              </div>
            </motion.div>

            {/* HQ Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              <h2
                className="text-xl md:text-2xl font-bold mb-4"
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'Merriweather, serif',
                }}
              >
                Meridian Global Development
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin
                    size={16}
                    className="shrink-0 mt-0.5"
                    style={{ color: 'var(--medium-blue)' }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    18 Rue de Lausanne, 1201 Geneva, Switzerland
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone
                    size={16}
                    className="shrink-0 mt-0.5"
                    style={{ color: 'var(--medium-blue)' }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    +41 22 123 4567
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail
                    size={16}
                    className="shrink-0 mt-0.5"
                    style={{ color: 'var(--medium-blue)' }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--medium-blue)' }}
                  >
                    info@meridianglobal.dev
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <Globe
                    size={16}
                    className="shrink-0 mt-0.5"
                    style={{ color: 'var(--medium-blue)' }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    meridianglobal.dev
                  </span>
                </div>
              </div>

              <p
                className="text-xs leading-relaxed"
                style={{ color: 'var(--text-muted)' }}
              >
                Registered Swiss non-profit association | Registration No.
                CH-123.456.789
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ INQUIRY TYPES ============ */}
      <section style={{ backgroundColor: 'var(--bg-dark)' }}>
        <div className="container-main section-padding">
          <div className="text-center mb-10">
            <span
              className="label-caption block mb-2"
              style={{ color: 'var(--accent)' }}
            >
              HOW CAN WE HELP?
            </span>
            <h2
              className="text-xl md:text-2xl font-bold"
              style={{
                color: '#fff',
                fontFamily: 'Merriweather, serif',
              }}
            >
              Choose the right contact pathway
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {inquiryCards.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.15 }}
                  variants={fadeInUp}
                >
                  <Card
                    className="h-full border bg-transparent p-6 transition-colors duration-200 hover:bg-white/5"
                    style={{
                      borderColor: 'rgba(255,255,255,0.2)',
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon
                        size={32}
                        className="mb-4"
                        style={{ color: 'var(--accent)' }}
                      />
                    </motion.div>
                    <h3
                      className="text-base font-semibold mb-2"
                      style={{ color: '#fff' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-3"
                      style={{ color: 'rgba(255,255,255,0.7)' }}
                    >
                      {item.description}
                    </p>
                    <a
                      href={`mailto:${item.contact}`}
                      className="text-sm font-medium underline underline-offset-2"
                      style={{ color: 'var(--accent)' }}
                    >
                      {item.contact}
                    </a>
                    <p
                      className="label-caption mt-2"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {item.responseTime}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FAQ ACCORDION ============ */}
      <section style={{ backgroundColor: 'var(--bg-grey)' }}>
        <div className="container-main section-padding">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-8">
              <span
                className="label-caption block mb-2"
                style={{ color: 'var(--medium-blue)' }}
              >
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2
                className="text-xl md:text-2xl font-bold"
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'Merriweather, serif',
                }}
              >
                Common questions
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeOutExpo }}
            >
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: i * 0.06,
                      duration: 0.4,
                      ease: easeOutExpo,
                    }}
                  >
                    <AccordionItem
                      value={`faq-${item.id}`}
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <AccordionTrigger
                        className="text-sm font-semibold py-4 hover:no-underline"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
