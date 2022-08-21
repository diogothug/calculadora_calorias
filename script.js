const Recovery_Lata = 255.84;
const G_recovery_Lata = 195;
const Salute_Ml = 1;
const GI_Lata = 415;
const G_GI_Lata = 400;

var animal = {
    nome: 'Rex',
    especie: '',
    NEB: 0,
    peso: 0,
};

var span_pets = document.getElementById('span_pets');

var input_peso = document.getElementById('input_peso');
var div_resultado_neb = document.getElementById('resultado_neb');
var article_resultado_neb = document.getElementById('article_neb');
var div_resultado_nem = document.getElementById('resultado_nem');
var article_resultado_nem = document.getElementById('article_nem');
var input_cao = document.getElementById('input_cao');
var input_gato = document.getElementById('input_gato');
var input_score = document.getElementById('input_score');
var input_atividade = document.getElementById('input_atividade');

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
    var constante = 130;

    if (parseInt(input_score.value) > 3) {                          //calculo por score corporal
        constante = constante - (10 * parseInt(input_score.value));
    }
    else {
        constante = constante + (30 - (10 * parseInt(input_score.value)));
    };

    if (parseInt(input_atividade.value) > 3) {                          //calculo por atividade
        constante = constante + (10 * parseInt(input_atividade.value));
    }

    else if (parseInt(input_atividade.value) < 3) {
        constante = constante - (30 - (10 * parseInt(input_atividade.value)));
    };


    animal['NEM'] =  constante * (animal['peso'] ** 0.75);
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
    var g_recovrey_nem = (latas_recovery_nem * G_recovery_Lata).toFixed(1);

    var ml_salute_nem = animal.NEM;
    var ml_salute_neb = (animal.NEB).toFixed(2);

    var latas_GI_nem = (animal.NEM / GI_Lata).toFixed(2);
    var latas_GI_neb = (animal.NEB / GI_Lata).toFixed(2);
    var g_GI_neb = (latas_GI_neb * G_GI_Lata).toFixed(1);
    var g_GI_nem = (latas_GI_nem * G_GI_Lata).toFixed(1);

    var tag_racoes = {
        neb: '<p id="ml_salute_neb">' + ml_salute_neb + 'mL de salute </p><p>'
    + latas_GI_neb + ' latas de GI</p><p>' + g_GI_neb + 'g de GI<p></p>' + latas_recovery_neb +
    ' latas de recovery</p><p>' + g_recovrey_neb + 'g de recovery</p>',

        nem: '<p id="ml_salute_nem">' + ml_salute_nem + 'mL de salute </p><p>'
    + latas_GI_nem + ' latas de GI</p><p>' + g_GI_nem + 'g de GI<p></p>' + latas_recovery_nem +
    ' latas de recovery</p><p>' + g_recovrey_nem + 'g de recovery</p>',
}

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
    mudarTituloPets(animal);

    if (animal['peso'] == 0) {
        div_resultado_neb.innerHTML = 'Digite o peso';
        return null;
    };

    if (animal['especie'] == '') {
        div_resultado_neb.innerHTML = 'Escolha uma espécie';
        return null;
    };

    var racoes_calculadas = calcularRacoes(animal);

    var resultado_kcal_neb = parseFloat(animal.NEB);
    resultado_kcal_neb = resultado_kcal_neb.toFixed(1);
    var resultado_kcal_nem = parseFloat(animal.NEM);
    resultado_kcal_nem = resultado_kcal_nem.toFixed(1);

    div_resultado_neb.innerHTML = '<h1>NEB</h1>' + resultado_kcal_neb +
    ' kCal (NEB) <br>' + racoes_calculadas.neb;

    div_resultado_nem.innerHTML = '<h1>NEM</h1>' + resultado_kcal_nem +
    ' kCal (NEM)' + racoes_calculadas.nem;


    mostrarResultadoNEM();
    return null;
};

function mostrarResultadoNEM() {
    article_resultado_nem.className = 'div_resultados';
};

//mudar titulo de pets para cao ou gato

function mudarTituloPets(animal) {
    span_pets.className = 'waviy';
    if (animal.especie == 'cao') {
        span_pets.innerHTML = '<span style="--i:1">C</span><span style="--i:2">ã</span>'
    + '<span style="--i:3">o</span>.';
    }
    else if(animal.especie == 'gato') {
        span_pets.innerHTML = '<span style="--i:1">G</span><span style="--i:2">a</span>'
    + '<span style="--i:3">t</span><span style="--i:4">o</span>.';
    }

};

//pop-up teste

function mostrarPopUp() {
    var popup = document.getElementById("popup_id");
    popup.classList.toggle("mostrar");
};