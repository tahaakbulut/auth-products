import React, { useState } from 'react';
import { BiSortAlt2 } from 'react-icons/bi';
import { Rate } from './rate';

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
        <table className="table-fixed mx-auto lg:text-xl text-center">
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
            {tableData.map((row) => (
              <tr key={row.id} id={row.id}>
                {Object.entries(row)
                  .filter((e) => e[0] !== 'id')
                  .map((col, i) => (
                    <td className="border-t-[1px] border-primary px-2 py-1" key={i}>
                      {col[0] === 'image' ? (
                        <img src={col[1]} alt="" width={80} height={45} />
                      ) : col[0] === 'score' ? (
                        <Rate name={`rate${row.id}`} defaultValue={col[1]} disabled />
                      ) : (
                        <>{col[1]}</>
                      )}
                    </td>
                  ))}
                {handleAction && (
                  <td
                    className="cursor-pointer border-t-[1px] border-primary px-2 py-1 text-center"
                    onClick={() => handleAction(row.id)}
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
