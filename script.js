let students = [];
let exams = [];
let questions = [];
let results = [];

let currentStudent = null;
let editingIndex = -1;

// HOME PAGE
function goHome() {
    document.getElementById("home").style.display = "block";
    document.getElementById("studentSection").style.display = "none";
    document.getElementById("adminSection").style.display = "none";
}

// STUDENT SECTION
function showStudent() {
    goHome();

    document.getElementById("home").style.display = "none";
    document.getElementById("studentSection").style.display = "block";

    showStudentLogin();
}

function showStudentLogin() {
    document.getElementById("studentLogin").style.display = "block";
    document.getElementById("studentRegister").style.display = "none";
    document.getElementById("studentDashboard").style.display = "none";
}

function showRegister() {
    document.getElementById("studentLogin").style.display = "none";
    document.getElementById("studentRegister").style.display = "block";
}

// STUDENT REGISTRATION
function registerStudent() {
    let name = document.getElementById("studentName").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let password = document.getElementById("regPassword").value;
    let roll = document.getElementById("rollNumber").value.trim();
    let course = document.getElementById("course").value.trim();

    if (!name || !email || !password || !roll || !course) {
        alert("Please fill all fields");
        return;
    }

    if (students.some(s => s.email === email)) {
        alert("Email already registered");
        return;
    }

    students.push({name, email, password, roll, course});

    alert("Registration Successful!");

    showStudentLogin();
}

// STUDENT LOGIN
function studentLogin() {
    let email = document.getElementById("studentEmail").value.trim();
    let password = document.getElementById("studentPassword").value;

    let student = students.find(s =>
        s.email === email && s.password === password
    );

    if (student) {
        currentStudent = student;

        document.getElementById("studentLogin").style.display = "none";
        document.getElementById("studentDashboard").style.display = "block";

        document.getElementById("displayName").innerText =
            "Name: " + student.name;

        document.getElementById("displayEmail").innerText =
            "Email: " + student.email;

        document.getElementById("displayRoll").innerText =
            "Roll Number: " + student.roll;

        document.getElementById("displayCourse").innerText =
            "Course: " + student.course;

        displayStudentExams();

        alert("Student Login Successful!");
    } else {
        alert("Invalid Student Login");
    }
}

// ADMIN SECTION
function showAdmin() {
    document.getElementById("home").style.display = "none";
    document.getElementById("studentSection").style.display = "none";
    document.getElementById("adminSection").style.display = "block";

    document.getElementById("adminLogin").style.display = "block";
    document.getElementById("adminDashboard").style.display = "none";
}

// ADMIN LOGIN
function adminLogin() {
    let username = document.getElementById("adminUsername").value;
    let password = document.getElementById("adminPassword").value;

    if (username === "admin" && password === "1234") {
        document.getElementById("adminLogin").style.display = "none";
        document.getElementById("adminDashboard").style.display = "block";

        displayExams();
        displayQuestions();

        alert("Admin Login Successful!");
    } else {
        alert("Invalid Admin Login");
    }
}

// CREATE EXAM
function createExam() {
    let name = document.getElementById("examName").value.trim();

    if (!name) {
        alert("Enter Exam Name");
        return;
    }

    exams.push(name);

    document.getElementById("examName").value = "";

    displayExams();

    alert("Exam Created Successfully!");
}

// DISPLAY EXAMS
function displayExams() {
    let list = document.getElementById("examList");

    list.innerHTML = "";

    exams.forEach((exam, index) => {
        list.innerHTML += `
            <div class="item">
                ${index + 1}. ${exam}
                <button class="delete"
                onclick="deleteExam(${index})">Delete</button>
            </div>
        `;
    });
}

// DELETE EXAM
function deleteExam(index) {
    exams.splice(index, 1);
    displayExams();
}

// ADD QUESTIONS
function addQuestion() {
    let question = document.getElementById("question").value.trim();
    let option1 = document.getElementById("option1").value.trim();
    let option2 = document.getElementById("option2").value.trim();
    let option3 = document.getElementById("option3").value.trim();
    let option4 = document.getElementById("option4").value.trim();
    let answer = document.getElementById("answer").value;

    if (!question || !option1 || !option2 ||
        !option3 || !option4 || !answer) {
        alert("Fill all question details");
        return;
    }

    let data = {question, option1, option2, option3, option4, answer};

    if (editingIndex === -1) {
        questions.push(data);
        alert("Question Added!");
    } else {
        questions[editingIndex] = data;
        editingIndex = -1;
        alert("Question Updated!");
    }

    clearQuestionForm();
    displayQuestions();
}

// CLEAR FORM
function clearQuestionForm() {
    document.getElementById("question").value = "";
    document.getElementById("option1").value = "";
    document.getElementById("option2").value = "";
    document.getElementById("option3").value = "";
    document.getElementById("option4").value = "";
    document.getElementById("answer").value = "";
}

// DISPLAY QUESTIONS
function displayQuestions() {
    let list = document.getElementById("questionList");

    list.innerHTML = "";

    questions.forEach((q, index) => {
        list.innerHTML += `
            <div class="item">
                <b>${index + 1}. ${q.question}</b>
                <p>1. ${q.option1}</p>
                <p>2. ${q.option2}</p>
                <p>3. ${q.option3}</p>
                <p>4. ${q.option4}</p>

                <button class="edit"
                onclick="editQuestion(${index})">Edit</button>

                <button class="delete"
                onclick="deleteQuestion(${index})">Delete</button>
            </div>
        `;
    });
}

// EDIT QUESTION
function editQuestion(index) {
    let q = questions[index];

    document.getElementById("question").value = q.question;
    document.getElementById("option1").value = q.option1;
    document.getElementById("option2").value = q.option2;
    document.getElementById("option3").value = q.option3;
    document.getElementById("option4").value = q.option4;
    document.getElementById("answer").value = q.answer;

    editingIndex = index;
}

// DELETE QUESTION
function deleteQuestion(index) {
    if (confirm("Delete this question?")) {
        questions.splice(index, 1);
        displayQuestions();
    }
}

// STUDENT AVAILABLE EXAMS
function displayStudentExams() {
    let list = document.getElementById("studentExams");

    if (exams.length === 0) {
        list.innerHTML = "No exams available";
        return;
    }

    list.innerHTML = exams.map((exam, index) =>
        `<div class="item">${index + 1}. ${exam}</div>`
    ).join("");
}

// VIEW RESULTS
function viewResults() {
    let output = document.getElementById("results");

    output.innerHTML = results.length
        ? results.map(r =>
            `<p>${r.name} - ${r.score}</p>`
        ).join("")
        : "No results available";
}

// LOGOUT
function logout() {
    currentStudent = null;

    document.getElementById("adminDashboard").style.display = "none";
    document.getElementById("studentDashboard").style.display = "none";

    goHome();

    alert("Logout Successful!");
}

// INITIAL PAGE
goHome();