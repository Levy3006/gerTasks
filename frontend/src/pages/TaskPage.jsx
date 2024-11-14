import { Check, ChevronsLeft, CircleAlert } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

function TaskPage({ tasks, setTasks }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Pegando dados de navegação através de query parameters
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const status = searchParams.get("status") === "true"; // Converte para booleano
  const id = searchParams.get("id");

  // Função para iniciar o processo de edição
  const handleEditClick = () => {
    setNewTitle(title);
    setNewDescription(description);
    setIsEditing(true);
  };

  // Função para atualizar a tarefa
  const UpdateTask = (taskID, newTitle, newDescription) => {
    if (!tasks) {
      console.error("tasks é undefined");
      return;
    }

    const newTasks = tasks.map((task) => {
      if (task.id === taskID) {
        return { ...task, title: newTitle, description: newDescription };
      }
      return task;
    });
    setTasks(newTasks);
    alert(
      `Tarefa atualizada! Novo título: ${newTitle}, Nova descrição: ${newDescription}`
    );
    setIsEditing(false);
  };

  return (
    <div className="h-screen w-screen bg-slate-500 p-6 ">
      <div className="w-[500px] space-y-3">
        <h1 className="text-3xl text-slate-100 font-bold text-left">
          Task Details
        </h1>
        <div className="bg-slate-700 rounded-md p-3 justify-end">
          {isEditing ? (
            <div>
              <h3 className="text-base text-slate-100 font-bold text-left">
                Editar Tarefa
              </h3>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full p-2 mb-2 text-slate-900"
                placeholder="Novo título"
              />
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-2 text-slate-900"
                placeholder="Nova descrição"
              />
              <div className="flex py-2 justify-between">
                <button
                  onClick={() => UpdateTask(id, newTitle, newDescription)}
                  className="bg-blue-950 hover:bg-blue-800 text-white p-2 rounded-md m-1"
                >
                  Atualizar Tarefa
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-red-950 hover:bg-red-800 text-white p-2 rounded-md m-1"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-base text-slate-100 font-bold text-left">
                Título: {title}
              </h3>
              <h3 className="text-base text-slate-100 font-bold text-left">
                Descrição: {description}
              </h3>
              <h3 className="text-base text-slate-100 font-bold text-left flex">
                Status: {status ? "Concluído" : "Pendente"}
                {status ? <Check /> : <CircleAlert />}
              </h3>
            </div>
          )}
          <div className="flex py-2">
            {!isEditing && (
              <button
                onClick={handleEditClick}
                className="bg-blue-950 hover:bg-blue-800 text-white p-2 rounded-md m-1"
              >
                Edit Task
              </button>
            )}
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-950 hover:bg-blue-800 text-white p-1 rounded-md m-1"
            >
              <ChevronsLeft />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
