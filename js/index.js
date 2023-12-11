// Catálogo de películas
const catalogoPeliculas = [
    { titulo: 'El Padrino', genero: 'Drama', duracion: 175 },
    { titulo: 'Forrest Gump', genero: 'Drama', duracion: 142 },
    { titulo: 'Pulp Fiction', genero: 'Crimen', duracion: 154 },
    { titulo: 'Titanic', genero: 'Romance', duracion: 195 },
    { titulo: 'Matrix', genero: 'Ciencia ficción', duracion: 136 },
    { titulo: 'El Señor de los Anillos: La Comunidad del Anillo', genero: 'Fantasía', duracion: 178 },
    { titulo: 'La La Land', genero: 'Musical', duracion: 128 },
    { titulo: 'El Rey León', genero: 'Animación', duracion: 88 },
    { titulo: 'Inception', genero: 'Ciencia ficción', duracion: 148 },
    { titulo: 'The Shawshank Redemption', genero: 'Drama', duracion: 142 },
];

document.addEventListener('DOMContentLoaded', () => {
    const catalogoList = document.getElementById('catalogo-list');
    const detallesContainer = document.getElementById('detalles-seleccionadas');
    const duracionTotalRecuadro = document.getElementById('duracion-total-recuadro');
    const vaciarBtn = document.getElementById('vaciarBtn');

    let tiempoInicioSeleccion = null; 
    function mostrarCatalogo() {
        catalogoList.innerHTML = '';
        
        catalogoPeliculas.forEach((pelicula, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${index + 1}. ${pelicula.titulo} - ${pelicula.genero} - ${pelicula.duracion} minutos`;

            listItem.addEventListener('click', () => seleccionarPelicula(index));

            catalogoList.appendChild(listItem);
        });
    }

    function seleccionarPelicula(index) {
        const pelicula = catalogoPeliculas[index];

        tiempoInicioSeleccion = new Date();

        if (!peliculaSeleccionada(pelicula)) {
            mostrarDetalles(pelicula);
        }
    }

    function peliculaSeleccionada(pelicula) {
        return detallesContainer.innerHTML.includes(pelicula.titulo);
    }

    function mostrarDetalles(pelicula) {
        detallesContainer.innerHTML += `<p>${mostrarDetallesTexto(pelicula)}</p>`;
        actualizarDuracionTotal();
        mostrarBotonVaciar();
        guardarPeliculaSeleccionada(pelicula);
    }

    function mostrarDetallesTexto(pelicula) {
        return `Detalles de "${pelicula.titulo}":\nGénero: ${pelicula.genero}\nDuración: ${pelicula.duracion} minutos`;
    }

    function guardarPeliculaSeleccionada(pelicula) {
        const peliculasSeleccionadas = obtenerPeliculasSeleccionadas();
        peliculasSeleccionadas.push(pelicula);
        localStorage.setItem('peliculasSeleccionadas', JSON.stringify(peliculasSeleccionadas));
    }

    function actualizarDuracionTotal() {
        const peliculasSeleccionadas = obtenerPeliculasSeleccionadas();
        const duracionTotal = peliculasSeleccionadas.reduce((total, pelicula) => total + pelicula.duracion, 0);
        const horas = Math.floor(duracionTotal / 60);
        const minutos = duracionTotal % 60;

        
        const tiempoTranscurrido = tiempoInicioSeleccion ? calcularTiempoTranscurrido(tiempoInicioSeleccion) : 0;

        duracionTotalRecuadro.innerHTML = `Te tomaría ${horas} horas y ${minutos} minutos ${tiempoTranscurrido} segundos. En ver todas las películas seleccionadas.`;
    }

    function mostrarBotonVaciar() {
        vaciarBtn.style.display = 'block';
    }

    function obtenerPeliculasSeleccionadas() {
        const peliculasSeleccionadasGuardadas = JSON.parse(localStorage.getItem('peliculasSeleccionadas')) || [];
        return peliculasSeleccionadasGuardadas;
    }

    function vaciarLista() {
        detallesContainer.innerHTML = '';
        duracionTotalRecuadro.textContent = '';
        localStorage.removeItem('peliculasSeleccionadas');
        vaciarBtn.style.display = 'none';
        tiempoInicioSeleccion = null; 
    }

    
    function calcularTiempoTranscurrido(tiempoInicio) {
        const tiempoActual = new Date();
        const diferenciaTiempo = (tiempoActual - tiempoInicio) / 1000; 
        return Math.floor(diferenciaTiempo);
    }

    mostrarCatalogo();
    vaciarBtn.addEventListener('click', vaciarLista);
});
