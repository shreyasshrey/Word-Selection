window.onload = init;

var pagedata = null;
// var duration = 10;
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const letter_length = 20;
var letter_suffle;
var lifes = 5;
var score = 0;

// variables to display questions,answers and duration
var currQuesNo = 1;

var question;
var answer;
var duration;
var duration_cal;
var box_len;
var total_question;

var arr = [];
var tempArry;
var storeAns;
var correctAnsArr = [];
var getID;
var reqText;
var storedTime = [];
var crtcount = 0;
var wrgcount = 5;

function init() {
    'use strict';
    $('img').on('dragstart', function (event) { event.preventDefault(); });
    window.oncontextmenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };
    $('img').attr('draggable', false);

    $.ajax({
        cache: false,
        dataType: "json",
        url: "./assets/data/data.json",
        success: function (data) {
            // console.log(data);
            pagedata = data.contents;
            total_question = Object.keys(pagedata.questionsList[0]).length;
            // parent.preloadVal = 0;
            // parent.progressLoader();
            start();
            // $('.timer').html(duration);
        },
        error: function (err) {
            console.log("file not loaded");
        }
    });
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function start() {
    // $('.titleSection').append("<div class='row'></div>");
    // $('.row').append("<div class='col'></div>");
    $('.titleSection').append("<h1>" + pagedata.title + ": </h1>");
    $('.titleSection').append("<h2>" + pagedata.name + "</h2>");
    $('.titleSection').append("<h3 class='questCol' id='questCol'></h3>");
    $("#lives").html('0' + lifes);
    $("#score").html('0' + score);
    letter_suffle = shuffle(alphabet);
    loadQuestion(currQuesNo);
}
// $('#play').click(function () {
//     $('.welcomePage').css('display', 'none');
//     $('.container').css('display', 'block');
// $("#lives").html('0' + lifes);
// letter_suffle = shuffle(alphabet);
// loadQuestion(currQuesNo);
// });

function loadQuestion(no) {
    parent.preloadVal = 0;
    parent.progressLoader();

    // display currentQuestion Number and total number of questions
    $('.questCol').html(no + '/' + total_question);

    // to show the attempts
    $('#lives').html('0' + wrgcount);
    if ($('#score') > 9) {
        $('#score').html(score);
    } else {
        $('#score').html('0' + score);
    }


    // loading the question from JSON

    for (let i = 0; i < pagedata.questionsList.length; i++) {
        question = pagedata.questionsList[i]["question" + no].question;
        answer = pagedata.questionsList[i]["question" + no].answer;
        duration = pagedata.questionsList[i]["question" + no].duration;
        duration_cal = pagedata.questionsList[i]["question" + no].duration;
        // total_question = Object.keys(pagedata.questionsList[i]).length;
    }

    timer();
    str = [];
    lengthAnsArry = [];
    $(".keyboard").html('');
    // $(".lives").html('');
    $(".question").html(question);
    $(".keyboard").css('visibility', 'visible');
    str = answer;
    arr = str;
    // storing the answer in storeAns variable
    storeAns = pagedata.questionsList[0]["question" + no].answer.toString();

    tempArry = pagedata.questionsList[0]["question" + no].answer.toString();
    tempArry = tempArry.split(',');
    box_len = tempArry.length;

    var fifteenArry = [];

    for (let i = 0; i < letter_length; i++) {
        fifteenArry.push(letter_suffle[i]);
    }
    var abc = [];

    for (let index = 0; index < str.length; index++) {
        lengthAnsArry.push(index);
    }
    lengthAnsArry = shuffle(lengthAnsArry);

    for (let index = 0; index < str.length; index++) {
        fifteenArry[lengthAnsArry[index]] = str[index];
        abc.push(fifteenArry[lengthAnsArry[index]]);
    }
    // console.log('before shuffle' + abc);
    shuffle(fifteenArry);
    // console.log('after shuffle' + (fifteenArry));
    for (let i = 0; i < letter_length; i++) {
        $('.keyboard').append("<p class='options' id=txt_" + fifteenArry[i] + ">" + fifteenArry[i] + "</p>")
    }

    for (let i = 0; i < box_len; i++) {
        $('.correct').append("<p class='ansbar'id=text_" + i + "><span class='ans_area' id=txt_" + i + " >" + arr[i] + "</span></p>");
        // $('#txt_0').html(arr[0]);
        $('#txt_' + i).html("?");
        // remove_text = arr.splice(i, 1);
        // $('#txt_0').css('visibility', 'visible');
        // value = document.getElementById(arr[i]);
        // correctAnsArr.push(arr[i]);
    };

    $('.options').click(function () {
        getID = $(this).attr('id');
        reqText = getID.replace("txt_", "");
        var index = arr.indexOf(reqText);
        var idIndex = tempArry.indexOf(reqText);
        indices = [];
        while (idIndex != -1) {
            indices.push(idIndex);
            idIndex = tempArry.indexOf(reqText, idIndex + 1);
        }
        if (index > -1) {
            for (let i = 0; i < indices.length; i++) {
                if (!$("#text_" + indices[i]).hasClass("crt_select")) {
                    // $("#txt_" + indices[index]).css("color", "black").addClass("crt_select");
                    // $('#txt_' + index).html(reqText);
                    for (let j = 0; j < tempArry.length; j++) {
                        if (reqText == tempArry[j]) {
                            $('#text_' + j).html(reqText);
                            for (let m = 0; m < indices.length; m++) {
                                $("#text_" + indices[m]).addClass("crt_select");
                            }
                            crtcount++;
                        }
                    }
                    break;
                }
            }
            // for (let j = 0; j < tempArry.length; j++) {
            //     if (reqText == tempArry[j]) {
            //         $('#txt_' + j).html(reqText);
            //     }
            // }
            // remove_text = arr.splice(index, 1);
            // correct(click, count_img);
        } else {
            $(this).css("visibility", "hidden");
            wrgcount--;
            $('#lives').html('0' + wrgcount);
        }
        if (crtcount == tempArry.length) {
            // for (var i = 0; i < answer.length; i++) {
            //     $('#text_' + i).remove();
            // }
            currQuesNo++;
            feedbackFun();
            // storedTime.push(duration_cal - duration);
            // clearInterval(interval);
            // console.log(storedTime);
            // $('.nxtQuesModal').css('display', 'block');
            // $('.options').css({ 'pointer-events': 'none', 'cursor': 'default' });
        } else if (wrgcount == 0) {
            feedbackFun();
        }
    });
}

function feedbackFun() {
    $('.options').css({ 'pointer-events': 'none', 'cursor': 'default' });
    storedTime.push(duration_cal - duration);
    clearInterval(interval);
    $('.container').css('opacity', '0.2');
    if (wrgcount === 0) {
        $('.wrongModal').css('display', 'block');
        $('.modal-header').css('background-color', '#f36a6a');
        $('.feedbacktext').html("Feedback");
        $('.modal-body').append("<h1 class='wrongMsg'></h1>");
        $('.wrongMsg').html("Better Luck Next Time").css('text-align', 'center');
        // $('.modal-body').append("<div class='modalCurrQuesAns'>" + storeAns.split(',') + "</div>");
    } else if (duration === 0) {
        $('.feedbackModal').css('display', 'block');
        $('.modal-header').css('background-color', '#f36a6a');
        $('.feedbacktext').html("Feedback");
        $('.modal-body').append("<h1 class='modalMsg'></h1>");
        $('.modalMsg').html("Time's up").css('text-align', 'center');
    } else if (crtcount === tempArry.length) {
        crtcount = 0;
        $('.nxtQuesModal').css('display', 'block');
        $('.modal-header').css('background-color', '#64c264');
        $('.modal-body').append("<h1 class='correctMsg'></h1>");
        $('.correctMsg').html("You Passed this Question").css('text-align', 'center');
    }
}

$('#next').click(function () {
    score++;
    for (var bgclr = 0; bgclr < answer.length; bgclr++) {
        $("#txt_" + bgclr).removeClass("crt_select");
        $('#text_' + bgclr).remove();
    }
    $('.correctMsg').remove();
    $('.nxtQuesModal').css('display', 'none');
    $('.container').css('opacity', '1');
    loadQuestion(currQuesNo);
});

$('#home').click(function () {
    window.location.href = ('../../landPage/intro.html');
});

$('#wrongnext').click(function () {
    wrgcount--;
    if (wrgcount === 0) {
        $('.modalMsg').remove();
        $('.feedbackModal').css('display', 'none');
        feedbackFun();
    } else {
        currQuesNo++;
        crtcount = 0;
        for (var bgclr = 0; bgclr < answer.length; bgclr++) {
            $("#txt_" + bgclr).removeClass("crt_select");
            $('#text_' + bgclr).remove();
        }
        $('.modalMsg').remove();
        $('.feedbackModal').css('display', 'none');
        $('.container').css('opacity', '1');
        loadQuestion(currQuesNo);
    }
});

$('#playagain').click(function () {
    $('.wrongMsg').remove();
    $('.feedbackModal').css('display', 'none');
    $('.container').css('opacity', '1');
    $('.options').remove();
    $('.ansbar').remove();
    $('.questCol').remove();
    $('h1,h2').remove();
    $("#lives").html('00');
    $("#score").html('00');
    $(".keyboard").html('');
    $(".question").html('');
    lifes = 5;
    score = 0;
    currQuesNo = 1;
    arr = [];
    str = [];
    lengthAnsArry = [];
    question = '';
    answer = '';
    duration = '';
    correctAnsArr = [];
    arr = [];
    tempArry = '';
    storeAns = '';
    getID = '';
    reqText = '';
    storedTime = [];
    crtcount = 0;
    wrgcount = 5;
    start();
});

function timer() {
    interval = setInterval(function () {
        $('.timer').html(duration);
        duration--;
        // debugger
        if (duration === 0) {
            storedTime.push(duration_cal - duration);
            clearInterval(interval);
            // clearElements();
            $('.timer').html('1');
            interval = setInterval(function () {
                $('.timer').html('0');
                feedbackFun();
            }, 1000);
            // alert('Time Out');
            // $(".time_comp").html("Time Completed");
            // $(".options").css('pointer-events', 'none').css('cursor', 'default');
            // $('#reset,#show_ans,#next').css('display', 'block');
            // parent.resizeIframe();
            // $('#time_text').html("Time Completed For The Question" + "-" + questionNo + " : " + question);
            // $("#Time_completed").modal("show");
        }
    }, 1000);
};

// function randomSelectionNum(min, max) {
//     var randomNum;
//     randomNum = Math.random() * (max - min) + min;
//     return Math.floor(randomNum);
// }

// submitButton.addEventListener('click', showResults);

// function showResults() {
//     console.log('abcd');
// }
// document.write("Random Number between 1 and 100: ")
