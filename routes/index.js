var express = require("express");
var router = express.Router();
const validateDataStudent = require("../controllers/validateDataStudent");
const validateDataTeacher = require("../controllers/validateDataTeacher");
const validateDataSchedule = require("../controllers/validateDataSchedule");
const fs = require("fs");
const uuid = require("uuid").v4;

/* GET home page. */
router.get("/", function (req, res, next) {
  // RENDERIZAR PÁGINA PRINCIPAL
  res.render("index", { title: "Schedules" });
});

/* GET about page. */
router.get("/about", function (req, res, next) {
  res.render("about", { title: "Acerca De" });
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
  res.render("new-info-student", { title: "Agregar Información Estudiante", subDir });
});

/* POST new student info */
router.post("/new-info-student", function (req, res, next) {
  const validatedData = validateDataStudent(req.body);

  if (validatedData.error) {
    res.redirect("/new-info-student?errVal=1");
    return
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

    res.redirect("/students?newSt=1");
  } else {
    res.redirect("/new-info-student?errNewSt=1");
  }
});

/* Delete student info */
router.get("/delete-student/:_id", (req, res) => {
  sdir = sdir.filter((sdir) => sdir._id != req.params._id);
  const json_dir = JSON.stringify(sdir);
  fs.writeFileSync("json/db_directory_student.json", json_dir, "utf8");
  res.redirect("/students?delSt=1");
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
    res.redirect("/new-info-teacher?errVal=1");
    return
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

    res.redirect("/teachers?newTea=1");
  } else {
    res.redirect("/teachers?errNewTea=1");
  }
});

/* Delete teacher info */
router.get("/delete-teacher/:_id", (req, res) => {
  tdir = tdir.filter((tdir) => tdir._id != req.params._id);
  const json_dir = JSON.stringify(tdir);
  fs.writeFileSync("json/db_directory_teacher.json", json_dir, "utf8");
  res.redirect("/teachers?delTea=1");
});

// Teachers ---------------------------------------------------------------------------------------------------------

// Schedules --------------------------------------------------------------------------------------------------------
const schedules = fs.readFileSync("json/db_schedules.json");
let schedule = JSON.parse(schedules);

const json_subj = fs.readFileSync("json/db_subjects.json");
let subDir = JSON.parse(json_subj);

function GetSortOrder(thing) {
  return function (a, b) {
    if (a[thing] > b[thing]) {
      return 1;
    } else if (a[thing] < b[thing]) {
      return -1;
    }
    return 0;
  };
}

function order() {
  // ORDENA EN BASE A SEMESTER
  schedule.sort(GetSortOrder("semester"));

  // ORDENA EN BASE A HORARIO
  schedule.sort(GetSortOrder("order"));
}

/* GET students schedule */
router.get("/students-schedules", (req, res) => {
  // CHECAR SI TODOS TIENEN CLASES DE IDIOMAS EN SUS HORARIOS
  let checkClaseIdiomas = schedule.filter((x) => x.subject == "Idiomas");

  let semestres = [];
  subDir.forEach((x) => {
    semestres.push(x.semester);
  });

  if (checkClaseIdiomas.length < semestres.length) {
    checkClaseIdiomas.forEach((el) => {
      let giveIndex = (a) => a == el.semester;
      let index = semestres.findIndex(giveIndex);
      if (index >= 0) {
        semestres.splice(index, 1);
      }
    });

    semestres.forEach((x) => {
      let infoData = {
        _id: uuid(),
        semester: x,
        room: "Variables",
        subject: "Idiomas",
        date_start: "2022-09-05",
        date_end: "2022-11-25",
        teacher: "Variable",
        hour: "7:45 - 8:45",
        order: "1",
      };

      schedule.push(infoData);
    });

    const json_dir = JSON.stringify(schedule);
    fs.writeFileSync("json/db_schedules.json", json_dir, "utf8");
  }

  // ORDENAR EL JSON DE LOS HORARIOS ACTUALES EN BASE A HORA Y SEMESTRE
  order();

  res.render("students-schedules", { title: "Horarios Alumnos", schedule });
});

/* GET teachers schedule */
router.get("/teachers-schedules", (req, res) => {
  // ORDENAR EL JSON DE LOS HORARIOS ACTUALES EN BASE A HORA Y SEMESTRE
  order();

  res.render("teachers-schedules", { title: "Horarios Maestros", schedule });
});

/* GET new schedule */
router.get("/new-schedule", (req, res) => {
  let a = subDir[0].subjects[0]
  let b = subDir[1].subjects[0]

  let c = Object.values(a).toString()
  let d = Object.values(b).toString()

  res.render("new-schedule", { title: "Cree Nuevos Horarios", tdir, subDir, c, d });
});

/* POST new schedule */
router.post("/new-schedule", function (req, res, next) {
  const validatedData = validateDataSchedule(req.body);

  if (validatedData.error) {
    res.redirect("/new-schedule?errVal=1");
  }

  // QUE UN PROFE NO PUEDA DAR 2 CLASES A LA MISMA HORA
  let checkTeacher = schedule.find(
    (x) =>
      x.teacher == validatedData.value.teacher &&
      x.hour == validatedData.value.hour &&
      x.date_start == validatedData.value.date_start &&
      x.date_end == validatedData.value.date_end
  );

  // QUE UN PROFE NO PUEDA DAR 2 VECES CLASE A UN GRUPO
  let checkSem = schedule.find(
    (x) =>
      x.teacher == validatedData.value.teacher &&
      x.semester == validatedData.value.semester
  );

  // QUE UN AULA NO ESTÉ OCUPADA A LA HORA SELECCIONADA
  let checkRoom = schedule.find(
    (x) =>
      x.room == validatedData.value.room &&
      x.hour == validatedData.value.hour &&
      x.date_start == validatedData.value.date_start &&
      x.date_end == validatedData.value.date_end
  );

  if (checkTeacher) {
    res.redirect("/new-schedule?newSchErr=1");
    return;
  }

  if (checkRoom) {
    res.redirect("/new-schedule?newSchErr=2");
    return;
  }

  if (checkSem) {
    res.redirect("/new-schedule?newSchErr=3");
    return;
  }

  let hrOrder = "";
  if (validatedData.value.hour == "9:00 - 11:00") {
    hrOrder = "2";
  } else {
    hrOrder = "3";
  }

  const infoData = {
    _id: uuid(),
    semester: validatedData.value.semester,
    room: validatedData.value.room,
    subject: validatedData.value.subject,
    date_start: validatedData.value.date_start,
    date_end: validatedData.value.date_end,
    teacher: validatedData.value.teacher,
    hour: validatedData.value.hour,
    order: hrOrder,
  };

  schedule.push(infoData);

  const json_dir = JSON.stringify(schedule);
  fs.writeFileSync("json/db_schedules.json", json_dir, "utf8");

  res.redirect("/teachers-schedules?newSch=1");
});

/* Delete schedule */
router.get("/delete-schedule/:_id", (req, res) => {
  schedule = schedule.filter((schedule) => schedule._id != req.params._id);
  const json_dir = JSON.stringify(schedule);
  fs.writeFileSync("json/db_schedules.json", json_dir, "utf8");
  res.redirect("/teachers-schedules?delSch=1");
});

// Schedules --------------------------------------------------------------------------------------------------------

module.exports = router;
