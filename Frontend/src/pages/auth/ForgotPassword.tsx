import { useState } from "react";
import Logo from "../../components/Logo";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ForgotPasswordSchema, ForgotPasswordType } from "../../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const ForgotPassword = () => {
  const methods = useForm<ForgotPasswordType>({resolver:zodResolver(ForgotPasswordSchema)});
  const [isPending, setIsPending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);


  const {formState:{errors}} = methods;
    
  const onFormSubmit = (data:ForgotPasswordType)=>{
    console.log(data)
    methods.reset()
  };
  const onFormError = (errors : unknown) => {
    console.error("Form errors", errors);
  };
  return (
    <main className="w-full min-h-screen flex items-center justify-center px-4 bg-white dark:bg-gray-900 transition-colors duration-300">
      {!isSubmitted ? (
        <div className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          {/* Logo */}
          <div className="mb-6 text-center sm:text-left">
            <Logo size="small"/>
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Forgot Password
          </h1>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Include the email address associated with your account and we’ll send you instructions to reset your password.
          </p>

          {/* Form */}
          <form onSubmit={methods.handleSubmit(onFormSubmit,onFormError)}  className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...methods.register("email")}
                placeholder="subscribeto@channel.com"
                className="w-full h-10 px-3 py-2 rounded-md bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {errors.email && <p className=" text-red-500 text-xs font-semibold ml-1">{errors.email.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-[44px] text-[15px] font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
            >
              {isPending ? (
                <div className="flex items-center justify-center gap-2">
                  Loader
                  Sending...
                </div>
              ) : (
                <p className=" text-md">Send Reset Details</p>
              )}
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full max-w-md h-[40vh] flex flex-col gap-4 items-center justify-center bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md text-center">
          <div className="text-purple-600 dark:text-purple-400">
            MailCheckIcon 
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white capitalize">
            Check your email
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We just sent a password reset link to <br />
            <span className="font-medium text-lg text-purple-600 dark:text-purple-400">
              email
            </span>
          </p>
          <>
            <Link to="/login" className="h-[40px] px-4 text-sm bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md flex items-center gap-1 mt-2">
              Go to Login
            </Link>
          </>
        </div>
      )}
    </main>
  )
}

export default ForgotPassword