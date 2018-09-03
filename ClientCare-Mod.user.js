// ==UserScript==
// @name         ClientCare-Mod
// @version      0.3
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

// Add Style (CSS) to page
// Add Bootstrap CSS library to page
//var bscss = GM_getResourceText ("bootstrap");
//GM_addStyle(bscss);
var cccss = GM_getResourceText ("cc_mod_css");
GM_addStyle(cccss);
console.log('Added CSS');

/**--------------------------------------------------
 * Enable (true) or Disable (false) features
 */

// 1. 	Shrink conversations in history upon load of SR page [from Phase 1, but opposite]
var user_comment_mod = true;
// 2. 	Highlight SUMMARY note
var user_summary_mod = true;
// 4.  Hide 'From Submitter' & 'To Submitter' note buttons
var user_hide_button = true;