var animal = {
    nome: 'tupac',
    especie: '',
    NEB: 0,
};
var input_peso = document.getElementById('input_peso');
var tag_resultado = document.getElementById('resultado');
var input_cao = document.getElementById('input_cao');
var input_gato = document.getElementById('input_gato');
var input_hospitalizado = document.getElementById('input_hospitalizado');
var input_politraumatismo = document.getElementById('input_politraumatismo');
var input_hipofagia = document.getElementById('input_hipofagia');
var formulario_hospitalizado = document.getElementById('formulario_hospitalizado');
var input_emese = document.getElementById('input_emese');



function alternarFormularioHospitlaizado() {
    if (input_hospitalizado.checked) {
        formulario_hospitalizado.className = 'input_hospitalizado_on';
    }
    else {
        formulario_hospitalizado.className = 'input_hospitalizado_off';
}
};

function pegar_input() {
    animal['peso'] = parseInt(input_peso.value);

    if (input_cao.checked) {
        animal['especie'] = 'cao';
    }

    else if (input_gato.checked) {
        animal['especie'] = 'gato';
    };

    if (input_hospitalizado.checked) {
        animal['hospitalizado'] = true;
    }
    else {
        animal['hospitalizado'] = false;
    };    

    if (input_hipofagia.checked) {
        animal['hipofagia'] = true;
    }
    else {
        animal['hipofagia'] = false;
    };

    if (input_emese.checked){
        animal['emese'] = true;
    }
    else {
        animal['emese'] = false;
    };

    return animal
};

function calcularNEB(animal) {
    animal['NEB'] =  70 * (animal['peso'] ** 0.75);
    return Math.round(animal['NEB']);
};

function calcularNEMCao(animal) {
    animal['NEM'] =  70 * (animal['peso'] ** 0.75);
    return Math.round(animal['NEM']);
};

function calcularNEMGato(animal) {
    animal['NEM'] =  70 * (animal['peso'] ** 0.67);
    return Math.round(animal['NEM']);
};

function calcularRacoes(animal) {
    
};

function calcularNEM(animal) {
    if (animal['especie'] == 'cao') {
        animal['NEM'] = calcularNEMCao(animal);
    } else {
        animal['NEM'] = calcularNEMGato(animal);
    };

    return animal['NEM'];
};

function calcular(animal) {
    calcularNEM(pegar_input());
    animal['NEB'] = calcularNEB(animal);
    tag_resultado.innerHTML = animal['NEB'] + ' kCal';
};
