/* admin.js */
document.addEventListener("DOMContentLoaded", function () {
    // Datos simulados - Se pueden obtener de un servidor
    let equipos = [
        { nombre: "Visions eSports", abreviatura: "VSN", jugadores: 5 },
        { nombre: "Equipo 2", abreviatura: "EQ2", jugadores: 5 },
        { nombre: "Equipo 3", abreviatura: "EQ3", jugadores: 5 }
    ];  
    
    let partidos = [];

    function actualizarResumen() {
        document.getElementById("totalEquipos").textContent = equipos.length;
        document.getElementById("totalJugadores").textContent = equipos.reduce((total, equipo) => total + equipo.jugadores, 0);
        document.getElementById("totalPartidos").textContent = partidos.length;
    }

    actualizarResumen();
    
    // Renderizar tabla de equipos
    const equiposTable = document.getElementById("equiposTable").querySelector("tbody");
    equipos.forEach(equipo => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${equipo.nombre}</td>
            <td>${equipo.abreviatura}</td>
            <td>${equipo.jugadores}</td>
            <td><button class='button--delete'>Eliminar</button></td>
        `;
        equiposTable.appendChild(row);
    });
    
    // Evento para eliminar equipos
    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            const rowIndex = this.parentElement.parentElement.rowIndex - 1;
            equipos.splice(rowIndex, 1);
            this.parentElement.parentElement.remove();
            actualizarResumen();
        });
    });

    // Funcionalidad para crear partidos
    document.getElementById("crearPartido").addEventListener("click", function () {
        const equipo1 = document.getElementById("equipo1").value;
        const equipo2 = document.getElementById("equipo2").value;
        const fecha = document.getElementById("fecha").value;
        
        if (equipo1 && equipo2 && fecha && equipo1 !== equipo2) {
            let nuevoPartido = { equipo1, equipo2, fecha };
            partidos.push(nuevoPartido);
            
            const partidosTable = document.getElementById("partidosTable").querySelector("tbody");
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${equipo1}</td>
                <td>${equipo2}</td>
                <td>${fecha}</td>
                <td>
                    <button class='button--edit edit-match'>Editar</button>
                    <button class='button--delete delete-match'>Eliminar</button>
                </td>
            `;
            partidosTable.appendChild(row);
            
            actualizarResumen();
        }
    });

    // Evento para eliminar y editar partidos con modal
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-match")) {
            const rowIndex = event.target.parentElement.parentElement.rowIndex - 1;
            partidos.splice(rowIndex, 1);
            event.target.parentElement.parentElement.remove();
            actualizarResumen();
        }
        if (event.target.classList.contains("edit-match")) {
            let row = event.target.parentElement.parentElement;
            let cells = row.getElementsByTagName("td");
            
            document.getElementById("modalEquipo1").value = cells[0].textContent;
            document.getElementById("modalEquipo2").value = cells[1].textContent;
            document.getElementById("modalFecha").value = cells[2].textContent;
            document.getElementById("saveEdit").dataset.rowIndex = row.rowIndex - 1;
            document.getElementById("editModal").classList.add("show");
        }
    });

    document.getElementById("saveEdit").addEventListener("click", function () {
        let rowIndex = this.dataset.rowIndex;
        partidos[rowIndex] = {
            equipo1: document.getElementById("modalEquipo1").value,
            equipo2: document.getElementById("modalEquipo2").value,
            fecha: document.getElementById("modalFecha").value
        };
        actualizarResumen();
        document.getElementById("editModal").classList.remove("show");
    });

    document.getElementById("closeModal").addEventListener("click", function () {
        document.getElementById("editModal").classList.remove("show");
    });
});
