const form = document.getElementById("formMatricula");


const nombre = document.getElementById("nombre");
const edad = document.getElementById("edad");
const email = document.getElementById("email");
const ciclo = document.getElementById("ciclo");
const acepto = document.getElementById("acepto");


const msgEdad = document.getElementById("msgEdad");
const msgEmail = document.getElementById("msgEmail");
const msgCiclo = document.getElementById("msgCiclo");
const msgMods = document.getElementById("msgMods");
const msgAcepto = document.getElementById("msgAcepto");


const btnReload = document.getElementById("btnReload");
const log = document.getElementById("log");


edad.addEventListener("input", () => {
  const v = Number(edad.value);

  
  if (isNaN(v) || v < 16 || v > 60) {
    edad.classList.add("campo-error");
    edad.classList.remove("campo-ok");
    msgEdad.textContent = "Edad inválida (16–60)";
    msgEdad.className = "msg msg-error";
  } else {
    edad.classList.remove("campo-error");
    edad.classList.add("campo-ok");
    msgEdad.textContent = "Edad correcta";
    msgEdad.className = "msg msg-ok";
  }
});



email.addEventListener("input", () => {
  const v = email.value;

  if (
    v.length < 6 ||
    !v.includes("@") ||
    !v.includes(".") ||
    v.includes("yahoo.")
  ) {
    email.classList.add("campo-error");
    email.classList.remove("campo-ok");
    msgEmail.textContent = "Email inválido";
    msgEmail.className = "msg msg-error";
  } else {
    email.classList.remove("campo-error");
    email.classList.add("campo-ok");
    msgEmail.textContent = "Email correcto";
    msgEmail.className = "msg msg-ok";
  }
});



btnReload.addEventListener("click", () => {
  location.reload();
});



form.addEventListener("submit", (e) => {
  e.preventDefault(); 

  let errores = []; 

  const vEdad = Number(edad.value);
  if (isNaN(vEdad) || vEdad < 16 || vEdad > 60) {
    errores.push("Edad");
  }
  const vEmail = email.value;
  if (
    vEmail.length < 6 ||
    !vEmail.includes("@") ||
    !vEmail.includes(".") ||
    vEmail.includes("yahoo.")
  ) {
    errores.push("Email");
  }


  if (ciclo.value === "") {
    errores.push("Ciclo");
    msgCiclo.textContent = "Selecciona un ciclo";
    msgCiclo.className = "msg msg-error";
  } else {
    msgCiclo.textContent = "";
  }

  const mods = document.getElementsByName("modulos");
  let cont = 0;
  let seleccionados = [];

  for (let i = 0; i < mods.length; i++) {
    if (mods[i].checked) {
      cont++;
      seleccionados.push(mods[i].value);
    }
  }

  if (cont < 2) {
    errores.push("Módulos (mínimo 2)");
    msgMods.textContent = "Selecciona al menos 2 módulos";
    msgMods.className = "msg msg-error";
  } else {
    msgMods.textContent = "";
  }

  if (!acepto.checked) {
    errores.push("Aceptar condiciones");
    msgAcepto.textContent = "Debes aceptar las condiciones";
    msgAcepto.className = "msg msg-error";
  } else {
    msgAcepto.textContent = "";
  }

  if (errores.length > 0) {
    alert("Campos no válidos:\n- " + errores.join("\n- "));
    return;
  }

  log.textContent = `
RESUMEN MATRÍCULA

Alumno: ${nombre.value}
Edad: ${edad.value}
Email: ${email.value}
Ciclo: ${ciclo.value}
Módulos: ${seleccionados.join(", ")}
  `;
});
