// StudentTimerPanel.jsx
import React from "react";
import Timer from "../Timer/Timer";

const StudentTimerPanel = ({
  student,
  batch,
  timeLimit,
  isPaused,
  onTimeUp,
  onTogglePause,
}) => (
  <div className="fixed top-4 right-4 bg-white p-5 rounded-2xl shadow-2xl border border-blue-100 w-80 z-30">
    <div className="flex items-center mb-4">
      <img
        src={student.imgLink}
        alt={student.name}
        className="w-12 h-12 rounded-full mr-4 border-2 border-blue-300 shadow-sm"
      />
      <div>
        <h3 className="font-bold text-lg text-gray-800">{student.name}</h3>
        <p className="text-sm text-gray-500">🎓 {batch}</p>
      </div>
    </div>

    <Timer
      key={`timer-${student.id}`}
      initialTime={timeLimit}
      onTimeUp={onTimeUp}
      isPaused={isPaused}
    />

    <button
      onClick={onTogglePause}
      className={`w-full mt-4 py-2 rounded-lg font-semibold text-white transition ${
        isPaused ? "bg-green-500 hover:bg-green-600" : "bg-yellow-500 hover:bg-yellow-600"
      }`}
    >
      {isPaused ? "▶ Resume" : "⏸ Pause"}
    </button>
  </div>
);

export default StudentTimerPanel;