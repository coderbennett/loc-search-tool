var resultsFormEl = $('#resultsFormEl');
var textInputEl = $('#TextInput');
var selectInputEl = $('#Select');
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
    var requestUrl = "https://www.loc.gov/" + format +"/?q=" + text + "&fo=json"

    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

//on.click search dont switch pages

// on.click back to redirect to landing page

function onPageLoad() {
    var queryString = document.location.search;
    var textInput = queryString.split('&')[0].split('=')[1];
    var formatInput = queryString.split('&')[1].split('=')[1];
    populateResults(textInput, formatInput);
}

onPageLoad();