window.onload = init; // initialize on load


// variables to store JSON Data

var catData;
var totalCat;

// variables to store category data

var getID;
var replaceTxt;
var getValue;

function init() {
    'use strict';
    $('img').on('dragstart', function (event) { event.preventDefault(); });
    window.oncontextmenu = function (event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };
    $('img').attr('draggable', false);
    var pgname = (document.location.pathname.match(/[^\/]+$/)[0]).replace(".html", "");
    // console.log(pgname);
    parent.progressLoader();

    $.ajax({
        dataType: "json",
        url: "assets/data/" + pgname + ".json",
        success: function (data) {
            parent.pagedata = data.content;
            catData = parent.pagedata.list;
            totalCat = Object.keys(catData).length;
            $('.welcomePage').css('display', 'block');
            // console.log(pagedata);
            // parent.preloadVal = 0;
            // parent.progressLoader();
            // if (parent.lang != undefined) {
            //     updatelang(parent.lang);
            // }
            // for (let index = 0; index < parent.pageStatus.length; index++) {
            //     var topicName = Object.keys(parent.pageStatus[index]);
            //     if (parent.pageStatus[index][topicName[0]].status == "COMPLETED") {
            //         $('.tiles[data-topic="' + topicName[0] + '"] .completed').css("visibility", "visible");
            //     }
            // }
        }
    });
}

$('#play').click(function () {
    $('.welcomePage').css('display', 'none');
    $('.catSection').css('display', 'block');
    action();
});

function action() {
    $('.category').append("<h1 class='title'>" + parent.pagedata.title + "</h1");
    // $('.row').append("<div class='col'></div");
    // $('.col').append("<div class='category'></div");
    for (var i = 0; i < totalCat; i++) {
        $('.category').append("<div class='catCard' id=cat_" + i + ">" + catData[i]['category' + (i + 1)] + "</div>");
    }
    $('.catCard').css({ 'cursor': 'pointer', 'pointer-events': 'auto' });

    $('.catCard').click(function () {
        getID = $(this).attr('id');
        replaceTxt = getID.replace("cat_", "");
        for (var j = 0; j < totalCat; j++) {
            if (replaceTxt == j) {
                getValue = catData[j]['category' + (j + 1)].toLowerCase().replace(" ", "");
                window.location.href = ('../categories/' + getValue + '/' + getValue + '.html');
                // window.location.href = ('../categories/' + getValue + '/' + getValue + '.html');
                // getValue.toLowerCase();
            }
        }
        // alert(replaceTxt);
        // $('.welcomePage').css('display', 'none');
        // $('.catSection').css('display', 'block');
        // action();
    })
}
