const Recovery_Lata = 255.84;
const G_recovery_Lata = 195;
const Salute_Ml = 1;
const GI_Lata = 415;
const G_GI_Lata = 400;

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
    animal['peso'] = parseFloat(input_peso.value);

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
    animal['NEB'] =  100 * (animal['peso'] ** 0.75);
    return (animal['NEB']).toFixed(2);
};

function calcularNEMCao(animal) {
    animal['NEM'] =  100 * (animal['peso'] ** 0.75);
    return (animal['NEM']).toFixed(2);
};

function calcularNEMGato(animal) {
    animal['NEM'] =  100 * (animal['peso'] ** 0.67);
    return (animal['NEM']).toFixed(2);
};

function calcularRacoes(animal) {
    var latas_recovery_neb = (animal.NEB / Recovery_Lata).toFixed(2);
    var latas_recovery_nem = (animal.NEM / Recovery_Lata).toFixed(2);
    var g_recovrey_neb = (latas_recovery_neb * G_recovery_Lata).toFixed(1);

    var ml_salute_nem = animal.NEM;
    var ml_salute_neb = (animal.NEB).toFixed(2);

    var latas_GI_nem = (animal.NEM / GI_Lata).toFixed(2);
    var latas_GI_neb = (animal.NEB / GI_Lata).toFixed(2);
    var g_GI_neb = (latas_GI_neb * G_GI_Lata).toFixed(1);

    var tag_racoes = '<p id="ml_salute_neb">' + ml_salute_neb + 'mL de salute </p><p>'
    + latas_GI_neb + ' latas de GI</p><p>' + g_GI_neb + 'g de GI<p></p>' + latas_recovery_neb +
    ' latas de recovery</p><p>' + g_recovrey_neb + 'g de recovery</p>';

    return tag_racoes;
};

function calcularNEM(animal) {
    if (animal['especie'] == 'cao') {
        animal.NEM = calcularNEMCao(animal);
    } else {
        animal['NEM'] = calcularNEMGato(animal);
    };

    return animal.NEM;
};

function calcular(animal) {
    pegar_input();
    calcularNEM(animal);
    calcularNEB(animal);

    if (animal['peso'] == 0) {
        tag_resultado.innerHTML = 'Digite o peso';
        return null;
    };

    if (animal['especie'] == '') {
        tag_resultado.innerHTML = 'Escolha uma espécie';
        return null;
    };

    var racoes_calculadas = calcularRacoes(animal);
    var resultado_kcal = parseFloat(animal.NEB);
    resultado_kcal = resultado_kcal.toFixed(1);

    tag_resultado.innerHTML = resultado_kcal + ' kCal <br>' + racoes_calculadas;
    return null;
};

//pop-up teste

function mostrarPopUp() {
    var popup = document.getElementById("popup_id");
    popup.classList.toggle("mostrar");
  }
