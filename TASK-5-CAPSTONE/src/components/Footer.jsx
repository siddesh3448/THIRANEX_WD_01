import React from 'react';
import { Github, Linkedin, Heart, ShoppingBag, Mail, Globe, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" id="app-footer-bar">
      <div className="container footer-grid">
        {/* Brand & Mission section */}
        <div className="footer-section brand-summary">
          <div className="brand-logo footer-logo">
            <ShoppingBag className="icon-logo" />
            <span className="brand-text">Thira<span className="accent-text">Shop</span></span>
          </div>
          <p className="brand-pitch">
            A premium handcrafted e-commerce solution focused on modern aesthetic layout, 
            lightning fast client-side performance, and perfect accessibility standard.
          </p>
        </div>

        {/* Navigation / Sitemap */}
        <div className="footer-section footer-links-section">
          <h4 className="footer-heading">Shop Guide</h4>
          <ul className="footer-link-list">
            <li><a href="/" className="footer-link">Home Portal</a></li>
            <li><a href="/products" className="footer-link">All Products</a></li>
            <li><a href="/about" className="footer-link">Our Mission</a></li>
            <li><a href="/contact" className="footer-link">Get Help</a></li>
          </ul>
        </div>

        {/* Contact/Internship Meta */}
        <div className="footer-section footer-contact-section">
          <h4 className="footer-heading">Project Scope</h4>
          <ul className="footer-meta-list">
            <li>
              <MapPin className="meta-icon" />
              <span>Capstone Project - Task 5</span>
            </li>
            <li>
              <Mail className="meta-icon" />
              <span>siddeshmange3448@gmail.com</span>
            </li>
            <li>
              <Globe className="meta-icon" />
              <span>Thiranex Tech Internship</span>
            </li>
          </ul>
        </div>

        {/* Author / Intern Section */}
        <div className="footer-section author-meta">
          <h4 className="footer-heading">Developer Portfolio</h4>
          <p className="author-name">Siddesh Mange</p>
          <p className="author-role">Web Development Intern</p>
          <div className="social-links-row">
            <a 
              href="https://github.com/siddesh3448" 
              target="_blank" 
              rel="noreferrer" 
              className="social-icon-link"
              aria-label="Siddesh Mange GitHub Link"
              id="footer-github-link"
            >
              <Github className="social-icon" />
            </a>
            <a 
              href="https://www.linkedin.com/in/siddesh-mange/" 
              target="_blank" 
              rel="noreferrer" 
              className="social-icon-link"
              aria-label="Siddesh Mange LinkedIn Link"
              id="footer-linkedin-link"
            >
              <Linkedin className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* Underbar copyright details */}
      <div className="footer-underbar">
        <div className="container underbar-flex">
          <p className="copyright-text">
            &copy; {currentYear} ThiraShop. All rights reserved. Handcrafted by Siddesh Mange.
          </p>
          <p className="love-text">
            Made with <Heart className="heart-icon" /> for the Thiranex Web Development Internship
          </p>
        </div>
      </div>
    </footer>
  );
}
