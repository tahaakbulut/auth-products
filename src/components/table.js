import React, { useState } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';

export const Table = ({ tableData, handleAction, actionTag }) => {
  const [sortType, setSortType] = useState(false);
  const [sortKey, setSortKey] = useState(null);

  const handleSort = (key) => {
    setSortKey(key);
    tableData.sort((a, b) =>
      a[key]?.toString().toLowerCase() < b[key]?.toString().toLowerCase() ? (sortType ? 1 : -1) : sortType ? -1 : 1,
    );
    setSortType(!sortType);
  };

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto mt-10">
        <table className="table-fixed mx-auto lg:text-xl">
          <thead>
            <tr>
              {Object.keys({ ...tableData[0] })
                .filter((e) => e !== 'id')
                .map((col, i) => (
                  <th className="px-2 py-1" key={i} onClick={() => handleSort(col)}>
                    <span className="flex items-center justify-between cursor-pointer">
                      {col}
                      <BiSortAlt2 color={sortKey === col ? 'red' : ''} />
                    </span>
                  </th>
                ))}
              {handleAction && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {tableData.map((obj, i) => (
              <tr key={i}>
                {Object.values(obj)
                  .filter((e, i) => i !== 0)
                  .map((e, index) => (
                    <td className="border-t-[1px] border-primary px-2 py-1" key={index}>
                      {e}
                    </td>
                  ))}
                {handleAction && (
                  <td
                    className="cursor-pointer border-t-[1px] border-primary px-2 py-1 text-center"
                    onClick={() => handleAction(obj.id)}
                  >
                    {actionTag}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
