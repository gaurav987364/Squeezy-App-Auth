import { useState } from 'react'
import SqueezyLogo from '../../components/Logo'
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaFrown } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { ResetPasswordSchema, ResetPasswordType } from '../../schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';

const ResetPassword = () => {
  const methods = useForm<ResetPasswordType>({resolver:zodResolver(ResetPasswordSchema)});
  const [isValid,setIsValid] = useState(true);
  const [isPending,setIsPending] = useState(false);

  const {formState:{errors}} = methods;
    
  const onFormSubmit = (data:ResetPasswordType)=>{
    console.log(data)
    methods.reset()
  };
  const onFormError = (errors : unknown) => {
    console.error("Form errors", errors);
  };
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
  <>
    {isValid ? (
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8">
        <SqueezyLogo  />

        <h1 className="text-xl tracking-[-0.16px] dark:text-white font-bold mb-1.5 mt-8 text-center sm:text-left">
          Set up a new password
        </h1>
        <p className="mb-6 text-center sm:text-left text-sm text-gray-600 dark:text-gray-400 font-normal">
          Your new password must be different from the one used previously.
        </p>

        <form
          onSubmit={methods.handleSubmit(onFormSubmit,onFormError)}
          className="flex flex-col gap-6"
        >
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              New password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="off"
              {...methods.register("password")}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.password && <p className=" text-red-500 text-xs font-semibold ml-1">{errors.password.message}</p>}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              type="password"
              autoComplete="off"
              {...methods.register("confirmPassword")}
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.confirmPassword && <p className=" text-red-500 text-xs font-semibold ml-1">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            // disabled
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-900"
          >
            {isPending ? (
              <span className="flex justify-center items-center gap-2">
                Loader  Resetting...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    ) : (
      <div className="w-full max-w-md h-[80vh] flex flex-col gap-4 items-center justify-center text-center p-6">
        <FaFrown className="text-red-500 animate-bounce" size={48} />
        <h2 className="text-xl tracking-[-0.16px] font-bold text-gray-800 dark:text-white">
          Invalid or expired reset link
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          You can request a new password reset link.
        </p>
        <Link to="/forgot-password?email=">
          <button className="mt-3 flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-purple-500">
            <FaArrowLeft />
            Go to forgot password
          </button>
        </Link>
      </div>
    )}
  </>
</main>
  )
}

export default ResetPassword