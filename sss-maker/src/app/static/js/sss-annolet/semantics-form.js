
var SEMANTIC_FORM_TEMPLATE = 
    '<form id="renform" class="anno">'+
       '<div id="renform-cancelatn-container" class="anno"><span id="renform-cncl-btn" class="anno" onclick="close_renform();" >&#10008;</span></div>'+
       '<h3 id="renform-header" class="anno">SEMANTIC OPERATIONS</h3><hr>'+
       '<label class="renform-labels anno">LIST OF ACTIONS:&nbsp;&nbsp;</label>'+
       '<select id="semantic-actns" class="options-list anno">'+ 
           '<option value="pre-defined">Currency</option>'+
           '<option value="pre-defined">Date</option>'+
           '<option value="user-defined">User-defined</option>'+
       '</select>'+
       '<br><br>'+
       '<div id="user-defined-actns-fields">'+
           '<label class="renform-labels anno">CUSTOM TAG:&nbsp;&nbsp;</label>'+
           '<input id="custm-tag" class="inputbox anno" type="text">'+
           '<br><br>'+
           '<label class="renform-labels anno">CUSTOM SRC:&nbsp;&nbsp;</label>'+
           '<input id="custm-src" class="inputbox anno" type="text">'+
           '<br><br>'+
           '<label class="renform-labels anno">CUSTOM HANDLER:&nbsp;&nbsp;</label>'+
           '<input id="custm-handler" class="inputbox anno" type="text">'+
       '</div>'+
       '<br><br>'+
       '<input id="apply-actn-btn" class="renform-btn anno" type="button" value="Apply-Action" onclick="apply_semantics_actn();">'+
       '<input disabled id="save-semantics-actn-btn" class="renform-btn save-actn-btn anno" type="button" value="Save-Action" onclick="save_actn(this.id);">'+ 
       '<input id="reset-renform-btn" class="renform-btn anno" type="button" value="Reset-Form" onclick="reset_form();">'+
   '</form>'; 
