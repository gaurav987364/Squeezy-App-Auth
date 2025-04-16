import { useForm } from "react-hook-form";
import { LoginSchema, LoginSchemaType } from "../../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../store/api/AuthAPi";
import { setCredentials } from "../../store/slices/AuthSlice";
import Loader from "../../components/Loader";

const Login = () => {
   const methods = useForm<LoginSchemaType>({resolver:zodResolver(LoginSchema),defaultValues:{
      email:"",
      password:"",
    }});
    const {formState:{errors}} = methods;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login,{isLoading}] = useLoginMutation();
  
    const onFormSubmit =async (data:LoginSchemaType)=>{
      console.log(data)
      try {
        const res = await login({...data}).unwrap();
        dispatch(setCredentials({...res}))
        navigate("/home");
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
        aria-labelledby="login-heading"
      >
        <h1
          id="login-heading"
          className="text-2xl text-center font-bold text-gray-900 dark:text-white mb-2"
        >
          Welcome Back!
        </h1>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mb-6">
          Please sign in to your{" "}
          <span className="text-purple-500 dark:text-purple-400 font-medium">
            Squeezy
          </span>{" "}
          account.
        </p>

        <form onSubmit={methods.handleSubmit(onFormSubmit,onFormError)} className="space-y-5" aria-label="Login form">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...methods.register("email")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
              aria-required="true"
              aria-label="Email address"
            />
             {errors.email && <p className=" text-red-500 text-xs font-semibold ml-1">{errors.email.message}</p>}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              {...methods.register("password")}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your password"
              aria-required="true"
              aria-label="Password"
            />
            {errors.password && <p className=" text-red-500 text-xs font-semibold ml-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-900 cursor-pointer"
            aria-label="Sign in"
          >
            {isLoading ? <Loader/> : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Forgot your password?{" "}
          <Link
            to="/forgot-password"
            className="text-purple-600 dark:text-purple-400 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Forgot password
          </Link>
        </div>
        <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-purple-600 dark:text-purple-400 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Sign up
          </Link>
        </div>
      </section>
    </main>
  )
}

export default Login