import * as React from "react";
import Category from "../components/Category";
import DownIcon from "../components/icons/DownIcon";
import UpIcon from "../components/icons/UpIcon";
import { Inter } from "next/font/google";
import DataRow from "@/components/DataRow";
import Loader from "@/components/Loader";

const inter = Inter({ subsets: ["latin"] });

export interface DataType {
  _id: string;
  name: string;
  image: string;
  category: string;
  label: string;
  price: string;
  description: string;
}

interface Categories {
  [key: string]: DataType[];
}

export default function Home() {
  const [tableData, setTableData] = React.useState<DataType[]>([]);
  const [categoryData, setCategoryData] = React.useState<Categories>({});
  const [sortBy, setSortBy] = React.useState<"ASCENDING" | "DESCENDING">(
    "ASCENDING"
  );

  const getTableData = React.useCallback(async () => {
    try {
      const results = await fetch("/api/menu").then((response) =>
        response.json()
      );
      setTableData(results);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getCategoryDataFromStorage = () => {
    const categoryDataString = localStorage.getItem("categoryData");
    const categoryDataFromStorage = JSON.parse(categoryDataString || "false");
    return categoryDataFromStorage;
  };

  React.useEffect(() => {
    // API Call to get data
    if (getCategoryDataFromStorage()) {
      setCategoryData(getCategoryDataFromStorage());
    } else {
      getTableData();
    }
  }, [getTableData]);

  React.useEffect(() => {
    if (tableData.length > 0) {
      const categorizedData = categoriesTheData(tableData);
      setCategoryData(categorizedData);
    }
  }, [tableData]);

  const categoriesTheData = (data: DataType[]): Categories => {
    const categories: Categories = {};
    data.forEach((item) => {
      // eslint-disable-next-line no-prototype-builtins
      if (!categories.hasOwnProperty(item.category)) {
        categories[item.category] = [item];
      } else {
        categories[item.category] = [...categories[item.category], item];
      }
    });
    return categories;
  };

  const sortTableDataByPrice = () => {
    const categories = {
      ...categoryData,
    };
    Object.keys(categories).map((key) => {
      categories[key].sort((a, b) =>
        sortBy === "ASCENDING"
          ? Number(a.price) - Number(b.price)
          : Number(b.price) - Number(a.price)
      );
    });
    setCategoryData(categories);
    setSortBy((current) =>
      current === "ASCENDING" ? "DESCENDING" : "ASCENDING"
    );
  };

  const updateThePrice = (category: string, index: number, value: string) => {
    const currentCategoryData = {
      ...categoryData,
    };
    currentCategoryData[category][index].price = value;
    setCategoryData(currentCategoryData);
  };

  const saveDataToStorage = () => {
    localStorage.setItem("categoryData", JSON.stringify(categoryData));
  };

  const resetData = () => {
    if (getCategoryDataFromStorage()) {
      setCategoryData(getCategoryDataFromStorage());
    } else {
      const categorizedData = categoriesTheData(tableData);
      setCategoryData(categorizedData);
    }
  };

  return (
    <main className="min-h-screen p-6 space-y-6">
      <p className="w-40 p-4 mx-auto text-center border border-b border-gray-300 dark:border-neutral-800 rounded-xl lg:dark:bg-zinc-800/30">
        Food Menu
      </p>
      {Object.keys(categoryData).length > 0 ? (
        Object.keys(categoryData).map((key) => (
          <Category name={key} key={key}>
            <table className="w-full lg:max-w-[80%] lg:mx-auto">
              <thead>
                <tr className="grid grid-cols-3 gap-4 text-center border-b border-gray-200">
                  <th>Name</th>
                  <th className="text-left">Description</th>
                  <th
                    className="flex items-center justify-start cursor-pointer gap-x-2"
                    onClick={sortTableDataByPrice}
                  >
                    Price{" "}
                    {sortBy === "ASCENDING" ? (
                      <DownIcon variant="small" />
                    ) : (
                      <UpIcon variant="small" />
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {categoryData[key].map((data, index) => (
                  <DataRow
                    data={data}
                    key={`${data._id}${key}`}
                    index={index}
                    updateThePrice={updateThePrice}
                  />
                ))}
              </tbody>
            </table>
          </Category>
        ))
      ) : (
        <Loader />
      )}
      <div className="flex items-center justify-center">
        <button
          type="button"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={saveDataToStorage}
        >
          Save
        </button>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={resetData}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
