/**
 * ClientCare Mod v0.1
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

if (window.top === window.self) {
    //--- Script is on domain_B.com when/if it is the MAIN PAGE.
} // MAIN PAGE
else {
    //--- Script is on domain_B.com when/if it is IN AN IFRAME.

    // For pages using <iframe>
    var MainDoc = $(document);
    var TargetContent;

    // On load of <iframe>
    $('iframe[name="TargetContent"]').load(function(event){
        console.log('>>>>>> TargetContent has (re)loaded');
        TargetContent = $(this.contentDocument);
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
    console.log('RootNode:', e.target);

    var email_sub = $(e.target).find(id_MsgSubject);
    console.log(email_sub);
});

RootNode.ready(function(e){
    console.log('>>>>>> RootNode has (re)loaded');
    console.log('RootNode:', RootNode);
    Comment_Mod(RootNode);
});

RootNode.on('DOMNodeInserted', '.ps_pagecontainer', function(e){
    if(e.target.className == 'PSPAGECONTAINER'){
        //console.log('CONTAINER, DOMNodeInserted >>', e.target);
        Comment_Mod(RootNode);
    }
});

// PAGE Content change
RootNode.on('DOMNodeInserted', '#win0divPAGECONTAINER #win0divPSPAGECONTAINER', function(e){
    console.log('PAGE CONTAINER, DOMNodeInserted >>', e.target);
});

// TAB initial load
PageInfo.ready(function(e){
    TabLoaded();
});

// TAB switch
PageInfo.on('load DOMSubtreeModified', '', function(e){
    TabLoaded();
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
    SelectedTab = PageInfo.attr('page');
    CustomizePage(RootNode);
    Comment_Mod(RootNode);
 }

/**--------------------------------------------------
 * Customize page (per indifidual tab)
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
        console.log(btn_FromSubmitter, btn_ToSubmitter);
    }
}

/**--------------------------------------------------
 * Comment Mod
 */
function Comment_Mod(parent_node){
    var comments = parent_node.find("div[id*='CRMS_REQ_WRK_CRMS_HTMLTEXT']");
    //console.log('comments :', comments);
    for(var i = 0; i < comments.length; i++){
        var comment = $(comments[i]);
        if(comment.height() > 100){
            var message = comment.find('span[class*="CRMS_TXT"]');
            var firstline = message.text().split('\n')[0];
            //console.log('[', i, '] :', message.text());
            if(firstline.match("##SUMMARY")){
                summary_div = comments;
                console.log('Summary_id =', summary_div);
                textspan.addClass('summary_note');
                //scrollTo(summary_div);
            }
            comment.addClass('hide_comment');
            //comment.css({'max-height' : '100px', 'overflow' : 'hidden'});
            comment.css({'font-size' : '9pt'});

            comment.click(function(e2){
                e2.stopPropagation();
                //console.log('clicked :', this);
                var target = $(this);
                if(target.hasClass('hide_comment')){
                    target.removeClass('hide_comment');
                    //target.css({'max-height' : '', 'overflow' : ''});
                    //console.log('hiding :', target);
                }else{
                    target.addClass('hide_comment');
                    //target.css({'max-height' : '100px', 'overflow' : 'hidden'});
                    //console.log('showing :', target);
                }
            });
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
