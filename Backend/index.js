const express = require("express");
const app = express();
const PORT = 3003;
const cors = require("cors");

app.use(cors());
app.use(express.json());


const studentlist = [];

app.post("/studentlist", (req, res) => {
    const { name, age, course, level, email } = req.body || {};
    if (!name || !age || !course || !level || !email) {
    return res.status(400).json({ message: "All fields are required" });
    }

    const newStudent = {
        id: Date.now(),
        name,
        age,
        course,
        level,
        email
    };

    studentlist.push(newStudent);

    res.status(201).json({ message: "Student account created", student: newStudent });
});

app.get("/studentlist", (req, res) => {
    res.json({ student: studentlist });
});

app.get("/studentlist/:id", (req, res) => {
    const studentId = parseInt(req.params.id);
    const student = studentlist.find(student => student.id === studentId);
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.json({ student });
});

app.put("/studentlist/:id", (req, res) => {
    const studentId = Number(req.params.id);
    const student = studentlist.find(student => student.id === studentId);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, age, course, level, email } = req.body;

    if (name !== undefined) student.name = name;
    if (age !== undefined) student.age = age;
    if (course !== undefined) student.course = course;
    if (level !== undefined) student.level = level;
    if (email !== undefined) student.email = email;

    res.json({ message: "Student updated", student });
});

app.delete("/studentlist/:id", (req, res) => {
    const studentId = Number(req.params.id);
    const studentIndex = studentlist.findIndex(student => student.id === studentId);

    if (studentIndex === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    studentlist.splice(studentIndex, 1);
    res.json({ message: "Student deleted" });
});





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});