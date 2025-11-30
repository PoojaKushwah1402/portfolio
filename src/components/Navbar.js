function Navbar({ scrollToSection }) {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-logo">
          <span className="logo-bracket">{'<'}</span>
          Portfolio
          <span className="logo-bracket">{'/>'}</span>
        </div>
        <div className="nav-links">
          <button onClick={() => scrollToSection('hero')} className="nav-link">
            Home
          </button>
          <button onClick={() => scrollToSection('about')} className="nav-link">
            About
          </button>
          <button onClick={() => scrollToSection('experience')} className="nav-link">
            Experience
          </button>
          <button onClick={() => scrollToSection('skills')} className="nav-link">
            Skills
          </button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">
            Contact
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

