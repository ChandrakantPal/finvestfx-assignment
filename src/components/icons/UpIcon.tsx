import * as React from "react";
import classNames from "classnames";

interface IconProps {
  variant?: "small" | "medium" | "large";
}

const UpIcon: React.FC<IconProps> = ({ variant = "medium" }) => {
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
        d="M4.5 15.75l7.5-7.5 7.5 7.5"
      />
    </svg>
  );
};

export default UpIcon;
