import SessionItem from "./SessionItem";
import { useDeleteSessionMutation, useGetAllSessionQuery } from "../../store/api/AuthAPi";
import SessionItemSkeleton from "./SessionLoadingSkeltone";
import toast from "react-hot-toast";

interface SessionType {
  _id: string;
  userAgent: string;
  createdAt: string;
  expiresAt: string;
  isCurrent: boolean;
}

const Session = () => {
  const { data, isLoading } = useGetAllSessionQuery();
  const sessions: SessionType[] = data?.sessions || [];

  const [deleteSession, { isLoading: isDeleting }] = useDeleteSessionMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteSession(id).unwrap();
      toast.success("Session deleted.");
    } catch (error) {
      toast.error(`Error deleting session: ${error}`);
    }
  };

  const currentSession = sessions.find((s) => s.isCurrent);
  const otherSessions = sessions.filter((s) => !s.isCurrent);

  return (
    <div className="w-full min-h-[calc(100vh-60px)] px-4 py-6 md:px-8 bg-gray-50 dark:bg-gray-900 ">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 space-y-6">
        <h3 className="text-xl  text-slate-800 dark:text-white font-bold mb-1">
          Sessions
        </h3>
        <p className="mb-6 max-w-3xl text-sm text-gray-700 dark:text-gray-200 font-normal">
          Sessions are the devices you are using or that have used your Squeezy. These are the
          sessions where your account is currently logged in. You can log out of each session.
        </p>

        <div className="rounded-t-xl max-w-3xl max-h-100 overflow-y-auto
          [&::-webkit-scrollbar]:w-0.5
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-100
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-gray-300
          dark:[&::-webkit-scrollbar-track]:bg-neutral-700
          dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
          <div>
            <h5 className="text-base font-semibold text-gray-800 dark:text-white">
              Current active session
            </h5>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
              You’re logged into this Squeezy account on this device and are currently using it.
            </p>
          </div>

          {currentSession && (
            <div className="w-full py-2 border-b border-gray-300 dark:border-gray-700 pb-5">
              {isLoading ? (
                <SessionItemSkeleton/>
              ) : (
                <SessionItem
                userAgent={currentSession.userAgent}
                date={currentSession.createdAt}
                expiresAt={currentSession.expiresAt}
                isCurrent={currentSession.isCurrent}
              />
              )}
            </div>
          )}

          <div className="mt-4">
            <h5 className="text-base font-semibold text-gray-800 dark:text-white">Other sessions</h5>
            <ul className="w-full mt-4 space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {otherSessions?.map((session: SessionType) => (
                  <li key={session._id}>
                    {isLoading ? (
                      <SessionItemSkeleton/>
                    ):(
                      <SessionItem
                      userAgent={session.userAgent}
                      date={session.createdAt}
                      expiresAt={session.expiresAt}
                      isCurrent={session.isCurrent}
                      onRemove={() => handleDelete(session._id)}
                      loading={isDeleting}
                      />
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Session;
