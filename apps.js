let ingresoTexto = document.getElementById('area_texto');
let salidaTexto = document.querySelector("#titulo_secundario");
const verificarEspacios = /^\s/,
    verificarEncriptador = /[aeiou\n]/g,
    verificarDesencriptador = /(ai|enter|imes|ober|ufat|\n)/g,
    caracteresInvalidos = /[^a-z\s]/;

function presionarBoton(boton) {
    let textoUsuario = boton.id;
    if (ingresoTexto.value === "") {
        swal("Error, el campo no puede estar vacio", "No ha ingresado ningún texto.", "info")
    } else if (verificarEspacios.test(ingresoTexto.value)) {
        swal("Error, el campo no debe iniciar con espacios es blanco", "Debe ingresar texto.", "warning");
    } else if (ingresoTexto.value === null) {
        swal("Error, los datos deben cumplir con las indicaciones sugeridas", "Revise el texto ingresado.", "error");
    } else if (caracteresInvalidos.test(ingresoTexto.value)) {
        swal("Error, los datos ingresados no estan permitidos", "Hay caracteres especiales o no permitidos.", "error");
    } else {
        switch (textoUsuario) {
            case "textoEncriptar":
                textoEncriptar();
                break
            case "textoDesencriptar":
                textoDesencriptar();
                break;
        };
    };
};

function textoEncriptar() {
    if (verificarEncriptador.test(ingresoTexto.value)) {
        document.querySelector("#area_resultado").style.display = "none";
        document.querySelector("#titulo_principal").textContent = "Tu mensaje encriptado";
        document.querySelector("#titulo_principal").style.color = "#023047";
        document.querySelector("#titulo_secundario").innerHTML = ingresoTexto.value.replaceAll(verificarEncriptador, function (caracterEncriptador) {
            return reemplazarEncriptador[caracterEncriptador];
        });
        swal("Proceso exitoso", "Mensaje encriptado.", "success");
        ingresoTexto.value = "";
        document.querySelector("#copiar_texto").style.display = "inline";
    } else {
        alert("El mensaje ingresado no se puede encriptar.");
    };
};

const reemplazarEncriptador = { "a": "ai", "e": "enter", "i": "imes", "o": "ober", "u": "ufat", "\n": "<br>" };

function textoDesencriptar() {
    if (verificarDesencriptador.test(ingresoTexto.value)) {
        document.querySelector("#area_resultado").style.display = "none";
        document.querySelector("#titulo_principal").textContent = "Tu mensaje desencriptado";
        document.querySelector("#titulo_principal").style.color = "#0A3871";
        document.querySelector("#titulo_secundario").innerHTML = ingresoTexto.value.replaceAll(verificarDesencriptador, function (caracterDesencriptador) {
            return reemplazarDesencriptador[caracterDesencriptador];
        });
        swal("Proceso exitoso", "Mensaje desencriptado.", "success");
        ingresoTexto.value = "";
        document.querySelector("#copiar_texto").style.display = "inline";
    } else {
        swal("Intenta con otro mensaje", "El mensaje ingresado no está encriptado.", "info");
    };
};

const reemplazarDesencriptador = { "ai": "a", "enter": "e", "imes": "i", "ober": "o", "ufat": "u", "\n": "<br>" };

function copiarTexto() {
    let textoAuxiliar = document.createElement("textarea");
    textoAuxiliar.textContent = salidaTexto.innerHTML.replaceAll(/<br>/g, "\n");
    textoAuxiliar.select();
    navigator.clipboard.writeText(textoAuxiliar.value);
    salidaTexto.textContent = "";
    swal("Texto copiado exitosamente", "Su mensaje ha sido copiado.", "success");
    document.querySelector("#copiar").style.display = "none";
    document.querySelector("#titulo_principal").textContent += " se ha copiado en el portapapeles.";
    // Espera 2000ms o 2s para llamar a la función location.reload(), es decir, para recargar la página.
    setTimeout(() => {
        location.reload()
    }, 2000);
};