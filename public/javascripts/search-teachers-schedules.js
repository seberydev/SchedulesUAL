const searchElementTeachers = document.getElementById("busquedateachers");
const directoryContainerTeachers = document.getElementById(
  "directoryContainerteachers"
);
var oTable = document.querySelector(".teacherScheduleTable");

document.addEventListener("DOMContentLoaded", (event) => {
  checkClass();
});

const normalizeString = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

// BUSCADOR EN LOS HORARIOS DE MAESTROS
searchElementTeachers.addEventListener("keyup", (e) => {
  const id = e.target.value;

  const nodes = Array.from(directoryContainerTeachers.childNodes);
  const ids = nodes
    .filter((tr) => tr.nodeName === "TR")
    .map((el) => Array.from(el.childNodes))
    .map((el) => {
      const data = el.filter((el) => el.className === "idteachers");

      return data[0].innerText;
    })
    .filter((el) => normalizeString(el).includes(normalizeString(id)));

  const elements = [];

  ids.forEach((el) => {
    const element = document.getElementById(el);

    elements.push(element);
  });

  var divsToHide = document.getElementsByClassName("dynamicteachers");
  for (var i = 0; i < divsToHide.length; i++) {
    const currID = divsToHide[i].id;
    let included = false;

    ids.forEach((el) => {
      if (el === currID) included = true;
    });

    if (included) {
      divsToHide[i].style.visibility = "visible";
      divsToHide[i].style.display = "table-row";
    } else {
      divsToHide[i].style.visibility = "hidden";
      divsToHide[i].style.display = "none";
    }
  }

  checkClass();
});

// NO DEJAR QUE SE MUESTREN LAS CLASES "IDIOMAS" EN LOS HORARIOS
function checkClass() {
  //gets rows of table
  let rowLength = oTable.rows.length;

  //loops through rows
  for (i = 0; i < rowLength; i++) {
    //gets cell 3 of current row
    let oCells = oTable.rows.item(i).cells;
    let cell = oCells.item(1).innerHTML;

    if (cell == "Idiomas") {
      oTable.rows.item(i).style.display = "none";
    }
  }
}
