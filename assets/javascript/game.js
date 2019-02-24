//variables for the game
var mainCharacter = 0;
var defender = 0;
var enemy1 = 0;
var enemy2 = 0;
var mainCharacterHP = 0;
var defenderHP = 0;
var attackPower = 8;
var counterAttack1 = 0;

//after the document is ready, load these
$(document).ready(function () {
    //disable attack button
    $('#attack').attr("disabled","disabled");
    //show div for about the game
    $("#about").on("click", function() {
        $("#cover, #aboutDiv").show();
    });
    //hide div for about game
    $("#close").on("click", function() {
        $("#cover, #aboutDiv").hide();
    });
    //on click, run codes inside the function
    $('#character1, #character2, #character3, #character4').click(function () {
        if (mainCharacter && !defender && !enemy1 && !enemy2) {
            for (var i=1;i<=4;i++) {
                if (mainCharacter != i) {
                    $('#character'+i).attr("disabled","disabled");
                    if ($(this).val() == i) {
                        var divToMove = $('#divCharacter'+i).detach();
                        divToMove.appendTo('#row4');
                        defender = i;
                    } else {
                        enemy1 = i;
                        enemy2 = i;
                    }
                }
            }
            $('#attack').removeAttr("disabled");
        }
        if (!mainCharacter && !defender && !enemy1 && !enemy2) {
            for (var i=1;i<=4;i++) {
                if ($(this).val() != i) {
                    var divToMove = $('#divCharacter'+i).detach();
                    divToMove.appendTo('#row2');
                } else {
                    $('#character'+i).attr("disabled","disabled");
                    mainCharacter = i;
                }
            }
        }
    });
});