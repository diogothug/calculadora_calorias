var input_peso = document.getElementById('input_peso');
var tag_resultado = document.getElementById('resultado');
var input_cao = document.getElementById('input_cao');
var input_gato = document.getElementById('input_gato');
var  input_hospitalizado = document.getElementById('input_hospitalizado');
var input_politraumatismo = document.getElementById('input_politraumatismo');
var formulario_hospitalizado = document.getElementById('formulario_hospitalizado');



function alternarFormularioHospitlaizado() {
    formulario_hospitalizado.classList.toggle('input_hospitalizado_off');
};

function calcular() {
    if (input_peso.value == 0) {
        var tag_total_kcal = 'Preencha o peso';
        tag_resultado.innerHTML = tag_total_kcal;
        
        return null;    //quebra do if
    }

    if (input_cao.checked) {
        var total_kcal = calcularNEB();
        var tag_total_kcal = total_kcal + ' kCal';
    }

    else if (input_gato.checked) {
        var total_kcal = calcularNEMGato();
        var tag_total_kcal = total_kcal + ' kCal';
        }
    
    else {
        tag_total_kcal = 'Selecione a espécie';
        tag_resultado.innerHTML = tag_total_kcal;

        return null;
    };

    if (input_hospitalizado.checked) {
        tag_total_kcal = tag_total_kcal + ' e está hosp';
    };

    tag_resultado.innerHTML = tag_total_kcal;   //adiciona tag final no DOM
};

function calcularNEB() {
    let neb =  70 * (input_peso.value ** 0.75);
    return Math.round(neb);
};

function calcularNEMCao() {
    let neb =  70 * (input_peso.value ** 0.75);
    return Math.round(neb);
};

function calcularNEMGato() {
    let neb =  70 * (input_peso.value ** 0.67);
    return Math.round(neb);
};

