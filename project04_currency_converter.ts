import inquirer from "inquirer";

async function getAmount(): Promise<number> {
  const answers = await inquirer.prompt({
    name: "number",
    type: "input",
    message: `Enter Amount in Eth.`,
    default() {
      return 10;
    },
  });
  return +answers.number;
}

async function selectCurrency(): Promise<string> {
  const answers = await inquirer.prompt({
    name: "currencies_options",
    type: "list",
    message: `Select your Currency to convert.`,
    choices: ["USD", "EURO", "Dirham"],
    default() {
      return "USD";
    },
  });
  return answers.currencies_options;
}

const amount: number = await getAmount();
const currency: string = await selectCurrency();
let converted_currency: number = 0;

switch (currency) {
  case "USD":
    converted_currency = amount * 1380;
    break;
  case "EURO":
    converted_currency = amount * 1000;
    break;
  case "Dirham":
    converted_currency = amount * 2000;
    break;
  default:
    break;
}

console.log(`${amount} Eth price in ${currency} is ${converted_currency}.`);
