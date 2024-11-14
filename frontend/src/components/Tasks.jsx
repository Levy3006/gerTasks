import { Check, ChevronsRight, CircleAlert, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Tasks({ tasks, ChangeStatus, DeleteTask }) {
  const navigate = useNavigate();

  function detailsClick(task) {
    navigate(
      `/task?title=${task.title}&description=${task.description}&status=${task.status}&id=${task.id}`
    );
  }
  return (
    // Renderizando as tarefas na tela
    <div className="bg-slate-900 text-white p-2 rounded-md flex gap-2 flex-col rounded-md mb-5">
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex gap-1">
            <button
              onClick={() => {
                ChangeStatus(task.id); // Atualiza o estado da tarefa
              }}
              className={`flex w-96 p-2 rounded-md text-left m-1 ${
                task.status
                  ? "bg-green-500 hover:bg-green-400" // Verde quando concluído
                  : "bg-blue-950 hover:bg-blue-800" // Azul quando pendente
              } text-white`} // Garante que o texto será sempre branco
            >
              {task.title}
              {task.status ? <Check /> : <CircleAlert />}
            </button>
            <button
              onClick={() => detailsClick(task)}
              className="bg-blue-950 hover:bg-blue-800 text-white p-2 rounded-md m-1"
            >
              <ChevronsRight />
            </button>
            <button
              className="bg-blue-950  hover:bg-blue-800 text-white p-2 rounded-md m-1"
              onClick={() => {
                DeleteTask(task.id); // Deleta a tarefa
              }}
            >
              <Trash2 />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
