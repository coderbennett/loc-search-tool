var resultsFormEl = $('#resultsForm');
var textInputEl = $('#TextInput');
var selectInputEl = $('#Select');
var resultsSectionEl = $('#resultSection');
var backBtnEl = $("#backBtn");
//link api
//var requestUrl = ;

// <!-- section for the search results- DONE VIA JAVASCRIPT(Lines 18-22) -->
//         <!-- contains div with- show 10 results -->
//         <!-- h2 -->
//         <!-- date-->
//         <!--subjects -->
//         <!-- description -->
//         <!-- read more-link to article -->
function populateResults(text, format) {
    var requestUrl = "https://www.loc.gov/" + format + "/?q=" + text + "&fo=json&c=10&sp=1"

    fetch(requestUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            displayResults(data, text);
        });
}


function displayResults(data, text) {
    var showingResultsEl = $("<h2>");
    showingResultsEl.text("Showing results for " + text.replace('+', ' '));
    resultsSectionEl.append(showingResultsEl);

    for (var i = 0; i < data.content.results.length; i++) {
        var tempRowEl = $("<div>");
        var tempTitleEl = $("<h3>");
        var tempDateEl = $("<p>");
        var tempSubjectsEl = $("<p>");
        var tempDescriptionEl = $("<p>");
        var tempReadMoreBtn = $("<button>");

        tempTitleEl.text(data.content.results[i].title);

        tempDateEl.text("Date: " + data.content.results[i].date);
        tempSubjectsEl.text("Subjects: " + data.content.results[i].subject);
        tempDescriptionEl.text("Description: " + data.content.results[i].description);
        tempReadMoreBtn.text("Read More");

        tempRowEl.attr("class", "m-2 bg-secondary rounded");
        tempReadMoreBtn.addClass("btn btn-dark readMoreBtn")
        tempReadMoreBtn.attr("href", data.content.results[i].url);

        tempRowEl.append(tempTitleEl);
        tempRowEl.append(tempDateEl);
        tempRowEl.append(tempSubjectsEl);
        tempRowEl.append(tempDescriptionEl);
        tempRowEl.append(tempReadMoreBtn);
        resultsSectionEl.append(tempRowEl);
    }
}
//on.click search dont switch pages
resultsFormEl.on("submit", function(event) {
    event.preventDefault();
    var textIn = textInputEl.val().replace(" ", "+");
    var selectIn = selectInputEl.val();
    var selectOut;

    switch (selectIn) {
        case "Maps":
            selectOut = "maps";
            break;
        case "Audio Recordings":
            selectOut = "audio";
            break;
        case "Photo, Print, Drawing":
            selectOut = "photos";
            break;
        case "Manuscripts/Mixed Material":
            selectOut = "manuscripts";
            break;
        case "Newspapers":
            selectOut = "newspapers";
            break;
        case "Film, Videos":
            selectOut = "film-and-videos";
            break;
        case "Printed Music, Sheet Music":
            selectOut = "notated-music";
            break;
        case "Archived Websites":
            selectOut = "websites";
            break;
        default:
            selectOut = "collections";
            break;
    }
    clearResults();
    populateResults(textIn, selectOut);
});
// on.click back to redirect to landing page

resultsSectionEl.on("click", ".readMoreBtn", function(event) {
    var buttonEl = $(event.currentTarget);
    document.location = buttonEl.attr("href");
})

backBtnEl.on("click", function() {
    document.location = "./index.html";
})

function clearResults() {
    resultsSectionEl.html("");
}

function onPageLoad() {
    var queryString = document.location.search;
    var textInput = queryString.split('&')[0].split('=')[1];
    var formatInput = queryString.split('&')[1].split('=')[1];
    populateResults(textInput, formatInput);
}

onPageLoad();