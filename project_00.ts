import inquirer from "inquirer";

let num1: number;
let operator: string;
let num2: number;

async function getNumber(_name: string, message_type: string): Promise<string> {
  const answers = await inquirer.prompt({
    name: _name,
    type: "input",
    message: `Enter a ${message_type}..`,
    default() {
      const defaultMessage = _name === "number" ? 5 : "+";
      return defaultMessage;
    },
  });

  return answers[_name];
}

num1 = +(await getNumber("number", "Number"));
operator = await getNumber("operator", "Number");
num2 = +(await getNumber("number", "Number"));

console.log(eval(`${num1} ${operator} ${num2}`));
