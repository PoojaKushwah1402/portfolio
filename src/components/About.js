function About({ isVisible }) {
  return (
    <section id="about" className={`about-section ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">01.</span> About Me
        </h2>
        <div className="about-content">
          <div className="about-main">
            <div className="about-text">
              <p className="about-intro">
                <span className="highlight-text">Hello!</span> I'm a passionate Software Engineer specializing in 
                building exceptional digital experiences. With <strong>6+ years</strong> of experience, 
                I've mastered the art of transforming complex requirements into elegant, scalable solutions.
              </p>
              <p>
                Currently, I'm crafting cutting-edge e-commerce solutions at <span className="company-highlight">group.one</span> in 
                Dubai, where I lead the development of AI-powered platforms that serve millions across Europe.
              </p>
              <p>
                My expertise spans the entire tech stack—from building intuitive React frontends to 
                architecting robust Node.js backends, implementing AI/ML models, and designing 
                cloud-native infrastructures on AWS and GCP.
              </p>
              <div className="specialties">
                <h4>What I bring to the table:</h4>
                <div className="specialty-grid">
                  <div className="specialty-item">
                    <span className="specialty-icon">🎯</span>
                    <div>
                      <strong>End-to-End Ownership</strong>
                      <p>From architecture to deployment</p>
                    </div>
                  </div>
                  <div className="specialty-item">
                    <span className="specialty-icon">🚀</span>
                    <div>
                      <strong>Performance Optimization</strong>
                      <p>Scalable, high-performance systems</p>
                    </div>
                  </div>
                  <div className="specialty-item">
                    <span className="specialty-icon">🤖</span>
                    <div>
                      <strong>AI Integration</strong>
                      <p>Cutting-edge ML implementations</p>
                    </div>
                  </div>
                  <div className="specialty-item">
                    <span className="specialty-icon">☁️</span>
                    <div>
                      <strong>Cloud Architecture</strong>
                      <p>AWS, GCP, containerization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="profile-card">
                <div className="profile-overlay">
                  <div className="profile-stats">
                    <div className="profile-stat">
                      <span className="profile-stat-number">6+</span>
                      <span className="profile-stat-label">Years</span>
                    </div>
                    <div className="profile-stat">
                      <span className="profile-stat-number">50+</span>
                      <span className="profile-stat-label">Projects</span>
                    </div>
                    <div className="profile-stat">
                      <span className="profile-stat-number">3</span>
                      <span className="profile-stat-label">Companies</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tech-icons">
                <div className="tech-icon">⚛️</div>
                <div className="tech-icon">🟢</div>
                <div className="tech-icon">🐍</div>
                <div className="tech-icon">☁️</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

