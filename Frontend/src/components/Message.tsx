import React from 'react';
import { BiMailSend } from 'react-icons/bi';
import SqueezyLogo from '../components/Logo';
import { Link } from 'react-router-dom';

const CheckEmailPage: React.FC = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-md w-full text-center">
        {/* Brand Logo */}
        <div className="flex items-center justify-center mb-8 text-purple-600">
          <SqueezyLogo  />
        </div>

        {/* Message Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
          <BiMailSend className="mx-auto text-6xl text-purple-600 dark:text-purple-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Check Your Email
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            We’ve sent you an email with a link to verify your account. Please check your inbox and click the verification link to continue.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-4 w-full inline-flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-offset-gray-900"
          >
            Resend Email
          </button>

          <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
            Didn’t receive the email? Check your spam folder or&nbsp;
            <Link
              to="/support"
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              contact support
            </Link>.
          </div>
        </div>
      </div>
    </main>
  );
};

export default CheckEmailPage;
