import { useState, useEffect } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./Components/Tasks";
import { v4 } from "uuid";
import "./index.css";

function App() {
  // Passo 1: Verificação de localStorage e valor inicial para tasks
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    // Se não encontrar nada no localStorage, retorna um array vazio
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        // Verifica se os dados estão em formato de lista de tarefas
        if (Array.isArray(parsedTasks)) {
          return parsedTasks;
        }
        console.warn("Formato inválido no localStorage, usando valor padrão.");
      } catch (error) {
        console.error("Erro ao parsear o localStorage:", error);
      }
    }
    // Caso não haja tarefas válidas no localStorage, retorna tarefas padrão
    return [
      {
        id: 1,
        title: "Estudar Programação",
        description: "Estudos sobre estrutura de dados e algoritmos",
        status: false,
      },
      {
        id: 2,
        title: "Estudar Inglês",
        description: "Estudos sobre Inglês",
        status: false,
      },
      {
        id: 3,
        title: "Estudar Git e Github",
        description: "Estudos sobre versionamento de código",
        status: false,
      },
    ];
  });

  // Passo 2: UseEffect para sincronizar com o localStorage
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  // Passo 3: Fetch para pegar os dados da API e mesclar com as tasks locais
  useEffect(() => {
    // Fazendo uma requisição GET para o backend (NestJS)
    fetch("http://localhost:3000/api")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        return response.json(); // Converte a resposta em JSON
      })
      .then((apiTasks) => {
        // Verifica se as tarefas da API são válidas e não sobrescreve dados locais inválidos
        if (Array.isArray(apiTasks) && apiTasks.length > 0) {
          setTasks(apiTasks);
          localStorage.setItem("tasks", JSON.stringify(apiTasks)); // Atualiza o localStorage com as tarefas da API
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar tarefas:", error);
      });
  }, []); // O array vazio garante que a requisição seja feita apenas uma vez quando o componente for montado.

  // Função para alternar o status da tarefa
  function ChangeStatus(taskID) {
    const newTasks = tasks.map((task) => {
      if (task.id === taskID) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setTasks(newTasks);
  }

  // Função para adicionar uma nova tarefa
  function AddNewTask(title, description) {
    const newTask = {
      id: v4(), // Gera um novo id único
      title: title,
      description: description,
      status: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  // Função para deletar uma tarefa
  function DeleteTask(taskID) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskID));
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Task Manager
        </h1>
        <AddTask AddNewTask={AddNewTask} />
        <Tasks
          tasks={tasks}
          ChangeStatus={ChangeStatus}
          DeleteTask={DeleteTask}
        />
      </div>
    </div>
  );
}

export default App;
