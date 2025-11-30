import { experiences } from '../data/portfolio';

function Experience({ isVisible }) {
  return (
    <section id="experience" className={`experience-section ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">02.</span> Work Experience
        </h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-line"></div>
              <div className="experience-card-modern">
                <div className="experience-period-badge">{exp.period}</div>
                <div className="experience-header-modern">
                  <div>
                    <h3 className="experience-role">{exp.role}</h3>
                    <div className="experience-company">
                      <span className="company-name">{exp.company}</span>
                      <span className="location-badge">📍 {exp.location}</span>
                    </div>
                  </div>
                </div>
                <p className="experience-description-modern">{exp.description}</p>
                <div className="experience-highlights-modern">
                  {exp.highlights.map((highlight, idx) => (
                    <div key={idx} className="highlight-item">
                      <span className="highlight-bullet">▹</span>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;

