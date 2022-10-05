var animalzinho = {
    nome: 'Rex_zerado',
    idade: 6,
    especie: '',
    peso: 0,
    score: 4,
    atividade: 3,
    constante: 110,
    expoente: 0.75,
    NEB: 100,
    NEM: 150,
};


var cao_jovem;

var cao_filhote = {
    "total_ptn": 62.5,
    "arginina": 2.04,
    "histidina": 0.98,
    "isoleucina": 1.63,
    "leucina": 3.23,
    "lisina": 2.2,
    "metionina": 0.88,
    "metionina+cistina": 2.21,
    "fenilalanina": 1.63,
    "fenilalanina+tirosina": 3.25,
    "treonina": 2.03,
    "triptofano": 0.58,
    "valina": 1.7,
    "total_gord": 21.25,
    "ácido linoleico": 3.25,
    "ácido aracdônico": 0.075,
    "ácido alfalinoleico": 0.2,
    "EPA+DHA": 0.13,
    "total_carb": 0,
    "cálcio": 4,
    "fósforo": 2.25,
    "cálcio/fósforo": 1.6,
    "potássio": 1.1,
    "sódio": 0.55,
    "cloro": 0.83,
    "magnésio": 0.1,
    "cobre": 2.75,
    "iodo": 0.38,
    "ferro": 22,
    "manganês": 1.4,
    "selênio": 0.1,
    "zinco": 25,
    "a_ui": null,
    "d_ui": null,
    "e_ui": null,
    "e_mg": null,
    "c_mg": null,
    "b1_mg": null,
    "b2_mg": null,
    "b3_mcg": null,
    "b5_mg": null,
    "b6_mg": null,
    "b7_mcg": null,
    "b8_mg": null,
    "b9_mcg": null,
    "b12_mcg": null,
    "k_mcg": null
};

var cao_adulto = {
    "total_ptn": 52,
    "arginina": 1.51,
    "histidina": 0.67,
    "isoleucina": 1.33,
    "leucina": 2.37,
    "lisina": 1.22,
    "metionina": 1.16,
    "metionina+cistina": 2.21,
    "fenilalanina": 1.56,
    "fenilalanina+tirosina": 2.58,
    "treonina": 1.51,
    "triptofano": 0.49,
    "valina": 1.71,
    "total_gord": 13.75,
    "ácido linoleico": 3.82,
    "ácido aracdônico": 0,
    "ácido alfalinoleico": 0,
    "epa+dha": 0,
    "total_carb": 0,
    "cálcio": 1.45,
    "fósforo": 1.16,
    "cálcio/fósforo": 1,
    "potássio": 1.45,
    "sódio": 0.29,
    "cloro": 0.43,
    "magnésio": 0.2,
    "cobre": 2.08,
    "iodo": 0.3,
    "ferro": 10.4,
    "manganês": 1.67,
    "selênio": 87,
    "zinco": 20.8,
    "a_ui": null,
    "d_ui": null,
    "e_ui": null,
    "e_mg": null,
    "c": null,
    "b1_mg": null,
    "b2_mg": null,
    "b3_mcg": null,
    "b5_mg": null,
    "b6_mg": null,
    "b7_mcg": null,
    "b8_mg": null,
    "b9_mcg": null,
    "b12_mcg": null,
    "k_mcg": null
};

//funcao para saber se é objeto

const eh_obejto = (val) => {
    if ( val === null) {
        return false;
    }

    return typeof val ==='object';
};

//pega todas as keys de um objeto e transforma numa lista html

const keys_para_lista_html = (objeto) => {
    
    for (const key in objeto) {

        if (eh_obejto(objeto[key])) {
            keys_para_lista_html(objeto[key]);
        }
        else {    //formatações

            if (key.includes('total')) {

                continue;
            }

            else if (key.includes('_')) {

                var key_nova = key.split('_');
                key_nova = key_nova[0];
            }

            else if (key.includes('+')) {

                key_nova = key.replace('+', ' + ');

            }

            else {

                key_nova = key;
            };

// deica o primeira letra maiuscula
        key_nova = key_nova.charAt(0).toUpperCase() + key_nova.slice(1); 

        if (key_nova.length < 4) {     //deixa as vitaminas maiusculas

            key_nova = key_nova.toUpperCase();
        }

            document.write(' <li>' + key_nova + '</li>');  //escre a tag com o titulo 'key'
        };
    };
};

//pega objetos e separa as keys nao aninhadas - serve para pegar os macros

const escreve_os_grupos_nutrientes = (objeto) =>{

    document.write(' | |  | ')
    for (const key in cao_adulto) {
        if (Object.prototype.hasOwnProperty.call(cao_adulto, key)) {
            const element = cao_adulto[key];
            
        }
        document.write(key);
        document.write(' | |  | ')
    }
};

//escolhe dicionario de nutrientens baseado na idade

//incompleta

const adiciona_dic_nutrientes = (animal) => {

//escolhe o perfil baseado na idade e estagio de reproducao
    if (animal.idade > 3) {
        animal.dic_nutrientes = cao_adulto;
    }
    else if (animal.idade <= 3 && animal.idade > 1) {
        animal.dic_nutrientes = cao_jovem;
    }
    else {
        animal.dic_nutrientes = cao_filhote;
    };
}

//multiplica a nescessidade pela total em 1000kcl
const calcula_total_em_mil_kcal = (valor, nem) => {
    return valor * nem / 1000;
}

 // adicona um dicionario com os nutrientres calculados vaseados nas calorias
const calcula_dicionario_nutrientes = (animal) => {
    animal.dic_nutrientes_calculado = {
        ...animal.dic_nutrientes
    }

    for (const key in animal.dic_nutrientes_calculado) {
        animal.dic_nutrientes_calculado[key] = 
        calcula_total_em_mil_kcal(animal.dic_nutrientes_calculado[key], animal.NEM);
    }
};


adiciona_dic_nutrientes(animalzinho);
calcula_dicionario_nutrientes(animalzinho);