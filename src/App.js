import "./App.css";
import {useState, useEffect, useRef, useMemo} from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Contact from "./components/Contact";

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

    // useEffect(() => {
    //     let rafId = null;
    //     const handleMouseMove = (e) => {
    //         if (rafId) return;
    //         rafId = requestAnimationFrame(() => {
    //             setMousePosition({x: e.clientX, y: e.clientY});
    //             rafId = null;
    //         });
    //     };

    //     window.addEventListener("mousemove", handleMouseMove);
    //     return () => {
    //         window.removeEventListener("mousemove", handleMouseMove);
    //         if (rafId) cancelAnimationFrame(rafId);
    //     };
    // }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 50;

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

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = dx * dx + dy * dy;

                    if (distance < 10000) {
                        ctx.strokeStyle = `rgba(99, 102, 241, ${
                            0.2 * (1 - Math.sqrt(distance) / 100)
                        })`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

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

    const scrollToSection = (sectionId) => {
        document
            .getElementById(sectionId)
            ?.scrollIntoView({behavior: "smooth"});
    };

    return (
        <div className="App">
            <canvas ref={canvasRef} className="particle-canvas"></canvas>

            <Navbar scrollToSection={scrollToSection} />
            <Hero
                scrollToSection={scrollToSection}
                isVisible={isVisible["hero"]}
                displayText={displayText}
            />
            <About isVisible={isVisible["about"]} />
            <Experience isVisible={isVisible["experience"]} />
            <Skills isVisible={isVisible["skills"]} />
            <Contact isVisible={isVisible["contact"]} />

            <footer className="footer">
                <p>© 2025 - Built with React & passion ❤️</p>
            </footer>
        </div>
    );
}

export default App;
