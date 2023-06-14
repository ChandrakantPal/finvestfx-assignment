import { DataType } from "@/pages";
import * as React from "react";
import InlineEditInput from "./InlineEditInput";
import Image from "next/image";
import LabelBadge from "./LabelBadge";

const DataRow: React.FC<{
  data: DataType;
  index: number;
  updateThePrice: (category: string, index: number, value: string) => void;
}> = ({ data, index, updateThePrice }) => {
  return (
    <tr className="grid grid-cols-3 gap-4 py-5 text-center border-b border-gray-700 dark:border-gray-200">
      <td className="flex flex-col items-center justify-center">
        <div className="relative">
          <Image
            src={data.image}
            alt={data.name}
            width={96}
            height={96}
            className="aspect-square rounded-xl"
          />
          {data.label && <LabelBadge label={data.label} />}
        </div>
        <span className="text-center">{data.name}</span>
      </td>
      <td className="text-left">{data.description}</td>
      <td className="text-left">
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
