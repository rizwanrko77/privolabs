import React, { useState, useRef, useEffect } from 'react';
import { actions, isInputError } from 'astro:actions';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [loadTime, setLoadTime] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setLoadTime(Date.now());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Timestamp check: if submitted in under 3 seconds, reject (bot behavior)
    if (Date.now() - loadTime < 3000) {
      setErrorMsg("Please take a moment before submitting the form.");
      setStatus('error');
      return;
    }

    if (!formRef.current) return;
    
    setStatus('submitting');
    setErrorMsg('');

    const formData = new FormData(formRef.current);
    
    try {
      const { data, error } = await actions.contact(formData);
      
      if (error) {
        setStatus('error');
        // Check for Zod input validation errors
        if (isInputError(error)) {
          const fields = error.fields as Record<string, string[]>;
          const firstError = Object.values(fields)[0]?.[0] || 'Please check your inputs and try again.';
          setErrorMsg(`Validation Error: ${firstError}`);
        } else {
          setErrorMsg(error.message || 'An unexpected error occurred. Please try again.');
        }
      } else if (data?.success) {
        setStatus('success');
        formRef.current.reset();
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('A network error occurred. Please check your connection and try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="contact-success" role="alert">
        <h3 className="font-display heading" style={{ fontSize: 'var(--body-lg)' }}>Message received</h3>
        <p className="text-muted mt-4">Thank you for reaching out. An engineer will be in touch with you shortly.</p>
        <button 
          type="button" 
          className="btn-secondary mt-6" 
          onClick={() => setStatus('idle')}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="contact-form bg-surface-raised" aria-live="polite">
      {status === 'error' && (
        <div className="form-error" role="alert">
          <p><strong>Error:</strong> {errorMsg}</p>
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" required minLength={2} maxLength={80} placeholder="Jane Doe" disabled={status === 'submitting'} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Work Email</label>
          <input type="email" id="email" name="email" required placeholder="jane@company.com" disabled={status === 'submitting'} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="company">Company (Optional)</label>
          <input type="text" id="company" name="company" maxLength={120} placeholder="Acme Corp" disabled={status === 'submitting'} />
        </div>

        <div className="form-group">
          <label htmlFor="projectType">Project Type</label>
          <select id="projectType" name="projectType" disabled={status === 'submitting'}>
            <option value="">Select...</option>
            <option value="web">Web Application</option>
            <option value="android">Android App</option>
            <option value="ios">iOS App</option>
            <option value="ai">AI System</option>
            <option value="cloud">Cloud Architecture</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="budget">Estimated Budget</label>
          <select id="budget" name="budget" disabled={status === 'submitting'}>
            <option value="">Select...</option>
            <option value="<25k">Under $25k</option>
            <option value="25-75k">$25k - $75k</option>
            <option value="75-200k">$75k - $200k</option>
            <option value="200k+">$200k+</option>
            <option value="unsure">Not sure yet</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="timeline">Timeline</label>
          <select id="timeline" name="timeline" disabled={status === 'submitting'}>
            <option value="">Select...</option>
            <option value="asap">ASAP</option>
            <option value="1-3mo">1-3 Months</option>
            <option value="3-6mo">3-6 Months</option>
            <option value="exploring">Just exploring</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input type="text" id="subject" name="subject" required maxLength={120} placeholder="How can we help?" disabled={status === 'submitting'} />
      </div>

      <div className="form-group">
        <label htmlFor="message">Project Details</label>
        <textarea id="message" name="message" required minLength={20} maxLength={4000} rows={5} placeholder="Tell us about the challenges you're facing..." disabled={status === 'submitting'} />
      </div>

      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true" style={{ display: 'none' }}>
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="btn btn-primary form-submit-btn mt-4" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Submitting...' : 'Send Message'}
      </button>
    </form>
  );
}
