import { useEffect, useState } from "react";

const STARS = Array.from({ length: 35 }, (_, index) => ({
  top: (index * 37 + 11) % 100,
  left: (index * 61 + 7) % 100,
  opacity: 0.25 + (index % 6) * 0.12,
  delay: index % 5,
  duration: 3 + (index % 4),
}));

const AnimatedBackground = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="auth-background pointer-events-none absolute inset-0 overflow-hidden bg-[#050505]">

      {/* Main Aurora */}
      <div
        className="absolute h-[700px] w-[700px] rounded-full blur-[180px] opacity-25 animate-aurora motion-reduce:animate-none"
        style={{
          background: "#EF5D12",
          left: `calc(50% - 350px + ${mouse.x}px)`,
          top: `calc(45% - 350px + ${mouse.y}px)`,
        }}
      />

      {/* Secondary Glow */}
      <div
        className="absolute h-[450px] w-[450px] rounded-full blur-[150px] opacity-15 animate-aurora2 motion-reduce:animate-none"
        style={{
          background: "#ff8a3d",
          right: "-100px",
          top: "-80px",
        }}
      />

      <div
        className="absolute -bottom-64 -left-48 h-[600px] w-[600px] rounded-full bg-[#7919a8] opacity-10 blur-[170px] animate-aurora3 motion-reduce:animate-none"
        aria-hidden="true"
      />

      <span className="auth-comet auth-comet-one" aria-hidden="true" />
      <span className="auth-comet auth-comet-two" aria-hidden="true" />

      {/* Stars */}
      {STARS.map((star, index) => (
        <span
          key={index}
          className="absolute h-[2px] w-[2px] rounded-full bg-white animate-twinkle motion-reduce:animate-none"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: star.opacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
