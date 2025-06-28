// SettingsPanel.jsx
import React from "react";
import BatchSelector from "../BatchSelector/BatchSelector";

const SettingsPanel = ({
  selectedBatch,
  setSelectedBatch,
  studentTimeLimit,
  setStudentTimeLimit,
  onConfirm,
  buttonText,
}) => (
  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg border border-blue-200">
    <h2 className="text-xl font-bold mb-4 text-blue-800">⚙️ Session Settings</h2>

    <BatchSelector onSelectBatch={setSelectedBatch} />

    <div className="my-4">
      <label className="block mb-2 font-medium text-blue-700">⏱ Time per Student:</label>
      <select
        value={studentTimeLimit}
        onChange={(e) => setStudentTimeLimit(Number(e.target.value))}
        className="w-full p-2 border border-blue-300 rounded focus:ring-2 focus:ring-blue-400 focus:outline-none"
      >
        {[5, 10, 15, 20, 30, 60, 120, 180, 300].map((time) => (
          <option key={time} value={time}>
            {time <= 60 ? `${time} seconds` : `${time / 60} Minute${time > 60 ? "s" : ""}`}
          </option>
        ))}
      </select>
    </div>

    <button
      onClick={onConfirm}
      disabled={!selectedBatch}
      className={`w-full py-2 rounded text-white font-semibold transition duration-300 ease-in-out shadow-md ${
        !selectedBatch ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {buttonText}
    </button>
  </div>
);

export default SettingsPanel;