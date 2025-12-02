import "./App.css";
import {useState, useEffect, useRef} from "react";

const themes = {
    // ===== DARK THEMES =====
    ocean: {
        name: "🌊 Ocean Dark",
        isLight: false,
        bg: "#0a0a0f",
        bgAlt: "#12121a",
        surface: "#1a1a24",
        surfaceHover: "#24243a",
        border: "#2d2d44",
        text: "#f0f0ff",
        textSecondary: "#a0a0cc",
        textMuted: "#6666aa",
        thrill: "#0ea5e9",
        thrillLight: "#38bdf8",
        thrillDark: "#0284c7",
        thrillGlow: "rgba(14, 165, 233, 0.3)",
        gradient:
            "linear-gradient(135deg, #0284c7 0%, #0ea5e9 40%, #06b6d4 100%)",
        electric: "#06b6d4",
        electricGlow: "rgba(6, 182, 212, 0.2)",
        accentPink: "#22d3ee",
        accentGold: "#67e8f9"
    },
    forest: {
        name: "🌲 Forest Dark",
        isLight: false,
        bg: "#0a0f0a",
        bgAlt: "#121a12",
        surface: "#1a241a",
        surfaceHover: "#243a24",
        border: "#2d442d",
        text: "#f0fff0",
        textSecondary: "#a0cca0",
        textMuted: "#66aa66",
        thrill: "#22c55e",
        thrillLight: "#4ade80",
        thrillDark: "#16a34a",
        thrillGlow: "rgba(34, 197, 94, 0.3)",
        gradient:
            "linear-gradient(135deg, #16a34a 0%, #22c55e 40%, #fbbf24 100%)",
        electric: "#fbbf24",
        electricGlow: "rgba(251, 191, 36, 0.2)",
        accentPink: "#84cc16",
        accentGold: "#facc15"
    },
    sunset: {
        name: "🔥 Sunset Dark",
        isLight: false,
        bg: "#0f0a0a",
        bgAlt: "#1a1212",
        surface: "#241a1a",
        surfaceHover: "#3a2424",
        border: "#442d2d",
        text: "#fff0f0",
        textSecondary: "#cca0a0",
        textMuted: "#aa6666",
        thrill: "#f97316",
        thrillLight: "#fb923c",
        thrillDark: "#ea580c",
        thrillGlow: "rgba(249, 115, 22, 0.3)",
        gradient:
            "linear-gradient(135deg, #ea580c 0%, #f97316 40%, #eab308 100%)",
        electric: "#eab308",
        electricGlow: "rgba(234, 179, 8, 0.2)",
        accentPink: "#fbbf24",
        accentGold: "#fde047"
    },
    galaxy: {
        name: "🌌 Galaxy Dark",
        isLight: false,
        bg: "#0a0a0f",
        bgAlt: "#12121a",
        surface: "#1a1a24",
        surfaceHover: "#24243a",
        border: "#2d2d44",
        text: "#f0f0ff",
        textSecondary: "#a0a0cc",
        textMuted: "#6666aa",
        thrill: "#6366f1",
        thrillLight: "#818cf8",
        thrillDark: "#4f46e5",
        thrillGlow: "rgba(99, 102, 241, 0.3)",
        gradient:
            "linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #8b5cf6 100%)",
        electric: "#8b5cf6",
        electricGlow: "rgba(139, 92, 246, 0.2)",
        accentPink: "#a78bfa",
        accentGold: "#c4b5fd"
    },
    classic: {
        name: "🎢 Classic Dark",
        isLight: false,
        bg: "#0c0c0c",
        bgAlt: "#141414",
        surface: "#1a1a1a",
        surfaceHover: "#242424",
        border: "#2a2a2a",
        text: "#ffffff",
        textSecondary: "#999999",
        textMuted: "#666666",
        thrill: "#ff3d00",
        thrillLight: "#ff6e40",
        thrillDark: "#dd2c00",
        thrillGlow: "rgba(255, 61, 0, 0.3)",
        gradient:
            "linear-gradient(135deg, #dd2c00 0%, #ff3d00 40%, #ffab40 100%)",
        electric: "#00b4ff",
        electricGlow: "rgba(0, 180, 255, 0.2)",
        accentPink: "#ff6e40",
        accentGold: "#ffab40"
    },

    // ===== LIGHT THEMES =====
    oceanLight: {
        name: "🌊 Ocean Light",
        isLight: true,
        bg: "#f0f9ff",
        bgAlt: "#e0f2fe",
        surface: "#ffffff",
        surfaceHover: "#f0f9ff",
        border: "#bae6fd",
        text: "#0c4a6e",
        textSecondary: "#0369a1",
        textMuted: "#0ea5e9",
        thrill: "#0284c7",
        thrillLight: "#0ea5e9",
        thrillDark: "#0369a1",
        thrillGlow: "rgba(2, 132, 199, 0.15)",
        gradient:
            "linear-gradient(135deg, #0369a1 0%, #0284c7 40%, #0ea5e9 100%)",
        electric: "#06b6d4",
        electricGlow: "rgba(6, 182, 212, 0.1)",
        accentPink: "#0891b2",
        accentGold: "#22d3ee"
    },
    forestLight: {
        name: "🌲 Forest Light",
        isLight: true,
        bg: "#f0fdf4",
        bgAlt: "#dcfce7",
        surface: "#ffffff",
        surfaceHover: "#f0fdf4",
        border: "#bbf7d0",
        text: "#14532d",
        textSecondary: "#166534",
        textMuted: "#22c55e",
        thrill: "#16a34a",
        thrillLight: "#22c55e",
        thrillDark: "#15803d",
        thrillGlow: "rgba(22, 163, 74, 0.15)",
        gradient:
            "linear-gradient(135deg, #15803d 0%, #16a34a 40%, #22c55e 100%)",
        electric: "#ca8a04",
        electricGlow: "rgba(202, 138, 4, 0.1)",
        accentPink: "#65a30d",
        accentGold: "#eab308"
    },
    sunsetLight: {
        name: "🔥 Sunset Light",
        isLight: true,
        bg: "#fff7ed",
        bgAlt: "#ffedd5",
        surface: "#ffffff",
        surfaceHover: "#fff7ed",
        border: "#fed7aa",
        text: "#7c2d12",
        textSecondary: "#c2410c",
        textMuted: "#ea580c",
        thrill: "#ea580c",
        thrillLight: "#f97316",
        thrillDark: "#c2410c",
        thrillGlow: "rgba(234, 88, 12, 0.15)",
        gradient:
            "linear-gradient(135deg, #c2410c 0%, #ea580c 40%, #f97316 100%)",
        electric: "#ca8a04",
        electricGlow: "rgba(202, 138, 4, 0.1)",
        accentPink: "#dc2626",
        accentGold: "#eab308"
    },
    galaxyLight: {
        name: "🌌 Galaxy Light",
        isLight: true,
        bg: "#f5f3ff",
        bgAlt: "#ede9fe",
        surface: "#ffffff",
        surfaceHover: "#f5f3ff",
        border: "#c4b5fd",
        text: "#3730a3",
        textSecondary: "#4f46e5",
        textMuted: "#6366f1",
        thrill: "#4f46e5",
        thrillLight: "#6366f1",
        thrillDark: "#4338ca",
        thrillGlow: "rgba(79, 70, 229, 0.15)",
        gradient:
            "linear-gradient(135deg, #4338ca 0%, #4f46e5 40%, #6366f1 100%)",
        electric: "#7c3aed",
        electricGlow: "rgba(124, 58, 237, 0.1)",
        accentPink: "#8b5cf6",
        accentGold: "#a78bfa"
    },
    minimal: {
        name: "⚪ Minimal Light",
        isLight: true,
        bg: "#fafafa",
        bgAlt: "#f4f4f5",
        surface: "#ffffff",
        surfaceHover: "#f4f4f5",
        border: "#e4e4e7",
        text: "#18181b",
        textSecondary: "#3f3f46",
        textMuted: "#71717a",
        thrill: "#18181b",
        thrillLight: "#3f3f46",
        thrillDark: "#09090b",
        thrillGlow: "rgba(24, 24, 27, 0.1)",
        gradient:
            "linear-gradient(135deg, #18181b 0%, #3f3f46 40%, #52525b 100%)",
        electric: "#71717a",
        electricGlow: "rgba(113, 113, 122, 0.1)",
        accentPink: "#52525b",
        accentGold: "#a1a1aa"
    }
};

function App() {
    const [activeSection, setActiveSection] = useState("hero");
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentTheme, setCurrentTheme] = useState("classic");
    const [themeMenuOpen, setThemeMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const cartRef = useRef(null);

    // Apply theme to CSS variables
    useEffect(() => {
        const theme = themes[currentTheme];
        const root = document.documentElement;

        // Background & surface colors
        root.style.setProperty("--bg", theme.bg);
        root.style.setProperty("--bg-alt", theme.bgAlt);
        root.style.setProperty("--surface", theme.surface);
        root.style.setProperty("--surface-hover", theme.surfaceHover);
        root.style.setProperty("--border", theme.border);

        // Text colors
        root.style.setProperty("--text", theme.text);
        root.style.setProperty("--text-secondary", theme.textSecondary);
        root.style.setProperty("--text-muted", theme.textMuted);

        // Accent colors
        root.style.setProperty("--thrill", theme.thrill);
        root.style.setProperty("--thrill-light", theme.thrillLight);
        root.style.setProperty("--thrill-dark", theme.thrillDark);
        root.style.setProperty("--thrill-glow", theme.thrillGlow);
        root.style.setProperty("--gradient-thrill", theme.gradient);
        root.style.setProperty("--electric", theme.electric);
        root.style.setProperty("--electric-glow", theme.electricGlow);
        root.style.setProperty("--accent-pink", theme.accentPink);
        root.style.setProperty("--accent-gold", theme.accentGold);

        // Add class for light/dark specific styles
        if (theme.isLight) {
            document.body.classList.add("light-theme");
            document.body.classList.remove("dark-theme");
        } else {
            document.body.classList.add("dark-theme");
            document.body.classList.remove("light-theme");
        }
    }, [currentTheme]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight =
                document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? scrollTop / docHeight : 0;
            setScrollProgress(progress);
        };
        window.addEventListener("scroll", handleScroll, {passive: true});
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {threshold: 0.2}
        );

        document.querySelectorAll("section").forEach((section) => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const scrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({behavior: "smooth"});
    };

    const skills = {
        Languages: ["JavaScript", "TypeScript", "Python", "Bash"],
        Frontend: [
            "React",
            "Redux",
            "Tailwind",
            "Material UI",
            "Webpack",
            "Vite"
        ],
        Backend: ["Node.js", "NestJS", "Microservices", "BullMQ", "Serverless"],
        "AI & ML": [
            "PyTorch",
            "OpenAI API",
            "Ollama",
            "MCP",
            "Hugging Face",
            "LangChain"
        ],
        Databases: ["PostgreSQL", "MongoDB", "Redis", "DynamoDB", "Pinecone"],
        Cloud: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD"]
    };

    const experiences = [
        {
            company: "group.one",
            role: "Software Engineer",
            location: "Dubai",
            period: "Apr 2022 - Present",
            highlights: [
                "Led development of Webshop platform with payment integrations & inventory management",
                "Built AI recommendation systems for product discoverability",
                "Implemented MCP for context-aware AI capabilities",
                "Designed sharding strategies for high-performance data access"
            ]
        },
        {
            company: "Bridgei2i Analytics",
            role: "Software Engineer",
            location: "India",
            period: "May 2021 - Apr 2022",
            highlights: [
                "Developed data pipelines transforming enterprise data into insights",
                "Built predictive solutions for sales & supply-chain management",
                "Ensured scalable data processing for large datasets"
            ]
        },
        {
            company: "Amdocs",
            role: "Associate Software Engineer",
            location: "India",
            period: "Aug 2019 - May 2021",
            highlights: [
                "Developed cloud-native telecom solutions",
                "Implemented automation for system reliability",
                "Contributed to full-stack projects with backend integrations"
            ]
        }
    ];

    return (
        <div className="app">
            {/* Roller Coaster Track with Moving Cart */}
            <div className="coaster-track-container">
                <svg
                    className="coaster-track-svg"
                    viewBox="0 0 100 2000"
                    preserveAspectRatio="none"
                >
                    {/* Track supports */}
                    <g className="track-supports">
                        {[
                            0, 200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800
                        ].map((y, i) => (
                            <line
                                key={i}
                                x1="50"
                                y1={y}
                                x2="50"
                                y2={y + 150}
                                stroke="#1a1a1a"
                                strokeWidth="4"
                            />
                        ))}
                    </g>
                    {/* Main track */}
                    <path
                        id="coasterPath"
                        className="coaster-main-track"
                        d="M50,0 
                           C80,100 20,200 50,300 
                           C80,400 20,500 50,600 
                           C90,700 10,800 50,900 
                           C80,1000 20,1100 50,1200 
                           C90,1300 10,1400 50,1500 
                           C80,1600 20,1700 50,1800 
                           C60,1900 40,1950 50,2000"
                        fill="none"
                        strokeWidth="6"
                    />
                    {/* Track rails */}
                    <path
                        className="coaster-rail"
                        d="M45,0 
                           C75,100 15,200 45,300 
                           C75,400 15,500 45,600 
                           C85,700 5,800 45,900 
                           C75,1000 15,1100 45,1200 
                           C85,1300 5,1400 45,1500 
                           C75,1600 15,1700 45,1800 
                           C55,1900 35,1950 45,2000"
                        fill="none"
                        strokeWidth="2"
                    />
                    <path
                        className="coaster-rail"
                        d="M55,0 
                           C85,100 25,200 55,300 
                           C85,400 25,500 55,600 
                           C95,700 15,800 55,900 
                           C85,1000 25,1100 55,1200 
                           C95,1300 15,1400 55,1500 
                           C85,1600 25,1700 55,1800 
                           C65,1900 45,1950 55,2000"
                        fill="none"
                        strokeWidth="2"
                    />
                </svg>

                {/* Section markers on track */}
                <div className="track-markers">
                    <div
                        className={`track-marker ${
                            activeSection === "hero" ? "active" : ""
                        }`}
                        style={{top: "2%"}}
                    >
                        <span>🏁</span>
                    </div>
                    <div
                        className={`track-marker ${
                            activeSection === "about" ? "active" : ""
                        }`}
                        style={{top: "24%"}}
                    >
                        <span>👤</span>
                    </div>
                    <div
                        className={`track-marker ${
                            activeSection === "experience" ? "active" : ""
                        }`}
                        style={{top: "48%"}}
                    >
                        <span>💼</span>
                    </div>
                    <div
                        className={`track-marker ${
                            activeSection === "skills" ? "active" : ""
                        }`}
                        style={{top: "70%"}}
                    >
                        <span>⚡</span>
                    </div>
                    <div
                        className={`track-marker ${
                            activeSection === "contact" ? "active" : ""
                        }`}
                        style={{top: "90%"}}
                    >
                        <span>📧</span>
                    </div>
                </div>

                {/* Moving Cart */}
                <div
                    ref={cartRef}
                    className="moving-cart"
                    style={{
                        top: `${2 + scrollProgress * 88}%`,
                        transform: `translateX(${
                            Math.sin(scrollProgress * Math.PI * 8) * 20
                        }px) rotate(${
                            Math.sin(scrollProgress * Math.PI * 8) * 20
                        }deg)`
                    }}
                >
                    <div className="cart-emoji">🎢</div>
                    <div className="cart-trail"></div>
                    <div className="cart-sparks">
                        <span>✨</span>
                        <span>✨</span>
                    </div>
                </div>

                {/* Progress indicator */}
                <div className="progress-track">
                    <div
                        className="progress-fill"
                        style={{height: `${scrollProgress * 100}%`}}
                    ></div>
                </div>
            </div>

            {/* Speed lines */}
            <div className="speed-lines">
                <div className="speed-line"></div>
                <div className="speed-line"></div>
                <div className="speed-line"></div>
                <div className="speed-line"></div>
                <div className="speed-line"></div>
            </div>

            {/* Navigation */}
            <nav className="nav">
                <div className="nav-inner">
                    <a
                        href="#hero"
                        className="logo"
                        onClick={(e) => {
                            e.preventDefault();
                            scrollTo("hero");
                        }}
                    >
                        <span className="logo-icon">🎢</span>
                        <span className="logo-text">Thrill.Dev</span>
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span
                            className={`hamburger ${
                                mobileMenuOpen ? "open" : ""
                            }`}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                    </button>

                    <div
                        className={`nav-links ${
                            mobileMenuOpen ? "mobile-open" : ""
                        }`}
                    >
                        {["about", "journey", "skills", "contact"].map(
                            (item) => (
                                <button
                                    key={item}
                                    className={`nav-link ${
                                        activeSection === item ||
                                        (item === "journey" &&
                                            activeSection === "experience")
                                            ? "active"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        scrollTo(
                                            item === "journey"
                                                ? "experience"
                                                : item
                                        );
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    {item}
                                </button>
                            )
                        )}

                        {/* Theme Selector */}
                        <div className="theme-selector">
                            <button
                                className="theme-toggle"
                                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                            >
                                🎨 Theme
                            </button>
                            {themeMenuOpen && (
                                <div className="theme-dropdown">
                                    <div className="theme-category">
                                        <span className="category-label">
                                            🌙 Dark
                                        </span>
                                        {Object.entries(themes)
                                            .filter(([, t]) => !t.isLight)
                                            .map(([key, theme]) => (
                                                <button
                                                    key={key}
                                                    className={`theme-option ${
                                                        currentTheme === key
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() => {
                                                        setCurrentTheme(key);
                                                        setThemeMenuOpen(false);
                                                    }}
                                                >
                                                    {theme.name}
                                                </button>
                                            ))}
                                    </div>
                                    <div className="theme-category">
                                        <span className="category-label">
                                            ☀️ Light
                                        </span>
                                        {Object.entries(themes)
                                            .filter(([, t]) => t.isLight)
                                            .map(([key, theme]) => (
                                                <button
                                                    key={key}
                                                    className={`theme-option ${
                                                        currentTheme === key
                                                            ? "active"
                                                            : ""
                                                    }`}
                                                    onClick={() => {
                                                        setCurrentTheme(key);
                                                        setThemeMenuOpen(false);
                                                    }}
                                                >
                                                    {theme.name}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="hero" className="hero">
                <div className="hero-content">
                    <div className="hero-badge">
                        <span className="coaster-icon">🎢</span>
                        Ready for the ride
                    </div>
                    <h1 className="hero-title">
                        <span className="hero-line small">Buckle Up.</span>
                        <span className="hero-line big">
                            Code at
                            <span className="highlight"> Full Speed</span>
                        </span>
                    </h1>
                    <p className="hero-tagline">
                        "Life is either a daring adventure or nothing at all"
                    </p>
                    <p className="hero-desc">
                        Software Engineer with <strong>6+ years</strong> of
                        building high-velocity systems. Currently engineering
                        thrills at <strong>group.one</strong>, Dubai.
                    </p>

                    <div className="thrill-meter">
                        <div className="meter-label">THRILL LEVEL</div>
                        <div className="meter-track">
                            <div className="meter-fill"></div>
                        </div>
                        <div className="meter-stats">
                            <span>6+ Years</span>
                            <span>50+ Projects</span>
                            <span>∞ Adventures</span>
                        </div>
                    </div>

                    <div className="hero-cta">
                        <button
                            className="btn-primary"
                            onClick={() => scrollTo("contact")}
                        >
                            <span>Start The Ride</span>
                            <span className="btn-icon">🚀</span>
                        </button>
                        <button
                            className="btn-ghost"
                            onClick={() => scrollTo("experience")}
                        >
                            View Journey →
                        </button>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="hero-graphic">
                        <div className="orbit-ring"></div>
                        <div className="orbit-ring delay-1"></div>
                        <div className="orbit-ring delay-2"></div>
                        <div className="center-icon">🚀</div>
                    </div>
                </div>

                <div className="scroll-hint">
                    <div className="drop-icon">↓</div>
                    <span>Drop into the experience</span>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about">
                <div className="section-inner">
                    <div className="section-header">
                        <span className="section-num">01</span>
                        <h2>The Rider</h2>
                        <div className="header-line"></div>
                    </div>

                    <div className="about-grid">
                        <div className="about-card main-card">
                            <div className="card-header">
                                <span className="card-icon">👨‍💻</span>
                                <div>
                                    <h3>Software Engineer</h3>
                                    <p>Dubai, UAE 🇦🇪</p>
                                </div>
                            </div>
                            <div className="card-body">
                                <p>
                                    I'm a <strong>Full-Stack Engineer</strong>{" "}
                                    who treats every project like a new
                                    adventure. From the first drop of an idea to
                                    the final loop of deployment—I live for the
                                    thrill of building.
                                </p>
                                <p>
                                    Specializing in{" "}
                                    <strong>AI-powered platforms</strong> and
                                    <strong> cloud architectures</strong> that
                                    perform at scale.
                                </p>
                            </div>
                            <div className="card-stats">
                                <div className="card-stat">
                                    <span className="stat-val">6+</span>
                                    <span className="stat-lbl">Years</span>
                                </div>
                                <div className="card-stat">
                                    <span className="stat-val">50+</span>
                                    <span className="stat-lbl">Projects</span>
                                </div>
                                <div className="card-stat">
                                    <span className="stat-val">3</span>
                                    <span className="stat-lbl">Companies</span>
                                </div>
                            </div>
                        </div>

                        <div className="about-side">
                            <div className="hobby-card">
                                <h4>Off The Track</h4>
                                <p>
                                    When I'm not coding, you'll find me chasing
                                    thrills:
                                </p>
                                <div className="hobby-list">
                                    <div className="hobby-item">
                                        <span className="hobby-icon">🎢</span>
                                        <span>Roller Coasters</span>
                                    </div>
                                    <div className="hobby-item">
                                        <span className="hobby-icon">🌊</span>
                                        <span>Water Sports</span>
                                    </div>
                                    <div className="hobby-item">
                                        <span className="hobby-icon">✈️</span>
                                        <span>Traveling</span>
                                    </div>
                                    <div className="hobby-item">
                                        <span className="hobby-icon">🎯</span>
                                        <span>Shooting</span>
                                    </div>
                                    <div className="hobby-item">
                                        <span className="hobby-icon">👔</span>
                                        <span>Fashion</span>
                                    </div>
                                </div>
                            </div>
                            <div className="quote-card">
                                <span className="quote-mark">"</span>
                                <p>
                                    The only way to do great work is to love
                                    what you do.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section - The Journey */}
            <section id="experience" className="experience">
                <div className="section-inner">
                    <div className="section-header">
                        <span className="section-num">02</span>
                        <h2>The Journey</h2>
                        <div className="header-line"></div>
                    </div>

                    <div className="journey-track">
                        {experiences.map((exp, i) => (
                            <div
                                key={i}
                                className={`journey-stop ${
                                    i === 0 ? "current" : ""
                                }`}
                            >
                                <div className="stop-marker">
                                    <div className="marker-outer">
                                        <div className="marker-inner"></div>
                                    </div>
                                    {i < experiences.length - 1 && (
                                        <div className="marker-track"></div>
                                    )}
                                </div>
                                <div className="stop-content">
                                    <div className="stop-header">
                                        <div className="stop-period">
                                            {exp.period}
                                        </div>
                                        <div className="stop-location">
                                            📍 {exp.location}
                                        </div>
                                    </div>
                                    <h3 className="stop-role">{exp.role}</h3>
                                    <div className="stop-company">
                                        @ {exp.company}
                                    </div>
                                    <ul className="stop-highlights">
                                        {exp.highlights.map((item, j) => (
                                            <li key={j}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                        <div className="journey-end">
                            <span>🏁</span>
                            <p>The ride continues...</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="skills">
                <div className="section-inner">
                    <div className="section-header">
                        <span className="section-num">03</span>
                        <h2>The Arsenal</h2>
                        <div className="header-line"></div>
                    </div>

                    <div className="skills-grid">
                        {Object.entries(skills).map(([category, items], i) => (
                            <div key={i} className="skill-card">
                                <div className="skill-header">
                                    <h3>{category}</h3>
                                    <span className="skill-count">
                                        {items.length}
                                    </span>
                                </div>
                                <div className="skill-items">
                                    {items.map((skill, j) => (
                                        <span key={j} className="skill-tag">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="contact">
                <div className="section-inner">
                    <div className="contact-content">
                        <div className="contact-header">
                            <span className="section-num">04</span>
                            <h2>Join The Ride</h2>
                        </div>
                        <p className="contact-desc">
                            Ready to build something thrilling together? I'm
                            always up for new adventures and exciting projects.
                        </p>

                        <div className="contact-cards">
                            <a
                                href="mailto:your.email@example.com"
                                className="contact-card"
                            >
                                <div className="contact-card-icon">📧</div>
                                <div className="contact-card-info">
                                    <span className="contact-card-label">
                                        Email
                                    </span>
                                    <span className="contact-card-value">
                                        your.email@example.com
                                    </span>
                                </div>
                                <span className="contact-card-arrow">→</span>
                            </a>
                            <a
                                href="https://linkedin.com/in/yourprofile"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-card"
                            >
                                <div className="contact-card-icon">💼</div>
                                <div className="contact-card-info">
                                    <span className="contact-card-label">
                                        LinkedIn
                                    </span>
                                    <span className="contact-card-value">
                                        Let's connect
                                    </span>
                                </div>
                                <span className="contact-card-arrow">→</span>
                            </a>
                            <a
                                href="https://github.com/yourusername"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-card"
                            >
                                <div className="contact-card-icon">💻</div>
                                <div className="contact-card-info">
                                    <span className="contact-card-label">
                                        GitHub
                                    </span>
                                    <span className="contact-card-value">
                                        View my code
                                    </span>
                                </div>
                                <span className="contact-card-arrow">→</span>
                            </a>
                        </div>

                        <div className="contact-cta">
                            <a
                                href="mailto:your.email@example.com"
                                className="btn-primary large"
                            >
                                <span>Let's Talk</span>
                                <span>🎢</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-content">
                    <span className="footer-logo">🎢 Thrill.Dev</span>
                    <p>Designed & Built with adrenaline ⚡</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
