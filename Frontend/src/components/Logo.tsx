import { Link } from "react-router-dom";

const SqueezyLogo = ({ url = "/" }: { 
  size?: "small" | "medium" | "large"; 
  url?: string 
}) => {

  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link
        to={url}
        className="rounded-lg transition-opacity"
        aria-label="Squeezy logo"
      >
        <span className={`
          text-3xl
          relative
          luckiest-guy-regular
          font-extrabold
        `}>
          Squeezy
        </span>
      </Link>
    </div>
  );
};

export default SqueezyLogo;