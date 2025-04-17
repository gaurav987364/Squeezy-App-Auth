import { FormSchema, FormSchemaType } from "../../schema/schema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../store/api/AuthAPi";
import Loader from "../../components/Loader";

const Register = () => {
  const methods = useForm<FormSchemaType>({resolver:zodResolver(FormSchema),defaultValues:{
    name:"",
    email:"",
    password:"",
    confirmPassword:""
  }});
  const {formState:{errors}} = methods;

  const navigate = useNavigate();

  const [register, {isLoading}] = useRegisterMutation();

  const onFormSubmit =async (data:FormSchemaType)=>{
    try {
      const res = await register({...data}).unwrap();
      console.log(res);
      navigate("/message")
    } catch (error) {
      console.error(error)
    }
    methods.reset()
  };
  const onFormError = (errors : unknown) => {
    console.error("Form errors", errors);
  };
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 transition-colors duration-300">
      <section
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 sm:p-8 transition-colors duration-300"
        aria-labelledby="signup-heading"
      >
        <h1
          id="signup-heading"
          className="text-2xl text-center font-bold text-gray-900 dark:text-white mb-2"
        >
          Create an account
        </h1>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
          Join <span className="text-purple-500 dark:text-purple-400 font-medium">Squeezy</span> and get started!
        </p>

        <form onSubmit={methods.handleSubmit(onFormSubmit,onFormError)} className="space-y-5" aria-label="Sign up form">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...methods.register("name")}
              placeholder="John Doe"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Full Name"
            />
            {errors.name && <p className=" text-red-500 text-xs font-semibold ml-1">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...methods.register("email")}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Email address"
            />
            {errors.email && <p className=" text-red-500 text-xs font-semibold ml-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...methods.register("password")}
              placeholder="********"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              aria-label="Password"
            />
            {errors.password && <p className=" text-red-500 text-xs font-semibold ml-1">{errors.password.message}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...methods.register("confirmPassword")}
              placeholder="********"
              className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 `}
              aria-label="Confirm password"
            />
            {errors.confirmPassword && <p className=" text-red-500 text-xs font-semibold ml-1">{errors.confirmPassword.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-900 cursor-pointer"
            aria-label="Create account"
          >
            {isLoading ? <Loader/> : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-600 dark:text-purple-400 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Register;
