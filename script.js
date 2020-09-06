fetch("./students.json")
  .then((response) => response.json())
  .then((data) => getStudentsFromFile(data));

function getStudentsFromFile(data) {
  data.forEach((student) => {
    console.log(
      getStudentFirstName(student),
      getStudentMiddleName(student),
      getStudentLastName(student),
      getStudentGender(student),
      getStudentHouse(student)
    );
  });
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
      return middleName.charAt(0).toUpperCase() + middleName.slice(1);
    } else {
      return (
        middleName.charAt(1).toUpperCase() +
        middleName.slice(2, middleName.length - 1)
      );
    }
  }
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
