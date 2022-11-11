import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

export const Rate = ({ defaultValue }) => {
  const rates = [5, 4, 3, 2, 1];
  const [checked, setChecked] = useState(defaultValue);

  return (
    <div className="relative inline-flex flex-row-reverse">
      {rates.map((e) => (
        <React.Fragment key={e}>
          <input
            id={`star${e}`}
            type="radio"
            name="rate"
            value={e}
            className="absolute -z-10 opacity-0 rate-input"
            onChange={() => setChecked(e)}
            // eslint-disable-next-line eqeqeq
            checked={e == checked}
          />
          <label htmlFor={`star${e}`} className="cursor-pointer text-gray-200">
            <AiFillStar />
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};
