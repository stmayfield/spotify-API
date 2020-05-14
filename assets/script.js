let discoverBtn = document.getElementById("discover");
let apikey = "368598-musicbuf-RZ4G3NI6";
let addBtn = document.getElementById("add")

jQuery.ajaxPrefilter(function (options) {
    if (options.crossDomain && jQuery.support.cors) {
        options.url = "https://cors-anywhere.herokuapp.com/" + options.url;
    }
});
function getArtist() {
    $("#discover").on("click", function (event) {
        event.preventDefault();
        var artist = $("#newItem").val();
        var queryURL =
            "https://tastedive.com/api/similar?q=" +
            artist +
            "&limit=6&info=0&k=" +
            apikey;

        $.ajax({
            url: queryURL,
            method: "GET",
        }).done(function (response) {
            console.log(response);
            for (let i = 0; i < response.Similar.Results.length; i++)
                $("#artists").append(
                    "<li>" + response.Similar.Results[i].Name + "</li>"
                );
        });
    });
}
$("body").on("click", ".track", function () {
    var songName = $(this).text();
    console.log("Song clicked is: " + songName);
});


function renderTrackList(trackList) {

    var tracksEl = $("#tracks");
    tracksEl.empty();
    var ulTracksEl = $("<ul>");
    for (var i = 0; i < trackList.length; i++) {
        var liTracksEl = $("<li>").addClass("track");
        liTracksEl.text(trackList[i]);
        ulTracksEl.append(liTracksEl);
    }
    tracksEl.append(ulTracksEl);
}

var testTrackList = [
    "Darcy's Donkey",
    // "Cornfield Chase",
    // "There and Back Again",
    // "Sweden",
    // "Island Life",
];
renderTrackList(testTrackList);

getArtist();




var authEndpoint = 'https://accounts.spotify.com/authorize?client_id=';
var clientID = "87da17f3514b4a86854820f3d7804bb0"
var redirectURI = "https:%2F%2Fstmayfield.github.io%2Fspotify-API%2F"
var artist = /*$("#newItem").val()*/ "taylor swift";
let accessToken
var URI = "0Hoc8rluBkPaXu9pQAq1x6"
var queryURL = "https://api.spotify.com/v1/search/q=" + artist + "&type=artist"

var authButton = $("#widget").append($("<button>").html("Allow Access"));
authButton.click(function () {
    window.location.href = authEndpoint + clientID + "&redirect_uri=" + redirectURI + '&response_type=token';
    loadWidget()
})

/*
'https://accounts.spotify.com/authorize?client_id=87da17f3514b4a86854820f3d7804bb0&redirect_uri=https://stmayfield.github.io/spotify-API/&response_type=token'
'https://accounts.spotify.com/authorize?client_id=5fe01282e94241328a84e7c5cc169164&redirect_uri=http:%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=123'
*/


// function buildAuthLink() {
const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = '';

let _token = hash.access_token;
const scopes = [
    'user-read-private',
    'user-read-email'
];

if (!_token) {
    window.location = authEndpoint + clientID + "&redirect_uri=" + redirectURI + '&response_type=token';
}

// Spotify API
function loadWidget() {
    $.ajax({
        url: queryURL,
        method: "GET",
        Accept: "application/json",
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
        success: function (response) {
            console.log(response)
            var artistID = response.artists.items[0].id
            var queryURL2 = "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks"
            $.ajax({
                url: queryURL2,
                method: "GET",
                Accept: "application/json",
                success: function (response) {
                    console.log(response)
                    iFrameW();
                }
            })
        }


    })

}

function iFrameW() {
    $("#widget").empty();
    var iFrameW = $("<iframe>").attr({
        src: "https://open.spotify.com/embed/track/" + URI,
        width: "300",
        height: "80",
        frameborder: "0",
        allowtransparency: "true",
        allow: "encrypted-media"
    })
    $("#widget").append(iFrameW)
}