import { useState } from "react";
import { Link } from "react-router-dom";

import AnimatedBackground from "../../components/auth/AnimatedBackground";

const fieldClassName =
  "w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-[#EF5D12] focus:ring-2 focus:ring-[#EF5D12]/20";

const AuthForm = ({ mode, onSubmit, status }) => {
  const isRegistering = mode === "register";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isRegistering && password !== confirmPassword) {
      setPasswordError("Those passwords do not match.");
      return;
    }

    setPasswordError("");
    onSubmit(isRegistering);
  };

  return (
    <form className="auth-form mx-auto flex w-full max-w-md flex-col" onSubmit={handleSubmit}>
      <p className="text-xs font-bold uppercase tracking-[0.28em] text-orange-400">
        {isRegistering ? "Join the story" : "Your next story awaits"}
      </p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
        {isRegistering ? "Create account" : "Welcome back"}
      </h2>
      <p className="mt-2 text-sm leading-6 text-zinc-400">
        {isRegistering
          ? "Create your WhyVerse account and keep your favorites close."
          : "Sign in to pick up where your next movie night begins."}
      </p>

      <div className="mt-7 space-y-4">
        {isRegistering && (
          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-300">Name</span>
            <input
              autoComplete="name"
              className={fieldClassName}
              name="name"
              placeholder="Your name"
              required
            />
          </label>
        )}

        <label className="block space-y-2">
          <span className="text-sm font-medium text-zinc-300">Email</span>
          <input
            autoComplete="email"
            className={fieldClassName}
            name="email"
            placeholder="you@example.com"
            required
            type="email"
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-zinc-300">Password</span>
          <input
            autoComplete={isRegistering ? "new-password" : "current-password"}
            className={fieldClassName}
            minLength={8}
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 8 characters"
            required
            type="password"
            value={password}
          />
        </label>

        {isRegistering && (
          <label className="block space-y-2">
            <span className="text-sm font-medium text-zinc-300">
              Confirm password
            </span>
            <input
              autoComplete="new-password"
              className={fieldClassName}
              minLength={8}
              name="confirmPassword"
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Enter your password again"
              required
              type="password"
              value={confirmPassword}
            />
          </label>
        )}
      </div>

      {(passwordError || status) && (
        <p
          className={`mt-4 text-sm ${passwordError ? "text-red-300" : "text-orange-200"}`}
          role="status"
          aria-live="polite"
        >
          {passwordError || status}
        </p>
      )}

      <button
        className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#EF5D12] px-5 py-3 font-bold text-white shadow-lg shadow-orange-950/40 transition hover:-translate-y-0.5 hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 active:translate-y-0"
        type="submit"
      >
        {isRegistering ? "Create account" : "Sign in"}
        <span aria-hidden="true">→</span>
      </button>
      <p className="mt-4 text-center text-xs leading-5 text-zinc-500">
        {isRegistering
            ? "Use a strong password with at least 8 characters."
            : "Use your account email and password to continue."}
      </p>
    </form>
  );
};

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = (registering) => {
    setStatus(
      registering
        ? "Your details are valid. Account creation will be available when authentication is connected."
        : "Your details are valid. Sign-in will be available when authentication is connected.",
    );
  };

  const toggleMode = () => {
    setStatus("");
    setIsRegistering((current) => !current);
  };

  return (
    <main className="relative isolate flex min-h-svh w-full items-center justify-center overflow-hidden bg-[#050505] px-4 py-8 text-white sm:px-6 lg:px-10">
      <AnimatedBackground />
      <div className="absolute inset-0 bg-black/35" aria-hidden="true" />

      <Link
        to="/"
        className="absolute left-5 top-5 z-30 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-2 text-sm font-semibold text-zinc-300 backdrop-blur transition hover:border-orange-500/50 hover:text-white sm:left-8 sm:top-8"
      >
        <span aria-hidden="true">←</span> Back to WhyVerse
      </Link>

      <div className="relative z-10 w-full max-w-6xl pt-12 sm:pt-10">
        <div className="mb-5 flex items-center justify-center gap-3 md:justify-start">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-lg font-black text-black shadow-lg shadow-orange-500/20">
            W
          </span>
          <span className="text-xl font-black tracking-tight">
            Why<span className="text-[#EF5D12]">Verse</span>
          </span>
          <span className="hidden rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:inline-flex">
            Discover more
          </span>
        </div>

        <section className="relative grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0d]/95 shadow-[0_30px_120px_rgba(0,0,0,0.65)] backdrop-blur-xl md:min-h-[640px] md:grid-cols-2">
          <div
            className={`auth-panel relative order-first flex min-h-[210px] flex-col justify-center overflow-hidden bg-gradient-to-br from-[#ef5d12] via-[#bd3f0b] to-[#34140c] p-7 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:min-h-[230px] sm:p-10 md:absolute md:inset-y-0 md:left-1/2 md:z-20 md:min-h-0 md:w-1/2 md:p-12 ${
              isRegistering
                ? "is-registering md:rounded-l-[2rem] md:rounded-r-none"
                : "md:rounded-l-none md:rounded-r-[2rem]"
            }`}
          >
            <div
              className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-36 -left-24 h-80 w-80 rounded-full border border-white/10"
              aria-hidden="true"
            />
            <div
              key={isRegistering ? "register-copy" : "login-copy"}
              className="auth-panel-copy relative max-w-sm"
            >
              <span className="inline-flex rounded-full border border-white/20 bg-black/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.24em] text-orange-50">
                {isRegistering ? "A universe of stories" : "Good to have you back"}
              </span>
              <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                {isRegistering
                  ? "Every great story starts somewhere."
                  : "Your next favorite is waiting."}
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-6 text-orange-50/80 sm:text-base">
                {isRegistering
                  ? "Find the films, shows, and people you’ll be talking about."
                  : "Explore a world of movies, series, and the people behind them."}
              </p>
              <button
                type="button"
                onClick={toggleMode}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full border border-white/50 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-white hover:text-[#a7350c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {isRegistering ? "Go to sign in" : "Create an account"}
              </button>
            </div>
            <div className="absolute bottom-6 right-7 hidden text-right text-xs font-medium text-orange-100/60 md:block">
              STORIES WORTH FINDING
            </div>
          </div>

          <div
              className={`relative z-10 flex items-center px-6 py-10 sm:px-10 md:min-h-[640px] md:px-12 md:py-12 ${
              isRegistering ? "hidden md:flex" : ""
            }`}
          >
            <AuthForm
              key="login"
              mode="login"
              onSubmit={handleSubmit}
              status={!isRegistering ? status : ""}
            />
          </div>

          <div
              className={`relative z-10 flex items-center px-6 py-10 sm:px-10 md:min-h-[640px] md:px-12 md:py-12 ${
              !isRegistering ? "hidden md:flex" : ""
            }`}
          >
            <AuthForm
              key="register"
              mode="register"
              onSubmit={handleSubmit}
              status={isRegistering ? status : ""}
            />
          </div>
        </section>

        <p className="mt-5 text-center text-xs text-zinc-600">
          Explore freely. Keep your stories in one place.
        </p>
      </div>
    </main>
  );
};

export default Login;
