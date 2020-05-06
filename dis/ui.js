
$('.ui.sidebar').sidebar({
    dimPage: false,
    mobileTransition: 'overlay',
    transition: 'overlay',
});

var btnMenu = document.getElementById("btnMenu");
btnMenu.addEventListener("click", function(evt){
    $('.ui.sidebar').sidebar('toggle');
})

var btnInfo = document.getElementById("btnInfo");
btnInfo.addEventListener("click", function (evt) {
    threeD.pauseAnimation();
    $('.ui.modal').modal('show');
});

var btnSepLayers = document.getElementById("btnSepLayers");
btnSepLayers.addEventListener("click", function (evt) {
    threeD.seperateLayers();
});

// checkboxes
var chkSial = document.getElementById("chk-sial");
chkSial.addEventListener("change", function (evt) {
    threeD.setLayerVisible(0, evt.target.checked);
});

var chkSima = document.getElementById("chk-sima");
chkSima.addEventListener("change", function (evt) {
    threeD.setLayerVisible(1, evt.target.checked);
});

var chkUpperCrust = document.getElementById("chk-upperCrust");
chkUpperCrust.addEventListener("change", function (evt) {
    threeD.setLayerVisible(2, evt.target.checked);
});

$('.ui.modal').modal({
    onHide: function () {
        threeD.resumeAnimation();
    }
})