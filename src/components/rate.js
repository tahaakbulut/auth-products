import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';

export const Rate = ({ name = 'rate', defaultValue, disabled }) => {
  const rates = [5, 4, 3, 2, 1];
  const [checked, setChecked] = useState(defaultValue);

  return (
    <div className="relative inline-flex flex-row-reverse">
      {rates.map((e) => (
        <React.Fragment key={e}>
          <input
            id={`star${e}`}
            type="radio"
            name={name}
            value={e}
            className="absolute -z-10 opacity-0 rate-input"
            onChange={() => setChecked(e)}
            // eslint-disable-next-line eqeqeq
            checked={e == checked}
            disabled={disabled}
          />
          <label htmlFor={`star${e}`} className={` text-gray-200 ${!disabled && 'cursor-pointer'}`}>
            <AiFillStar />
          </label>
        </React.Fragment>
      ))}
    </div>
  );
};
