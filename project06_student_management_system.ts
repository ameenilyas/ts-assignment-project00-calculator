import inquirer from "inquirer";

interface CoursesInterface {
  course_id: string;
  course_name: string;
  is_fee_paid: boolean;
  fee_price: number;
}

interface StudentInterface {
  id: string;
  name: string;
  courses_enroll: CoursesInterface[];
  // balance: number;
  showStatus: Function;
  enroll: Function;
}

const courses: [CoursesInterface, CoursesInterface, CoursesInterface] = [
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
const main_menu: [string, string, string] = [
  "view_students",
  "add_student",
  "~exit",
];
const student_options: [string, string, string, string, string] = [
  "show status",
  "my courses",
  "enroll",
  // "view balance",
  "~main_menu",
  "~exit",
];

let course_options: [string, string, string, string] = [
  "course status",
  "pay fee",
  "~main_menu",
  "~exit",
];
let students_options: string[] = [];
const students: StudentInterface[] = [];
let status: string = "~main_menu";

class Student implements StudentInterface {
  public id: string;
  public name: string;
  public courses_enroll: CoursesInterface[];
  // public balance: number;

  constructor(name: string) {
    this.id = this.generateUUID() || "00001";
    this.name = name;
    this.courses_enroll = [];
    // this.balance = 0;
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
    `);
    // balance: ${this.balance}
  }

  enroll(course: CoursesInterface) {
    const is_enrolled = this.courses_enroll.find(
      (course_enroll) => course_enroll.course_id === course.course_id
    );
    if (is_enrolled) return console.log("Enrolled Already.");

    this.courses_enroll.push(course);
    console.log(`Enrolled in ${course?.course_name} course Successfully.`);
  }
}

async function studentOption(options: string[]): Promise<string> {
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

let _student: StudentInterface | undefined;
let _course: CoursesInterface | undefined;
let previous_option: string = "";

while (status !== "~exit") {
  const _student_name: string =
    students_options.find((name: string) => name === status) || "";

  console.log({ status, students, _student });

  switch (status) {
    case "~main_menu":
      status = await studentOption(main_menu);

      break;
    case "view_students":
      students_options = students
        .map((students) => students.name)
        .concat(["~main_menu", "~exit"]);

      if (!students_options.length) console.log("No Student Found...");
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
      _student = students.find(
        (student: StudentInterface) => student.name === status
      );
      status = await studentOption(student_options);
      break;

    case "enroll":
      const courses_name: string[] = courses
        .map((course) => course.course_name)
        .concat(["~main_menu", "~exit"]);

      status = await studentOption(courses_name);
      break;
    // case "view balance":
    //   console.log(_student?.balance);
    //   status = await studentOption(student_options);
    //   break;

    case "my courses":
      const my_courses = _student?.courses_enroll
        .map((course) => course.course_name)
        .concat(["~main_menu", "~exit"]);

      if (my_courses?.length && my_courses?.length > 2) {
        console.log(`You have enrolled in these courses, ${my_courses}`);
        const course_name: string = await studentOption(my_courses);
        const updated_course = courses.find(
          (course) => course.course_name === course_name
        );
        _course = updated_course ? { ...updated_course } : undefined;

        status = `${course_name}-enrolled`;
      } else {
        console.log(
          `You are not currently enrolled in any course, select enroll option to participate.`
        );
        status = await studentOption(student_options);
      }
      break;

    case "show status":
      _student?.showStatus();
      status = await studentOption(student_options);
      break;

    // enrolling in the course.
    case "metaverse":
      {
        const updated_course = courses.find(
          (course) => course.course_name === "metaverse"
        );
        _course = updated_course ? { ...updated_course } : undefined;
        _student?.enroll(_course);
        status = await studentOption(student_options);
      }
      break;
    case "blockchain":
      {
        const updated_course = courses.find(
          (course) => course.course_name === "blockchain"
        );
        _course = updated_course ? { ...updated_course } : undefined;
        _student?.enroll(_course);
        status = await studentOption(student_options);
      }
      break;

    case "cnc":
      {
        const updated_course = courses.find(
          (course) => course.course_name === "cnc"
        );
        _course = updated_course ? { ...updated_course } : undefined;
        _student?.enroll(_course);
        status = await studentOption(student_options);
      }
      break;

    // course actions.
    case "metaverse-enrolled":
      status = await studentOption(course_options);
      break;

    case "blockchain-enrolled":
      status = await studentOption(course_options);
      break;

    case "cnc-enrolled":
      status = await studentOption(course_options);
      break;

    case "course status":
      console.log({ _course });
      status = await studentOption(course_options);
      break;

    case "pay fee":
      if (_course?.is_fee_paid) {
        console.log("Bohut Paisa hen kiya, Already Paid...");
      } else if (_course && !_course?.is_fee_paid) {
        _course.is_fee_paid = true;
        console.log(`Paid Fee Successfully of ${_course?.course_name} course.`);
        if (_student?.courses_enroll.length) {
          const updated_courses_enroll: CoursesInterface[] =
            _student?.courses_enroll.map((course) =>
              course.course_id === _course?.course_id ? _course : course
            );
          const updated_student: StudentInterface = {
            ..._student,
            courses_enroll: updated_courses_enroll,
          };
          const student_index = students.findIndex((student) =>
            student.id === updated_student.id ? updated_student : student
          );
          students.splice(student_index, 1, updated_student);
        }
      }

      status = await studentOption(course_options);
      break;

    case "~exit":
      process.exit(0);

    default:
      break;
  }
}
