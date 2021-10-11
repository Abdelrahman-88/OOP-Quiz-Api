"use strict"

import { Settings } from "./settings.js";
new Settings();

$(document).ready(function () {
    $(".loader").fadeOut(500, function () {
        $("#loading").fadeOut(500, function () {
            $("body").css("overflow-y", "auto");
            $("#loading").remove();
        })
    });

});


