import { skills } from '../data/portfolio';

function Skills({ isVisible }) {
  return (
    <section id="skills" className={`skills-section ${isVisible ? 'visible' : ''}`}>
      <div className="container">
        <h2 className="section-title">
          <span className="title-number">03.</span> Technical Arsenal
        </h2>
        <div className="skills-intro">
          <p>Technologies and tools I use to bring ideas to life</p>
        </div>
        <div className="skills-grid-modern">
          {Object.entries(skills).map(([category, items], index) => (
            <div key={index} className="skill-category-modern">
              <div className="skill-category-header">
                <h3 className="category-title-modern">{category}</h3>
                <div className="skill-count">{items.length}</div>
              </div>
              <div className="skill-items">
                {items.map((skill, idx) => (
                  <div key={idx} className="skill-item-modern">
                    <span className="skill-bullet">◆</span>
                    <span className="skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;

