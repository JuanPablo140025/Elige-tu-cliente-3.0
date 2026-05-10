const mascotas = [
  {
    nombre:"Max",
    especie:"Perro",
    edad:5,
    dueño:"Carlos",
    estado:"Normal",
    costo:150000,
    imagen:"https://images.unsplash.com/photo-1517849845537-4d257902454a"
  },

  {
    nombre:"Luna",
    especie:"Gato",
    edad:3,
    dueño:"María",
    estado:"Crítico",
    costo:280000,
    imagen:"https://images.unsplash.com/photo-1519052537078-e6302a4968d4"
  },

  {
    nombre:"Rocky",
    especie:"Perro",
    edad:7,
    dueño:"Andrés",
    estado:"Normal",
    costo:120000,
    imagen:"https://images.unsplash.com/photo-1587300003388-59208cc962cb"
  },

  {
    nombre:"Kiwi",
    especie:"Ave",
    edad:2,
    dueño:"Luisa",
    estado:"Normal",
    costo:90000,
    imagen:"https://images.unsplash.com/photo-1444464666168-49d633b86797"
  },

  {
    nombre:"Milo",
    especie:"Gato",
    edad:6,
    dueño:"Pedro",
    estado:"Crítico",
    costo:350000,
    imagen:"https://images.unsplash.com/photo-1574158622682-e40e69881006"
  },

  {
    nombre:"Toby",
    especie:"Perro",
    edad:4,
    dueño:"Sofía",
    estado:"Normal",
    costo:110000,
    imagen:"https://images.unsplash.com/photo-1518717758536-85ae29035b6d"
  },

  {
    nombre:"Nina",
    especie:"Gato",
    edad:8,
    dueño:"Camilo",
    estado:"Normal",
    costo:140000,
    imagen:"https://images.unsplash.com/photo-1495360010541-f48722b34f7d"
  },

  {
    nombre:"Zeus",
    especie:"Perro",
    edad:9,
    dueño:"Miguel",
    estado:"Crítico",
    costo:500000,
    imagen:"https://images.unsplash.com/photo-1558788353-f76d92427f16"
  },

  {
    nombre:"Coco",
    especie:"Ave",
    edad:1,
    dueño:"Laura",
    estado:"Normal",
    costo:70000,
    imagen:"https://images.unsplash.com/photo-1522926193341-e9ffd686c60f"
  },

  {
    nombre:"Simba",
    especie:"Gato",
    edad:5,
    dueño:"Daniel",
    estado:"Normal",
    costo:130000,
    imagen:"https://images.unsplash.com/photo-1511044568932-338cba0ad803"
  },

  {
    nombre:"Thor",
    especie:"Perro",
    edad:6,
    dueño:"Valentina",
    estado:"Normal",
    costo:210000,
    imagen:"https://images.unsplash.com/photo-1543466835-00a7907e9de1"
  }
];

const contenedor = document.getElementById("contenedorMascotas");
const busqueda = document.getElementById("busqueda");
const filtroEspecie = document.getElementById("filtroEspecie");
const buscarExacto = document.getElementById("buscarExacto");
const ordenarEdad = document.getElementById("ordenarEdad");

let ordenActivo = false;

function render(lista){

  if(lista.length === 0){
    contenedor.innerHTML = `
      <div class="empty">
        <h2>🐾 No se encontraron pacientes</h2>
        <p>Intenta buscar con otro nombre o especie.</p>
      </div>
    `;
    return;
  }

  contenedor.innerHTML = lista.map(mascota => `
    <div class="card">

      <img src="${mascota.imagen}" alt="${mascota.nombre}">

      <div class="card-content">
        <h2>${mascota.nombre}</h2>

        <p><b>Especie:</b> ${mascota.especie}</p>
        <p><b>Edad:</b> ${mascota.edad} años</p>
        <p><b>Dueño:</b> ${mascota.dueño}</p>
        <p><b>Costo:</b> $${mascota.costo.toLocaleString()}</p>

        <span class="estado ${
          mascota.estado === "Crítico"
          ? "critico"
          : "normal"
        }">
          ${mascota.estado}
        </span>
      </div>

    </div>
  `).join("");
}

function obtenerLista(){

  let lista = [...mascotas];

  const texto = busqueda.value.toLowerCase();
  const especie = filtroEspecie.value;

  // FILTER
  lista = lista.filter(m =>
    m.nombre.toLowerCase().includes(texto)
  );

  // FILTER
  if(especie !== "todos"){
    lista = lista.filter(m =>
      m.especie === especie
    );
  }

  // SORT
  if(ordenActivo){
    lista.sort((a,b)=>a.edad-b.edad);
  }

  return lista;
}

function actualizarVista(){
  render(obtenerLista());
}

function actualizarStats(){

  // REDUCE
  const totalPacientes =
    mascotas.reduce((acc,m)=>acc+1,0);

  // SOME
  const hayCriticos =
    mascotas.some(m=>m.estado==="Crítico");

  console.log("¿Hay pacientes críticos?", hayCriticos);

  // FILTER
  const criticos =
    mascotas.filter(m=>m.estado==="Crítico").length;

  // REDUCE
  const sumaEdades =
    mascotas.reduce((acc,m)=>acc+m.edad,0);

  const promedio =
    (sumaEdades / mascotas.length).toFixed(1);

  // REDUCE
  const costoTotal =
    mascotas.reduce((acc,m)=>acc+m.costo,0);

  document.getElementById("totalPacientes").textContent =
    totalPacientes;

  document.getElementById("criticos").textContent =
    criticos;

  document.getElementById("promedioEdad").textContent =
    promedio;

  document.getElementById("costoTotal").textContent =
    "$" + costoTotal.toLocaleString();
}

// FIND
buscarExacto.addEventListener("click", ()=>{

  const nombre =
    busqueda.value.trim().toLowerCase();

  if(nombre === ""){
    actualizarVista();
    return;
  }

  const encontrado =
    mascotas.find(m =>
      m.nombre.toLowerCase() === nombre
    );

  if(encontrado){
    render([encontrado]);
  }else{
    render([]);
  }
});

busqueda.addEventListener("input", ()=>{
  actualizarVista();
});

filtroEspecie.addEventListener("change", ()=>{
  actualizarVista();
});

ordenarEdad.addEventListener("click", ()=>{

  ordenActivo = !ordenActivo;

  actualizarVista();
});

actualizarVista();
actualizarStats();