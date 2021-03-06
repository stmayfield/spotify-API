
/*
var authEndpoint = 'https://accounts.spotify.com/authorize?client_id=';
var artist = "taylor swift";
var artistID = "06HL4z0CvFAxyc27GXpf02?si=DH8rk5BaQ0OkfcJpzSwebQ";
var redirectURI = "https://stmayfield.github.io/spotify-API/";

var authButton = $("#widget").append($("<button>").html("Allow Access"));
*/

/*
'https://accounts.spotify.com/authorize?client_id=87da17f3514b4a86854820f3d7804bb0&redirect_uri=https://stmayfield.github.io/spotify-API/&response_type=token'
'https://accounts.spotify.com/authorize?client_id=5fe01282e94241328a84e7c5cc169164&redirect_uri=http:%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=123'
*/
/*
function loginAuth(callback) {
    var clientID = "87da17f3514b4a86854820f3d7804bb0";
    var redirectURI = "https://stmayfield.github.io/spotify-API/";
    var queryURL = "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks"
    return authEndpoint + clientID + "&redirect_uri=" + redirectURI + '&response_type=token';

}


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
*/

function iFrameW(URI) {
    $("#widget").empty();
    var iFrameW = $("<iframe>").attr({
        src: "https://open.spotify.com/embed/track/" + URI,
        width: "150",
        height: "80",
        frameborder: "0",
        allowtransparency: "true",
        allow: "encrypted-media"
    })
    $("#widget").append(iFrameW)
};

var authButton = $("#widget").append($("<button>").html("Allow Access"));

authButton.click(function () {


    // Get the hash of the url
    const hash = window.location.hash
        //https://stmayfield.github.io/spotify-API/ | everything after
        .substring(1)
        // #
        .split('&')
        // separate token, token typeof, and expiration
        // access_token=[token]&token_type=Bearer&expires_in=3600
        // token -> BQAoHEIDHE504v1utfYPKIFGegQ2n5P6bgXKmk9YbcHHUdYoB3j3ZKa0YENbbJGx7RbmYZx-tqxGRQEwDFhTJm-Rw85bjLO4eRoIfN9F2ekfo2T4bhGl3PwWMMhWtXdu2SSWupXJYjk5l07JMKh1RShIb0Po0KYLvdWI
        // standart oAuth 2.0 bearer token
        .reduce(function (initial, item) {
            if (item) {
                var parts = item.split('=');
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});
    window.location.hash = '';

    // Set token
    let _token = hash.access_token;

    const authEndpoint = 'https://accounts.spotify.com/authorize';

    // Replace with your app's client ID, redirect URI and desired scopes
    const clientId = '87da17f3514b4a86854820f3d7804bb0';
    const redirectUri = 'https://stmayfield.github.io/spotify-API/';
    const scopes = [
        'user-top-read'
    ];

    // If there is no token, redirect to Spotify authorization
    if (!_token) {
        window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;
    }

    // var artistID = "06HL4z0CvFAxyc27GXpf02";
    var artist = "taylor swift";
    var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist";
    // var queryURL3 = "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks";

    // Make a call using the token
    $.ajax({
        url: queryURL,
        method: "GET",
        beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
    }).then(function (response) {
        // Do something with the returned data
        console.log(response)
        var artistID = response.artists.items[0].id
        var queryURL2 = "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=US";
        $.ajax({
            url: queryURL2,
            method: "GET",
            beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
        }).then(function (response) {
            // Do something with the returned data
            console.log(response)
            var songID = response.tracks[0].id
            iFrameW(songID)
        });
    });

})







// Make a call using the token



/*
// Make a call using the token
$.ajax({
    url: queryURL3,
    method: "GET",
    beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Bearer ' + _token); },
}).then(function (response) {
    // Do something with the returned data
    console.log(response)
});
*/