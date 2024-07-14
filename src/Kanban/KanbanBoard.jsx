import { useState } from "react";
import KanbanColumn from "./KanbanColum";
import data from "../Library/data";

export default function KanbanBoard() {
  const [columns, setColumns] = useState(data);

  const handleDragStart = (e, taskId, sourceColumnId, task) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceColumnId", sourceColumnId);
    e.dataTransfer.setData("task", task);
    console.log("Task ID:", taskId);
    console.log("Source Column ID:", sourceColumnId);
    console.log("Task:", task);
  };

  const handleDrop = async (e, targetColumnId) => {
    const taskId = e.dataTransfer.getData("taskId");
    const sourceColumnId = e.dataTransfer.getData("sourceColumnId");

    if (sourceColumnId === targetColumnId) return;

    const newColumns = [...columns];
    const sourceColumn = newColumns.find(
      (column) => column.id === parseInt(sourceColumnId)
    );
    const targetColumn = newColumns.find(
      (column) => column.id === parseInt(targetColumnId)
    );
    const task = sourceColumn.items.find(
      (item) => item.id === parseInt(taskId)
    );

    sourceColumn.items = sourceColumn.items.filter(
      (item) => item.id !== parseInt(taskId)
    );
    targetColumn.items.push(task);

    setColumns(newColumns);

    console.log("Task ID:", newColumns);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 pb-32">
        {columns?.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            column={column}
            onDragStart={handleDragStart}
            onDrop={handleDrop}
          />
        ))}
      </div>
    </>
  );
}
