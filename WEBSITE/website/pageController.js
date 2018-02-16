var renderBubbles = false;
function transitionPage(title) {
    var canvas = document.getElementById("canvasContainer");
    if ($(title).hasClass("clicked")) {
        $(title).removeClass("clicked");
        canvas.style.visibility = "hidden";
        renderBubbles = false;
    } else {
        $(title).addClass("clicked");
        canvas.style.visibility = "visible";
        renderBubbles = true;
    }
}