
var ANNOLET_TEMPLATE = 
   '<ul id="annolet-elems" class="anno">'+
       '<li id="struct-elem" class="anno-gui-tooltip-container anno"><img onclick="show_renform(this.id);" id="struct_icon" class="anno-gui-icon anno" src="static/images/sss-annolet/struct-raw.png" alt="structure-icon">'+
           '<span class="anno-gui-tooltiptext-container anno"><p class="anno-gui-tooltiptext anno">Click here to do CRUD operations</p></span>'+ 
       '</li>'+
       '<li id="style-elem" class="anno-gui-tooltip-container anno"><img onclick="show_renform(this.id);" id="style_icon" class="anno-gui-icon anno" src="static/images/sss-annolet/style-raw.png" alt="style-icon">'+
           '<span class="anno-gui-tooltiptext-container anno"><p class="anno-gui-tooltiptext anno">Click here to do styling</p></span>'+ 
       '</li>'+
       '<li id="semantic-elem" class="anno-gui-tooltip-container anno"><img onclick="show_renform(this.id);" id="semantic_icon" class="anno-gui-icon anno" src="static/images/sss-annolet/semantic-raw.png" alt="semantics-icon">'+
           '<span class="anno-gui-tooltiptext-container anno"><p class="anno-gui-tooltiptext anno">Click here to do semantic operations</p></span>'+ 
       '</li>'+
       '<li id="save-elem" class="anno-gui-tooltip-container anno"><i onclick="check_modifications(this.id);" id="save_icon" class="fa fa-save anno-gui-icon anno"></i>'+
           '<span class="anno-gui-tooltiptext-container anno"><p class="anno-gui-tooltiptext anno">Click here to save</p></span>'+
       '</li>'+
   '</ul>';
