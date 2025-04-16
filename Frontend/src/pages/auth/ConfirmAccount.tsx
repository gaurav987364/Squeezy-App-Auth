import SqueezyLogo from "../../components/Logo"

const ConfirmAccount = () => {
  return (
    <main className="w-full min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
    <div className="w-full max-w-md h-full p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
      {/* Logo */}
      <div className="text-purple-600 dark:text-purple-400 font-bold text-2xl mb-6 text-center sm:text-left">
        <SqueezyLogo />
      </div>

      {/* Title */}
      <h1
        className="text-2xl tracking-tight font-bold text-gray-900 dark:text-white mb-2 text-center sm:text-left"
      >
        Account Confirmation
      </h1>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 font-normal mb-6 text-center sm:text-left">
        To confirm your account, please follow the button below.
      </p>

      {/* Confirmation Form */}
      <form>
        <button
          type="submit"
          disabled
          aria-disabled="true"
          className="w-full h-[44px] text-sm font-semibold rounded-md bg-purple-400 text-white opacity-50 cursor-not-allowed"
        >
          Confirm account
        </button>
      </form>

      {/* Support Info */}
      <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 font-normal text-center sm:text-left">
        If you have any issue confirming your account, please contact{" "}
        <a
          className="text-purple-600 dark:text-purple-400 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 rounded-sm"
          href="mailto:support@squeezy.com"
        >
          support@squeezy.com
        </a>.
      </p>
    </div>
  </main>
  )
}

export default ConfirmAccount