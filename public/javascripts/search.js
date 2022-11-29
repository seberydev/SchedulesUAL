const searchElement = document.getElementById("busqueda");
const directoryContainer = document.getElementById("directoryContainer");

searchElement.addEventListener("keyup", (e) => {
  const id = e.target.value;

  const nodes = Array.from(directoryContainer.childNodes);
  const ids = nodes
    .filter((tr) => tr.nodeName === "TR")
    .map((el) => Array.from(el.childNodes))
    .map((el) => {
      const data = el.filter((el) => el.className === "id");

      return data[0].innerText;
    })
    .filter((el) => el.includes(id));

  const elements = [];

  ids.forEach((el) => {
    const element = document.getElementById(el);

    elements.push(element);
  });

  var divsToHide = document.getElementsByClassName("dynamic");
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
});
