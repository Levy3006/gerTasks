import { useState } from "react";
function AddTask({ AddNewTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  console.log(title, description);
  return (
    <div className="w-[500px] space-y-4 bg-slate-900 text-white p-2 rounded-md flex gap-2 flex-col rounded-md mb-5">
      <input
        className="rounded-md flex-col rounded-md p-1  text-slate-600"
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        className="rounded-md flex-col rounded-md p-1  text-slate-600"
        type="text"
        placeholder="Description Title"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button
        className=" bg-blue-800 hover:bg-blue-5n00 rounded-md px-3 py-1"
        onClick={() => {
          if (!title.trim() || !description.trim()) {
            return alert("Please, Add a valid title and a valid description!");
          }
          AddNewTask(title, description);
          setTitle("");
          setDescription("");
        }}
      >
        Add Task
      </button>
    </div>
  );
}

export default AddTask;
