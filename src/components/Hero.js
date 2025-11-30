function Hero({ scrollToSection, isVisible, displayText }) {
  return (
    <section id="hero" className={`hero-section ${isVisible ? 'visible' : ''}`}>
      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-greeting">Hello World! 👋</div>
          <h1 className="hero-title">
            I'm a <span className="gradient-text typing-text">{displayText}</span>
            <span className="cursor-blink">|</span>
          </h1>
          <p className="hero-subtitle">
            Crafting intelligent, scalable solutions that make a difference
          </p>
          <p className="hero-description">
            6+ years of experience in full-stack development, AI/ML integration, and cloud architecture.
            Currently transforming e-commerce at <span className="highlight">group.one</span> in Dubai.
          </p>
          <div className="hero-stats-inline">
            <div className="stat-inline">
              <span className="stat-number-inline">6+</span>
              <span className="stat-label-inline">Years</span>
            </div>
            <div className="stat-inline">
              <span className="stat-number-inline">50+</span>
              <span className="stat-label-inline">Projects</span>
            </div>
            <div className="stat-inline">
              <span className="stat-number-inline">3</span>
              <span className="stat-label-inline">Companies</span>
            </div>
          </div>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollToSection('experience')}>
              <span>View My Work</span>
              <span className="btn-arrow">→</span>
            </button>
            <button className="btn btn-secondary" onClick={() => scrollToSection('contact')}>
              <span>Let's Talk</span>
              <span className="btn-icon">💬</span>
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="code-window">
            <div className="code-header">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="code-content">
              <pre>
                <code>
{`const developer = {
  name: "Software Engineer",
  location: "Dubai 🇦🇪",
  experience: "6+ years",
  passion: "AI & Cloud",
  
  skills: {
    frontend: ["React", "TypeScript"],
    backend: ["Node.js", "NestJS"],
    ai: ["PyTorch", "OpenAI", "MCP"],
    cloud: ["AWS", "GCP", "Docker"]
  },
  
  currentlyWorking: "group.one",
  openToWork: true
};`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <p>Scroll to explore</p>
      </div>
    </section>
  );
}

export default Hero;

