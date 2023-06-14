import * as React from "react";
import classNames from "classnames";

interface IconProps {
  variant?: "small" | "medium" | "large";
}

const DownIcon: React.FC<IconProps> = ({ variant = "medium" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={classNames("aspect-square", {
        "w-6": variant === "medium",
        "w-3": variant === "small",
        "w-8": variant === "large",
      })}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

export default DownIcon;
