!function() {
    function t() {
        document.body.classList.add("loaded")
    }
    var e = document.getElementById("loftloader-wrapper");
    if (e) {
        if (window.addEventListener("load", function(e) {
            t()
        }),
        e.dataset && e.dataset.showCloseTime) {
            var a = parseInt(e.dataset.showCloseTime, 10)
              , n = !1
              , o = e.getElementsByClassName("loader-close-button");
            a && o.length && (setTimeout(function() {
                o[0].style.display = ""
            }, a),
            o[0].addEventListener("click", function(e) {
                t()
            }))
        }
        e.dataset.maxLoadTime && (n = e.dataset.maxLoadTime,
        (n = parseInt(n, 10)) && setTimeout(function() {
            t()
        }, n))
    }
}();