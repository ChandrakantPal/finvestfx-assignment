import * as React from "react";

const InlineEditInput: React.FC<{
  value: string;
  setValue: (value: string) => void;
}> = ({ value, setValue }) => {
  const [editingValue, setEditingValue] = React.useState(value);

  return (
    <input
      className="bg-transparent border-0 p-2 hover:bg-[#d3d3d3] hover:cursor-pointer max-w-full"
      type="text"
      aria-label="Field name"
      value={editingValue}
      onChange={(event) => setEditingValue(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === "Escape") {
          event.currentTarget.blur();
        }
      }}
      onBlur={(event) => {
        if (event.target.value.trim() === "") {
          setEditingValue(value);
        } else {
          setValue(event.target.value);
        }
      }}
    />
  );
};

export default InlineEditInput;
