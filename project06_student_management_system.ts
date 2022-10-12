import inquirer from "inquirer";

interface StudentInterface {
  id: string;
  name: string;
  courses_enroll: string[] | [];
  balance: number;
  showStatus: Function;
}

const students: StudentInterface[] = [];
let status: string;

class Student implements StudentInterface {
  public id: string;
  public name: string;
  public courses_enroll: string[] | [];
  public balance: number;

  constructor(name: string) {
    this.id = this.generateUUID() || "00001";
    this.name = name;
    this.courses_enroll = [];
    this.balance = 0;
  }

  protected generateUUID() {
    const id: string = Math.floor(Math.random() * 99999) + "";
    if (id.length === 5) return id;
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

async function studentOption(): Promise<string> {
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

async function addStudent(): Promise<string> {
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
