import { useNavigate } from "react-router-dom";
import { BiErrorAlt } from "react-icons/bi";
import { FaRocket } from "react-icons/fa"; // For branding flair

const NotFound = () => {
    const navigate = useNavigate();
    const goBack = ()=>{
        navigate(-1);
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-white dark:bg-[#0d1117] text-center transition-colors duration-300">
      {/* Branding Section */}
      <div className="flex items-center space-x-3 mb-6">
        <FaRocket className="text-purple-600 dark:text-purple-400" size={32} />
        <span className="text-2xl font-bold text-gray-900 dark:text-white">Squeezy</span>
      </div>

      {/* Icon */}
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
        <BiErrorAlt className="text-red-600 dark:text-red-400" size={40} aria-hidden="true" />
      </div>

      {/* Title & Message */}
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3">404 - Page Not Found</h1>
      <p className="text-gray-600 dark:text-gray-400 text-lg max-w-xl mb-8">
        Oops! We couldn’t find what you were looking for. The page might be broken or no longer exists.
      </p>

      {/* CTA */}
      <button
        onClick={goBack}
        role="button"
        type="button"
        aria-label="Back to home"
        className="inline-block px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 dark:hover:bg-purple-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-900 cursor-pointer"
      >
        Back to Home
      </button>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-400 dark:text-gray-600">
        &copy; {new Date().getFullYear()} Squeezy Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default NotFound;
