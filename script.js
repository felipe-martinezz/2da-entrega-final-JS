class Usuario{
    constructor(nombre, email, constraseña, numero, pais) {
        this.nombre = nombre
        this.email = email
        this.constraseña = constraseña
        this.numero = numero
        this.pais = pais
    }
    
}

let usuarios = [];


if (localStorage.getItem("usuarios")) {
    usuarios = JSON.parse(localStorage.getItem("usuarios"));
} else {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}


const form = document.getElementById("idForm");
const botonUsers = document.getElementById("botonUsers");
const divUsers = document.getElementById("divUsers");


form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(e.target);
    let datForm = new FormData(e.target);
    let usuario = new Usuario(datForm.get("nombre"), datForm.get("email"), datForm.get("constraseña"), datForm.get("numero"), datForm.get("pais"));
    usuarios.push(usuario);
    console.log(usuarios);


    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    form.reset();
})


botonUsers.addEventListener("click", () => {
    let arrayStorage = JSON.parse(localStorage.getItem("usuarios"));
    divUsers.innerHTML = ""
    arrayStorage.forEach((Usuario, indice) => {
        divUsers.innerHTML += `
    <div class="card border-dark mb-3" id="usuario${indice}" style="max-width: 20rem; margin: 4px;">
        <div class="card-header"><h2>Bienvenido ${Usuario.nombre}</h2></div>
        <div class="card-body">
            <p class="card-title">Su email es: ${Usuario.email}</p>
            <p class="card-title">Usted reside en: ${Usuario.pais}</p>
            <button class="btn btn-danger">Eliminar Tarea</button>
        </div>
    </div>
    
    `
    })

    arrayStorage.forEach((Usuario, indice) => {
        let botonCard = document.getElementById(`usuario${indice}`).lastElementChild.lastElementChild;
        botonCard.addEventListener("click", () => {
            document.getElementById(`usuario${indice}`).remove();
            usuarios.splice(indice, 1);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            console.log(`${Usuario.nombre} Eliminada`);

        })
    })

})