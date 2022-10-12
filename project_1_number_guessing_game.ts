import inquirer from "inquirer";

const number: number = Math.floor(Math.random() * 10);
let is_attempted: boolean = false;
let input_number: number = 0;

async function guessNumber(_message: string) {
  const answers = await inquirer.prompt({
    name: "number",
    type: "input",
    message: _message,
    default() {
      return 10;
    },
  });

  is_attempted = true;
  input_number = +answers.number;

  // console.log({ number, input_number });
}

while (number !== input_number) {
  const default_message: string = "Enter a number between 1 to 10.";
  const error_message: string = "Wrong answer, try again..";

  const message: string = is_attempted ? error_message : default_message;
  await guessNumber(message);
}
const success_message: string = "Correct Answer, Great job..";

console.log(success_message);
