import { Link } from "react-router-dom";

const SqueezyLogo = ({ size = "medium", url = "/" }: { size?: "small" | "medium" | "large"; url?: string }) => {
  let logoSize, fontSize;

  // Adjust logo size and font size based on the variant passed
  switch (size) {
    case "small":
      logoSize = "40px";  // Smaller container
      fontSize = "20px";  // Smaller text
      break;
    case "large":
      logoSize = "60px";  // Larger container
      fontSize = "48px";  // Larger text
      break;
    default:
      logoSize = "40px";  // Default medium size
      fontSize = "24px";  // Default medium text size
      break;
  }

  return (
    <div className="flex items-center justify-center sm:justify-start">
      <Link
        to={url}
        className="rounded-lg flex items-center justify-center bg-gradient-to-tr from-blue-700 to-purple-600 p-2 transition-transform duration-300 hover:shadow-lg dark:from-blue-500 dark:to-purple-500"
        style={{ width: "130px", height: logoSize }}
        aria-label="Squeezy logo"
      >
        <span
          className="font-extrabold text-white dark:text-gray-50 overflow-hidden"
          style={{
            fontSize: fontSize,
            maxWidth: "90%",  // Prevents text from overflowing outside the logo container
            textOverflow: "ellipsis",  // Ensures ellipsis when text overflows
            whiteSpace: "nowrap",  // Keeps the text in a single line
          }}
        >
          Squeezy
        </span>
      </Link>
    </div>
  );
};

export default SqueezyLogo;
