import React from "react";

const NewTasks = ({newTasks}) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-lg font-bold mb-4">Assigned Tasks:</h3>
      <div className="overflow-y-auto max-h-64">
        {newTasks
          // Remove duplicate students (keeping only the latest entry)
          .filter(
            (taskObj, index, self) =>
              index === self.findLastIndex((t) => t.student === taskObj.student)
          )
          // Reverse to show most recent first
          .reverse()
          .map((taskObj) => (
            <div
              key={taskObj.student}
              className="mb-4 border-b border-gray-100 pb-4"
            >
              <h4 className="font-semibold text-blue-600">{taskObj.student}</h4>
              <ul className="list-disc pl-5 mt-1">
                {taskObj.tasks.map((task, idx) => (
                  <li key={idx} className="text-sm text-gray-700 py-1">
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewTasks;
