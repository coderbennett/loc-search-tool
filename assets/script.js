var homeSearchFormEl = $('#searchInput');
var homeSelect = $('#Select');
var homeText = $('#TextInput');

//create global scope of variable to ref elem

//start with homepage 
function switchPage(event) {
    event.preventDefault();
    var textIn = homeText.val();
    var selectIn = homeSelect.val();
    var selectOut;

    switch(selectIn) {
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
            selectOut = "";
            break;
    }

    document.location = "./results.html?q=" + textIn + "&format=" + selectOut;
}

//redirect to new page when on.click search
homeSearchFormEl.on("submit", switchPage);