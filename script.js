let Student = {
  firstName: null,
  middleName: null,
  nickName: null,
  lastName: null,
  image: null,
  gender: null,
  house: null,
};

let studentsArray = [];

fetchFile("./students.json");

function fetchFile(filename) {
  fetch(filename)
    .then((response) => response.json())
    .then((data) => getStudentsFromFile(data));
}

function getStudentsFromFile(data) {
  data.forEach((studentJSON) => {
    addStudent(studentJSON);
  });
  console.table(studentsArray);
}

function addStudent(studentJSON) {
  let student = Object.create(Student);
  student.firstName = getStudentFirstName(studentJSON);
  if (getStudentMiddleName(studentJSON).isNickname == true) {
    student.nickName = getStudentMiddleName(studentJSON).name;
  } else {
    student.middleName = getStudentMiddleName(studentJSON).name;
  }
  student.lastName = getStudentLastName(studentJSON);
  student.gender = getStudentGender(studentJSON);
  student.house = getStudentHouse(studentJSON);
  studentsArray.push(student);
}

function getStudentFullname(student) {
  return student.fullname.trim().toLowerCase();
}

function getStudentFirstName(student) {
  let firstName = getStudentFullname(student).split(" ")[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
}

function getStudentLastName(student) {
  let lastName = getStudentFullname(student).split(" ")[
    student.fullname.trim().split(" ").length - 1
  ];
  lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  if (lastName.includes("-")) {
    lastName =
      lastName.slice(0, lastName.indexOf("-") + 1) +
      lastName.charAt(lastName.indexOf("-") + 1).toUpperCase() +
      lastName.slice(lastName.indexOf("-") + 2);
  }
  return lastName;
}

function getStudentMiddleName(student) {
  if (getStudentFullname(student).split(" ").length >= 3) {
    let middleName = getStudentFullname(student).split(" ")[1];
    if (middleName.charAt(0) != '"') {
      //if is middle name
      return {
        name: middleName.charAt(0).toUpperCase() + middleName.slice(1),
        isNickname: false,
      };
    } else {
      //if is nick name
      return {
        name:
          middleName.charAt(1).toUpperCase() +
          middleName.slice(2, middleName.length - 1),
        isNickname: true,
      };
    }
  } else
    return {
      name: undefined,
      isNickname: false,
    };
}

function getStudentHouse(student) {
  let house =
    student.house.trim().toLowerCase().charAt(0).toUpperCase() +
    student.house.trim().toLowerCase().slice(1);
  return house;
}

function getStudentGender(student) {
  return student.gender.trim();
}
