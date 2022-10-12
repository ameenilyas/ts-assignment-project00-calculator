import inquirer from "inquirer";
async function getParagraph() {
    const answers = await inquirer.prompt({
        name: "pragraph",
        type: "input",
        message: `Write any free writing...`,
        default() {
            return 10;
        },
    });
    return answers.pragraph;
}
const paragraph = (await getParagraph()).trim();
const total_words = paragraph.split(" ").length;
const total_letters = paragraph
    .split(" ")
    .reduce((totalAmount, word) => totalAmount + word.length, 0);
console.log({ total_words, total_letters });
