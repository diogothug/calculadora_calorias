const Ptn_1000_cao_a_min_g = 45;
const Ptn_1000_cao_c_min_g = 56.3;
const Gord_1000_cao_a_min_g = 13.8;
const Gord_1000_cao_c_min_g = 56.3;

const Ca_1000_cao_a_min_g = 1.25;
const Ca_1000_cao_c_min_g = 3;
const Ca_1000_cao_max_g = 4.5;

const Ptn_1000_gato_a_min_g = 65;
const Ptn_1000_gato_c_min_g = 75;
const Gord_1000_gato_a_min_g = 22.5;
const Gord_1000_gato_c_min_g = 22.5;

const Ca_1000_gato_a_min_g = 1.5;
const Ca_1000_gato_c_min_g = 2.5;


const Recovery_Lata_kcal = 255.84;
const Recovery_Lata_g = 195;
const Salute_Ml = 1;
const GI_Lata_kcal = 415;
const GI_Lata_g = 400;


var an_1000kcal_g = {
    porco: 181,
    batatadoce: 325,
    oleodecoco: 13,
    fooddog: 5,
};

var animal = {
    nome: 'Rex_zerado',
    especie: '',
    peso: 0,
    score: 4,
    atividade: 3,
    constante: 110,
    expoente: 0.75,
    NEB: 0,
    NEM: 0,
};





//pegando html em variaveis

var span_pets = document.getElementById('span_pets');

var div_resultado_neb = document.getElementById('resultado_neb');
var article_resultado_neb = document.getElementById('article_neb');
var resultado_instrucoes = document.getElementById('resultado_instrucoes');

var div_resultado_nem = document.getElementById('resultado_nem');
var article_resultado_nem = document.getElementById('article_nem');

var div_resultado_an = document.getElementById('resultado_an');
var article_resultado_an = document.getElementById('article_an');

var div_resultado_macros = document.getElementById('resultado_macros');
var article_resultado_macros = document.getElementById('article_macros');

var input_peso = document.getElementById('input_peso');
var input_cao = document.getElementById('input_cao');
var input_gato = document.getElementById('input_gato');
var input_score = document.getElementById('input_score');
var input_atividade = document.getElementById('input_atividade');

var input_politraumatismo = document.getElementById('input_politraumatismo');
var input_hipofagia = document.getElementById('input_hipofagia');
var formulario_hospitalizado = document.getElementById('formulario_hospitalizado');
var input_emese = document.getElementById('input_emese');


//adicionar div de animal hospitalizado

function alternarFormularioHospitlaizado() {
    if (input_hospitalizado.checked) {
        formulario_hospitalizado.className = 'input_hospitalizado_on';
    }
    else {
        formulario_hospitalizado.className = 'input_hospitalizado_off';
}
};

//adicionar os inputs ao objeto animal

function pegar_input() {

    animal = {
        nome: 'Rex',
        especie: '',
        peso: 0,
        score: 4,
        atividade: 3,
        constante: 110,
        expoente: 0.75,
        NEB: 0,
        NEM: 0,
    };

    animal.peso = parseFloat(input_peso.value);
    animal.score = parseFloat(input_score.value);
    animal.atividade = parseFloat(input_atividade.value);

    if (input_cao.checked) {
        animal.especie = 'cao';
    }

    else if (input_gato.checked) {
        animal.especie = 'gato';
    };    

    if (input_peso.value == '') {
        animal.peso = 0;
    };

    return animal
};

//calculos de calorias

function calcularNEB(animal) {              //calcula NEB usando objeto 'animal'

    animal.NEB =  70 * (animal['peso'] ** 0.75);    //não importa a espécie
    return animal.NEB;

};

function calcularNEMCao(animal) {           //calcula NEM para caes usando objeto 'animal'
    

    if (parseInt(input_score.value) > 3) {       
                           //calculo por score corporal 
        animal.constante = animal.constante - (10 * parseInt(input_score.value)); // está incompleto
    }
    else {

        animal.constante = animal.constante + (30 - (10 * parseInt(input_score.value)));
    };


    animal.NEM =  animal.constante * (animal['peso'] ** 0.75); //calculo final usando const atualizada
    return animal.NEM;
};


//calcular NEM de gato     -    incompleta

function calcularNEMGato(animal) {  //incompleta
    
    if (animal.score > 3) {
        animal.expoente = 0.67;                //muda o expoetnte de gatos obesos
    }

    animal.NEM =  animal.constante * (animal.peso ** animal.expoente);
    
    return animal.NEM;
};


//calcula NEM -- escolhe as funcoes e ordem corretas

function calcularNEM(animal) {

    //   1.escolhe por especie
    if (animal['especie'] == 'cao') {

        animal.NEM = calcularNEMCao(animal);
    } 
    else {

        animal.NEM = calcularNEMGato(animal);
    };

    // 2. ajusta conforme atividade

    if (parseInt(input_atividade.value) > 3) {                          //calculo por atividade
        animal.constante = animal.constante + (10 * parseInt(input_atividade.value)); // está incompleto
    }

    else if (parseInt(input_atividade.value) < 3) {
        animal.constante = animal.constante - (30 - (10 * parseInt(input_atividade.value)));
    };

    return animal.NEM;
};

//calcular rações

function calcularRacoes(animal) {

//recovery lata

    var latas_recovery_neb = (animal.NEB / Recovery_Lata_kcal).toFixed(2);
    var latas_recovery_nem = (animal.NEM / Recovery_Lata_kcal).toFixed(2);
    var g_recovrey_neb = (latas_recovery_neb * Recovery_Lata_g).toFixed(1);
    var g_recovrey_nem = (latas_recovery_nem * Recovery_Lata_g).toFixed(1);

//salute diluido corretamente

    var ml_salute_nem = (animal.NEM).toFixed(1);
    var ml_salute_neb = (animal.NEB).toFixed(1);

//Gastro intestinal lata

    var total_latas_GI_nem = (animal.NEM / GI_Lata_kcal).toFixed(2);
    var total_latas_GI_neb = (animal.NEB / GI_Lata_kcal).toFixed(2);
    var total_g_GI_neb = (total_latas_GI_neb * GI_Lata_g).toFixed(1);
    var total_g_GI_nem = (total_latas_GI_nem * GI_Lata_g).toFixed(1);

//criação da tag HTML para as rações

    var tag_racoes = {
        neb: '<p id="ml_salute_neb">' + ml_salute_neb + 'mL de salute </p><p>'
    + total_latas_GI_neb + ' latas de GI</p><p>' + total_g_GI_neb + 'g de GI</p><p>' + latas_recovery_neb +
    ' latas de recovery</p><p>' + g_recovrey_neb + 'g de recovery</p>',

        nem: '<p id="ml_salute_nem">' + ml_salute_nem + 'mL de salute </p><p>'
    + total_latas_GI_nem + ' latas de GI</p><p>' + total_g_GI_nem + 'g de GI</p><p>' + latas_recovery_nem +
    ' latas de recovery</p><p>' + g_recovrey_nem + 'g de recovery</p>',
    };

    return tag_racoes;
};

//calcula Alimentação natural

function calcularAN(animal) {
    var porco_em_g = ((animal.NEM / 1000) * an_1000kcal_g.porco).toFixed(1);
    var batatadoce_em_g = ((animal.NEM / 1000) * an_1000kcal_g.batatadoce).toFixed(1);
    var oleo_de_coco_em_g = ((animal.NEM / 1000) * an_1000kcal_g.oleodecoco).toFixed(1);
    var fooddog_em_g = ((animal.NEM / 1000) * an_1000kcal_g.fooddog).toFixed(1);

//criação da tag HTML para alimentação natural

    var tag_an = '<h1>Dieta Natural</h1><p id="porco_em_g">' + porco_em_g +
    ' g de carne de porco.</p><p id="batatadoce_em_g">' + batatadoce_em_g +
    'g de batata doce.</p><p id="oleodecoco_em_g">' + oleo_de_coco_em_g +
    'g de óleo de coco.</p><p id="fooddog_em_g">' + fooddog_em_g + 'g de Food Dog Manutenção.</p>';

    return tag_an;
};


// pequena funcao de calculo de macros baseados nas calorias para teste

function calcularMacros(animal) {
    if (animal.especie == 'cao') {
        var ptn_min_neb = ((animal.NEB * Ptn_1000_cao_a_min_g) / 1000).toFixed(2);
        var gord_min_neb = ((animal.NEB * Gord_1000_cao_a_min_g) / 1000).toFixed(2);
        var ca_min_neb = ((animal.NEB * Ca_1000_cao_a_min_g) / 1000).toFixed(2);
    } else {
        var ptn_min_neb = ((animal.NEB * Ptn_1000_gato_a_min_g) / 1000).toFixed(2);
        var gord_min_neb = ((animal.NEB * Gord_1000_gato_a_min_g) / 1000).toFixed(2);
        var ca_min_neb = ((animal.NEB * Ca_1000_gato_a_min_g) / 1000).toFixed(2);
    }

    tag_macros = {
        ptn_min_neb: ptn_min_neb,
        gord_min_neb: gord_min_neb,
        ca_min_neb: ca_min_neb,
    };

    return tag_macros;
};

//funcao chamada pelo HTML

function pegar_dados(animal) {
    pegar_input();                          //pega os inputs
    calcularNEM(animal);                    //calcula o NEM
    calcularNEB(animal);                    //calcula o NEB
    calcularAN(animal);

    //escreve ajudas no dom para completar os inputs

    if (animal.peso == 0) {
        resultado_instrucoes.innerHTML = 'Digite o peso';
        return null;
    };

    if (animal['especie'] == '') {
        resultado_instrucoes.innerHTML = 'Escolha uma espécie';
        return null;
    };

    var racoes_calculadas = calcularRacoes(animal);
    var macros_calculados = calcularMacros(animal);

    var resultado_kcal_neb = parseFloat(animal.NEB);
    resultado_kcal_neb = resultado_kcal_neb.toFixed(1);
    var resultado_kcal_nem = parseFloat(animal.NEM);
    resultado_kcal_nem = resultado_kcal_nem.toFixed(1);

    div_resultado_neb.innerHTML =  `
        <h1>NEB</h1>
        <p> ${resultado_kcal_neb} kCal</p>
        ${racoes_calculadas.neb}`;

    div_resultado_nem.innerHTML = `
        <h1>NEM</h1>
        <p>${resultado_kcal_nem} kCal</p>
        ${racoes_calculadas.nem}`;
    
    div_resultado_macros.innerHTML = `
    <h1>Nutrientes para NEB</h1>
    <p>Mínimo de ${macros_calculados.gord_min_neb}g de gordura.</p>
    <p>Mínimo de ${macros_calculados.ptn_min_neb}g de proteína.</p>
    <p>Mínimo de ${macros_calculados.ca_min_neb}g de Cálcio.</p>`;
    
    div_resultado_an.innerHTML = calcularAN(animal);


    mostrarResultadoNEM();
    return null;
};

//adiciona o resultado no DOM

function mostrarResultadoNEM() {
    article_resultado_nem.className = 'resultado';
    article_resultado_neb.className = 'resultado';
    article_resultado_an.className = 'resultado';
    article_resultado_macros.className = 'resultado';
    resultado_instrucoes.remove();
    if (animal.especie == 'gato') {

        article_resultado_an.className = "superOff";

    }
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