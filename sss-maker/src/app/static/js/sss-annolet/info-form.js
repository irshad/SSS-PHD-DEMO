
var INFO_FORM_TEMPLATE = 
    '<form id="renform" class="anno">'+
        '<div id="renform-cancelatn-container" class="anno"><span id="renform-cncl-btn" class="anno" onclick="close_renform();" >&#10008;</span></div>'+
        '<h3 id="renform-header" class="anno">GENERAL INFO</h3><hr>'+
        '<label class="anno">RENARRATOR ID:&nbsp;&nbsp;</label>'+
        '<input id="renarrator-id" class="inputbox anno" type="text">'+
        '<br><br>'+
        '<label class="anno">SSS NAME:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>'+
        '<input id="sss-name" class="inputbox anno" type="text">'+
        '<br><br>'+
        '<label class="anno">SSS ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>'+
        '<input id="sss-id" class="inputbox anno" type="text">'+
        '<br><br>'+
        '<label class="anno">SSS DESCRIPTION:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>'+
        '<input id="sss-desc" class="inputbox anno" type="text">'+
        '<br><br>'+
        '<h3 id="ssscrite-header" class="anno">USER INFO</h3><hr>'+
        '<label class="anno">USERNAME:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>'+
        '<input id="sss-username" class="inputbox anno" type="text">'+
        '<br><br>'+
        '<label class="anno">USERID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>'+
        '<input id="sss-userid" class="inputbox anno" type="text">'+
        '<br><br>'+
        '<label class="anno">COMMUNITY NAME:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>'+
        '<input id="sss-cmntyname" class="inputbox anno" type="text">'+
        '<br><br>'+
        '<label class="anno">COMMUNITY ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>'+
        '<input id="sss-cmntyid" class="inputbox anno" type="text">'+
        '<br><br>'+
        '<input id="submit-renform-btn" class="renform-btn anno" type="button" value="Submit-Form" onclick="validate_sss_infoform();">'+ 
        '<input id="reset-renform-btn" class="renform-btn anno" type="reset" value="Reset-Form">'+
    '</form>';
