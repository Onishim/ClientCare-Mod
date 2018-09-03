// ==UserScript==
// @name         ClientCare-Mod
// @version      0.2
// @description  Enhancement mods for ClientCare
// @author       Oni
// @match        https://dsxclient.3ds.com/psp/*
// @match        https://dsxclient.dsone.3ds.com/psp/*
// @match        https://dsxclient.dsone.3ds.com/psc/*
// @require		 http://code.jquery.com/jquery-latest.js
// @require      https://github.com/Onishim/ClientCare-Mod/raw/master/cc_mod.js
// @resource     cc_mod_css https://github.com/Onishim/ClientCare-Mod/raw/master/cc_mod.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// @grant        log
// ==/UserScript==

(function() {
    'use strict';
    // Add Style (CSS) to page
    // Add Bootstrap CSS library to page
    //var bscss = GM_getResourceText ("bootstrap");
    //GM_addStyle(bscss);
    var cccss = GM_getResourceText ("cc_mod_css");
    GM_addStyle(cccss);
    console.log('Added CSS');
})();