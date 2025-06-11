const gradePointsMap = {
    'A': 4.00,
    'A-': 3.75,
    'B+': 3.50,
    'B': 3.00,
    'C+': 2.50,
    'C': 2.00,
    'D+': 1.50,
    'D': 1.00,
    'F': 0.00
};

let subjects = [];
let semesterSgpas = [];

const subjectNameInput = document.getElementById('subjectName');
const creditHoursInput = document.getElementById('creditHours');
const gradeSelect = document.getElementById('gradeSelect');
const addSubjectButton = document.getElementById('addSubject');
const subjectsTableBody = document.querySelector('#subjectsTable tbody');
const currentGpaDisplay = document.getElementById('currentGpa');
const clearGpaButton = document.getElementById('clearGpaData');

const semesterSgpaInput = document.getElementById('semesterSgpa');
const addSemesterSgpaButton = document.getElementById('addSemesterSgpa');
const semesterSgpaList = document.getElementById('semesterSgpaList');
const currentCgpaDisplay = document.getElementById('currentCgpa');
const clearCgpaButton = document.getElementById('clearCgpaData');

function calculateGpa() {
    let totalGradePoints = 0;
    let totalCreditHours = 0;

    subjects.forEach(subject => {
        totalGradePoints += subject.creditHours * subject.gradePoints;
        totalCreditHours += subject.creditHours;
    });

    if (totalCreditHours === 0) {
        return 0;
    }
    return (totalGradePoints / totalCreditHours).toFixed(2);
}

function updateGpaDisplay() {
    currentGpaDisplay.textContent = calculateGpa();
}

function addSubject() {
    const subjectName = subjectNameInput.value.trim();
    const creditHours = parseInt(creditHoursInput.value);
    const grade = gradeSelect.value;
    const gradePoints = gradePointsMap[grade];

    if (subjectName === '' || isNaN(creditHours) || creditHours < 1) {
        return;
    }

    const newSubject = {
        name: subjectName,
        creditHours: creditHours,
        grade: grade,
        gradePoints: gradePoints
    };
    subjects.push(newSubject);

    const row = subjectsTableBody.insertRow();
    row.insertCell(0).textContent = newSubject.name;
    row.insertCell(1).textContent = newSubject.creditHours;
    row.insertCell(2).textContent = newSubject.grade;
    row.insertCell(3).textContent = newSubject.gradePoints.toFixed(2);

    subjectNameInput.value = '';
    creditHoursInput.value = '3';
    gradeSelect.value = 'A';

    updateGpaDisplay();
}

function clearGpaData() {
    if (subjects.length > 0) {
        subjects.pop(); // Remove the last subject
        subjectsTableBody.deleteRow(subjectsTableBody.rows.length - 1); // Remove the last row from table
        updateGpaDisplay();
    }
}

function calculateCgpa() {
    if (semesterSgpas.length === 0) {
        return 0;
    }
    const sumSgpas = semesterSgpas.reduce((sum, sgpa) => sum + sgpa, 0);
    return (sumSgpas / semesterSgpas.length).toFixed(2);
}

function updateCgpaDisplay() {
    currentCgpaDisplay.textContent = calculateCgpa();
}

function addSemesterSgpa() {
    const sgpa = parseFloat(semesterSgpaInput.value);

    if (isNaN(sgpa) || sgpa < 0 || sgpa > 4) {
        return;
    }

    semesterSgpas.push(sgpa);

    const listItem = document.createElement('li');
    listItem.textContent = `Semester: ${sgpa.toFixed(2)}`;
    semesterSgpaList.appendChild(listItem);

    semesterSgpaInput.value = '';

    updateCgpaDisplay();
}

function clearCgpaData() {
    if (semesterSgpas.length > 0) {
        semesterSgpas.pop(); // Remove the last SGPA
        semesterSgpaList.removeChild(semesterSgpaList.lastChild); // Remove the last list item
        updateCgpaDisplay();
    }
}

addSubjectButton.addEventListener('click', addSubject);
clearGpaButton.addEventListener('click', clearGpaData);
addSemesterSgpaButton.addEventListener('click', addSemesterSgpa);
clearCgpaButton.addEventListener('click', clearCgpaData);

updateGpaDisplay();
updateCgpaDisplay();
