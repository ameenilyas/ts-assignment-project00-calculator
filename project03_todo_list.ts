import inquirer from "inquirer";

const todos: string[] = [];

async function getTodosLength(): Promise<number> {
  const answers = await inquirer.prompt({
    name: "number",
    type: "input",
    message: `How many todos you want add today?`,
    default() {
      return 3;
    },
  });
  return answers.number;
}

const todo_length: number = +(await getTodosLength());

async function getTodo(): Promise<string> {
  const answers = await inquirer.prompt({
    name: "number",
    type: "input",
    message: `Enter your todo.`,
    default() {
      return "Learning blockchain... ";
    },
  });
  return answers.number;
}
while (todos.length < todo_length) {
  const todo = await getTodo();
  todos.push(todo);
}

console.log({ todos });
