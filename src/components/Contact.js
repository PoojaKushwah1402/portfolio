function Contact({isVisible}) {
    return (
        <section
            id="contact"
            className={`contact-section ${isVisible ? "visible" : ""}`}
        >
            <div className="container">
                <div className="contact-wrapper">
                    <div className="contact-header">
                        <h2 className="section-title">
                            <span className="title-number">04.</span> Get In
                            Touch
                        </h2>
                        <p className="contact-subtitle">
                            I'm currently{" "}
                            <span className="status-badge">Open to Work</span>{" "}
                            and seeking exciting opportunities
                        </p>
                    </div>
                    <div className="contact-content-modern">
                        <p className="contact-text-large">
                            Whether you have a question, want to discuss a
                            project, or just want to say hi, my inbox is always
                            open. I'll do my best to get back to you!
                        </p>
                        <div className="contact-grid">
                            <a
                                href="mailto:pookus7790@gmail.com"
                                className="contact-card-modern email-card"
                            >
                                <div className="contact-card-icon">📧</div>
                                <div className="contact-card-content">
                                    <div className="contact-card-label">
                                        Email
                                    </div>
                                    <div className="contact-card-value">
                                        pookus7790@gmail.com
                                    </div>
                                </div>
                                <div className="contact-card-arrow">→</div>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/pooja-kushwah-b22584137/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-card-modern linkedin-card"
                            >
                                <div className="contact-card-icon">💼</div>
                                <div className="contact-card-content">
                                    <div className="contact-card-label">
                                        LinkedIn
                                    </div>
                                    <div className="contact-card-value">
                                        Let's connect professionally
                                    </div>
                                </div>
                                <div className="contact-card-arrow">→</div>
                            </a>
                            <a
                                href="https://github.com/PoojaKushwah1402/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-card-modern github-card"
                            >
                                <div className="contact-card-icon">💻</div>
                                <div className="contact-card-content">
                                    <div className="contact-card-label">
                                        GitHub
                                    </div>
                                    <div className="contact-card-value">
                                        Check out my code
                                    </div>
                                </div>
                                <div className="contact-card-arrow">→</div>
                            </a>
                        </div>
                        <div className="contact-cta">
                            <a
                                href="mailto:pookus7790@gmail.com"
                                className="btn btn-contact"
                            >
                                <span>Send me an email</span>
                                <span className="btn-icon">✉️</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
