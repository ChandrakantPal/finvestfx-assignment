import { DataType } from "@/pages";
import * as React from "react";
import InlineEditInput from "./InlineEditInput";

const DataRow: React.FC<{
  data: DataType;
  index: number;
  updateThePrice: (category: string, index: number, value: string) => void;
}> = ({ data, index, updateThePrice }) => {
  return (
    <tr className="grid grid-cols-3 gap-2 py-5 text-center border-b border-gray-200">
      <td className="flex flex-col items-center justify-center">
        <div className="relative">
          <img
            src={data.image}
            alt={data.name}
            className="w-24 aspect-square rounded-xl"
          />
          {data.label && (
            <small className="absolute p-1 text-white bg-yellow-400 rounded -right-2 -top-2">
              {data.label}
            </small>
          )}
        </div>
        <span className="text-center">{data.name}</span>
      </td>
      <td className="text-left">{data.description}</td>
      <td className="text-right">
        <InlineEditInput
          key={data.price}
          value={data.price}
          setValue={(value) => {
            updateThePrice(data.category, index, value);
          }}
        />
      </td>
    </tr>
  );
};

export default DataRow;
