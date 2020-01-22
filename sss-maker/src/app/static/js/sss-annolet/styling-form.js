
var STYLE_FORM_TEMPLATE = 
    '<form id="renform" class="anno">'+
        '<div id="renform-cancelatn-container" class="anno"><span id="renform-cncl-btn" class="anno" onclick="close_renform();" >&#10008;</span></div>'+
        '<h3 id="renform-header" class="anno">STYLING OPERATIONS</h3><hr>'+
        '<label class="renform-labels anno">FONT-FAMILY:&nbsp;&nbsp;</label>'+
        '<select id="fontfamily-list" class="options-list anno">'+
            '<option class="anno" value="Sans Serif">Sans Serif</option>'+
            '<option class="anno" value="Georgia">Georgia</option>'+
            '<option class="anno" value="Palatino Linotype">Palatino Linotype</option>'+
            '<option class="anno" value="Book Antiqua">Book Antiqua</option>'+
            '<option class="anno" value="Times New Roman">Times New Roman</option>'+
            '<option class="anno" value="Arial">Arial</option>'+
            '<option class="anno" value="Verdana">Verdana</option>'+
        '</select>'+
        '<br><br>'+
        '<label class="renform-labels anno">FONT-WEIGHT:&nbsp;&nbsp;</label>'+
        '<select id="fontweight-list" class="options-list anno">'+
            '<option class="anno" value="initial">Initial</option>'+
            '<option class="anno" value="bold">Bold</option>'+
            '<option class="anno" value="bolder">Bolder</option>'+
            '<option class="anno" value="lighter">Lighter</option>'+
        '</select>'+
        '<br><br>'+
        '<label class="renform-labels anno">FONT-STYLE:&nbsp;&nbsp;</label>'+
        '<select id="fontstyle-list" class="options-list anno">'+
            '<option class="anno" value="initial">Initial</option>'+
            '<option class="anno" value="italic">Italic</option>'+
            '<option class="anno" value="oblique">Oblique</option>'+
        '</select>'+
        '<br><br>'+
        '<label class="renform-labels anno">TEXT COLOR:&nbsp;&nbsp;</label>'+
        '<select id="textcolors-list" class="options-list anno">'+
            '<option class="anno" value="inherit">Initial</option>'+
            '<option class="anno" value="black">black</option>'+
            '<option class="anno" value="orange">orange</option>'+
            '<option class="anno" value="green">green</option>'+
            '<option class="anno" value="yellow">yellow</option>'+
            '<option class="anno" value="blue">blue</option>'+
            '<option class="anno" value="white">white</option>'+
        '</select>'+
        '<br><br>'+
        '<label class="renform-labels anno">SIZE:&nbsp;&nbsp;</label>'+
        '<select id="fontsize-list" class="options-list anno">'+
            '<option class="anno" value="initial">Initial</option>'+
            '<option class="anno" value="small">Small</option>'+
            '<option class="anno" value="medium">Medium</option>'+
            '<option class="anno" value="large">Large</option>'+
        '</select>'+
        '<br><br>'+
        '<input id="view-node-list" class="renform-btn anno" type="button" value="View-Nodes" onclick="view_node_list();">'+
        '<input id="apply-actn-btn" class="renform-btn anno" type="button" value="Apply-Action" onclick="apply_styling_actn();">'+
        '<input disabled id="save-styling-actn-btn" class="renform-btn save-actn-btn anno" type="button" value="Save-Action" onclick="save_actn(this.id);">'+ 
        '<input id="reset-renform-btn" class="renform-btn anno" type="button" value="Reset-Form" onclick="reset_form();">'+
    '</form>';
