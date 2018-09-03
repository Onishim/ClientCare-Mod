/**
 * ClientCare Mod v0.2
 *
 * Features :
 *  1.  
 *  2.  
 *  3.  
 *  4.  
 */


// ================ Global variables ================

// Identifiers
var id_RootNode = 'div[id*="divPAGECONTAINER"]';
var id_PageInfo = 'div[id^="pt_pageinfo"]';

var id_InfoField = "table[id$='ICField4']";
var id_MessagingField = "div[id$='CRMS_REQ_WRK_CRMS_REQADDINFGRP']";

var id_MsgRootNode = '#ptifrmcontent';
var id_MsgSubject = '#CRM_MAIL_WRK_EMAIL_SUBJECTTEXT';

var RootNode = $('div[id*="divPAGECONTAINER"]');
var PageInfo = $('div[id^="pt_pageinfo"]');

var SelectedTab = ""; // default 'Request' tab
var summary_div = "";
// --------------------------------------------------

$(document).ready(function(e) {
    //console.log('RootNode =', RootNode);
    //console.log('PageInfo =', PageInfo);
});

if (window.top === window.self) { //--- Script is on domain_B.com when/if it is the MAIN PAGE.
    console.log(">> MAIN PAGE <<");

    // Create MOD nav
    //CreateMod();
} // MAIN PAGE
else {                            //--- Script is on domain_B.com when/if it is IN AN IFRAME.
    console.log(">> IFRAME <<");

    // For pages using <iframe>
    var MainDoc = $(document);
    var TargetContent;

    // On load of <iframe>
    $('iframe[name="TargetContent"]').ready(function(event){
        console.log('>>>>>> TargetContent has (re)loaded');
        TargetContent = $(this);
        console.log('TargetContent :', TargetContent);
        if(!TargetContent.length){
            TargetContent = $('iframe[name="TargetContent"]')[0].contentDocument.document;
        }
        console.log('TargetContent:', TargetContent);

        // Mod any email Subject
        var email_page = TargetContent.find('.PSSRCHTITLE').text();
        console.log("Email page :", email_page);
        var email_sub = TargetContent.find('#CRM_MAIL_WRK_EMAIL_SUBJECTTEXT');
        if(email_page == 'Write to Submitter'){
            var sub_arr = email_sub.text().split(/ (.*)/);
            console.log("Split Subject :", sub_arr);
            email_sub.text("RE: [Request ID: ##" + sub_arr[0] + "##] " + sub_arr[1]);
            console.log("Email Subject :", email_sub.text());
        }
        else if(email_page == 'Send Message To DS People'){
            sub_arr = email_sub.text().split(/(.*) (.*)/);
            console.log("Split Subject :", sub_arr);
            email_sub.text("RE: [Request ID: ##" + sub_arr[2] + "##] " + sub_arr[1]);
            console.log("Email Subject :", email_sub.text());
        }
    });
} // IFRAME

// Mod any email Subject
$(id_MsgRootNode).ready(function(e){
    var email_sub = $(e.target).find(id_MsgSubject);
    //console.log('Email sub :',email_sub);
});

RootNode.ready(function(e){
    console.log('>>>>>> RootNode has (re)loaded', RootNode);
    //Comment_Mod(RootNode);
});

RootNode.on('DOMNodeInserted', '.ps_pagecontainer', function(e){
    if(e.target.className == 'PSPAGECONTAINER'){
        //console.log('CONTAINER, DOMNodeInserted >>', e.target);
        //Comment_Mod(RootNode);
    }
});

// PageInfo Node ready, i.e. TAB loaded
PageInfo.ready(function(){
    TabLoaded();
    // Select the node that will be observed for mutations
    var targetNode = PageInfo[0];
    if(targetNode != undefined){
        // Options for the observer (which mutations to observe)
        var config = { attributes: true };

        // Callback function to execute when mutations are observed, i.e. on TAB switch
        var callback = function(mutationsList) {
            for(var mutation of mutationsList) {
                if (mutation.type == 'attributes' && mutation.attributeName == 'page') { // 'page' attribute modified
                    console.log('TAB Switched');
                    TabLoaded();
                }else{
                }
            }
        };

        // Create an observer instance linked to the callback function
        var observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);

        // Later, you can stop observing
        //observer.disconnect();
    }
});

// ================ Global functions ================

/**--------------------------------------------------
 * Changes on TAB load
 *
 * TAB list:
 * 1. Request = CRMS_REQUEST_PG1
 * 2. Front-End = CRMS_REQUEST_PG2
 * 3. Back-End = CRMS_REQBE_PG
 * 4. Effort Log = CRMS_REQEFFLOG_PG
 * 5. Subscription = CRMS_REQSUBSCR_PG
 * 6. Associated Q & A = CRMS_REQQA_PG1
 * 7. History= CRMS_REQHIST_PG
 */
 function TabLoaded(){
    console.log("Tab loaded");
    SelectedTab = PageInfo.attr('page');
    CustomizePage(RootNode);
    Comment_Mod(RootNode);
 }

/**--------------------------------------------------
 * Customize page (per individual tab)
 */
function CustomizePage(parent_node){
    console.log('Current TAB >>', SelectedTab);

    // For ALL tabs

    //$('#CRM_SEARCH_WRK_CRM_RETURNTOSEARCH').addClass('btn btn-warning bt-sm');
    //$('#CRM_SEARCH_WRK_BTN_REFRESH').addClass('btn btn-default bt-sm');
    var info_field = parent_node.find(id_InfoField);
    info_field.css({'background-image':'none', 'background-color':'#FDFFE3'});

    // For 'Front-End' tab
    if( SelectedTab == "CRMS_REQUEST_PG2" ){
        var messaging_field = parent_node.find(id_MessagingField);
        messaging_field.css({'background-image':'none', 'background-color':'ghostwhite'});
        var btn_FromSubmitter = messaging_field.find("div[id$='CRMS_REQ_WRK_CRMS_REQADDINF1']");
        btn_FromSubmitter.css({'display':'none'});
        var btn_ToSubmitter = messaging_field.find("div[id$='CRMS_REQ_WRK_CRMS_REQADDINF2']");
        btn_ToSubmitter.css({'display':'none'});
        //console.log('Buttons Hidden :', btn_FromSubmitter, btn_ToSubmitter);
    }
}

/**--------------------------------------------------
 * Comment Mod
 */
function Comment_Mod(parent_node){
    console.log('>> COMMENT MOD <<');
    var comments = parent_node.find("div[id*='CRMS_REQ_WRK_CRMS_HTMLTEXT']");
    //console.log('comments :', comments);
    for(var i = 0; i < comments.length; i++){
        var comment = $(comments[i]);
        var comment_topbar = comment.find('span.comment_topbar');
        console.log('comment topbar', comment_topbar.length);
        if(!comment_topbar.length){
            comment.prepend('<span class="comment_topbar" target="' + comment.attr('id')+ '"></span>');
            comment_topbar = comment.find('span.comment_topbar');
        }

        if(comment.height() > 100){
            comment_topbar.html('[+]');
            comment_topbar.click(function(e2){
                e2.stopPropagation();
                var target = $(this).parent();
                if(target.hasClass('hide_comment')){ // expand comment
                    target.removeClass('hide_comment');
                    $(this).html('[-]');
                }else{                               // collapse comment
                    target.addClass('hide_comment');
                    $(this).html('[+]');
                }
            });

            // SUMMARY Mod
            var message = comment.find('span[class*="CRMS_TXT"]');
            var firstline = message.text().split('\n')[0];
            //console.log('[', i, '] :', message.text());
            if(firstline.match("##SUMMARY")){
                if(summary_div == ''){ // first summary is the latest
                    summary_div = comment;
                    console.log('Summary_id =', summary_div);
                }
                message.addClass('summary_note');
                //scrollTo(summary_div);
            }
            comment.addClass('hide_comment');
            comment.css({'font-size' : '9pt'});
            //console.log('comment ['+i+'] :', comment);
        }
    }
}

/**--------------------------------------------------
 * Scroll feature
 */

// offset from the header bar #RvAcnHdr
var scroll_offset = 30;

function scrollTo(element)
{
    var offset = scroll_offset;

    //alert(offset);
    $('html,body').animate({
        scrollTop: element.offset().top - offset
    });
}

/**--------------------------------------------------
 * Create fixed MOD Navbar
 */
function CreateMod(){
    // add fixed menu bar at bottom right
    $('body').append(
        '<div id="mod_navbar"><a href="#home">Home</a><a id="mod_logo">⌬</a><a href="#news">News</a></div>'
    );
}

$('#mod_logo').on('click', function(e){
    alert('>> Welcome to ClientCare MOD <<');
});


