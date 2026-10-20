import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { eventData } from '../data/event';
import { Reveal } from '../components/Reveal';
import { EASE_OUT_EXPO } from '../lib/easing';
import { ArrowUpRight, CheckCircle2, Send, Mail, Lock, User, Building2 } from 'lucide-react';

const initialForm = { name: '', email: '', college: '', track: 'novice' };

export function FinalCTA() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email address';
    if (!form.college.trim()) errs.college = 'Institution is required';
    return errs;
  };

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    try {
      localStorage.setItem(
        'wce_hackathon_2027_interest',
        JSON.stringify({ ...form, timestamp: new Date().toISOString() })
      );
    } catch {
      // storage unavailable — registration is session-only
    }
  };

  const inputClass = (field) =>
    `w-full pl-12 pr-4 py-3.5 rounded-sm bg-[#0b1017] border text-white text-sm font-sans outline-none focus:ring-2 focus:ring-[#7547e8]/70 transition-all duration-300 ${
      errors[field] ? 'border-rose-500' : 'hairline hover:border-white/20'
    }`;

  return (
    <section
      id="register"
      aria-label="Register interest"
      className="relative py-28 sm:py-40 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_100%,rgba(117,71,232,0.12),transparent_55%)]"
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto">
          <Reveal className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="font-mono text-[11px] text-[#7547e8] tracking-[0.2em]">SEC // 09</span>
            </div>
            <h2 className="font-display font-extrabold uppercase tracking-[-0.02em] leading-[1.02] text-4xl sm:text-5xl lg:text-6xl">
              Your next idea could
              <br />
              <span className="text-gradient-violet">change everything.</span>
            </h2>
            <p className="mt-6 text-[#929caa] text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Priority access to 2027 problem dossiers.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="relative mt-12 tech-corners glass-panel rounded-sm p-8 sm:p-12 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#7547e8]/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#7547e8]/3 via-transparent to-transparent" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-7 mb-8 border-b hairline relative z-10">
                <div>
                  <span className="font-mono text-[10px] text-[#7547e8] tracking-[0.22em] uppercase block mb-1.5">
                    Edition // 2027 Notification Registry
                  </span>
                  <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white uppercase">
                    Priority Access
                  </h3>
                </div>
                <span className="flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/[0.03] border hairline font-mono text-[10px] tracking-[0.18em] text-[#929caa] uppercase shrink-0">
                  <span className="w-2 h-2 rounded-full bg-[#b9f36b] pulse-dot" />
                  Pre-registration open
                </span>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                    className="relative z-10 text-center py-10"
                  >
                    <div className="w-14 h-14 rounded-full bg-[rgba(117,71,232,0.1)] border border-[#7547e8]/40 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-7 h-7 text-[#7547e8]" />
                    </div>
                    <h4 className="font-display font-extrabold text-3xl text-white uppercase">
                      Interest logged
                    </h4>
                    <p className="mt-4 text-[#929caa] max-w-md mx-auto leading-relaxed">
                      {form.name.split(' ')[0]} — your priority alert for the{' '}
                      <span className="text-[#7547e8] font-mono text-sm">{form.track.toUpperCase()}</span> track
                      is recorded in this browser session.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                      <a href={eventData.officialWebsite} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                        Official Portal
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setForm(initialForm);
                        }}
                        className="font-mono text-xs text-[#929caa] hover:text-white transition-colors uppercase tracking-[0.16em]"
                      >
                        Submit another
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.5 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="relative z-10 space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="reg-name" className="block font-mono text-[11px] tracking-[0.18em] uppercase text-[#c7cfd9] mb-2">
                          Team Lead Name <span className="text-[#7547e8]">*</span>
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5c6673] pointer-events-none" />
                          <input
                            id="reg-name"
                            type="text"
                            value={form.name}
                            onChange={update('name')}
                            placeholder="e.g. Aniket Bodkhe"
                            className={inputClass('name')}
                            aria-invalid={Boolean(errors.name)}
                          />
                        </div>
                        {errors.name && <span className="text-xs text-rose-400 mt-1.5 block font-mono ml-2">{errors.name}</span>}
                      </div>
                      <div>
                        <label htmlFor="reg-email" className="block font-mono text-[11px] tracking-[0.18em] uppercase text-[#c7cfd9] mb-2">
                          Official Email <span className="text-[#7547e8]">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5c6673] pointer-events-none" />
                          <input
                            id="reg-email"
                            type="email"
                            value={form.email}
                            onChange={update('email')}
                            placeholder="developer@college.edu"
                            className={inputClass('email')}
                            aria-invalid={Boolean(errors.email)}
                          />
                        </div>
                        {errors.email && <span className="text-xs text-rose-400 mt-1.5 block font-mono ml-2">{errors.email}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="reg-college" className="block font-mono text-[11px] tracking-[0.18em] uppercase text-[#c7cfd9] mb-2">
                          Institution <span className="text-[#7547e8]">*</span>
                        </label>
                        <div className="relative">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5c6673] pointer-events-none" />
                          <input
                            id="reg-college"
                            type="text"
                            value={form.college}
                            onChange={update('college')}
                            placeholder="College of Engineering"
                            className={inputClass('college')}
                            aria-invalid={Boolean(errors.college)}
                          />
                        </div>
                        {errors.college && <span className="text-xs text-rose-400 mt-1.5 block font-mono ml-2">{errors.college}</span>}
                      </div>
                      <div>
                        <label htmlFor="reg-track" className="block font-mono text-[11px] tracking-[0.18em] uppercase text-[#c7cfd9] mb-2">
                          Target Track
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5c6673] pointer-events-none" />
                          <select
                            id="reg-track"
                            value={form.track}
                            onChange={update('track')}
                            className="w-full pl-12 pr-4 py-3.5 rounded-sm bg-[#0b1017] hairline text-white text-sm outline-none focus:ring-2 focus:ring-[#7547e8]/70 transition-all appearance-none"
                          >
                            <option value="novice">Novice — 1st & 2nd Year</option>
                            <option value="expert">Expert — Advanced Systems</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-xs text-[#5c6673] font-mono leading-relaxed panel-line rounded-sm p-4">
                      <span className="text-[#7547e8] mt-0.5">i</span>
                      This logs your interest for 2027 priority updates. Final Round 1 registration happens on the official symposium portal upon release.
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <button type="submit" className="btn-primary">
                        Record Pre-Registration
                        <Send className="w-4 h-4" />
                      </button>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-[#5c6673] uppercase">
                        Round 1 entry — 100% free
                      </span>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}