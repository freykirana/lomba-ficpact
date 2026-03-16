"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

type AuthView = "login" | "register" | "forgot";

/* ─── Brand SVG Icons ─── */
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.9 33.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34 6 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.2-2.7-.4-3.9z" />
    <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.5 15.5 18.8 12 24 12c3.1 0 5.8 1.2 8 3.1l5.7-5.7C34 6 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.5-11.1-8.2l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C36.9 39.2 44 34 44 24c0-1.3-.2-2.7-.4-3.9z" />
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.53-3.23 0-1.44.66-2.2.47-3.06-.4C3.79 16.17 4.36 9.02 8.7 8.73c1.25.07 2.12.72 2.88.77.96-.2 1.88-.89 2.91-.81 1.23.1 2.16.58 2.78 1.49-2.56 1.53-1.95 4.89.58 5.83-.46 1.22-.7 1.78-1.34 2.84-.66 1.08-1.58 2.42-2.74 2.45l-.72-.02zM12.05 8.63c-.15-2.23 1.66-4.07 3.74-4.25.29 2.56-2.34 4.5-3.74 4.25z" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.38 8.59 8.59 0 0 1-2.72 1.04 4.28 4.28 0 0 0-7.32 3.91A12.16 12.16 0 0 1 3 4.79a4.28 4.28 0 0 0 1.32 5.72 4.24 4.24 0 0 1-1.94-.54v.05a4.28 4.28 0 0 0 3.43 4.19 4.27 4.27 0 0 1-1.93.07 4.29 4.29 0 0 0 4 2.97A8.59 8.59 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.72 8.72 0 0 0 22.46 6z" />
  </svg>
);

/* ─── Animation Variants ─── */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

/* ─── Reusable Components ─── */
function InputField({
  id,
  label,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
      />
    </div>
  );
}

function PasswordField({ id, label }: { id: string; label: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          placeholder="Placeholder"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 pr-11 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      <p className="mt-1 text-xs text-slate-400">
        It must be a combination of minimum 8 letters, numbers, and symbols.
      </p>
    </div>
  );
}

function SSOButtons({ mode }: { mode: "login" | "register" }) {
  const label = mode === "login" ? "log in" : "sign up";
  return (
    <div>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-3 text-slate-400">Or {label} with:</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { name: "Google", icon: <GoogleIcon /> },
          { name: "Apple", icon: <AppleIcon /> },
          { name: "Twitter", icon: <TwitterIcon /> },
        ].map((provider) => (
          <motion.button
            key={provider.name}
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-4 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
          >
            {provider.icon}
            {provider.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/* ─── Auth Views ─── */
function LoginView({
  onSwitch,
  onForgot,
}: {
  onSwitch: () => void;
  onForgot: () => void;
}) {
  return (
    <motion.div
      key="login"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
        <p className="mt-2 text-slate-500">Please log in to continue</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <InputField id="login-email" label="Email Address" type="email" placeholder="Placeholder" />
        <PasswordField id="login-password" label="Password" />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-600">Remember me</span>
          </label>
          <button
            type="button"
            onClick={onForgot}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Forgot Password?
          </button>
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          Log In
        </motion.button>
      </form>

      <SSOButtons mode="login" />

      <p className="mt-6 text-center text-sm text-slate-500">
        No account yet?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Sign Up
        </button>
      </p>
    </motion.div>
  );
}

function RegisterView({ onSwitch }: { onSwitch: () => void }) {
  return (
    <motion.div
      key="register"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Sign Up Free</h1>
        <p className="mt-2 text-slate-500">14 day free access to unlimited resources</p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-4">
          <InputField id="reg-first" label="First Name" placeholder="Placeholder" />
          <InputField id="reg-last" label="Last Name" placeholder="Placeholder" />
        </div>

        <InputField id="reg-email" label="Email" type="email" placeholder="Placeholder" />
        <PasswordField id="reg-password" label="Password" />

        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 size-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-slate-600">
            I agree to the{" "}
            <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
          </span>
        </label>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          Sign Up
        </motion.button>
      </form>

      <SSOButtons mode="register" />

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          Log In
        </button>
      </p>
    </motion.div>
  );
}

function ForgotView({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      key="forgot"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Forgotten your password?</h1>
        <p className="mt-2 text-slate-500">
          There is nothing to worry about, we&apos;ll send you a message to help you reset your password.
        </p>
      </div>

      <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
        <InputField
          id="forgot-email"
          label="Email Address"
          type="email"
          placeholder="Enter personal or work email address"
        />

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          Send Reset Link
        </motion.button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        <button
          type="button"
          onClick={onBack}
          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          ← Back to Log In
        </button>
      </p>
    </motion.div>
  );
}

/* ─── Main Page ─── */
export default function AuthPage() {
  const [view, setView] = useState<AuthView>("login");

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg"
      >
        <AnimatePresence mode="wait">
          {view === "login" && (
            <LoginView
              onSwitch={() => setView("register")}
              onForgot={() => setView("forgot")}
            />
          )}
          {view === "register" && (
            <RegisterView onSwitch={() => setView("login")} />
          )}
          {view === "forgot" && (
            <ForgotView onBack={() => setView("login")} />
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
}
