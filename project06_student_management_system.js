import inquirer from "inquirer";
const main_menu = [
    "view_students",
    "add_student",
    "~exit",
];
const courses = [
    {
        course_id: Math.floor(Math.random() * 10000).toString(),
        course_name: "metaverse",
        fee_price: 3000,
        is_fee_paid: false,
    },
    {
        course_id: Math.floor(Math.random() * 10000).toString(),
        course_name: "blockchain",
        fee_price: 2500,
        is_fee_paid: false,
    },
    {
        course_id: Math.floor(Math.random() * 10000).toString(),
        course_name: "cnc",
        fee_price: 2000,
        is_fee_paid: false,
    },
];
const student_options = [
    "show status",
    "my courses",
    "enroll",
    "view balance",
    "pay tution fee",
    "~main_menu",
    "~exit",
];
let students_options = [];
const students = [];
let status = "~main_menu";
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
    balance: ${this.balance});
    is fee paid: ${this.is_fee_paid}`);
    }
    enroll(course) {
        this.courses_enroll.push(course);
        console.log(`Student enrolled in ${course?.course_name} course Successfully.`);
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
let _student;
let _course;
while (status !== "~exit") {
    const _student_name = students_options.find((name) => name === status) || "";
    switch (status) {
        case "~main_menu":
            status = await studentOption(main_menu);
            break;
        case "view_students":
            students_options = students
                .map((students) => students.name)
                .concat(["~main_menu", "~exit"]);
            if (!students_options.length)
                console.log("No Student Found...");
            status = await studentOption(students_options);
            break;
        case "add_student":
            const student_name = (await addStudent()).trim();
            const student = new Student(student_name);
            students.push(student);
            console.log(`Student, '${student_name}' added successfully.`);
            status = "~main_menu";
            break;
        case _student_name: // dynamic Check
            _student = students.find((student) => student.name === status);
            status = await studentOption(student_options);
            break;
        case "enroll":
            const courses_name = courses
                .map((course) => course.course_name)
                .concat(["~main_menu", "~exit"]);
            status = await studentOption(courses_name);
            break;
        case "view balance":
            console.log(_student?.balance);
            status = await studentOption(student_options);
            break;
        case "pay tution fee":
            console.log(_student?.id);
            status = await studentOption(student_options);
            break;
        case "my courses":
            const my_courses = _student?.courses_enroll.map((course) => course.course_name);
            console.log(`You have enrolled in these courses, ${my_courses}`);
            status = await studentOption(student_options);
            break;
        case "show status":
            _student?.showStatus();
            status = await studentOption(student_options);
            break;
        // enrolling in the course.
        case "metaverse":
            _course = courses.find((course) => course.course_name === "metaverse");
            _student?.enroll(_course);
            status = await studentOption(student_options);
            break;
        case "blockchain":
            _course = courses.find((course) => course.course_name === "blockchain");
            _student?.enroll(_course);
            status = await studentOption(student_options);
            break;
        case "cnc":
            _course = courses.find((course) => course.course_name === "cnc");
            _student?.enroll(_course);
            status = await studentOption(student_options);
            break;
        case "~exit":
            process.exit(0);
        default:
            break;
    }
}
