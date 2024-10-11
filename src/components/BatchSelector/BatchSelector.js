// src/components/BatchSelector.js
import React from 'react';

const BatchSelector = ({ onSelectBatch }) => {
  const handleSelect = (event) => {
    onSelectBatch(event.target.value);
  };

  return (
    <div className="batch-selector">
      <label htmlFor="batch">Select Batch:</label>
      <select id="batch" onChange={handleSelect}>
        <option value="">--Select a Batch--</option>
        <option value="HSC">HSC</option>
        <option value="Eight">Eight</option>
      </select>
    </div>
  );
};

export default BatchSelector;
