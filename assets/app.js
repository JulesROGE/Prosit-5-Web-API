
const url = (postal) => `https://geo.api.gouv.fr/communes?codePostal=${postal}&fields=nom,code,codesPostaux,codeDepartement,region&format=json&geometry=centre`

//-----Afficher-----

function afficher() {
    $(".gif").css("display", "block")
}

function cacher() {
    $(".gif").css("display", "none")
}

$(document).ready(() => {

    //-----CGV-----

    document.getElementById("valider").disabled = true;

    $('.cgv').click(function () {
        if ($('.cgv:checked').length == 1) {
            document.getElementById("valider").disabled = false;
        }
    })

    $('.cgv').click(function () {
        if ($('.cgv:checked').length == 0) {
            document.getElementById("valider").disabled = true;
        }
    })

    //-----Remplissage ville-----

    $("#cp").on("input", (event) => {
        if (event.target.value.length == 5) {
            $.get(url(event.target.value), (data) => {
                $("#ville").empty()
                data.map((val) => {
                    $("#ville").append(`<option>${val.nom}</option>`)
                    $("#region").val(val.region.nom)
                })
            })
        }
        else {
            $("#ville").empty()
            $("#ville").append(`<option selected>...</option>`)
            $("#region").val(`...`)
        }
    })

});