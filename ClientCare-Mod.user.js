// ==UserScript==
// @name         ClientCare-Mod
// @version      0.1
// @description  Enhancement mods for ClientCare
// @author       Oni
// @match        https://dsxclient.3ds.com/psp/*
// @match        https://dsxclient.dsone.3ds.com/psp/*
// @require		 http://code.jquery.com/jquery-latest.js
// @require      https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js
// @resource     bootstrap https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        log
// ==/UserScript==

(function() {
    'use strict';
    // Add Style (CSS) to page
    // Add Bootstrap CSS library to page
    var myCSS = GM_getResourceText ("bootstrap");
    GM_addStyle(myCSS);
    console.log('added css');

    // Create MOD nav
    CreateMod();
})();