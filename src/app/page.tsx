/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import "@/faker/index";
import Controls from "./_components/Controls";
import useValueStore from "@/store";
import { useCallback, useEffect, useState } from "react";
import Scroller from "./_components/Scroller";
import { User } from '@/faker/index';

const HomePage = () => {
  const region = useValueStore((state) => state.region);
  const errorValue = useValueStore((state) => state.error);
  const seed = useValueStore((state) => state.seed);
  const page = useValueStore((state) => state.page);

  const [data, setData] = useState<User[]>([]);

  const fetchData = useCallback(async () => {
    let url = `/api/get-random-data?region=${region}&offset=${page * 10}`;
    if (errorValue) url += `&error=${errorValue}`;
    if (seed) url += `&seed=${seed}`;
    const res = await fetch(url);
    const data = await res.json();
    if (page === 0) {
      setData(data);
    } else {
      // @ts-ignore
      setData((prev) => [...prev, ...data]);
    }
  }, [region, errorValue, seed, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {" "}
      <br /> <br />
      {/* @ts-ignore */}
      <Controls data={data}/>
      <br />
      <div className="max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-auto relative">
        <table className="min-w-full table-auto border border-collapse text-left text-gray-500 ">
          <thead className="sticky top-0 text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">
                No.
              </th>
              <th scope="col" className="px-6 py-3">
                Identifier
              </th>
              <th scope="col" className="px-6 py-3">
                Full Name
              </th>
              <th scope="col" className="px-6 py-3">
                Address
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, fullName, address, phone }, ind) => (
              <tr key={ind} className="odd:bg-white even:bg-gray-50 border-b">
                <th
                  scope="row"
                  className="px-6 font-medium text-gray-900 whitespace-nowrap"
                >
                  {ind + 1}.
                </th>
                <td className="px-6 py-4">{id}</td>
                <td className="px-6 py-4">{fullName}</td>
                <td className="px-6 py-4">
                  <p>
                    <span className="text-xs underline">Address line 1: </span>
                    {address[0]}
                  </p>
                  <p>
                    <span className="text-xs underline">Address line 2: </span>
                    {address[1]}
                  </p>
                </td>
                <td className="min-w-40">
                  {/* @ts-ignore */}
                  <p>{phone.national}</p>
                  {/* @ts-ignore */}
                  <p>{phone.international}</p>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={5} className="p-2">
                <div className="flex justify-center w-full">
                  <Scroller />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br /> <br />
    </div>
  );
};

export default HomePage;
