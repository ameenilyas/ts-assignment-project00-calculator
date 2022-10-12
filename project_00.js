import inquirer from "inquirer";
let num1;
let operator;
let num2;
async function getNumber(_name, message_type) {
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
