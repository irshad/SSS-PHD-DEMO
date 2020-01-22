var ANNOLET_TEMPLATE,
    STRUCT_FORM_TEMPLATE,
    STYLE_FORM_TEMPLATE,
    SEMANTIC_FORM_TEMPLATE,
    INFO_FORM_TEMPLATE,
    COMMON_ADD_TEMPLATE,
    ADD_LINK_TEMPLATE,
    LANG_PRCS_TEMPLATE,
    from_curncy,
    to_curncy,
    config_data,
    target_elems_data,
    path, 
    sss,
    id;

id = 1; 

target_elems_data = {};
target_elems_data["list"+id] = [];

sss = { "metadata":{}, "pgxform":[], "ssscrite":{} };

get_config_data();

function get_config_data() {
   var config_url = "static/json/config.json";
    
   $.getJSON(config_url, function() {
       console.log("Request to config file success..!");
   })
   .done(function(data, jqxhr, textStatus) {
       config_data = data;
       console.log("Retrieved the config data successfully..!");
       create_container("annolet-sticky-container");
       load_html("annolet-sticky-container", config_data["URLS"]["ANNOLET_GUI_URL"]);
       create_container("renform-container");
       drag_element(document.getElementById(("renform-container")));
       tooltip_to_selectlocators();
   })
   .fail(function(jqxhr, textStatus, error) {
       var err = textStatus + " "+ jqxhr.status;
       console.log("Request to config file failed: " + ", " + err);
   })
   .always(function() {
       console.log("Request to config file complete");
   });
}

function create_container(elmnt_id) {
   var body = document.getElementsByTagName("body")[0];
   var container = document.createElement("div");
   container.id = elmnt_id;
   container.className = "anno";
   body.appendChild(container);
}

function load_html(elmnt_id, template_url) {    
   $.getScript(template_url, function(){
       console.log("Request to script file success..!");
   })
   .done(function(script, jqxhr, textStatus) {
       switch(elmnt_id){
           case "annolet-sticky-container":
               $("#annolet-sticky-container").html(ANNOLET_TEMPLATE);
               console.log("Loaded html in container..!");
               break;

           case "struct_icon":
               $("#renform-container").html(STRUCT_FORM_TEMPLATE);
               $("#struct-actns-list").change(function(){
                    load_html("struct-actns-attrs-list", config_data["URLS"]["STRUCT_ACTNS_ATTRS_URL"]);
               });
               console.log("Loaded html in container..!");
               break;

           case "style_icon":
               $("#renform-container").html(STYLE_FORM_TEMPLATE);
               console.log("Loaded html in container..!");
               break;

           case "semantic_icon":
               $("#renform-container").html(SEMANTIC_FORM_TEMPLATE);
               console.log("Loaded html in container..!");
               change_semantics_temp()
               break;

           case "save_icon":
               $("#renform-container").html(INFO_FORM_TEMPLATE);
               console.log("Loaded html in container..!");
               break;

           case "struct-actns-attrs-list":
               var selctd_actn = document.getElementById("struct-actns-list").value;
               if(selctd_actn === "addtxt"||selctd_actn === "addimg"||selctd_actn === "addyt"||selctd_actn === "addnote") {
                   $("#struct-actns-attrs-list").html(COMMON_ADD_TEMPLATE);
               }
               else if(selctd_actn === "addlink") {
                   $("#struct-actns-attrs-list").html(ADD_LINK_TEMPLATE);   
               }
               else if(selctd_actn === "lang-prcs") {
                   $("#struct-actns-attrs-list").html(LANG_PRCS_TEMPLATE);   
               }
               console.log("Loaded html in container..!");
               break;

           default:
               console.log("Error in load_html function, invalid id"+" "+elmnt_id+" "+or+" "+"invalid template"+"..!");
       }    
   })
   .fail(function(jqxhr, textStatus, error) {
       var err = textStatus + " "+ jqxhr.status;
       console.log("Request to script file failed: " + ", " + err);    
   })
   .always(function() {
       console.log("Request to script file complete");
   });
}

function show_renform(elmnt_id) { 
   if($("#apply-actn-btn").prop("disabled", false) && $(".save-actn-btn").prop("disabled", true)){
      var form = document.getElementById("renform-container");
      form.style.display = "block";
      load_html(elmnt_id, config_data["URLS"][elmnt_id.toUpperCase()+"_"+"FORM"+"_"+"URL"]);
   }
   else{
      alert("Please save the previous applied action and then do other operations..!");
   }
}

function close_renform() {
   if($("#apply-actn-btn").prop("disabled", false) && $(".save-actn-btn").prop("disabled", true)){
      var form = document.getElementById("renform-container");
      form.style.display = "none";
   }
   else{
      alert("Please save the previous applied action and then close the form..!");
   }
}

function reset_form() {
   document.getElementById("renform").reset();
}

function drag_element(elmnt) {
   var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
   if (document.getElementById("renform")) {
       /* if present, the header is where you move the DIV from:*/
       document.getElementById("renform").onmousedown = drag_mouse_down;
   } else {
       /* otherwise, move the DIV from anywhere inside the DIV:*/
       elmnt.onmousedown = drag_mouse_down;
   }
   function drag_mouse_down(e) {
       e = e || window.event;
       // get the mouse cursor position at startup:
       pos3 = e.clientX;
       pos4 = e.clientY;
       document.onmouseup = close_drag_element;
       // call a function whenever the cursor moves:
       document.onmousemove = element_drag;
   }
   function element_drag(e) {
       e = e || window.event;
       // calculate the new cursor position:
       pos1 = pos3 - e.clientX;
       pos2 = pos4 - e.clientY;
       pos3 = e.clientX;
       pos4 = e.clientY;
       // set the element's new position:
       elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
       elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
   }
   function close_drag_element() {
       /* stop moving when mouse button is released:*/
       document.onmouseup = null;
       document.onmousemove = null;
   }
}

function tooltip_to_selectlocators() {
   create_container("tooltip-container");
   document.getElementById("tooltip-container").innerHTML = 
      '<input id="select_node" class="anno" type="button" value="SELECT NODE" onclick=extract_elmnts();>';

   var all = document.body.getElementsByTagName("*");
   for(var i = 0, max = all.length; i < max; i++){
      if(all[i].classList.contains("anno") === false){
          all[i].addEventListener("mouseup", function(event) {
             place_tooltip(event);
          });
      }
   }
}


function get_selected_text(event) {
   if(window.getSelection){
       if (event === undefined) event = window.event;
       var target = 'target' in event? event.target : event.srcElement; 
       var root = document.compatMode === 'CSS1Compat'? document.documentElement : document.body;
       path = getPathTo(target);
       return window.getSelection().toString();
   }
   else{
       alert("Browser not supported..!");
   }
}

function getPathTo(element) {
   if(element.id !== "")
       return 'id("'+element.id+'")';
   if(element === document.body)
       return "//"+element.tagName.toLowerCase();

   var ix= 0;
   var siblings = element.parentNode.childNodes;
   for(var i = 0, sib_len = siblings.length; i < sib_len; i++) {
       var sibling = siblings[i];
       if(sibling === element)
           return getPathTo(element.parentNode)+'/'+element.tagName.toLowerCase()+'['+(ix+1)+']';
       if(sibling.nodeType === 1 && sibling.tagName === element.tagName)
          ix++;
   }
}

function place_tooltip(event) {
   var current = get_selected_text(event);
   if(current !== ""){
       var x_pos = event.pageX;
       var y_pos = event.pageY;
       var tooltip = document.getElementById("tooltip-container");
       tooltip.style.position = "absolute";
       tooltip.style.left = x_pos + "px";
       tooltip.style.top = y_pos + "px";
       document.getElementById("tooltip-container").style.visibility = "visible";
   }
   else if(current === ""){
       document.getElementById("tooltip-container").style.visibility = "hidden";  
   }
}

function extract_elmnts() {
   if($("#apply-actn-btn").prop("disabled", false) && $(".save-actn-btn").prop("disabled", true)){
       var temp = {};
       temp.xpath = path;
       temp.startPoint = window.getSelection().anchorOffset;
       temp.endPoint = parseInt(temp.startPoint)+window.getSelection().toString().length;
       temp.data = window.getSelection().toString();
       target_elems_data["list"+id].push(temp);
       alert(JSON.stringify(temp, null, 2));
       highlight_selection();
   }
   else{
       alert("Please save the previous applied action and then select the nodes..!");   
   }
}

function highlight_selection() {
   var target = "target"+id;
   var range = window.getSelection().getRangeAt(0);
   var span = document.createElement("span");
   span.className = "anno"+" "+target;
   span.setAttribute("style", "background-color: yellow;");
   span.appendChild(range.extractContents());
   range.insertNode(span);
}

function view_node_list() {
   if(target_elems_data["list"+id].length === 0){
       alert("Nodes are not yet selected..!");
   }
   else{
       alert(JSON.stringify(target_elems_data, null, 2));
   }
}


function apply_struct_actn() {
   var actn_functns = {
      "addtxt" : add_node,
      "addimg" : addimg_node,
      "addyt"  : addyt_node,
      "addnote": addnote_node,
      "addlink": addlink_node,
      "lang-prcs": lang_translation
   }; 
   if(target_elems_data["list"+id].length === 0){
         alert("Please select the nodes..!");
   }
   else{
         var selctd_actn = document.getElementById("struct-actns-list").value;
         switch(selctd_actn){
           case "addtxt": case "addimg": case "addyt": case "addnote":
              var src = document.getElementById("src-loc").value;
              if(src === ""){
                 alert("Please enter all fields..!");
              }
              else{
                 $("#apply-actn-btn").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
                 $("#struct-actns-list").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
                 $("#struct-actns-attrs-list *").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
                 actn_functns[selctd_actn](selctd_actn, src);
              }
              break;
  
           case "addlink": 
              var src = document.getElementById("src-loc").value;
              var link_txt = document.getElementById("link-txt").value;
              if(src === "" || link_txt === ""){
                 alert("Please enter all fields..!");
              }
              else{
                 $("#apply-actn-btn").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
                 $("#struct-actns-list").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
                 $("#struct-actns-attrs-list *").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
                 actn_functns[selctd_actn](selctd_actn, src, link_txt);    
              }
              break;

           case "lang-prcs":
              var from_lang = $("#select-from-lang").val();
              var to_lang = $("#select-to-lang").val();
              if(from_lang === to_lang){
                  alert("Please check the lang transformation selection..!");
              }else{
                  $("#apply-actn-btn").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
                  $("#struct-actns-list").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
                  actn_functns[selctd_actn](selctd_actn, from_lang, to_lang);
              }
              break;
           
           default:
              console.log("Error in apply_struct_actn function, invalid id"+" "+elmnt_id+" "+"..!");      
       }
   }
}

function apply_styling_actn() {
   if(target_elems_data["list"+id].length === 0){
       alert("Please select the nodes..!");
   } 
   else{
       $("#apply-actn-btn").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
       var fontfamily = document.getElementById("fontfamily-list").value;
       var fontweight = document.getElementById("fontweight-list").value; 
       var fontstyle = document.getElementById("fontstyle-list").value; 
       var textcolor = document.getElementById("textcolors-list").value;
       var fontsize = document.getElementById("fontsize-list").value; 
       var oprtn = "oprtn"+id;
       var span = document.createElement("span");      
       span.className = "anno"+" "+oprtn;
       span.setAttribute("style", "font-family:"+fontfamily+";"+"font-weight:"+fontweight+";"+"font-style:"+fontstyle+";"+"color:"+textcolor+";"+"font-size:"+fontsize+";");
       var target_elem = document.getElementsByClassName("target"+id);
       $(target_elem).wrap(span);   
       alert("Styling applied on selected elements..! Save to perform other operations");
       $(".save-actn-btn").prop("disabled", false).css({"opacity":"1", "cursor":"auto !important"});
    } 
}

function change_semantics_temp() {
  $("#user-defined-actns-fields *").prop("disabled", true).css({"opacity":0.4, "cursor":"none"});
  $("#semantic-actns").change(function(){
      var selctd_actn = document.getElementById("semantic-actns").value;
      if(selctd_actn === "pre-defined"){
          $("#user-defined-actns-fields *").prop("disabled", true).css({"opacity":0.4, "cursor":"none"});  
      } 
      else if(selctd_actn === "user-defined"){
          $("#user-defined-actns-fields *").prop("disabled", false).css({"opacity":1, "cursor":"auto"});
      }     
   });
}
 
function apply_semantics_actn() {
   var selctd_actn = document.getElementById("semantic-actns");
   var selctd_actn_txt = selctd_actn.options[selctd_actn.selectedIndex].text;
   if(selctd_actn.value === "pre-defined"){
         if(selctd_actn_txt === "Currency"){
            currency_conversion();  
         }
         else if(selctd_actn_txt === "Date"){
            date_conversion();
         }  
   } 
   else if(selctd_actn.value === "user-defined"){
         $("#apply-actn-btn").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
         $("#semantic-actns").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
         $("#user-defined-actns-fields *").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
         var custm_tag = document.getElementById("custm-tag").value;
         var custom_src = document.getElementById("custm-src").value;
         var custom_handler = document.getElementById("custm-handler").value;
         if(custm_tag === ""||custom_src === ""||custom_handler === ""){
            alert("Please enter all fields..!");
         }   
         else{
            $.getScript(custom_src, function(){
               console.log("Semantics action: Request to script file success..!");
            })
            .done(function(script, jqxhr, textStatus) {
               var fn = window[custom_handler];
               fn();
               $(".save-actn-btn").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
            })
            .fail(function(jqxhr, textStatus, error) {
               var err = textStatus + " "+ jqxhr.status;
               console.log("Semantics action: Request to script file failed: " + ", " + err);
               $("#apply-actn-btn").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
               $("#semantic-actns").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
               $("#user-defined-actns-fields *").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
            })
            .always(function() {
               console.log("Semantics action: Request to script file complete");
            });
         }  
    }
}

function save_actn(elmnt_id) {
   var ac_pair_stmnt = {};
   var pgxform_stmnt = {
                           "loc":      {
                                       },
                           "ac_pair":  [
                                       ] 
                       };                       
   if(elmnt_id === "save-struct-actn-btn"){
       save_struct_actn(elmnt_id, ac_pair_stmnt, pgxform_stmnt);
   }
   else if(elmnt_id === "save-styling-actn-btn"){
       save_styling_actn(elmnt_id, ac_pair_stmnt, pgxform_stmnt);
   }
   else if(elmnt_id === "save-semantics-actn-btn"){
       save_semantics_actn(elmnt_id, ac_pair_stmnt, pgxform_stmnt);
   }        
}

function save_struct_actn(elmnt_id, ac_pair_stmnt, pgxform_stmnt) {
   var selctd_actn = document.getElementById("struct-actns-list").value;
   switch(selctd_actn){
        case "addtxt": case "addimg": case "addyt": case "addnote":
             var src = document.getElementById('src-loc').value;
             ac_pair_stmnt[selctd_actn] = {};
             ac_pair_stmnt[selctd_actn]["id"] = id;
             ac_pair_stmnt[selctd_actn]["srcloc"] = src;
             update_sss_pgxform(elmnt_id, ac_pair_stmnt, pgxform_stmnt);
             $("#apply-actn-btn").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
             $(".save-actn-btn").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
             $("#struct-actns-list").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
             $("#struct-actns-attrs-list *").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
             id += 1;
             target_elems_data["list"+id] = [];
             break;

        case "addlink":
             var src = document.getElementById('src-loc').value;
             var link_txt = document.getElementById('link-txt').value;
             ac_pair_stmnt[selctd_actn] = {};
             ac_pair_stmnt[selctd_actn]["id"] = id;
             ac_pair_stmnt[selctd_actn]["srcloc"] = src;
             ac_pair_stmnt[selctd_actn]["text"] = linktxt;
             update_sss_pgxform(elmnt_id, ac_pair_stmnt, pgxform_stmnt);
             $("#apply-actn-btn").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
             $(".save-actn-btn").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
             $("#struct-actns-list").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
             $("#struct-actns-attrs-list *").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
             id += 1;
             target_elems_data["list"+id] = [];
             break;

        case "lang-prcs":
             var from_lang = document.getElementById('select-from-lang').value;
             var to_lang = document.getElementById('select-to-lang').value;
             if(from_lang === to_lang){
                 alert("Please check the lang transformation selection..!");   
             }
             else{
                 ac_pair_stmnt[selctd_actn] = {};
                 ac_pair_stmnt[selctd_actn]["id"] = id;
                 ac_pair_stmnt[selctd_actn]["from_lang"] = from_lang;
                 ac_pair_stmnt[selctd_actn]["to_lang"] = from_lang;
                 update_sss_pgxform(elmnt_id, ac_pair_stmnt, pgxform_stmnt);
                 $("#apply-actn-btn").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
                 $(".save-actn-btn").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
                 $("#struct-actns-list").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
                 id += 1;
                 target_elems_data["list"+id] = []; 
             }
             break;

        default:
             console.log("Error in save_struct_actn function, invalid id"+" "+elmnt_id+" "+"..!");
    }   
}

function save_styling_actn(elmnt_id, ac_pair_stmnt, pgxform_stmnt) {
   var fontfamily = document.getElementById("fontfamily-list").value;
   var fontweight = document.getElementById("fontweight-list").value; 
   var fontstyle = document.getElementById("fontstyle-list").value; 
   var textcolor = document.getElementById("textcolors-list").value;
   var fontsize = document.getElementById("fontsize-list").value;
   ac_pair_stmnt["modelm"] = {};
   ac_pair_stmnt["modelm"]["id"] = id;
   ac_pair_stmnt["modelm"]["fontfamily"] = fontfamily;
   ac_pair_stmnt["modelm"]["fontweight"] = fontweight;
   ac_pair_stmnt["modelm"]["fontstyle"] = fontstyle;
   ac_pair_stmnt["modelm"]["textcolor"] = textcolor;
   ac_pair_stmnt["modelm"]["fontsize"] = fontsize;
   update_sss_pgxform(elmnt_id, ac_pair_stmnt, pgxform_stmnt);
   $("#apply-actn-btn").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
   $(".save-actn-btn").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
   id += 1;
   target_elems_data["list"+id] = [];
}

function save_semantics_actn(elmnt_id, ac_pair_stmnt, pgxform_stmnt) {
   var selctd_actn = document.getElementById("semantic-actns");
   var selctd_actn_txt = selctd_actn.options[selctd_actn.selectedIndex].text;
   if(selctd_actn.value === "pre-defined"){
       if(selctd_actn_txt === "Currency"){
            ac_pair_stmnt["currency_conv"] = {};
            ac_pair_stmnt["currency_conv"]["id"] = id;
            ac_pair_stmnt["currency_conv"]["from_cur"] = from_curncy;
            ac_pair_stmnt["currency_conv"]["to_cur"] = to_curncy;
        }
    } 
    else if(selctd_actn.value === "user-defined"){
        var custom_tag = document.getElementById("custm-tag").value;
        var custom_src = document.getElementById("custm-src").value;
        var custom_handler = document.getElementById("custm-handler").value;
        ac_pair_stmnt["user_defined"] = {};
        ac_pair_stmnt["user_defined"]["id"] = id;
        ac_pair_stmnt["user_defined"]["custom_tag"] = custom_tag;
        ac_pair_stmnt["user_defined"]["custom_src"] = custom_src;
        ac_pair_stmnt["user_defined"]["custom_handler"] = custom_handler;
    }
    update_sss_pgxform(elmnt_id, ac_pair_stmnt, pgxform_stmnt);
    if(selctd_actn.value === "user-defined"){
        $("#user-defined-actns-fields *").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
    }
    $("#semantic-actns").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
    $("#apply-actn-btn").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
    $(".save-actn-btn").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
    id += 1;
    target_elems_data["list"+id] = [];
}

function update_sss_pgxform(elmnt_id, ac_pair_stmnt, pgxform_stmnt) {
   if(elmnt_id === "save-semantics-actn-btn"){
      target_elems_data["list"+id].push( {"xpath": "/body"} );
   }
   pgxform_stmnt["loc"]["node"] = target_elems_data["list"+id];
   pgxform_stmnt["ac_pair"].push(ac_pair_stmnt);
   sss["pgxform"].push(pgxform_stmnt);
   alert("Saved action in ADM..!");
}

function check_modifications(elmnt_id) {
   var pgxform_length = sss["pgxform"].length;
   if(pgxform_length === 0){
       alert("No modifications to save...!");
   }
   // else if($("#apply-actn-btn").prop("disabled", true) && $(".save-actn-btn").prop("disabled", false)){
   //     alert("Please save the previously applied action and then do other operations..!");
   // }
   else{
       show_renform(elmnt_id);
   }
}

function update_sss_metadata(renarrator_id, sss_name, sss_id, sss_desc) {
   var urlParams = new URLSearchParams(window.location.search);
   sss.metadata["renurl"] = urlParams.get('foruri');  
   sss.metadata["renarratorid"] = renarrator_id; 
   sss.metadata["sssname"] = sss_name;
   sss.metadata["sssid"] = sss_id;
   sss.metadata["sssdesc"] =  sss_desc;
}

function update_sss_ssscrite(usrname, usrid, community_name, community_id) {
   sss.ssscrite["username"] = usrname;
   sss.ssscrite["userid"] = usrid;
   sss.ssscrite["cmntyname"] = community_name;
   sss.ssscrite["cmntyid"] = community_id;
}

function save_sss() {
   $.ajax(
       {
          url: config_data["URLS"]["SSS_DB_API_URL"],
          type: "POST",
          data: JSON.stringify(sss),
          dataType: 'json',
          async: false,
          contentType: 'application/json; charset=utf-8',
          success: function(res) {
              console.log(JSON.stringify(res)); 
              alert("Changes on page are saved successfully..! ☺️");
          }
       }
   );
}

function validate_sss_infoform() {
   var rennarator_id = document.getElementById("renarrator-id").value;
   var sss_name = document.getElementById("sss-name").value;
   var sss_id = document.getElementById("sss-id").value;
   var sss_desc = document.getElementById("sss-desc").value;
   var usrname = document.getElementById("sss-username").value;
   var usrid = document.getElementById("sss-userid").value;
   var community_name = document.getElementById("sss-cmntyname").value;
   var community_id = document.getElementById("sss-cmntyid").value;
   if(rennarator_id === "" || sss_name === "" || sss_id === "" || sss_desc === "" || usrname === "" || usrid === ""|| community_name === "" || community_id === ""){
       alert("All fields are required..!");
   }
   else{
       update_sss_metadata(rennarator_id, sss_name, sss_id, sss_desc);
       update_sss_ssscrite(usrname, usrid, community_name, community_id);
       alert("Form is successfully submitted..! ☺️");
       alert(JSON.stringify(sss, null, 2));
       save_sss();
   }
}


function add_node(struct_actn, new_text){
   var oprtn = 'oprtn'+id;
   switch(struct_actn){
      case "addtxt": case "addlink":
         var span = "<span style='background-color:#c5efc5 !important;font-weight:bold;' class='anno"+" "+oprtn+"' >"+' '+new_text+"</span>";
      case "addimg": case "addyt": case "addnote":
         var span = "<span class='anno"+" "+oprtn+"' >"+' '+new_text+"</span>";
   }
   var target_elem = document.getElementsByClassName("target"+id);
   $(target_elem).append(span);
   alert(struct_actn+" "+"action applied on selected xpaths..! Save to perform other operations");
   $(".save-actn-btn").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
}

function addimg_node(struct_actn, img_src){
   var img_node = '<img src="'+img_src+'">';
   add_node(struct_actn, img_node);
}

function addyt_node(struct_actn, vdo_id){
   var embedHTML = '<iframe width="360" height="215" src="https://www.youtube.com/embed/'+vdo_id+'" frameborder="0" allowfullscreen></iframe>';
   add_node(struct_actn, embedHTML);
}

function addlink_node(struct_actn, url, text){
   var linkHTML = '<a href="'+url+'" target="_blank">'+text+'</a>';
   add_node(struct_actn, linkHTML);
}

function addnote_node(struct_actn, note_text){
   var cont_style ='width: 960px;margin: 100px auto;';
   var note_style = 'float:left;margin: auto;width: 300px;background: yello;background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#EBEB00), to(#C5C500));background: -moz-linear-gradient(100% 100% 90deg, #C5C500, #EBEB00);padding: 20px 20px 20px 20px;-webkit-box-shadow: 0px 10px 30px #000;-moz-box-shadow: 0px 10px 30px #000';
   var noteHTML = '<div id="note_container" class="anno" style="'+cont_style+'"><div class="stick_note anno" style="'+note_style+'"><p class="anno">'+note_text+'</div></div></div>';
   add_node(struct_actn, noteHTML);
}

function lang_translation(sruct_actn, from, to) {
   var langtrans_list = [];
   var url = config_data["URLS"]["LANG_TRANS_API_URL"];
   var target_elems = document.getElementsByClassName("target"+id);
   for(var elmnt of target_elems){
        var str_to_translate = elmnt.innerText;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.send(JSON.stringify( {"sentence":str_to_translate, "from-language":from, "to-language":to} ));
        xhr.onreadystatechange = function() {
           if(this.readyState === 4 && this.status === 200){
              var res = this.responseText;
              langtrans_list.push(res);
              if(langtrans_list.length === target_elems.length){
            	  var oprtn = 'oprtn'+id;
                  for(var i = 0, max = target_elems.length; i < max; i++){
		      var span = "<span style='background-color:#c5efc5 !important;font-weight:bold;' class='anno"+" "+oprtn+"' >"+' '+langtrans_list[i]+"</span>";
      	              $(target_elems[i]).append(span);
	          }
              } 
              $(".save-actn-btn").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
           }
           else if(this.readyState !== 4 && this.status !== 200) {
           $("#apply-actn-btn").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
              $("#struct-actns-list").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});
              $("#struct-actns-attrs-list *").prop("disabled", false).css({"opacity":1, "cursor":"auto !important"});           
              alert("Problem performing language translation..!");
           }
       } 
   }
}

function currency_conversion() {
   $.getJSON(config_data["IP_TRACKING_API_URL"], function() {
       console.log("Request to IP tracking API success..!");
   })
   .done(function(response, jqxhr, textStatus){
       to_curncy = response.country_code;
       autotag_curncy(to_curncy); 
    })
   .fail(function(jqxhr, textStatus, error) {
       var err = textStatus + " "+ jqxhr.status;
       console.log("Request to IP tracking API failed: " + ", " + err);    
       alert("Problem performing currency conversion..!");
    });
}

var autotag_curncy = function(to_curncy) {
    var curncy_reg_exps = {
       "USD": [ /(\$)(\.| )*[0-9]+(\.)*[0-9]*(\/\-)*(USD)*/g ]
    }
    
    var all = document.getElementsByTagName("body");
    for(var i = 0, max = all.length; i < max; i++) {
        var elm_str = all[i].innerHTML;
        for(var key in curncy_reg_exps ){
            var reg_exp_list = curncy_reg_exps[key];
            reg_exp_list.forEach(function(exp) {
               if(elm_str.match(exp)){
                  from_curncy = key;
                  var matched_pattern_list = elm_str.match(exp);
                  matched_pattern_list.forEach(function(matched_pattern) {  
                     var str_to_replace = elm_str.replace(matched_pattern, '<curncy class="cur_conv" 	style="background-color:yellow" >'+matched_pattern+'</curncy>');
	             elm_str = str_to_replace;
                     all[i].innerHTML= str_to_replace;
                  });
	       } 
            });
        }
     }
      
     var cur_conv_elems = document.getElementsByClassName('cur_conv');
     if(cur_conv_elems.length === 0 ){
         alert("Currency conversion is not applicable for this page..!");
     }
     else{
        $("#apply-actn-btn").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
        $("#semantic-actns").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
        convert_curncy(from_curncy, to_curncy);
     }
}

var convert_curncy = function(from_curncy, to_curncy) {
   var cur_res_list = [];
   var url = config_data["URLS"]["CURR_CONV_API_URL"];
   var target_elems = document.getElementsByClassName("cur_conv");
   for(var elmnt of target_elems){
       var str = elmnt.innerText;
       var cur_to_translate = parseFloat(str.replace(/\$/g, '')); 
       var xhr = new XMLHttpRequest();
       xhr.open("POST", url, true);
       xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
       xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
       xhr.send(JSON.stringify( {"currency-amount":cur_to_translate, "from-currency":from_curncy, "to-currency":to_curncy} ));
       xhr.onreadystatechange = function() {
          if(this.readyState === 4 && this.status === 200){
              var res = this.responseText;
              cur_res_list.push(res);
              if(cur_res_list.length === target_elems.length){
            	 var oprtn = 'oprtn'+id;
                  for(var i = 0, max = target_elems.length; i < max; i++){
		       var span = "<span style='background-color:#c5efc5 !important;font-weight:bold;' class='anno"+" "+oprtn+"' >"+' '+cur_res_list[i]+"</span>";
      	               $(target_elems[i]).append(span);
	          }
              }
              $(".save-actn-btn").prop("disabled", false).css({"opacity":1, "cursor": "auto !important"});
          }
          else if(this.readyState !== 4 && this.status !== 200){
              alert("Problem performing currency conversion..!");
              $("#semantic-actns").prop("disabled", false).css({"opacity":1, "cursor": "auto !important"});
              $("#apply-actn-btn").prop("disabled", false).css({"opacity":1, "cursor": "auto !important"});
              $(".save-actn-btn").prop("disabled", true).css({"opacity":0.4, "cursor":"pointer !important"});
          }
      }
   }
}
