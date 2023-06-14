import * as React from "react";
import classNames from "classnames";

const LabelBadge: React.FC<{ label: string }> = ({ label }) => {
  return (
    <small
      className={classNames("absolute p-1 uppercase rounded -right-2 -top-2", {
        "text-red-500 bg-yellow-400": label.toLocaleLowerCase() === "hot",
        "bg-green-500 text-white": label.toLocaleLowerCase() === "new",
        "bg-red-500 text-orange-300": label.toLocaleLowerCase() === "spicy",
        "bg-yellow-950 text-white": !["hot", "new", "spicy"].includes(
          label.toLocaleLowerCase()
        ),
      })}
    >
      {label}
    </small>
  );
};

export default LabelBadge;
