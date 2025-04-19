import { Link } from 'react-router-dom';
import { BiShield, BiTrendingUp } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';
import SqueezyLogo from '../components/Logo';
import Themebox from '../components/Themebox';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4">
      {/* Navbar */}
      <nav className="container mx-auto px-4 md:px-0 flex items-center justify-between py-4 md:py-6">
        <div className="flex items-center gap-2 text-purple-600">
          <SqueezyLogo />
        </div>
        <div className="flex items-center gap-3">
          <Themebox />
          <Link
            to="/login"
            className="text-sm font-medium px-3 py-1.5 md:px-4 md:py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="text-sm font-medium px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-gray-800 transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="container mx-auto px-4 md:px-0 flex flex-col-reverse md:flex-row items-center py-12 md:py-20 gap-6 md:gap-12">
        <div className="flex-1 space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
            Empower Your <span className="text-purple-600 dark:text-purple-400">Security</span> &
            <br /> Streamline Your <span className="text-purple-600 dark:text-purple-400">Sessions</span>
          </h1>
          <p className="text-gray-700 dark:text-gray-300 max-w-lg">
            Squeezy helps you manage your account security, monitor active sessions, and keep your data safe — all in one powerful dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/register"
              className="w-full sm:w-auto px-5 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition text-center"
            >
              Get Started
            </Link>
            <Link
              to="/features"
              className="w-full sm:w-auto px-5 py-3 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="/hero-logo.png"
            alt="Squeezy Dashboard Hero"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-2xl shadow-lg"
          />
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 md:px-0 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="flex flex-col items-center p-5 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition">
            <BiShield className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">Secure Authentication</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Multi-factor support and session monitoring keep your account safe from intruders.
            </p>
          </div>
          <div className="flex flex-col items-center p-5 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition">
            <BiTrendingUp className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">Real-Time Insights</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Monitor login activity and receive alerts about any suspicious behavior instantly.
            </p>
          </div>
          <div className="flex flex-col items-center p-5 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition">
            <FaUsers className="w-10 h-10 text-purple-600 dark:text-purple-400 mb-3" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">Team Collaboration</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Manage team access and permissions with ease, keeping controls centralized.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-purple-50 dark:bg-gray-800 py-10 md:py-16">
        <div className="container mx-auto px-4 md:px-0 flex flex-col sm:flex-row justify-around gap-6 md:gap-12">
          <div className="text-center">
            <span className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">1.2K+</span>
            <p className="text-gray-700 dark:text-gray-300">Active Sessions</p>
          </div>
          <div className="text-center">
            <span className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">99.9%</span>
            <p className="text-gray-700 dark:text-gray-300">Uptime Guarantee</p>
          </div>
          <div className="text-center">
            <span className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">24/7</span>
            <p className="text-gray-700 dark:text-gray-300">Support</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4 md:px-0 text-center">
          <p className="text-gray-700 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Squeezy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}