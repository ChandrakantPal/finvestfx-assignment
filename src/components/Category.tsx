import * as React from "react";
import DownIcon from "./icons/DownIcon";
import UpIcon from "./icons/UpIcon";

const Category: React.FC<React.PropsWithChildren<{ name: string }>> = ({
  name,
  children,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="space-y-6">
      <div
        className="flex items-center justify-between px-10 py-5 border-b border-gray-500 cursor-pointer"
        onClick={() => {
          setOpen((current) => !current);
        }}
      >
        <h6 className="uppercase">{name}</h6>

        {open ? <UpIcon /> : <DownIcon />}
      </div>
      <div className="w-full">{open && children}</div>
    </div>
  );
};

export default Category;
