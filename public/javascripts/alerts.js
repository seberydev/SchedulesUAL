const params = new URLSearchParams(window.location.search)

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

function delsch(id){
    Swal.fire({
        title: '¿Está segura?',
        text: "No podrá recuperar esta información",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#219653',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar'
      }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = `http://localhost:3000/delete-schedule/${id}`;
        }
      })
}

function delSt(id){
    Swal.fire({
        title: '¿Está segura?',
        text: "No podrá recuperar esta información",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#219653',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar'
      }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = `http://localhost:3000/delete-student/${id}`
        }
      })
}

function delTe(id){
    Swal.fire({
        title: '¿Está segura?',
        text: "No podrá recuperar esta información",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#219653',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar'
      }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = `http://localhost:3000/delete-teacher/${id}`
        }
      })
}

function delTea(id){
    Swal.fire({
        title: '¿Está segura?',
        text: "No podrá recuperar esta información",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#219653',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar'
      }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = `http://localhost:3000/delete-teacher/${id}`;
        }
      })
}

// Nuevos Estudiantes en Directorio
if (params.has("newSt")) {
    Toast.fire({
        icon: "success",
        title: "Nuevo estudiante agregado"
    })
}

if (params.has("errNewSt")) {
    Toast.fire({
        icon: "error",
        title: "Ya existe el estudiante en el directorio"
    })
}

// Estudiante Eliminado del Directorio
if (params.has("delSt")) {
    Toast.fire({
        icon: "info",
        title: "Estudiante eliminado del directorio"
    })
}

// Validación de Datos
if (params.has("errVal")) {
    Toast.fire({
        icon: "error",
        title: "Valide los datos que ha puesto"
    })
}

// Nuevos Maestros en Directorio
if (params.has("newTea")) {
    Toast.fire({
        icon: "success",
        title: "Nuevo maestro agregado al directorio"
    })
}

if (params.has("errNewTea")) {
    Toast.fire({
        icon: "error",
        title: "Ya existe el maestro en el directorio"
    })
}

// Maestro Eliminado del Directorio
if (params.has("delTea")) {
    Toast.fire({
        icon: "info",
        title: "Maestro eliminado del directorio"
    })
}

// Nuevo Horario
if (params.has("newSch")) {
    Toast.fire({
        icon: "success",
        title: "Horario Agregado"
    })
}

if (params.has("newSchErr")) {
    let a = params.get("newSchErr")
    switch (a) {
        case "1":
            Toast.fire({
                icon: "error",
                title: "Este profe ya tiene esa hora clase"
            })
            break;
        case "2":
            Toast.fire({
                icon: "error",
                title: "Esta aula ya está en uso a esa hora"
            })
            break;
        case "3":
            Toast.fire({
                icon: "error",
                title: "Este profesor no puede dar clase de nuevo al mismo grupo"
            })
            break;
    }
}

// Horario Eliminado
if (params.has("delSch")) {
    Toast.fire({
        icon: "info",
        title: "Horario eliminado"
    })
}