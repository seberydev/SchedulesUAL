var express = require("express");
var router = express.Router();
const validateDataStudent = require("../controllers/validateDataStudent");
const validateDataTeacher = require("../controllers/validateDataTeacher");
const validateDataSchedule = require("../controllers/validateDataSchedule");
const fs = require("fs");
const uuid = require("uuid").v4;

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Schedules" });
});

// Students ---------------------------------------------------------------------------------------------------------
const json_sdir = fs.readFileSync("json/db_directory_student.json");
let sdir = JSON.parse(json_sdir);

/* GET Students Directory */
router.get("/students", function (req, res, next) {
  res.render("directory-students", { title: "Directorio Alumnnos", sdir });
});

/* GET new student info page */
router.get("/new-info-student", function (req, res, next) {
  res.render("new-info-student", { title: "Agregar Información Estudiante" });
});

/* POST new student info */
router.post("/new-info-student", function (req, res, next) {
  const validatedData = validateDataStudent(req.body);

  if (validatedData.error) {
    res.status(400).send("Verify Data");
  }

  let checkArr = sdir.find((x) => x.id === validatedData.value.id);

  if (!checkArr) {
    const infoData = {
      _id: uuid(),
      name: validatedData.value.name,
      last_name: validatedData.value.last_name,
      email: validatedData.value.email,
      phone: validatedData.value.phone,
      id: validatedData.value.id,
      career: validatedData.value.career,
      semester: validatedData.value.semester,
    };

    sdir.push(infoData);

    const json_dir = JSON.stringify(sdir);
    fs.writeFileSync("json/db_directory_student.json", json_dir, "utf8");

    res.redirect("/students");
  } else {
    res.send("Ya existe el alumno");
  }
});

/* Delete student info */
router.get("/delete-student/:_id", (req, res) => {
  sdir = sdir.filter((sdir) => sdir._id != req.params._id);
  const json_dir = JSON.stringify(sdir);
  fs.writeFileSync("json/db_directory_student.json", json_dir, "utf8");
  res.redirect("/students");
});

// Students ---------------------------------------------------------------------------------------------------------

// Teachers ---------------------------------------------------------------------------------------------------------
const json_tdir = fs.readFileSync("json/db_directory_teacher.json");
let tdir = JSON.parse(json_tdir);

/* GET Teachers Directory */
router.get("/teachers", function (req, res, next) {
  res.render("directory-teachers", { title: "Directorio Maestros", tdir });
});

/* GET new teacher info */
router.get("/new-info-teacher", function (req, res, next) {
  res.render("new-info-teacher", { title: "Agregar Informacion Maestro" });
});

/* POST new teacher info */
router.post("/new-info-teacher", function (req, res, next) {
  const validatedData = validateDataTeacher(req.body);

  if (validatedData.error) {
    res.status(400).send("Verify Data");
  }

  let checkArr = tdir.find((x) => x.id === validatedData.value.id);

  if (!checkArr) {
    const infoData = {
      _id: uuid(),
      name: validatedData.value.name,
      last_name: validatedData.value.last_name,
      email: validatedData.value.email,
      phone: validatedData.value.phone,
      id: validatedData.value.id,
    };

    tdir.push(infoData);

    const json_dir = JSON.stringify(tdir);
    fs.writeFileSync("json/db_directory_teacher.json", json_dir, "utf8");

    res.redirect("/teachers");
  } else {
    res.send("Ya existe el maestro");
  }
});

/* Delete teacher info */
router.get("/delete-teacher/:_id", (req, res) => {
  tdir = tdir.filter((tdir) => tdir._id != req.params._id);
  const json_dir = JSON.stringify(tdir);
  fs.writeFileSync("json/db_directory_teacher.json", json_dir, "utf8");
  res.redirect("/teachers");
});

// Teachers ---------------------------------------------------------------------------------------------------------

// Schedules --------------------------------------------------------------------------------------------------------
const people = fs.readFileSync("json/db_schedules.json");
let person = JSON.parse(people);

/* GET students schedule */
router.get("/students-schedules", (req, res) => {
  res.render("students-schedules", { title: "Horarios Alumnos", person });
});

/* GET teachers schedule */
router.get("/teachers-schedules", (req, res) => {
  res.render("teachers-schedules", { title: "Horarios Maestros", person });
});

/* GET new schedule */
router.get("/new-schedule", (req, res) => {
  res.render("new-schedule", { title: "Cree Nuevos Horarios", tdir });
});

/* POST new schedule */
router.post("/new-schedule", function (req, res, next) {
  const validatedData = validateDataSchedule(req.body);

  if (validatedData.error) {
    res.status(400).send("Verify Data");
  }

  const infoData = {
    _id: uuid(),
    semester: validatedData.value.semester,
    subject: validatedData.value.subject,
    teacher: validatedData.value.teacher,
    hour: validatedData.value.hour,
  };

  person.push(infoData);

  const json_dir = JSON.stringify(person);
  fs.writeFileSync("json/db_schedules.json", json_dir, "utf8");

  res.redirect("/teachers-schedules");
});

// Schedules --------------------------------------------------------------------------------------------------------

module.exports = router;
