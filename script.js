
function exploreGames() {
    document.getElementById("games")
        .scrollIntoView({
            behavior: "smooth"
        });
}

function playGame(name) {
    alert(
        name +
        " will be available soon! Stay tuned."
    );
}
