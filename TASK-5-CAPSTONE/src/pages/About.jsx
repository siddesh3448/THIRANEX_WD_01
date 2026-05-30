import React from 'react';
import { Github, Linkedin, Award, Compass, Target, ShieldCheck, Mail, ChevronRight, Bookmark } from 'lucide-react';

export default function About() {
  return (
    <div className="about-page container" id="about-us-view">
      {/* 1. Header Hero section */}
      <section className="about-header text-center">
        <span className="about-badge">Thiranex Capstone Project</span>
        <h1 className="page-title">Handcrafting Tomorrow's Web</h1>
        <p className="page-subtitle max-w-2xl mx-auto">
          This digital workspace is the culmination of Thiranex Web Development 
          Internship program's Task 5. Experience a modern, fluid client-side viewport.
        </p>
      </section>

      {/* 2. Brand Pillar Section: Mission, Vision, and Quality */}
      <section className="about-pillars-grid" id="brand-pillars">
        <div className="pillar-item-card">
          <div className="pillar-icon-outer text-accent">
            <Target className="pillar-icon" />
          </div>
          <h3 className="pillar-title">Custom Design Philosophy</h3>
          <p className="pillar-desc">
            We rejects common boilerplate templates and bloated design builders. This catalogue 
            is coded with pure semantic markup and curated CSS variables to ensure zero layout rendering lag.
          </p>
        </div>

        <div className="pillar-item-card">
          <div className="pillar-icon-outer text-accent">
            <Compass className="pillar-icon" />
          </div>
          <h3 className="pillar-title">Accessible Engineering</h3>
          <p className="pillar-desc">
            Optimized with explicit keyboard controls and high-contrast styling boundaries, allowing 
            diverse screen reader tech to read, filter, search, and purchase catalog items.
          </p>
        </div>

        <div className="pillar-item-card">
          <div className="pillar-icon-outer text-accent">
            <ShieldCheck className="pillar-icon" />
          </div>
          <h3 className="pillar-title">Persistent States</h3>
          <p className="pillar-desc">
            Features an state-synchronized Cart Context system which leverages safe local caching 
            to protect and preserve selected consumer commodities across page reloads.
          </p>
        </div>
      </section>

      {/* 3. Detailed Internship Info Banner */}
      <section className="internship-details-banner" id="project-internship-meta">
        <div className="internship-container">
          <div className="intern-scope-panel">
            <h2 className="scope-title">
              <Award className="inline-title-icon" /> Project Scope & Milestones
            </h2>
            <p className="scope-intro">
              Task 5 represents the final Capstone milestone of the Thiranex Web Development 
              Internship curriculum. The system compiles interactive routing, dynamic search caching, 
              context APIs, and pure CSS layout modules into a single lightweight client-side application.
            </p>
            
            <div className="milestones-row">
              <div className="milestone-badge">
                <span className="milestone-num">1</span>
                <span>Reactive Views</span>
              </div>
              <div className="milestone-badge">
                <span className="milestone-num">2</span>
                <span>Custom Resilient CSS</span>
              </div>
              <div className="milestone-badge">
                <span className="milestone-num">3</span>
                <span>Cart Context Synchronization</span>
              </div>
              <div className="milestone-badge">
                <span className="milestone-num">4</span>
                <span>Form Inputs Sanitizations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Professional Developer Portfolio Showcase Card */}
      <section className="developer-biography-showcase" id="developer-portfolio-card">
        <div className="bio-card-wrapper">
          <div className="bio-photo-panel">
            {/* Elegant Letter Avatar Placeholder */}
            <div className="letter-avatar-box">
              <span className="avatar-letters">SM</span>
            </div>
            <h3 className="developer-fullName">Siddesh Mange</h3>
            <p className="developer-slug">Full Stack Web Engineering Intern</p>
            <div className="developer-mail-row">
              <Mail className="dev-mail-icon" />
              <span>siddeshmange3448@gmail.com</span>
            </div>
          </div>
          
          <div className="bio-experience-panel">
            <span className="bio-tag">About the Developer</span>
            <h3 className="bio-heading">Transforming Logic Into Elegant Visual interfaces</h3>
            <p className="bio-paragraph">
              Siddesh Mange is an aspiring Web Developer with expertise in building performant, 
              modular, and visually compelling applications using React, JavaScript, and semantic 
              modern layout grids.
            </p>
            <p className="bio-paragraph">
              Throughout this Thiranex Web Development internship term, Siddesh focused on engineering 
              resilient component structures, understanding UX layout metrics, optimizing for speed, 
              and applying proper local data caching protocols.
            </p>

            {/* Resume social and anchor connections */}
            <div className="dev-portfolio-anchors">
              <h4 className="anchors-heading">Connect with Siddesh:</h4>
              <div className="anchors-flex-row">
                <a 
                  href="https://github.com/siddesh3448" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary btn-portfolio-link"
                  id="about-github-link"
                >
                  <Github className="social-mini-icon" />
                  <span>GitHub Repository</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/siddesh-mange/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-secondary btn-portfolio-link"
                  id="about-linkedin-link"
                >
                  <Linkedin className="social-mini-icon" />
                  <span>LinkedIn Network</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
