import inquirer from "inquirer";
// enum StatusEnum {
//   "Student Options" = "student_options",
//   "View Students" = "view_students",
//   "Add Student" = "add_student",
//   "Exit" = "exit",
// }
const main_options = ["view_students", "add_student", "exit"];
let students_options = [];
let student_options = [
    "enroll",
    "view balance",
    "pay tution fee",
    "show status",
    "exit",
];
const students = [];
let status = "main_options";
class Student {
    id;
    name;
    courses_enroll;
    balance;
    is_fee_paid;
    constructor(name) {
        this.id = this.generateUUID() || "00001";
        this.name = name;
        this.courses_enroll = [];
        this.balance = 0;
        this.is_fee_paid = false;
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
async function studentOption(options) {
    const answers = await inquirer.prompt({
        name: "student_option",
        type: "list",
        message: `Select option.`,
        choices: options,
        default() {
            return "view students";
        },
    });
    return answers.student_option;
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
while (status !== "exit") {
    const _name = students_options.find((name) => status === name) || "";
    switch (status) {
        case "main_options":
            status = await studentOption(main_options);
            break;
        case "view_students":
            students_options = students
                .map((students) => students.name)
                .concat(["main_options", "exit"]);
            status = await studentOption(students_options);
            break;
        case "add_student":
            const student_name = (await addStudent()).trim();
            const student = new Student(student_name);
            students.push(student);
            console.log(`Student ${student_name} added successfully.`);
            status = "main_options";
            break;
        case _name: // dynamic Check
            // const _student = students.find(student => student.name === _name);
            status = await studentOption(student_options);
            break;
        case "exit":
            process.exit(0);
        default:
            break;
    }
}
