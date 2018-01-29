!function(e){"use strict";AWEContent.Models.DividerItem=AWEContent.Models.Item.extend({defaults:{machine_name:"divider",textContent:"Divider text here",borderStyle:"dotted",borderColor:"#ccc",borderWeight:0,widthDivider:0,"with":"text",fontFamily:"",fontStyle:"",fontSize:-1,lineHeight:-1,letterSpacing:-1,color:"",contentBackground:"",contentHeight:30,contentWidth:200,contentBorder:{},nameIcon:"ic ac-icon-help",iconFontSize:-1,margin:{},customID:"",customClass:"",customEnableAttributes:0,customDataAttributes:"[] ",customActionAttributes:'{"newAction": "", "newAttrName": "", "newAttrValue": ""}',customEnableAnimations:0,customDataAnimations:'{"type": "none"}',lgResponsive:!0,xsResponsive:!0,mediumResponsive:!0,smResponsive:!0},createView:function(){this.view=new AWEContent.Views.DividerItem({model:this})},relations:[{type:Backbone.HasOne,key:"margin",relatedModel:AWEContent.Models.BoxModelSettings},{type:Backbone.HasOne,key:"contentBorder",relatedModel:AWEContent.Models.BoxModelSettings}],clone:function(){var t={};return e.each(this.toJSON(),function(e,i){t[e]=i}),t.margin=new AWEContent.Models.BoxModelSettings(t.margin),new AWEContent.Models.DividerItem(t)}}),AWEContent.Views.DividerItem=AWEContent.Views.Item.extend({initialize:function(){AWEContent.Views.Item.prototype.initialize.call(this),this.listenTo(this.model.get("margin"),"change",this.applySettingsChanged),this.listenTo(this.model.get("contentBorder"),"change",this.applySettingsChangedBorder)},renderItemContent:function(){var t=this,i=e('<div class="obj-content awe-item awe-divider">                <div class="divider-field">                    <span class="divider-left"><span class="line-divider"></span></span>                    <span class="text-divider"><div class="content" contenteditable="true" ></div></span>                    <span class="divider-right"><span class="line-divider"></span></span>                </div>                </div>'),n=t.model.toJSON(),o=(e(".divider-left",i),e(".divider-right",i)),s=e(".text-divider .content",i),a=e(".line-divider",i),d=e(".text-divider",i);t.iframeJQuery(this.el).delegate(".awe-divider","itemReady",function(){var i,n;t.iframeJQuery(".text-divider .content",this).hallo({plugins:{halloformat:{}},editable:!0,create:function(){this.addEventListener("paste",function(e){e.preventDefault();var t=e.clipboardData.getData("text/plain");AWEContent.documentIframe.execCommand("insertHTML",!1,t)})},activated:function(t){i=e(t.target).height()},deactivated:function(o){t.changeContent(o),n=e(o.target).height(),i!=n&&t.resizeItem()}})});var l={"font-size":-1==n.fontSize?"":n.fontSize+"px","line-height":-1==n.lineHeight?"":n.lineHeight+"px","letter-spacing":-1==n.letterSpacing?"":n.letterSpacing+"px"};if(n.fontStyle&&(l=e.extend({},l,JSON.parse(n.fontStyle))),s.html(n.textContent).css(l).addClass(n.fontFamily.replace(/ /g,"")),"none"==n["with"])s.parent().hide(),o.hide();else switch(d.css({height:-1==n.contentHeight?"":n.contentHeight+"px",width:-1==n.contentWidth?"":n.contentWidth+"px",background:n.contentBackground,color:n.color}),d.renderItemDefaultBoxModel(n.contentBorder),n["with"]){case"text":s.parent().removeClass("center-line-divider center-icon-divider");break;case"line":s.parent().addClass("center-line-divider").removeClass("center-icon-divider");break;case"icon":s.parent().addClass("center-icon-divider").removeClass("center-line-divider").append('<i class="'+n.nameIcon+'"></i>'),d.find("i").css({"font-size":-1==n.iconFontSize?"":n.iconFontSize+"px","line-height":n.contentHeight>0?n.contentHeight+"px":1})}if(a.css({"border-top-style":n.borderStyle,"border-top-color":n.borderColor,"border-top-width":n.borderWeight?n.borderWeight+"px":""}),i.renderItemDefaultAttributes(n.customEnableAttributes,n.customDataAttributes),i.attr("id",n.customID).addClass(n.customClass).renderItemDefaultBoxModel(n.margin),i.css("width",n.widthDivider?n.widthDivider+"px":""),n.customEnableAnimations){var r=n.customDataAnimations;i.processAnimations(r)}return t.$el.defaultResponsive(n),i},changeContent:function(t){var i=e(t.currentTarget).html();this.model.set("textContent",i)},applySettingsChanged:function(t){var i=this,n=e(".awe-divider",i.el),o=e(".line-divider",n),s=e(".text-divider .content",n),a=(e(".divider-left",n),e(".divider-right",n)),d=i.model.toJSON(),l=i.$el.height(),r=e(".text-divider",n);e.each(t.changed,function(e,l){switch(i.$el.changeResponsive(e,l),n.renderChangeSettingBoxModel(e,l,t),console.log(e+":"+l),e){case"borderStyle":o.css("border-top-style",l);break;case"borderColor":o.css("border-top-color",l);break;case"borderWeight":"0"==l?o.css("border-top-width",""):o.css("border-top-width",l+"px");break;case"widthDivider":"0"==l?n.css("width",""):n.css("width",l+"px");break;case"with":switch("none"==l?(r.hide(),a.hide()):(r.show(),a.show()),l){case"text":r.removeClass("center-line-divider center-icon-divider");break;case"line":r.addClass("center-line-divider").removeClass("center-icon-divider");break;case"icon":r.addClass("center-icon-divider").removeClass("center-line-divider"),r.find("i").length||(r.append('<i class="'+d.nameIcon+'"></i>'),r.find("i").css({"font-size":l+"px","line-height":d.contentHeight>0?d.contentHeight+"px":1}))}break;case"contentBackground":r.css("background",l);break;case"contentHeight":r.height(l),"icon"==d["with"]&&r.find("i").css("line-height",l+"px");break;case"contentWidth":r.width(l);break;case"iconFontSize":r.find("i").css("font-size",l+"px");break;case"nameIcon":var c=i.model.previousAttributes().nameIcon;r.find("i").removeClass(c).addClass(l);break;case"fontFamily":var h=i.model.previousAttributes().fontFamily.replace(/ /g,""),u=l.replace(/ /g,"");s.removeClass(h).addClass(u);break;case"fontStyle":var m=l?JSON.parse(l):{"font-weight":"","font-style":""};s.css(m);break;case"fontSize":-1==l?s.css("font-size",""):s.css("font-size",l+"px");break;case"lineHeight":-1==l?s.css("line-height",""):s.css("line-height",l+"px");break;case"letterSpacing":-1==l?s.css("letter-spacing",""):s.css("letter-spacing",l+"px");break;case"color":r.css("color",l);break;case"customID":n.attr("id",l);break;case"customClass":var v=i.model.previousAttributes().customClass;n.removeClass(v).addClass(l);break;case"customEnableAttributes":n.renderChangeSettingsAttributes(e,l,d.customDataAttributes);break;case"customActionAttributes":n.renderChangeSettingsAttributes(e,l);break;case"customEnableAnimations":var g,p;l?(g=d.customDataAnimations,p=null,n.processAnimations(g)):(g=null,p=d.customDataAnimations,n.processAnimations(g,p));break;case"customDataAnimations":var g,p;g=d.customDataAnimations,p=i.model.previousAttributes().customDataAnimations,n.processAnimations(g,p)}}),setTimeout(function(){i.checkChangeHeight(l)},50)},applySettingsChangedBorder:function(t){var i=this;e.each(t.changed,function(n,o){e(".text-divider",i.el).renderChangeSettingBoxModel(n,o,t)})}}),AWEContent.Views.DividerItemController=AWEContent.Views.ItemController.extend({machineName:"divider",controllerHtml:function(){return'<div class="title-icon">Divider</div><i class="ic ac-icon-divider"></i>'},createItemModel:function(e){var t;return void 0!=e?(t=new AWEContent.Models.BoxModelSettings(e.margin),e.boxModelSettings=t,new AWEContent.Models.DividerItem(e)):new AWEContent.Models.DividerItem({margin:new AWEContent.Models.BoxModelSettings})}}),AWEContent.Views.DividerPanel=AWEContent.Views.ItemPanel.extend({tagName:"div",className:"awe-obj-panel panel-divider",panelName:"divider",initPanel:function(){AWEContent.Views.ItemPanel.prototype.initPanel.call(this);var t=this;e("#divider-style",this.el).change(function(e,i){t.editingModel.set("borderStyle",i.value)}),e("#divider-color",this.el).change(function(e,i){i=i?i.toRgbString():"",t.editingModel.set("borderColor",i)}),e("#divider-height",this.el).change(function(e,i){t.editingModel.set("borderWeight",i.value)}),e("#divider-width",t.el).change(function(e,i){t.editingModel.set("widthDivider",i.value)}),e("#divider-with",this.el).change(function(i,n){"none"==n.value?e("#divider-font, #divider-color-element",t.$el).hide():e("#divider-font, #divider-color-element",t.$el).show(),t.editingModel.set("with",n.value),t.showHideSettings(n.value)}),e("#custom-choose-icons .title-tab",t.el).click(function(){var t=e(this).closest("#custom-choose-icons");AWEContent.Panels.listIconPanel.processIcon(t)}),e("#custom-choose-icons",t.el).change(function(i,n){n&&(t.editingModel.set("nameIcon",n.nameIcon),e(".title-tab > i",this).removeClass().addClass(n.nameIcon))}),e("#divider-custom-size",t.el).change(function(i,n){t.editingModel.set("iconFontSize",n.value),-1==n.value&&e(".display-font",e(this)).text("DF")}),e("#divider-content-background",this.el).change(function(e,i){i=i?i.toRgbString():"",t.editingModel.set("contentBackground",i)}),e("#divider-content-height",this.el).change(function(e,i){t.editingModel.set("contentHeight",i.value)}),e("#divider-content-width",this.el).change(function(e,i){t.editingModel.set("contentWidth",i.value)}),e("#divider-content-border",t.el).initBoxModelPanel(t,"contentBorder"),e("#divider-font",this.$el).bind("fontFamilyChange",function(e,i){t.editingModel.set("fontFamily",i)}).bind("fontStyleChange",function(e,i){t.editingModel.set("fontStyle",i.value)}).bind("fontSizeChange",function(e,i){t.editingModel.set("fontSize",i.value)}).bind("letterSpacingChange",function(e,i){t.editingModel.set("letterSpacing",i.value)}).bind("lineHeightChange",function(e,i){t.editingModel.set("lineHeight",i.value)}),e("#divider-color-element",t.el).change(function(e,i){i=i?i.toRgbString():"",t.editingModel.set("color",i)}),e("#divider-column-box-model",t.el).initBoxModelPanel(t,"margin"),e("#text-divider-custom-id",t.el).change(function(){t.editingModel.set("customID",e(this).val())}),e("#text-divider-custom-class",t.el).change(function(){t.editingModel.set("customClass",e(this).val())}),e("#divider-custom-attributes",this.el).initAttributesPanel(t),e("#divider-animations",this.el).change(function(e,i){t.editingModel.set("customEnableAnimations",i.enabled),i&&t.editingModel.set("customDataAnimations",i.animations)})},setPanelElementsValue:function(){var t=this.editingModel.toJSON();e("#divider-style",this.$el).aweSelect("value",t.borderStyle),e("#divider-color",this.$el).aweColorPicker("value",t.borderColor),e("#divider-height",this.$el).aweSlider("value",t.borderWeight).trigger("change",{isPanel:!0}),e("#divider-width",this.$el).aweSlider("value",t.widthDivider),e("#divider-with",this.el).aweSelect("value",t["with"]),e("#divider-content-background",this.$el).aweColorPicker("value",t.contentBackground),e("#divider-content-height",this.$el).aweSlider("value",t.contentHeight),e("#divider-content-width",this.$el).aweSlider("value",t.contentWidth),e("#divider-content-border",this.$el).initBoxModel(t.contentBorder),e("#custom-choose-icons",this.el).attr("data-name-icon",t.nameIcon),e("#custom-choose-icons i",this.el).removeClass().addClass(t.nameIcon),e("#divider-custom-size",this.el).aweSlider("value",t.iconFontSize),this.showHideSettings(t["with"]),e("#divider-font",this.$el).aweFont("options",{fontFamily:t.fontFamily,fontStyle:t.fontStyle,fontSize:t.fontSize,lineHeight:t.lineHeight,letterSpacing:t.letterSpacing}),e("#divider-color-element",this.$el).aweColorPicker("value",t.color),e("#divider-column-box-model",this.$el).initBoxModel(t.margin),e("#text-divider-custom-id",this.el).val(t.customID),e("#text-divider-custom-class",this.el).val(t.customClass),e("#divider-custom-attributes",this.el).initAttributes(t.customEnableAttributes,t.customDataAttributes),e("#divider-animations",this.el).aweAnimation("value",{enabled:t.customEnableAnimations,animations:t.customDataAnimations,previewEl:this.editingModel.view.$el})},showHideSettings:function(t){t||(t=this.editingModel.get("with")),"none"==t?(e("#divider-content-width",this.el).hide(),e("#divider-content-border",this.el).hide(),e("#divider-content-background",this.el).hide(),e("#divider-content-height",this.el).hide()):(e("#divider-content-background",this.el).show(),e("#divider-content-height",this.el).show(),e("#divider-content-width",this.el).show(),e("#divider-content-border",this.el).show()),"text"!=t&&e("#divider-font").hide(),"icon"==t?(e("#custom-choose-icons",this.el).show(),e("#divider-custom-size",this.el).show()):(e("#custom-choose-icons",this.el).hide(),e("#divider-custom-size",this.el).hide()),e.inArray(t,["icon","text"])>=0?e("#divider-color-element",this.el).show():e("#divider-color-element",this.el).hide()},buildPanel:function(){return{title:{type:"markup",markup:'<div class="awe-title"><h2>Divider</h2></div>'},custom_style:{type:"section",style:{type:"select",title:"Style",options:{solid:"Solid",dotted:"Dotter",dashed:"Dashed"},default_value:"solid"},color:{type:"colorpicker",title:"Color",options:{preferredFormat:"rgb",AlphaVerticle:!0,showAlpha:!0,allowEmpty:!0,showInput:!0}},height:{type:"slider",title:"Height",min_value:0,max_value:100,default_value:12,allow_type:!0,unit:"px"},width:{type:"slider",title:"Width",min_value:0,max_value:1e3,default_value:12,allow_type:!0,unit:"px"}},custom_element:{type:"section","with":{type:"select",title:"With",options:{none:"None",text:"Text",line:"Line",icon:"Icon"},default_value:"text"},custom_choose_icons:{type:"tabs_icon",title:'<div class="title-tab"><span>Choose Icons</span><i class=""></i></div>',tabs:[]},custom_size:{type:"slider",title:"Font Size Icon",min_value:-1,unit:"px",max_value:100,default_value:100,allow_type:!0},color_element:{type:"colorpicker",title:"Color",options:{preferredFormat:"rgb",AlphaVerticle:!0,showAlpha:!0,allowEmpty:!0,showInput:!0}},content_background:{type:"colorpicker",title:"Content Background",options:{preferredFormat:"rgb",AlphaVerticle:!0,showAlpha:!0,allowEmpty:!0,showInput:!0}},content_height:{type:"slider",title:"Content height",min_value:0,max_value:100,default_value:10,allow_type:!0,unit:"px"},content_width:{type:"slider",title:"Content width",min_value:0,max_value:600,default_value:200,allow_type:!0,unit:"px"},content_border:{type:"tabs",tabs:[{tab_title:"Content Border",contents:{custom_border:{type:"box_border",min_value:0,max_value:100,default_value:0}}}]},font:{type:"font",disabledElements:["textAlign"]}},custom_box_model:{type:"section",column_box_model:{type:"tabs",tabs:[{tab_title:"Margin",contents:{custom_margin:{type:"box_model",model_type:"margin",allow_type:!0,min_value:0,max_value:100,default_value:0}}}]}},custom_definitions:{type:"section",custom_id:{type:"text_field",title:"ID",attributes:{placeholder:"wrapper"},default_value:""},custom_class:{type:"text_field",title:"CSS class",attributes:{placeholder:"wrapper"},default_value:""},custom_attributes:{type:"custom_attributes"},animations:{type:"animations"}}}}}),e(document).ready(function(){AWEContent.Controllers.divider=new AWEContent.Views.DividerItemController,AWEContent.Panels.divider=new AWEContent.Views.DividerPanel})}(jQuery);