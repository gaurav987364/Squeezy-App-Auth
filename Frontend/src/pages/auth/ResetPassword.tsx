import SqueezyLogo from '../../components/Logo'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { FaArrowLeft, FaFrown } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { ResetPasswordSchema, ResetPasswordType } from '../../schema/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useResetPasswordMutation } from '../../store/api/AuthAPi';
import Loader from '../../components/Loader';
import toast from 'react-hot-toast';

const ResetPassword = () => {
  const methods = useForm<ResetPasswordType>({resolver:zodResolver(ResetPasswordSchema)});
  const {formState:{errors}} = methods;

  //verify link
  const [params] = useSearchParams();
  const code = params.get("code");
  const expiry = Number(params.get("exp"));
  const now = Date.now();

  const isValid = code && expiry && expiry > now;

  const [reset, {isLoading}] = useResetPasswordMutation();
  const navigate = useNavigate()
    
  const onFormSubmit =async (data:ResetPasswordType)=>{
    if(!code){
      navigate("/forgot-password?email=")
      return;
    };

    const credentials = {
      password:data.password,
      verificationCode:code
    }
    try {
      const res = await reset(credentials);
      toast.success(`${res?.data?.message}`) //toast here
      navigate("/")
    } catch (error) {
      console.error(error)
      toast.error("Failed to reset password.")
    }
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
        <div className="mb-6 text-center sm:text-left text-purple-500">
         <SqueezyLogo  />
        </div>

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
            disabled={isLoading}
            className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-offset-gray-900"
          >
            {isLoading ? <Loader/> : "Reset"}
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