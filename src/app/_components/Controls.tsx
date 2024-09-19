import React, { ChangeEvent } from "react";
import useValueStore, { region } from "@/store";
import Export from './Export';
import { User } from '@/faker';

const Controls = ({data}: {data: User}) => {
  const valueStore = useValueStore();

  const getErrorInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return 0;
    else if (parseFloat(value) > 1000) return 1000;
    return parseFloat(value);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between">
      {/* Region selector */}
      <div className="max-w-sm flex gap-4 items-baseline flex-wrap">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Region:
        </label>
        <select
          id="countries"
          value={valueStore.region}
          className="w-32 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
          onChange={(e) => valueStore.setRegion(e.target.value as region)}
        >
          <option value="US">United States</option>
          <option value="FR">France</option>
          <option value="RU">Russia</option>
        </select>
      </div>

      {/* Error control */}
      <div className="flex gap-4 items-baseline">
        <label
          htmlFor="default-range"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Errors:
        </label>
        <input
          id="default-range"
          type="range"
          min={0}
          max={10}
          step={.5}
          value={valueStore.error <= 10 ? valueStore.error : 10}
          className="w-20 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          onChange={(e) => valueStore.setError(parseFloat(e.target.value))}
        />

        <input
          type="text"
          value={valueStore.error}
          placeholder="Value"
          className="w-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
          onChange={(e) =>
            valueStore.setError(getErrorInput(e))
          }
        />
      </div>

      {/* Seed control */}
      <div className="flex gap-4 items-baseline">
        <label
          htmlFor="default-input"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Seed:
        </label>
        <input
          type="text"
          id="default-input"
          placeholder="Enter a value"
          className="w-28 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
          onChange={(e) => valueStore.setSeed(parseInt(e.target.value))}
        />
      </div>

      {/* Export */}
      <Export data={data}/>
    </div>
  );
};

export default Controls;
