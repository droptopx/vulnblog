recordedTopScroll = 0
hamMenu = document.getElementById("mobile-hamburger-menu")
hamButton = document.getElementById("mobile-hamburger-menu-button")
hamButton.onclick = function () {
    if (!hamButton.classList.contains("active")) {
        recordedTopScroll = document.documentElement.scrollTop
    }
    hamButton.classList.toggle("active");
    hamMenu.classList.toggle("active");
    if (hamButton.classList.contains("active")) {
        setTimeout(function () {
            document.body.classList.toggle("no-scroll");
            document.documentElement.classList.toggle("no-scroll");
        }, 600
        )
    }
    else {
        document.body.classList.toggle("no-scroll");
        document.documentElement.classList.toggle("no-scroll");
        document.documentElement.scrollTop = recordedTopScroll
    }

}