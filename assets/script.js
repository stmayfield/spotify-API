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
/*
var authEndpoint = 'https://accounts.spotify.com/authorize?client_id=';
var artist = "taylor swift";
var artistID = "06HL4z0CvFAxyc27GXpf02?si=DH8rk5BaQ0OkfcJpzSwebQ";

var authButton = $("#widget").append($("<button>").html("Allow Access"));

/*
'https://accounts.spotify.com/authorize?client_id=87da17f3514b4a86854820f3d7804bb0&redirect_uri=https://stmayfield.github.io/spotify-API/&response_type=token'
'https://accounts.spotify.com/authorize?client_id=5fe01282e94241328a84e7c5cc169164&redirect_uri=http:%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=123'
*/
/*
function loginAuth(callback) {
    var clientID = "87da17f3514b4a86854820f3d7804bb0";
    var redirectURI = "https:%2F%2Fstmayfield.github.io%2Fspotify-API%2F";
    var queryURL = "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks"
    return authEndpoint + clientID + "&redirect_uri=" + redirectURI + '&response_type=token';

}

/*
// Spotify API
function spotifyAPI(accessToken) {
    return $.ajax({
        url: queryURL,
        method: "GET",
        headers: { 'Authorization': 'Bearer ' + accessToken },
    })
}


authButton.click(function () {
    loginAuth(function (accessToken) {
        spotifyAPI(accessToken)
            .then(function (response) {
                console.log(response)
                iFrameW()
            })
    })
})




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
};
*/

var queryURL = "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks"
var artistID = "06HL4z0CvFAxyc27GXpf02?si=DH8rk5BaQ0OkfcJpzSwebQ";


(function () {

    function login(callback) {
        var clientID = "87da17f3514b4a86854820f3d7804bb0";
        var redirectURI = "https://stmayfield.github.io/spotify-API/";
        function getLoginURL(scopes) {
            return 'https://accounts.spotify.com/authorize?client_id=' + clientID +
                '&redirect_uri=' + encodeURIComponent(redirectURI) +
                '&scope=' + encodeURIComponent(scopes.join(' ')) +
                '&response_type=token';
        }

        var url = getLoginURL([
            'user-read-email'
        ]);

        var width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);

        window.addEventListener("message", function (event) {
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                callback(hash.access_token);
            }
        }, false);

        var w = window.open(url,
            'Spotify',
            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
        );

    }

    function getUserData(accessToken) {
        return $.ajax({
            url: queryURL,
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
        });
    }


    authButton = $("#widget").append($("<button>").html("Allow Access"));

    authButton.click(function () {
        login(function (accessToken) {
            getUserData(accessToken)
                .then(function (response) {
                    loginButton.style.display = 'none';
                    resultsPlaceholder.innerHTML = template(response);
                });
        });
    });

})();