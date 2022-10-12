import inquirer from "inquirer";

const atm_pin: string = Math.floor(Math.random() * 9999) + "";
const uid: string = Math.floor(Math.random() * 1000) + "";

console.log({ atm_pin, uid });

async function getAtmPin(message_type: string): Promise<string> {
  const answers = await inquirer.prompt({
    name: "number",
    type: "input",
    message: `Enter your ${message_type}.`,
    default() {
      return 10;
    },
  });
  return answers.number;
}

const input_atm_pin: string = await getAtmPin("Atm Pin");
const input_uid: string = await getAtmPin("User Id");

if (atm_pin === input_atm_pin && uid === input_uid) {
  console.log("Greetings Mr. X, You may proceed.");
} else {
  console.log("Invalid Credentials.");
}
