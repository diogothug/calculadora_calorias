var cao_jovem;
var cao_filhote = {
    "proteinas":{
        "total_ptn": 62.5,
        "arginina": 2.04,
        "histidina": 0.98,
        "Isoleucina": 1.63,
        "leucina": 3.23,
        "lisina": 2.2,
        "metionina": 0.88,
        "metionina+cistina": 2.21,
        "fenilalanina": 1.63,
        "fenilalanina+tirosina": 3.25,
        "treonina": 2.03,
        "triptofano": 0.58,
        "valina": 1.7
    },

    "gorduras":{
        "total": 21.25,
        "ácido linoleico": 3.25,
        "ácido aracdônico": 0.075,
        "ácido alfalinoleico": 0.2,
        "EPA+DHA": 0.13
    },

    "carboidratos":{
        "total": 0
    },

    "minerais": {
        "cálcio": 4,
        "fósforo": 2.25,
        "cálcio/fósforo": 1.6,
        "potássio": 1.1,
        "sódio": 0.55,
        "cloro": 0.83,
        "magnésio": 0.1,
        "microminerais": {
            "cobre": 2.75,
            "iodo": 0.38,
            "ferro": 22,
            "manganês": 1.4,
            "selênio": 0.1,
            "zinco": 25
        }
    },

    "vitaminas": {
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
    }

};

var cao_adulto = {
    "proteinas":{
        "total_ptn": 52,
        "arginina": 1.51,
        "histidina": 0.67,
        "Isoleucina": 1.33,
        "leucina": 2.37,
        "lisina": 1.22,
        "metionina": 1.16,
        "metionina+cistina": 2.21,
        "fenilalanina": 1.56,
        "fenilalanina+tirosina": 2.58,
        "treonina": 1.51,
        "triptofano": 0.49,
        "valina": 1.71
    },

    "gorduras":{
        "total_gord": 13.75,
        "ácido linoleico": 3.82,
        "ácido aracdônico": 0,
        "ácido alfalinoleico": 0,
        "EPA+DHA": 0
    },

    "carboidratos":{
        "total_carb": 0
    },

    "minerais": {
        "cálcio": 1.45,
        "fósforo": 1.16,
        "cálcio/fósforo": 1,
        "potássio": 1.45,
        "sódio": 0.29,
        "cloro": 0.43,
        "magnésio": 0.2,
        "microminerais": {
            "cobre": 2.08,
            "iodo": 0.3,
            "fero": 10.4,
            "manganês": 1.67,
            "selênio": 87,
            "zinco": 20.8
        }
    },

    "vitaminas": {
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
    }

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
    var tag;
    var temp_tag;
    for (const key in objeto) {

        if (eh_obejto(objeto[key])) {
            keys_para_lista_html(objeto[key]);
        }
        else {
            document.write(' <li>' + key + '</li>');
            console.log(key);
        }
    }
};

//pega objetos e separa as keys nao aninhadas

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

//cria um objeto com as nescessidades de macros
//calculadas conforme as calorias

const calcula_macros = (animal) => {
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
};
