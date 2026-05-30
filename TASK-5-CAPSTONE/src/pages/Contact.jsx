import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

export default function Contact() {
  // Input fields initial state variables
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'general',
    message: ''
  });

  // Client validation state holders
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // Update specific values upon edits with boundary resets
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((state) => ({ ...state, [name]: value }));
    
    // Clear validation error on that field when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Run detailed input validations upon submission
  const validateForm = () => {
    const freshErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate name lengths
    if (!formData.fullName.trim()) {
      freshErrors.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 3) {
      freshErrors.fullName = 'Name must be at least 3 characters.';
    }

    // Validate email values
    if (!formData.email.trim()) {
      freshErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      freshErrors.email = 'Please specify a valid email format.';
    }

    // Validate message lengths
    if (!formData.message.trim()) {
      freshErrors.message = 'Please write a brief message.';
    } else if (formData.message.trim().length < 15) {
      freshErrors.message = 'Message details must exceed 15 characters.';
    }

    setErrors(freshErrors);
    return Object.keys(freshErrors).length === 0;
  };

  // Execute submission trigger simulation
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate ticket compilation and return random digits
      const generatedTicket = 'TIC-' + Math.floor(Math.random() * 8999 + 1000);
      setTicketId(generatedTicket);
      setIsSubmitted(true);
      
      // Clear out stored state upon success
      setFormData({
        fullName: '',
        email: '',
        subject: 'general',
        message: ''
      });
      setErrors({});
    }
  };

  return (
    <div className="contact-page container" id="contact-view">
      {/* 1. Header Hero section */}
      <section className="contact-header text-center">
        <h1 className="page-title">Contact Support</h1>
        <p className="page-subtitle">
          Have an inquiry regarding split mechanical keyboards or custom order statuses? 
          Drop us a line and let our help desk team assist you.
        </p>
      </section>

      {/* 2. Form Grid / Success Receipt */}
      <main className="contact-grid-workspace" id="contact-workspace">
        {/* Left Side Column: Form / Success Card */}
        <section className="contact-form-side">
          {isSubmitted ? (
            <div className="contact-success-card" id="contact-success-banner">
              <div className="success-badge">
                <CheckCircle className="badge-logo-icon" />
              </div>
              <h2 className="success-heading">Inquiry Transmitted!</h2>
              <p className="success-body">
                Thank you for contacting ThiraShop help desk. Our curators have saved your inquiry 
                and generated a ticket reference ID. An associate will respond within 12 business hours.
              </p>
              
              <div className="ticket-badge-box">
                <span className="ticket-lbl">Help Ticket ID:</span>
                <strong className="ticket-id" id="contact-ticket-id">{ticketId}</strong>
              </div>

              <div className="ticket-meta-hints">
                <span>Confirmation receipt details were dispatched to your inbox.</span>
              </div>

              <button 
                type="button" 
                onClick={() => setIsSubmitted(false)}
                className="btn btn-secondary btn-restart-form"
                id="contact-new-ticket-btn"
              >
                Send Another Ticket
              </button>
            </div>
          ) : (
            /* Interactive Validation Form panel */
            <div className="form-card-container" id="contact-form-panel">
              <h3 className="card-form-title">Send a Secure Ticket</h3>
              <p className="card-form-subtitle">Fields marked with an asterisk (*) are mandatory.</p>
              
              <form onSubmit={handleSubmit} className="contact-form-body" id="contact-query-form" noValidate>
                {/* Full name inputs review */}
                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">Full Name *</label>
                  <input 
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`form-input ${errors.fullName ? 'input-error-border' : ''}`}
                    placeholder="Enter your full name"
                    aria-label="Full Name"
                  />
                  {errors.fullName && (
                    <span className="field-error-msg" id="fullName-error-msg">
                      <AlertTriangle className="mini-error-icon" /> {errors.fullName}
                    </span>
                  )}
                </div>

                {/* Email address inputs review */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address *</label>
                  <input 
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'input-error-border' : ''}`}
                    placeholder="siddeshmange3448@gmail.com"
                    aria-label="Email Address"
                  />
                  {errors.email && (
                    <span className="field-error-msg" id="email-error-msg">
                      <AlertTriangle className="mini-error-icon" /> {errors.email}
                    </span>
                  )}
                </div>

                {/* Subject selection dropdown */}
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">Inquiry Subject</label>
                  <select 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-input"
                    aria-label="Inquiry Subject"
                  >
                    <option value="general">General Custom Feedback</option>
                    <option value="delivery">Order Shipping & Delivery Issue</option>
                    <option value="product">Product Warranty & Specs Info</option>
                    <option value="internship">Thiranex Internship Inquiries</option>
                  </select>
                </div>

                {/* Message text element */}
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Written Message *</label>
                  <textarea 
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className={`form-input text-area-input ${errors.message ? 'input-error-border' : ''}`}
                    placeholder="Type details concerning the inquiry here... (min 15 characters)"
                    aria-label="Inquiry Message"
                  />
                  {errors.message && (
                    <span className="field-error-msg" id="message-error-msg">
                      <AlertTriangle className="mini-error-icon" /> {errors.message}
                    </span>
                  )}
                </div>

                {/* Submit button trigger */}
                <button type="submit" className="btn btn-primary btn-submit-form" id="contact-submit-btn">
                  <span>Transmit Inquiry</span> <Send className="btn-send-icon" />
                </button>
              </form>
            </div>
          )}
        </section>

        {/* Right Side Column: Corporate Info & Details */}
        <aside className="contact-info-side">
          {/* Showroom card */}
          <div className="info-item-block" id="contact-showroom-card">
            <h3 className="info-block-heading">Flagship Location</h3>
            <div className="contact-detail-line">
              <MapPin className="detail-line-icon" />
              <p className="detail-line-text">
                <strong>ThiraShop Corporate Hub</strong><br />
                89 Craftsmans Boulevard, Sector 4<br />
                Mumbai, Maharashtra, India
              </p>
            </div>
          </div>

          {/* Quick Helpline cards */}
          <div className="info-item-block" id="contact-helpline-card">
            <h3 className="info-block-heading">Helpline Connection</h3>
            
            <div className="contact-detail-line">
              <Phone className="detail-line-icon" />
              <p className="detail-line-text">
                <strong>Support Line:</strong> +91 93245 42314<br />
                <strong>Mon - Fri:</strong> 9:00 AM to 6:00 PM IST
              </p>
            </div>

            <div className="contact-detail-line">
              <Mail className="detail-line-icon" />
              <p className="detail-line-text">
                <strong>Email Address:</strong><br />
                siddeshmange3448@gmail.com
              </p>
            </div>

            <div className="contact-detail-line">
              <Clock className="detail-line-icon" />
              <p className="detail-line-text">
                <strong>Response Guarantee:</strong><br />
                Within 12 business hours.
              </p>
            </div>
          </div>

          {/* FAQ quick helpers list */}
          <div className="info-item-block faq-brief-block" id="contact-faq-help-card">
            <h3 className="info-block-heading">
              <HelpCircle className="inline-title-icon" /> Quick FAQ Aids
            </h3>
            <ul className="faq-short-list">
              <li>
                <strong>Do you offer shipping overseas?</strong>
                <p>Yes, we distribute our premium artisan collections worldwide with complete tracking coverage.</p>
              </li>
              <li>
                <strong>What methods are certified for checkout?</strong>
                <p>All prominent digital wallets, direct UPI vectors, and major credit cards (Visa, Mastercard).</p>
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
