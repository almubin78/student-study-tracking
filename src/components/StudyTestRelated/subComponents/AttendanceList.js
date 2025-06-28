// AttendanceList.jsx
import React from "react";

const AttendanceList = ({ students, onToggle }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
    {students.map((student) => (
      <div
        key={student.id}
        className={`flex items-center p-3 border rounded-lg transition-all cursor-pointer ${
          student.present ? "bg-green-100 border-green-300" : "bg-red-100 border-red-300"
        } hover:shadow-md`}
        onClick={() => onToggle(student.id)}
      >
        <input
          type="checkbox"
          checked={student.present}
          onChange={() => onToggle(student.id)}
          className="mr-3"
        />
        <img
          src={student.imgLink}
          alt={student.name}
          className="w-10 h-10 rounded-full mr-3 border border-white shadow-sm"
        />
        <span className="font-medium text-gray-800">{student.name}</span>
      </div>
    ))}
  </div>
);

export default AttendanceList;