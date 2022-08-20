const Recovery_Lata = 255.84;
const Salute_Ml = 1;
const GI_Lata = 415;

var animal = {
    nome: 'tupac',
    especie: '',
    NEB: 0,
    peso: 0,
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

    if (input_peso.value == '') {
        animal['peso'] = 0;
    };

    return animal
};

function calcularNEB(animal) {
    animal['NEB'] =  70 * (animal['peso'] ** 0.75);
    return (animal['NEB']).toFixed(1);
};

function calcularNEMCao(animal) {
    animal['NEM'] =  100 * (animal['peso'] ** 0.75);
    return (animal['NEM']).toFixed(1);
};

function calcularNEMGato(animal) {
    animal['NEM'] =  70 * (animal['peso'] ** 0.67);
    return (animal['NEM']).toFixed(1);
};

function calcularRacoes(animal) {
    latas_recovery_neb = (animal.NEB / Recovery_Lata).toFixed(1);
    latas_recovery_nem = (animal.NEM / Recovery_Lata).toFixed(1);

    ml_salute_nem = animal.NEM;
    ml_salute_neb = animal.NEB.toFixed(1);

    latas_GI_nem = (animal.NEM / GI_Lata).toFixed(1);
    latas_GI_neb = (animal.NEB / GI_Lata).toFixed(1);

    tag_racoes = '<p>' + ml_salute_nem + ' mL de salute </p><p> ' + latas_recovery_nem 
    + ' latas de recovery</p><p>' + latas_GI_nem + ' latas GI</p>';

    return tag_racoes;
};

function calcularNEM(animal) {
    if (animal['especie'] == 'cao') {
        animal.NEM = calcularNEMCao(animal);
    } else {
        animal['NEM'] = calcularNEMGato(animal);
    };

    return animal['NEM'];
};

function calcular(animal) {
    pegar_input();
    calcularNEM(animal);
    calcularNEB(animal);

    if (animal['peso'] == 0) {
        tag_resultado.innerHTML = 'Escolha o peso';
        return null;
    }

    if (animal['especie'] == '') {
        tag_resultado.innerHTML = 'Escolha a espécie';
        return null;
    };

    var latas = calcularRacoes(animal);
    resultado_kcal = animal.NEM;

    tag_resultado.innerHTML = resultado_kcal + ' kCal <br>' + latas;
    return null;
};
