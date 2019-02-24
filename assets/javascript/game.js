//variables for the game
var mainCharacter = 0;
var defender = 0;
var enemy1 = 0;
var enemy2 = 0;
var wins = 0;

var characters = [];
characters[1] = {cName:"Obi-Wan Kenobi",hp:120,ap:8,cap:10,i:"assets/images/Obi.jpg"};
characters[2] = {cName:"Luke Skywalker",hp:100,ap:10,cap:15,i:"assets/images/Luke.jpg"};
characters[3] = {cName:"Darth Sidious",hp:150,ap:12,cap:20,i:"assets/images/Sidious.jpg"};
characters[4] = {cName:"Darth Maul",hp:180,ap:14,cap:25,i:"assets/images/Maul.jpeg"};
//after the document is ready, load these
$(document).ready(function () {
    $("#info1").html("&nbsp;"+characters[1].cName+"<br><img class='image' src='"+characters[1].i+"'>&nbsp;");
    $("#hp1").html("&nbsp;"+characters[1].hp+"&nbsp;");
    $("#info2").html("&nbsp;"+characters[2].cName+"<br><img class='image' src='"+characters[2].i+"'>&nbsp;");
    $("#hp2").html("&nbsp;"+characters[2].hp+"&nbsp;");
    $("#info3").html("&nbsp;"+characters[3].cName+"<br><img class='image' src='"+characters[3].i+"'>&nbsp;");
    $("#hp3").html("&nbsp;"+characters[3].hp+"&nbsp;");
    $("#info4").html("&nbsp;"+characters[4].cName+"<br><img class='image' src='"+characters[4].i+"'>&nbsp;");
    $("#hp4").html("&nbsp;"+characters[4].hp+"&nbsp;");
    //function to restart game
    $("#restart").on("click", function() {
        location.href = "index.html";
    });
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
        if (defender && ($(this).val() == enemy1 || $(this).val() == enemy2)) {
            defender=$(this).val();
        }
        if (mainCharacter && (!defender || (defender && (enemy1==defender || enemy2==defender)))) {
            for (var i=1;i<=4;i++) {
                if (mainCharacter != i) {
                    $('#character'+i).attr("disabled","disabled");
                    if ($(this).val() == i) {
                        var divToMove = $('#divCharacter'+i).detach();
                        divToMove.appendTo('#row4');
                        defender = i;
                    } else {
                        if (!enemy1) {
                            enemy1 = i;
                        } else if (!enemy2) {
                            enemy2 = i;
                        }
                    }
                }
            }
            $('#attack').removeAttr("disabled");
        }
        if (!mainCharacter && !mainCharacter && !defender) {
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
    $("#attack").on("click", function() {
        characters[mainCharacter].ap += characters[mainCharacter].ap;
        characters[mainCharacter].hp-=characters[defender].cap;
        characters[defender].hp-=characters[mainCharacter].ap;
        $("#hp"+mainCharacter).text(characters[mainCharacter].hp);
        $("#hp"+defender).text(characters[defender].hp);
        
        if (characters[mainCharacter].hp<=0) {
            $('#attack').attr("disabled","disabled");
            $('#restart').removeAttr("disabled");
            $("#message").html("Game Over! You lost.");
            alert("Game Over. You lost.");
            return;
        } else if (characters[defender].hp<=0) {
            wins++;
            $('#divCharacter'+defender).remove();
            $('#character'+enemy1).removeAttr("disabled");
            $('#character'+enemy2).removeAttr("disabled");
            $('#attack').attr("disabled","disabled");
            alert(wins);
            if (wins>=3) {
                $('#restart').removeAttr("disabled");
                $("#message").html("Game Over! You won.");
                alert("Game Over! You won.");
            }
        }
        
    });
});