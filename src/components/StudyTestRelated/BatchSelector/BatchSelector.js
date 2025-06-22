// src/components/BatchSelector.js
import React from 'react';

const BatchSelector = ({ onSelectBatch }) => {
  const handleSelectBatch = (event) => {
    onSelectBatch(event.target.value);
  };

  return (
    <div className="batch-selector">
      <label htmlFor="batch">Select Batch:</label>
      <select id="batch" onChange={handleSelectBatch}>
        <option value="">--Select a Batch--</option>
        <option value="HSC">HSC</option>
        <option value="Ten">Ten</option>
        <option value="Nine">Nine</option>
        <option value="Eight">Eight</option>
      </select>
    </div>
  );
};

export default BatchSelector;
