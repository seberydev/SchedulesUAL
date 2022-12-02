let selectSemestre = document.querySelector('#semester')
let selectMaterias = document.querySelector('#subject')

let mat1ro = document.querySelector('#mat1ro')
let mat3ro = document.querySelector('#mat3ro')

let t1 = mat1ro.value
let t3 = mat3ro.value

let arrMat1ro = t1.split(',')
let arrMat3ro = t3.split(',')

selectSemestre.addEventListener('change', ()=>{
    selectMaterias.innerHTML = ''

    let x = selectSemestre.value

    switch (x) {
        case "1ero":
            arrMat1ro.forEach(el =>{
                let option = document.createElement("option");
                option.text = el;
                option.value = el;

                selectMaterias.appendChild(option)
            })
            break;
        case "3ero":
            arrMat3ro.forEach(el =>{
                let option = document.createElement("option");
                option.text = el;
                option.value = el;

                selectMaterias.appendChild(option)
            })
            break;
    }
})