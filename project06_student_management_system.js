import inquirer from "inquirer";
const students = [];
let status;
class Student {
    id;
    name;
    courses_enroll;
    balance;
    constructor(name) {
        this.id = this.generateUUID() || "00001";
        this.name = name;
        this.courses_enroll = [];
        this.balance = 0;
    }
    generateUUID() {
        const id = Math.floor(Math.random() * 99999) + "";
        if (id.length === 5)
            return id;
        this.generateUUID();
    }
    showStatus() {
        console.log(`
    id: ${this.id}
    name: ${this.name}
    courses: ${this.courses_enroll}
    balance: ${this.balance}`);
    }
}
async function studentOption() {
    const answers = await inquirer.prompt({
        name: "student_option",
        type: "list",
        message: `Select your Currency to convert.`,
        choices: ["View Student", "Add Student", "Exit"],
        default() {
            return "View Student";
        },
    });
    return answers.currencies_options;
}
async function addStudent() {
    const answers = await inquirer.prompt({
        name: "student",
        type: "input",
        message: `Enter student name...`,
        default() {
            return "Ameen Ilyas";
        },
    });
    return answers.student;
}
