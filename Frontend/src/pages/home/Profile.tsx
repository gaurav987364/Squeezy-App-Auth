import { FaUserCircle, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { IoWarning } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/Store';
import { formatReadableDate, generateAvatarFromName } from '../../utils/herlper';

const Profile = () => {
    const user = useSelector((state:RootState)=> state.auth.userInfo?.user);
    const {name,email,isEmailVerified,createdAt} = user || {};

    //random avatar;
    const avatar = generateAvatarFromName(name || "");

  return (
    <div className="w-full min-h-[calc(100vh-60px)] px-4 py-6 md:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          {user ? (
            <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: avatar.backgroundColor }}
          >
            {avatar.initials}
          </div>
          ) : (
            <div className="text-5xl text-purple-500 dark:text-purple-400">
              <FaUserCircle />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
              <FaEnvelope className="text-base" /> {email}
            </p>
          </div>
        </div>

        {/* Verification Status */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          {isEmailVerified ? (
            <span className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
              <FaCheckCircle className="text-lg" /> Verified Account
            </span>
          ) : (
            <>
              <span className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium">
                <IoWarning className="text-lg" /> Not Verified
              </span>
            </>
          )}
        </div>

        {/* Badges / Extra Info */}
        <div className="flex flex-wrap gap-4 text-sm">
          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full font-medium">
            Joined: {formatReadableDate(createdAt)}
          </span>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full font-medium">
            Role: User
          </span>
        </div>

        {/* Add more details if needed */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">About</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This is your account page where you can see your profile status and basic info. More settings and security options will appear here soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
