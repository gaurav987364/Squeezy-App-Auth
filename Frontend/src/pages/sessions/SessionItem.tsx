import { BsTrash2 } from "react-icons/bs";
import Loader from "../../components/Loader";
import { ParseSession } from "../../utils/parser";

const SessionItem = (props: {
    loading?: boolean;
    userAgent: string;
    date: string;
    expiresAt: string;
    isCurrent?: boolean;
    onRemove?: () => void;
  }) => {
    const { userAgent, loading, date, isCurrent = false, onRemove } = props;
    const { os, browser, timeAgo, icon: Icon } = ParseSession(userAgent, date);
  
    const handleRemove = () => {
      if (onRemove) {
        onRemove();
      }
    };
    return (
      <div className="w-full flex items-start ">
        <div
          className="shrink-0 mr-[16px] flex items-center justify-center
         w-[48px] h-[48px] rounded-full border border-[#000] dark:border-[rgb(237,245,253)]"
        >
          <Icon size={28} className=" dark:text-neutral-50"/>
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div className="flex-1">
            <h5 className="text-sm font-medium leading-1 mt-2 dark:text-neutral-50">
              {os} / {browser}
            </h5>
            <div className="flex items-center mt-4">
              {isCurrent ? (
                <div
                  className="bg-green-500/80 h-[25px] px-2 w-[81px] mt-1
                flex items-center justify-center text-xs dark:text-white rounded-lg font-semibold"
                >
                  Active now
                </div>
              ) : (
                <span className="mr-[16px] text-[12px] text-muted-foreground text-blue-500 font-semibold">
                  {timeAgo || "date"}
                </span>
              )}
            </div>
          </div>
  
          {!isCurrent && (
            <button
              disabled={loading}
              onClick={handleRemove}
            >
              {loading ? (
                <Loader />
              ) : (
                <BsTrash2 size={24} className=" cursor-pointer text-red-500 hover:text-red-600 hover:animate-bounce transition-transform duration-300"/>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };
  
  export default SessionItem;