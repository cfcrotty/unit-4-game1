//variables for the game
var mainCharacter = 0;
var defender = 0;
var enemy1 = 0;
var enemy2 = 0;
var wins = 0;
var gameOver = 0;
var lastEnemy = 0;
var mainAP = 0;

var characters = []; //hp=health points, ap=attack power, cap=counter attack power, i=image
characters[1] = {cName:"Obi-Wan Kenobi",hp:120,ap:8,cap:10,i:"assets/images/Obi.jpg"};
characters[2] = {cName:"Luke Skywalker",hp:100,ap:12,cap:5,i:"assets/images/Luke.jpg"};
characters[3] = {cName:"Darth Sidious",hp:150,ap:4,cap:20,i:"assets/images/Sidious.jpg"};
characters[4] = {cName:"Darth Maul",hp:180,ap:2,cap:25,i:"assets/images/Maul.jpeg"};
//after the document is ready, load these
$(document).ready(function () {
    

    function loadSong(flag) {
        var audioToPlay = "assets/audio/LightsaberOn.mp3";
        if (flag==0) audioToPlay = "assets/audio/SadTrombone.mp3";
        else if (flag==1) audioToPlay = "assets/audio/Applause.mp3";
        var audio = new Audio(audioToPlay);
        audio.play();
    }
    
    //insert character information like name and health points
    for (var i=1;i<=4;i++) {
        $("#info"+i).html("&nbsp;"+characters[i].cName+"<br><img class='image' src='"+characters[i].i+"'>&nbsp;");
        $("#hp"+i).html("&nbsp;"+characters[i].hp+"&nbsp;");
    }
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
    //on click of each character, run codes inside the function
    $('#character1, #character2, #character3, #character4').click(function () {
        if (gameOver) return;
        if (defender && ($(this).val() == enemy1 || $(this).val() == enemy2)) {
            defender=$(this).val();
        }
        if (mainCharacter && (!defender || (defender && (enemy1==defender || enemy2==defender)))) {
            for (var i=1;i<=4;i++) {
                if (mainCharacter != i) {
                    $('#character'+i).attr("disabled","disabled");
                    if ($(this).val() == i) {
                        lastEnemy++;
                        var divToMove = $('#divCharacter'+i).detach();
                        divToMove.appendTo('#row4');
                        $("#character"+i).toggleClass('btn-danger btn-success');
                        defender = i;
                        $("#divCharacter"+i).toggleClass('col-md-4 col-md-12');
                        if (lastEnemy>=3) {
                            $("#divCharacter"+i).toggleClass('col-md-4 col-md-12');
                        }
                    } else {
                        if (!enemy1) {
                            enemy1 = i;
                            $("#divCharacter"+i).toggleClass('col-md-4 col-md-6');
                        } else if (!enemy2) {
                            enemy2 = i;
                            $("#divCharacter"+i).toggleClass('col-md-4 col-md-6');
                        } else {
                            $("#divCharacter"+i).toggleClass('col-md-6 col-md-12');
                        }
                        
                    }
                }
            }
            $("#message1").hide();
            $('#attack').removeAttr("disabled");
        }
        if (!mainCharacter && !mainCharacter && !defender) {
            for (var i=1;i<=4;i++) {
                if ($(this).val() != i) {
                    var divToMove = $('#divCharacter'+i).detach();
                    divToMove.appendTo('#row2');
                    $("#character"+i).toggleClass('btn-success btn-danger');
                    $("#divCharacter"+i).toggleClass('col-md-3 col-md-4');
                } else {
                    $('#character'+i).attr("disabled","disabled");
                    mainCharacter = i;
                    $("#divCharacter"+i).toggleClass('col-md-3 col-md-12');
                    $("#message1").html("Please select an opponent.");
                }
            }
        }
    });
    //on click of attack button, run codes inside the function
    $("#attack").on("click", function() {
        if (gameOver) return;
        mainAP += characters[mainCharacter].ap;
        characters[defender].hp-=mainAP;
        if (characters[defender].hp<=0) {
            $("#message1").html("Please select an opponent.");
            $("#message1").show();
            wins++;
            $("#attackInfo1").hide();
            $("#attackInfo2").hide();
            $('#divCharacter'+defender).remove();
            $('#character'+enemy1).removeAttr("disabled");
            $('#character'+enemy2).removeAttr("disabled");
            $('#attack').attr("disabled","disabled");
            if (wins>=3) {
                loadSong (1);
                gameOver++;
                $("#message1").hide();
                $('#restart').removeAttr("disabled");
                $("#message").html("Game Over! You won.");
                alert("Game Over! You won.");
            }
            return;
        } else if (characters[mainCharacter].hp<=0) {
            loadSong (0);
            gameOver++;
            $("#message1").hide();
            $('#attack').attr("disabled","disabled");
            $('#restart').removeAttr("disabled");
            $("#message").html("Game Over! You lost.");
            alert("Game Over. You lost.");
            return;
        }
        loadSong();
        characters[mainCharacter].hp-=characters[defender].cap;
        $("#hp"+mainCharacter).text(characters[mainCharacter].hp);
        $("#hp"+defender).text(characters[defender].hp);
        $("#attackInfo1").html("You attacked "+characters[defender].cName+" for "+mainAP+" damage.");
        $("#attackInfo2").html(characters[defender].cName+" attacked you back for "+characters[defender].cap+" damage.");
        $("#attackInfo1").show();
        $("#attackInfo2").show();
    });
});