const API_URL = "http://localhost:3003/studentlist";

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const courseInput = document.getElementById("course");
const levelInput = document.getElementById("Level");
const createBtn = document.getElementById("createBtn");
const searchInput = document.getElementById("SearchInput");
const studentDetailsList = document.getElementById("studentDetails");
const searchResultList = document.getElementById("searchResult");
const studentForm = document.getElementById("studentForm");
const searchForm = document.getElementById("searchForm");

let students = [];
let editingStudentId = null;

document.addEventListener("DOMContentLoaded", () => {
    loadStudents();
    setupFormListeners();
});

function setupFormListeners() {
    if (studentForm) {
        studentForm.addEventListener("submit", (e) => {
            e.preventDefault();
            handleStudentSubmit();
        });
    }
    if (searchForm) {
        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            executeFilter();
        });
    }
}

async function loadStudents() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        students = data.student || [];
        displayStudents(students, studentDetailsList);
    } catch (error) {
        console.error("Connection Error:", error);
    }
}

function displayStudents(studentArray, targetList) {
    targetList.innerHTML = "";

    if (studentArray.length === 0) {
        targetList.innerHTML = "<h3 style='color: #ccc; font-weight: normal; margin: 10px;'>No Records Found</h3>";
        return;
    }

    studentArray.forEach(student => {
        const li = document.createElement("li");
        li.classList.add("student-card");

        li.innerHTML = `
            <div class="list-item">
                <input type="checkbox" class="student-checkbox">
                <div class="list-text">
                    <h3>${student.name || "Unknown Name"}</h3>
                    <p><strong>Email:</strong> ${student.email}</p>
                    <p><strong>Age:</strong> ${student.age}</p>
                    <p><strong>Course:</strong> ${student.course}</p>
                    <p><strong>Level:</strong> ${student.level}</p>
                </div>
            </div>
            <div class="actions">
                <span class="edit-btn" style="cursor:pointer; margin-right:10px;">✏️</span>
                <span class="delete-btn" style="cursor:pointer;">❌</span>
            </div>
        `;

        const checkbox = li.querySelector(".student-checkbox");
        const listText = li.querySelector(".list-text");
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                listText.style.textDecoration = "line-through";
                listText.style.opacity = "0.5";
            } else {
                listText.style.textDecoration = "none";
                listText.style.opacity = "1";
            }
        });

        li.querySelector(".edit-btn").addEventListener("click", () => startEditing(student));
        li.querySelector(".delete-btn").addEventListener("click", () => deleteStudent(student.id));

        targetList.appendChild(li);
    });
}

async function handleStudentSubmit() {
    const studentPayload = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        age: ageInput.value.trim(),
        course: courseInput.value.trim(),
        level: levelInput.value
    };

    try {
        if (editingStudentId) {
            const response = await fetch(`${API_URL}/${editingStudentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studentPayload)
            });
            if (!response.ok) throw new Error("Update failed.");
            editingStudentId = null;
            createBtn.textContent = "Create Account";
        } else {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(studentPayload)
            });
            if (!response.ok) throw new Error("Creation failed.");
        }
        clearForm();
        await loadStudents();
    } catch (error) {
        alert(error.message);
    }
}

function startEditing(student) {
    editingStudentId = student.id;
    nameInput.value = student.name || "";
    emailInput.value = student.email || "";
    ageInput.value = student.age || "";
    courseInput.value = student.course || "";
    levelInput.value = student.level || "";
    createBtn.textContent = "Update Details";
}

async function deleteStudent(id) {
    if (!confirm("Delete this student profile?")) return;
    try {
        const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Deletion failed.");
        await loadStudents();
        searchResultList.innerHTML = "";
    } catch (error) {
        alert(error.message);
    }
}

function executeFilter() {
    const keyword = searchInput.value.trim().toLowerCase();

    if (keyword === "") {
        searchResultList.innerHTML = "";
        displayStudents(students, studentDetailsList);
        return;
    }

    const filtered = students.filter(student => {
        return student.name && student.name.toLowerCase().includes(keyword);
    });

    displayStudents(filtered, searchResultList);
}

searchInput.addEventListener("input", executeFilter);

function clearForm() {
    nameInput.value = "";
    emailInput.value = "";
    ageInput.value = "";
    courseInput.value = "";
    levelInput.value = "";
}



























// const API_URL = "http://localhost:3003/studentlist";

// const nameInput = document.getElementById("name");
// const emailInput = document.getElementById("email");
// const ageInput = document.getElementById("age");
// const courseInput = document.getElementById("course");
// const levelInput = document.getElementById("Level");
// const createBtn = document.getElementById("createBtn");
// const searchBtn = document.getElementById("seachBtn");
// const searchInput = document.getElementById("SearchInput");
// const studentDetails = document.getElementById("studentDetails");
// const searchResult = document.getElementById("searchResult");

// // ---------------------------
// // GLOBAL VARIABLES
// // ---------------------------
// let students = [];

// let editingStudentId = null;

// // ==========================================
// // LOAD ALL STUDENTS
// // ==========================================

// document.addEventListener("DOMContentLoaded", () => {

//     loadStudents();

// });

// // ==========================================
// // GET ALL STUDENTS
// // ==========================================

// async function loadStudents(){

//     try{

//         const response = await fetch(API_URL);

//         const data = await response.json();
//         console.log("Loading student")

//         students = data.students || [];

//         displayStudents(students);

//     }

//     catch(error){

//         console.error(error);

//         alert("Unable to load students.");

//     }

// }

// // ==========================================
// // DISPLAY STUDENTS
// // ==========================================

// function displayStudents(studentArray){

//     studentDetails.innerHTML = "";

//     if(studentArray.length === 0){

//         studentDetails.innerHTML = "<h3>No Student Found</h3>";

//         return;

//     }

//     studentArray.forEach(student =>{

//         createStudentCard(student);

//     });

// }

// // ==========================================
// // CREATE A STUDENT CARD
// // ==========================================

// function createStudentCard(student){

//     const li = document.createElement("li");

//     li.classList.add("student-card");

//     // -----------------------
//     // Student Name
//     // -----------------------

//     const name = document.createElement("h3");

//     name.textContent = student.name;

//     // -----------------------
//     // Email
//     // -----------------------

//     const email = document.createElement("p");

//     email.textContent = `Email: ${student.email}`;

//     // -----------------------
//     // Age
//     // -----------------------

//     const age = document.createElement("p");

//     age.textContent = `Age: ${student.age}`;

//     // -----------------------
//     // Course
//     // -----------------------

//     const course = document.createElement("p");

//     course.textContent = `Course: ${student.course}`;

//     // -----------------------
//     // Level
//     // -----------------------

//     const level = document.createElement("p");

//     level.textContent =`Level: ${student.level}`;

//     // =====================================
//     // ACTION CONTAINER
//     // =====================================

//     const actions = document.createElement("div");

//     actions.classList.add("actions");

//     // =====================================
//     // EDIT ICON
//     // =====================================

//     const editBtn = document.createElement("span");

//     editBtn.textContent = "✏️";

//     editBtn.style.cursor = "pointer";

//     editBtn.style.marginRight = "15px";

//     editBtn.addEventListener("click", ()=>{

//         startEditing(student);

//     });

//     // =====================================
//     // DELETE ICON
//     // =====================================
//     const deleteBtn = document.createElement("span");

//     deleteBtn.textContent = "❌";

//     deleteBtn.style.cursor = "pointer";

//     deleteBtn.addEventListener("click", ()=>{

//         deleteStudent(student.id);

//     });

//     // =====================================

//     actions.appendChild(editBtn);

//     actions.appendChild(deleteBtn);

//     li.appendChild(name);

//     li.appendChild(email);

//     li.appendChild(age);

//     li.appendChild(course);

//     li.appendChild(level);

//     li.appendChild(actions);

//     studentDetails.appendChild(li);

// }
// // ==========================================
// // CREATE NEW STUDENT
// // ==========================================

// createBtn.addEventListener("click", async (e) => {

//     e.preventDefault();

//     const student = {

//         name: nameInput.value.trim(),

//         email: emailInput.value.trim(),

//         age: ageInput.value.trim(),

//         course: courseInput.value.trim(),

//         level: levelInput.value

//     };

//     // Validation

//     if (
//     !student.name ||
//     !student.email ||
//     !student.age ||
//     !student.course ||
//     !student.level
// ) {
//     alert("Please fill all fields.");
//     return;
// }

//     try{

//         // ==========================
//         // UPDATE
//         // ==========================

//         if(editingStudentId){

//             const response = await fetch(

//                 `${API_URL}/${editingStudentId}`,

//                 {

//                     method:"PUT",

//                     headers:{

//                         "Content-Type":"application/json"

//                     },

//                     body:JSON.stringify(student)

//                 }

//             );

//             if(!response.ok){

//                 throw new Error("Unable to update student.");

//             }

//             editingStudentId = null;

//             createBtn.textContent = "Create Account";

//         }

//         // ==========================
//         // CREATE
//         // ==========================

//         else{

//             const response = await fetch(

//                 API_URL,

//                 {

//                     method:"POST",

//                     headers:{

//                         "Content-Type":"application/json"

//                     },

//                     body:JSON.stringify(student)

//                 }

//             );

//             if(!response.ok){

//                 throw new Error("Unable to create student.");

//             }

//         }

//         clearForm();

//         loadStudents();

//     }

//     catch(error){

//         console.log(error);

//         alert(error.message);

//     }

// });


// // ==========================================
// // START EDITING
// // ==========================================

// function startEditing(student){

//     editingStudentId = student.id;

//     nameInput.value = student.name;

//     emailInput.value = student.email;

//     ageInput.value = student.age;

//     courseInput.value = student.course;

//     levelInput.value = student.level;

//     createBtn.textContent = "Update Student";

// }


// // ==========================================
// // DELETE STUDENT
// // ==========================================

// async function deleteStudent(id){

//     const answer = confirm(

//         "Are you sure you want to delete this student?"

//     );

//     if(!answer){

//         return;

//     }

//     try{

//         const response = await fetch(

//             `${API_URL}/${id}`,

//             {

//                 method:"DELETE"

//             }

//         );

//         if(!response.ok){

//             throw new Error("Unable to delete student.");

//         }

//         loadStudents();

//     }

//     catch(error){

//         console.log(error);

//         alert(error.message);

//     }

// searchBtn.addEventListener("click", (e) => {

//     e.preventDefault();

//     const keyword = searchInput.value
//         .trim()
//         .toLowerCase();

//     if(keyword === ""){

//         displayStudents(students);

//         return;

//     }

//     const filteredStudents = students.filter(student => {
//         return (
//     student.name.toLowerCase().includes(keyword) ||
//     student.email.toLowerCase().includes(keyword) ||
//     student.course.toLowerCase().includes(keyword) ||
//     student.level.toLowerCase().includes(keyword)
// );

//     });

//     displayStudents(filteredStudents);

// });


// searchInput.addEventListener("input", () => {
//     const keyword = searchInput.value
//         .trim()
//         .toLowerCase();

//     if(keyword === ""){

//         displayStudents(students);

//         return;

//     }

//     const filteredStudents = students.filter(student => {

//         return (

//             student.name.toLowerCase().includes(keyword) ||

//             student.email.toLowerCase().includes(keyword) ||

//             student.course.toLowerCase().includes(keyword) ||

//             student.level.toLowerCase().includes(keyword)

//         );

//     });

//     displayStudents(filteredStudents);

// });

// function clearForm(){

//     nameInput.value = "";

//     emailInput.value = "";

//     ageInput.value = "";

//     courseInput.value = "";

//     levelInput.selectedIndex = 0;

// }

// function cancelEditing(){

//     editingStudentId = null;

//     clearForm();

//     createBtn.textContent = "Create Account";

// }

// async function refresh(){

//     await loadStudents();

// }

// document.addEventListener("keydown",(e)=>{

//     if(e.key==="Escape"){

//         cancelEditing();

//     }

// });

// searchInput.addEventListener("keypress",(e)=>{

//     if(e.key==="Enter"){

//         e.preventDefault();

//         searchBtn.click();

//     }

// });
