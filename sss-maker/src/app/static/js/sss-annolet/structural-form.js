
var STRUCT_FORM_TEMPLATE = 
    '<form id="renform" class="anno">'+
        '<div id="renform-cancelatn-container" class="anno"><span id="renform-cncl-btn" class="anno" onclick="close_renform();" >&#10008;</span></div>'+
        '<h3 id="renform-header" class="anno">STRUCTURING OPERATIONS</h3><hr>'+
        '<label class="renform-labels anno">LIST OF ACTIONS:&nbsp;&nbsp;</label>'+
        '<select id="struct-actns-list" class="options-list anno">'+
            '<option class="anno" value="addtxt">Add Text</option>'+
            '<option class="anno" value="addimg">Add Image</option>'+
            '<option class="anno" value="addyt">Add Youtube</option>'+
            '<option class="anno" value="addnote">Add Note</option>'+
            '<option class="anno" value="addlink">Add Link</option>'+
            '<option class="anno" value="lang-prcs">Language Processing</option>'+
        '</select>'+
        '<br><br>'+
        '<div id="struct-actns-attrs-list" class="anno">'+
            '<label class="renform-labels anno">SOURCE LOCATION:&nbsp;&nbsp;</label>'+
            '<input id="src-loc" class="inputbox anno" type="text">'+
        '</div>'+
        '<br>'+
        '<input id="view-node-list" class="renform-btn anno" type="button" value="View-Nodes" onclick="view_node_list();">'+
        '<input id="apply-actn-btn" class="renform-btn anno" type="button" value="Apply-Action" onclick="apply_struct_actn();">'+
        '<input disabled id="save-struct-actn-btn" class="renform-btn save-actn-btn anno" type="button" value="Save-Action" onclick="save_actn(this.id);">'+ 
        '<input id="reset-renform-btn" class="renform-btn anno" type="button" value="Reset-Form" onclick="reset_form();">'+
    '</form>'; 
