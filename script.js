const mascotas = [
  { nombre:"Max", especie:"Perro", edad:5, dueño:"Carlos", estado:"Normal", costo:150000 },
  { nombre:"Luna", especie:"Gato", edad:3, dueño:"María", estado:"Crítico", costo:280000 },
  { nombre:"Rocky", especie:"Perro", edad:7, dueño:"Andrés", estado:"Normal", costo:120000 },
  { nombre:"Kiwi", especie:"Ave", edad:2, dueño:"Luisa", estado:"Normal", costo:90000 },
  { nombre:"Milo", especie:"Gato", edad:6, dueño:"Pedro", estado:"Crítico", costo:350000 }
];

const contenedor = document.getElementById("contenedorMascotas");
const busqueda = document.getElementById("busqueda");
const filtroEspecie = document.getElementById("filtroEspecie");
const buscarExacto = document.getElementById("buscarExacto");
const ordenarEdad = document.getElementById("ordenarEdad");

let ordenActivo = false;

function render(lista){

  // map()
  contenedor.innerHTML = lista.map(mascota => `
    <div class="card">
      <h2>${mascota.nombre}</h2>
      <p><b>Especie:</b> ${mascota.especie}</p>
      <p><b>Edad:</b> ${mascota.edad} años</p>
      <p><b>Dueño:</b> ${mascota.dueño}</p>
      <p><b>Costo:</b> $${mascota.costo.toLocaleString()}</p>
      <span class="estado ${mascota.estado === "Crítico" ? "critico" : "normal"}">
        ${mascota.estado}
      </span>
    </div>
  `).join("");
}

function obtenerLista(){

  let lista = [...mascotas];

  const texto = busqueda.value.toLowerCase();
  const especie = filtroEspecie.value;

  // filter()
  lista = lista.filter(m =>
    m.nombre.toLowerCase().includes(texto)
  );

  // filter()
  if(especie !== "todos"){
    lista = lista.filter(m => m.especie === especie);
  }

  // sort()
  if(ordenActivo){
    lista.sort((a,b)=>a.edad-b.edad);
  }

  return lista;
}

function actualizarVista(){
  render(obtenerLista());
}

function actualizarStats(){

  // reduce()
  const totalPacientes = mascotas.reduce(acc => acc + 1, 0);

  // some()
  const hayCriticos = mascotas.some(m => m.estado === "Crítico");

  // filter()
  const criticos = mascotas.filter(m => m.estado === "Crítico").length;

  // reduce()
  const sumaEdades = mascotas.reduce((acc,m)=>acc+m.edad,0);
  const promedio = (sumaEdades / mascotas.length).toFixed(1);

  // reduce()
  const costoTotal = mascotas.reduce((acc,m)=>acc+m.costo,0);

  document.getElementById("totalPacientes").textContent = totalPacientes;
  document.getElementById("criticos").textContent = criticos;
  document.getElementById("promedioEdad").textContent = promedio;
  document.getElementById("costoTotal").textContent = "$" + costoTotal.toLocaleString();

  console.log("¿Hay pacientes críticos?", hayCriticos);
}

// find()
buscarExacto.addEventListener("click", ()=>{
  const nombre = busqueda.value.trim().toLowerCase();

  if(!nombre){
    actualizarVista();
    return;
  }

  const encontrado = mascotas.find(m =>
    m.nombre.toLowerCase() === nombre
  );

  if(encontrado){
    render([encontrado]);
  }else{
    contenedor.innerHTML = "<h2>No se encontró la mascota.</h2>";
  }
});

busqueda.addEventListener("input", actualizarVista);
filtroEspecie.addEventListener("change", actualizarVista);

ordenarEdad.addEventListener("click", ()=>{
  ordenActivo = !ordenActivo;
  actualizarVista();
});

actualizarVista();
actualizarStats();