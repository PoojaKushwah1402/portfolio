import "./App.css";
import {useState, useEffect, useRef, useMemo} from "react";

function App() {
    const [isVisible, setIsVisible] = useState({});
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0});
    const [displayText, setDisplayText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const canvasRef = useRef(null);

    const roles = useMemo(
        () => [
            "Software Engineer",
            "Full-Stack Developer",
            "AI/ML Enthusiast",
            "Cloud Architect",
            "Problem Solver"
        ],
        []
    );

    // Typing animation effect
    useEffect(() => {
        const text = roles[textIndex % roles.length];
        let currentIndex = 0;

        const typingInterval = setInterval(() => {
            if (currentIndex <= text.length) {
                setDisplayText(text.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
                setTimeout(() => {
                    setTextIndex((prev) => prev + 1);
                }, 2000);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, [textIndex, roles]);

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({x: e.clientX, y: e.clientY});
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Particle animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 100;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.fillStyle = "rgba(99, 102, 241, 0.5)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particles.forEach((p1, i) => {
                particles.slice(i + 1).forEach((p2) => {
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(99, 102, 241, ${
                            0.2 * (1 - distance / 100)
                        })`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                });
            });

            requestAnimationFrame(animate);
        }

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible((prev) => ({
                        ...prev,
                        [entry.target.id]: entry.isIntersecting
                    }));
                });
            },
            {threshold: 0.1}
        );

        document.querySelectorAll("section[id]").forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const skills = {
        Programming: ["JavaScript", "TypeScript", "Python", "Bash"],
        Frontend: [
            "React",
            "Redux",
            "HTML/CSS",
            "Webpack",
            "Vite",
            "Tailwind",
            "Material UI"
        ],
        Backend: ["NodeJS", "NestJS", "Microservices", "BullMQ", "Serverless"],
        "AI/ML": [
            "PyTorch",
            "OpenAI GPT API",
            "Ollama",
            "MCP",
            "Hugging Face",
            "LangChain"
        ],
        Database: [
            "PostgreSQL",
            "MongoDB",
            "MySQL",
            "DynamoDB",
            "CockroachDB",
            "Redis",
            "Pinecone"
        ],
        "Cloud & DevOps": [
            "AWS",
            "GCP",
            "Docker",
            "Kubernetes",
            "Git",
            "CI/CD"
        ],
        Others: ["Agile", "Design Patterns", "System Design", "Message Queues"]
    };

    const experiences = [
        {
            company: "group.one",
            role: "Software Engineer",
            location: "Dubai",
            period: "2022 April – PRESENT",
            description:
                "group.one offers AI-powered website builder, hosting, marketing, and e-commerce services across a broad portfolio of European brands.",
            highlights: [
                "Led end-to-end development of group.one's Webshop platform, including payment integrations, inventory management, user access controls, tax calculation engines, automation workflows, and production deployments.",
                "Built and integrated AI-driven recommendation systems to enhance product discoverability and user engagement.",
                "Implemented Model Context Protocol (MCP) to enable dynamic, context-aware AI capabilities, improving recommendation accuracy and automation workflows.",
                "Developed critical authentication flows ensuring secure and seamless user experiences.",
                "Designed and implemented sharding strategies for scalability and high-performance data access.",
                "Delivered new drag-and-drop widgets (video, contact forms, third-party integrations)."
            ]
        },
        {
            company: "Bridgei2i Analytics Solutions",
            role: "Software Engineer",
            location: "India",
            period: "2021 May – 2022 April",
            description:
                "AI-driven consulting firm building scalable machine-learning and analytics solutions.",
            highlights: [
                "Developed data pipelines and analytics solutions to transform enterprise data into actionable business insights.",
                "Built predictive and reporting solutions for sales, marketing, supply-chain, and risk management.",
                "Worked with clients to embed analytics-driven insights into business workflows.",
                "Ensured high-performance, scalable data processing for large datasets."
            ]
        },
        {
            company: "Amdocs",
            role: "Associate Software Engineer",
            location: "India",
            period: "2019 Aug – 2021 May",
            description:
                "Software and services for communications and media companies with cloud platforms, billing, CRM, and AI-driven solutions.",
            highlights: [
                "Developed cloud-native platforms and telecom solutions, improving billing, CRM, and service orchestration.",
                "Implemented automation and workflow optimizations to enhance system reliability.",
                "Contributed to end-to-end full-stack projects including backend services and integrations.",
                "Collaborated with cross-functional teams to deliver telecom and media solutions."
            ]
        }
    ];

    const scrollToSection = (sectionId) => {
        document
            .getElementById(sectionId)
            ?.scrollIntoView({behavior: "smooth"});
    };

    return (
        <div className="App">
            {/* Animated Background */}
            <canvas ref={canvasRef} className="particle-canvas"></canvas>

            {/* Custom Cursor */}
            <div
                className="custom-cursor"
                style={{
                    left: `${mousePosition.x}px`,
                    top: `${mousePosition.y}px`
                }}
            ></div>

            {/* Navigation */}
            <nav className="navbar">
                <div className="nav-content">
                    <div className="nav-logo">
                        <span className="logo-bracket">{"<"}</span>
                        Portfolio
                        <span className="logo-bracket">{"/>"}</span>
                    </div>
                    <div className="nav-links">
                        <button
                            onClick={() => scrollToSection("hero")}
                            className="nav-link"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection("about")}
                            className="nav-link"
                        >
                            About
                        </button>
                        <button
                            onClick={() => scrollToSection("experience")}
                            className="nav-link"
                        >
                            Experience
                        </button>
                        <button
                            onClick={() => scrollToSection("skills")}
                            className="nav-link"
                        >
                            Skills
                        </button>
                        <button
                            onClick={() => scrollToSection("contact")}
                            className="nav-link"
                        >
                            Contact
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                id="hero"
                className={`hero-section ${isVisible["hero"] ? "visible" : ""}`}
            >
                <div className="hero-content">
                    <div className="hero-text">
                        <div className="hero-greeting">Hello World! 👋</div>
                        <h1 className="hero-title">
                            I'm a{" "}
                            <span className="gradient-text typing-text">
                                {displayText}
                            </span>
                            <span className="cursor-blink">|</span>
                        </h1>
                        <p className="hero-subtitle">
                            Crafting intelligent, scalable solutions that make a
                            difference
                        </p>
                        <p className="hero-description">
                            6+ years of experience in full-stack development,
                            AI/ML integration, and cloud architecture. Currently
                            transforming e-commerce at{" "}
                            <span className="highlight">group.one</span> in
                            Dubai.
                        </p>
                        <div className="hero-stats-inline">
                            <div className="stat-inline">
                                <span className="stat-number-inline">6+</span>
                                <span className="stat-label-inline">Years</span>
                            </div>
                            <div className="stat-inline">
                                <span className="stat-number-inline">50+</span>
                                <span className="stat-label-inline">
                                    Projects
                                </span>
                            </div>
                            <div className="stat-inline">
                                <span className="stat-number-inline">3</span>
                                <span className="stat-label-inline">
                                    Companies
                                </span>
                            </div>
                        </div>
                        <div className="hero-buttons">
                            <button
                                className="btn btn-primary"
                                onClick={() => scrollToSection("experience")}
                            >
                                <span>View My Work</span>
                                <span className="btn-arrow">→</span>
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => scrollToSection("contact")}
                            >
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

            {/* About Section */}
            <section
                id="about"
                className={`about-section ${
                    isVisible["about"] ? "visible" : ""
                }`}
            >
                <div className="container">
                    <h2 className="section-title">
                        <span className="title-number">01.</span> About Me
                    </h2>
                    <div className="about-content">
                        <div className="about-main">
                            <div className="about-text">
                                <p className="about-intro">
                                    <span className="highlight-text">
                                        Hello!
                                    </span>{" "}
                                    I'm a passionate Software Engineer
                                    specializing in building exceptional digital
                                    experiences. With <strong>6+ years</strong>{" "}
                                    of experience, I've mastered the art of
                                    transforming complex requirements into
                                    elegant, scalable solutions.
                                </p>
                                <p>
                                    Currently, I'm crafting cutting-edge
                                    e-commerce solutions at{" "}
                                    <span className="company-highlight">
                                        group.one
                                    </span>{" "}
                                    in Dubai, where I lead the development of
                                    AI-powered platforms that serve millions
                                    across Europe.
                                </p>
                                <p>
                                    My expertise spans the entire tech
                                    stack—from building intuitive React
                                    frontends to architecting robust Node.js
                                    backends, implementing AI/ML models, and
                                    designing cloud-native infrastructures on
                                    AWS and GCP.
                                </p>
                                <div className="specialties">
                                    <h4>What I bring to the table:</h4>
                                    <div className="specialty-grid">
                                        <div className="specialty-item">
                                            <span className="specialty-icon">
                                                🎯
                                            </span>
                                            <div>
                                                <strong>
                                                    End-to-End Ownership
                                                </strong>
                                                <p>
                                                    From architecture to
                                                    deployment
                                                </p>
                                            </div>
                                        </div>
                                        <div className="specialty-item">
                                            <span className="specialty-icon">
                                                🚀
                                            </span>
                                            <div>
                                                <strong>
                                                    Performance Optimization
                                                </strong>
                                                <p>
                                                    Scalable, high-performance
                                                    systems
                                                </p>
                                            </div>
                                        </div>
                                        <div className="specialty-item">
                                            <span className="specialty-icon">
                                                🤖
                                            </span>
                                            <div>
                                                <strong>AI Integration</strong>
                                                <p>
                                                    Cutting-edge ML
                                                    implementations
                                                </p>
                                            </div>
                                        </div>
                                        <div className="specialty-item">
                                            <span className="specialty-icon">
                                                ☁️
                                            </span>
                                            <div>
                                                <strong>
                                                    Cloud Architecture
                                                </strong>
                                                <p>
                                                    AWS, GCP, containerization
                                                </p>
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
                                                <span className="profile-stat-number">
                                                    6+
                                                </span>
                                                <span className="profile-stat-label">
                                                    Years
                                                </span>
                                            </div>
                                            <div className="profile-stat">
                                                <span className="profile-stat-number">
                                                    50+
                                                </span>
                                                <span className="profile-stat-label">
                                                    Projects
                                                </span>
                                            </div>
                                            <div className="profile-stat">
                                                <span className="profile-stat-number">
                                                    3
                                                </span>
                                                <span className="profile-stat-label">
                                                    Companies
                                                </span>
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

            {/* Experience Section */}
            <section
                id="experience"
                className={`experience-section ${
                    isVisible["experience"] ? "visible" : ""
                }`}
            >
                <div className="container">
                    <h2 className="section-title">
                        <span className="title-number">02.</span> Work
                        Experience
                    </h2>
                    <div className="timeline">
                        {experiences.map((exp, index) => (
                            <div key={index} className={`timeline-item`}>
                                <div className="timeline-dot"></div>
                                <div className="timeline-line"></div>
                                <div className="experience-card-modern">
                                    <div className="experience-period-badge">
                                        {exp.period}
                                    </div>
                                    <div className="experience-header-modern">
                                        <div>
                                            <h3 className="experience-role">
                                                {exp.role}
                                            </h3>
                                            <div className="experience-company">
                                                <span className="company-name">
                                                    {exp.company}
                                                </span>
                                                <span className="location-badge">
                                                    📍 {exp.location}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="experience-description-modern">
                                        {exp.description}
                                    </p>
                                    <div className="experience-highlights-modern">
                                        {exp.highlights.map(
                                            (highlight, idx) => (
                                                <div
                                                    key={idx}
                                                    className="highlight-item"
                                                >
                                                    <span className="highlight-bullet">
                                                        ▹
                                                    </span>
                                                    <span>{highlight}</span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section
                id="skills"
                className={`skills-section ${
                    isVisible["skills"] ? "visible" : ""
                }`}
            >
                <div className="container">
                    <h2 className="section-title">
                        <span className="title-number">03.</span> Technical
                        Arsenal
                    </h2>
                    <div className="skills-intro">
                        <p>
                            Technologies and tools I use to bring ideas to life
                        </p>
                    </div>
                    <div className="skills-grid-modern">
                        {Object.entries(skills).map(
                            ([category, items], index) => (
                                <div
                                    key={index}
                                    className="skill-category-modern"
                                >
                                    <div className="skill-category-header">
                                        <h3 className="category-title-modern">
                                            {category}
                                        </h3>
                                        <div className="skill-count">
                                            {items.length}
                                        </div>
                                    </div>
                                    <div className="skill-items">
                                        {items.map((skill, idx) => (
                                            <div
                                                key={idx}
                                                className="skill-item-modern"
                                            >
                                                <span className="skill-bullet">
                                                    ◆
                                                </span>
                                                <span className="skill-name">
                                                    {skill}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section
                id="contact"
                className={`contact-section ${
                    isVisible["contact"] ? "visible" : ""
                }`}
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
                                <span className="status-badge">
                                    Open to Work
                                </span>{" "}
                                and seeking exciting opportunities
                            </p>
                        </div>
                        <div className="contact-content-modern">
                            <p className="contact-text-large">
                                Whether you have a question, want to discuss a
                                project, or just want to say hi, my inbox is
                                always open. I'll do my best to get back to you!
                            </p>
                            <div className="contact-grid">
                                <a
                                    href="mailto:your.email@example.com"
                                    className="contact-card-modern email-card"
                                >
                                    <div className="contact-card-icon">📧</div>
                                    <div className="contact-card-content">
                                        <div className="contact-card-label">
                                            Email
                                        </div>
                                        <div className="contact-card-value">
                                            your.email@example.com
                                        </div>
                                    </div>
                                    <div className="contact-card-arrow">→</div>
                                </a>
                                <a
                                    href="https://linkedin.com/in/yourprofile"
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
                                    href="https://github.com/yourusername"
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
                                    href="mailto:your.email@example.com"
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

            {/* Footer */}
            <footer className="footer">
                <p>© 2025 - Built with React & passion ❤️</p>
            </footer>
        </div>
    );
}

export default App;
