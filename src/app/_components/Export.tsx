import { User } from "@/faker";
import { CSVLink } from "react-csv";
import React from "react";

const headers = [
  { label: "Full Name", key: "name" },
  { label: "Address", key: "address" },
  { label: "Phone", key: "phone" },
];

const Export = ({ data }: { data: User[] }) => {
  console.log("data", data);
  const sanitizedData = data.map((datum) => ({
    name: datum.fullName,
    address: datum.address?.join("\n"),
    phone: `${datum.phone?.international} \n ${datum.phone?.national}`,
  }));
  return (
    <>
      <div
        className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700"
      >
        <CSVLink data={sanitizedData} headers={headers}>
          Export
        </CSVLink>
      </div>
    </>
  );
};

export default Export;
