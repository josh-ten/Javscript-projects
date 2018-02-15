function transitionPage(title) {
    if ($(title).hasClass("clicked")) {
        $(title).removeClass("clicked");
    } else {
        $(title).addClass("clicked");
    }
}