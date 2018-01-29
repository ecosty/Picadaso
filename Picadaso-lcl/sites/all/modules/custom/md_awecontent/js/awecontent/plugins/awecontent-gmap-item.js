(function(a){AWEContent.Models.GmapItem=AWEContent.Models.Item.extend({iconMarkerURL:"",defaults:{machine_name:"gmap",height:400,zoom:15,mapType:"ROADMAP",style:"style1",latLong:"21.001763, 105.820591",disableScrollZoom:0,enableCustomInfo:0,iconMarker:-1,infoTitle:"",infoDescriptions:"",infoAnimtaion:"none",boxModelSettings:{},customEnableAttributes:0,customID:"",customClass:"",customDataAttributes:"[] ",customActionAttributes:'{"newAction": "", "newAttrName": "", "newAttrValue": ""}',lgResponsive:true,xsResponsive:true,mediumResponsive:true,smResponsive:true},relations:[{type:Backbone.HasOne,key:"boxModelSettings",relatedModel:AWEContent.Models.BoxModelSettings}],createView:function(){this.view=new AWEContent.Views.GmapItem({model:this})},clone:function(){var b={};a.each(this.toJSON(),function(c,d){b[c]=d});b.boxModelSettings=new AWEContent.Models.BoxModelSettings(b.boxModelSettings);return new AWEContent.Models.GmapItem(b)}});AWEContent.Views.GmapItem=AWEContent.Views.Item.extend({initialize:function(){AWEContent.Views.Item.prototype.initialize.call(this);this.listenTo(this.model.get("boxModelSettings"),"change",this.applySettingsChanged)},renderItemContent:function(){var d=this,e=a('<div class="awe-item gmap-wrapper"><div class="gmap-content"></div></div>'),g=e,c=a(".gmap-content",e),f=d.model.toJSON(),b=!isNaN(parseInt(f.iconMarker))?f.iconMarker:-1;AWEContent.Library.addLibrary("googleMap",function(){var h=d.$el.data("init-number");d.$el.data("init-number",h+1);d.$el.trigger("gmapInitializeSuccess")});g.css({display:"block",overflow:"auto"});c.css({height:f.height!=-1?f.height+"px":""}).attr({"data-zoom":f.zoom,"data-style":f.style,"data-latlong":f.latLong,"data-info":f.enableCustomInfo,"data-title":f.infoTitle,"data-description":f.infoDescriptions,"data-icon":f.iconMarker,"data-disscroll":f.disableScrollZoom,id:f.customID});c.renderItemDefaultAttributes(f.customEnableAttributes,f.customDataAttributes);c.renderItemDefaultBoxModel(f.boxModelSettings);d.$el.defaultResponsive(f);d.$el.data("init-number",0);d.$el.aweImageURL({fid:[b],styles:["none"],success:function(i,l,j,h){var k=d.$el.data("init-number");d.model.iconMarkerURL=(b>0&&h[b]["none"])?h[b]["none"]:"";c.attr("data-icon",d.model.iconMarkerURL);d.$el.data("init-number",k+1);d.$el.trigger("gmapInitializeSuccess")}});d.$el.bind("gmapInitializeSuccess",function(h){if(d.$el.data("init-number")===2){d.$el.data("init-number",0);d.loadMap(c)}});return e},loadMap:function(c){var b=this,d;d=setInterval(function(){var g=b.model.toJSON(),h=g.enableCustomInfo,e=g.latLong.split(","),f;if(b.$el.parent().is(":visible")&&AWEContent.windowIframe.google.maps.LatLng!=undefined){clearInterval(d);f={zoom:parseInt(g.zoom),center:new AWEContent.windowIframe.google.maps.LatLng(e[0],e[1]),mapTypeId:AWEContent.windowIframe.google.maps.MapTypeId[g.mapType],mapTypeControl:false};b.map=new AWEContent.windowIframe.google.maps.Map(c[0],f);var i=b.model.iconMarkerURL;b.marker=new AWEContent.windowIframe.google.maps.Marker({map:b.map,title:"Click to show info",icon:i,position:new AWEContent.windowIframe.google.maps.LatLng(e[0],e[1]),animation:g.infoAnimation!="none"?AWEContent.windowIframe.google.maps.Animation[g.infoAnimation]:null});b.infowindow=new AWEContent.windowIframe.google.maps.InfoWindow({content:'<h2 style="color: #333;">'+g.infoTitle+'</h2><p style="color: #555;">'+g.infoDescriptions+"</p>"});b.styles={style1:[{featureType:"landscape",stylers:[{saturation:-100},{lightness:65},{visibility:"on"}]},{featureType:"poi",stylers:[{saturation:-100},{lightness:51},{visibility:"simplified"}]},{featureType:"road.highway",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"road.arterial",stylers:[{saturation:-100},{lightness:30},{visibility:"on"}]},{featureType:"road.local",stylers:[{saturation:-100},{lightness:40},{visibility:"on"}]},{featureType:"transit",stylers:[{saturation:-100},{visibility:"simplified"}]},{featureType:"administrative.province",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"labels",stylers:[{visibility:"on"},{lightness:-25},{saturation:-100}]},{featureType:"water",elementType:"geometry",stylers:[{hue:"#ffff00"},{lightness:-25},{saturation:-97}]}],style2:[{featureType:"water",stylers:[{visibility:"on"},{color:"#acbcc9"}]},{featureType:"landscape",stylers:[{color:"#f2e5d4"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#c5c6c6"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#e4d7c6"}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#fbfaf7"}]},{featureType:"poi.park",elementType:"geometry",stylers:[{color:"#c5dac6"}]},{featureType:"administrative",stylers:[{visibility:"on"},{lightness:33}]},{featureType:"road"},{featureType:"poi.park",elementType:"labels",stylers:[{visibility:"on"},{lightness:20}]},{},{featureType:"road",stylers:[{lightness:20}]}],style3:[{featureType:"water",stylers:[{color:"#46bcec"},{visibility:"on"}]},{featureType:"landscape",stylers:[{color:"#f2f2f2"}]},{featureType:"road",stylers:[{saturation:-100},{lightness:45}]},{featureType:"road.highway",stylers:[{visibility:"simplified"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels.text.fill",stylers:[{color:"#444444"}]},{featureType:"transit",stylers:[{visibility:"off"}]},{featureType:"poi",stylers:[{visibility:"off"}]}],style4:[{featureType:"water",elementType:"geometry",stylers:[{color:"#000000"},{lightness:17}]},{featureType:"landscape",elementType:"geometry",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"road.highway",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:17}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:29},{weight:0.2}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#000000"},{lightness:18}]},{featureType:"road.local",elementType:"geometry",stylers:[{color:"#000000"},{lightness:16}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#000000"},{lightness:21}]},{elementType:"labels.text.stroke",stylers:[{visibility:"on"},{color:"#000000"},{lightness:16}]},{elementType:"labels.text.fill",stylers:[{saturation:36},{color:"#000000"},{lightness:40}]},{elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit",elementType:"geometry",stylers:[{color:"#000000"},{lightness:19}]},{featureType:"administrative",elementType:"geometry.fill",stylers:[{color:"#000000"},{lightness:20}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#000000"},{lightness:17},{weight:1.2}]}]};b.map.setOptions({styles:b.styles.style1});if(g.disableScrollZoom){b.map.setOptions({scrollwheel:false})}else{b.map.setOptions({scrollwheel:true})}AWEContent.windowIframe.google.maps.event.addListener(b.map,"zoom_changed",function(){b.changeSettingMap(b.map)});AWEContent.windowIframe.google.maps.event.addListener(b.marker,"click",function(){b.infowindow.open(b.map,b.marker);if(b.marker.getAnimation()!=null){b.marker.setAnimation(null)}else{b.marker.setAnimation(google.maps.Animation.BOUNCE)}});if(!h){b.marker.setMap(null)}}},100)},changeSettingMap:function(c){var b=c.getZoom();if(AWEContent.Panels.gmap.editingModel){a("#gmap-zoom",AWEContent.Panels.gmap.el).aweSlider("value",b)}else{this.model.set("zoom",b)}},applySettingsChanged:function(e,d){var c=this,f=c.model.toJSON(),b=a(".gmap-content",c.$el),g=c.$el.height();a.each(e.changedAttributes(),function(j,k){c.$el.changeResponsive(j,k);b.renderChangeSettingBoxModel(j,k,e);switch(j){case"height":k==-1?b.css("height",""):b.css("height",k+"px");AWEContent.windowIframe.google.maps.event.trigger(c.map,"resize");break;case"zoom":if(c.map){if(a.type(k)==="string"){k=parseInt(k)}b.attr("data-zoom",k);c.map.setZoom(k)}break;case"infoDescriptions":b.attr("data-description",k);c.infowindow.setContent('<h2 style="color: #333;">'+f.infoTitle+'</h2><p style="color: #555;">'+f.infoDescriptions+"</p>");break;case"infoTitle":b.attr("data-title",k);c.infowindow.setContent('<h2 style="color: #333;">'+f.infoTitle+'</h2><p style="color: #555;">'+f.infoDescriptions+"</p>");break;case"enableCustomInfo":b.attr("data-info",k);if(k){c.marker.setMap(c.map)}else{c.marker.setMap(null)}break;case"iconMarker":b.attr("data-icon",c.model.iconMarkerURL);c.marker.setIcon(c.model.iconMarkerURL);c.marker.setMap(c.map);break;case"infoAnimation":if(f.enableCustomInfo&&c.marker){if(k!="none"){c.marker.setAnimation(AWEContent.windowIframe.google.maps.Animation[k])}else{c.marker.setAnimation(null)}}break;case"mapType":c.map.setOptions({mapTypeId:google.maps.MapTypeId[k]});break;case"style":b.attr("data-style",k);c.map.setOptions({styles:c.styles[k]});break;case"latLong":var m=k.split(","),h=new AWEContent.windowIframe.google.maps.LatLng(m[0],m[1]);b.attr("data-latlong",k);c.marker.setPosition(h);c.map.setCenter(h);break;case"disableScrollZoom":var i=k?false:true;b.attr("data-disscroll",i);c.map.setOptions({scrollwheel:i});break;case"customClass":var l=c.model.previousAttributes().customClass;b.removeClass(l).addClass(k);break;case"customID":b.attr("id",k);break;case"customEnableAttributes":b.renderChangeSettingsAttributes(j,k,f.customDataAttributes);break;case"customActionAttributes":b.renderChangeSettingsAttributes(j,k);break}});setTimeout(function(){c.checkChangeHeight(g)},50)}});AWEContent.Views.GmapItemController=AWEContent.Views.ItemController.extend({machineName:"gmap",controllerHtml:function(){return'<div class="title-icon">Google maps</div><i class="ic ac-icon-map"></i>'},createItemModel:function(b){var c;if(b!=undefined){c=new AWEContent.Models.BoxModelSettings(b.boxModelSettings);b.boxModelSettings=c;return new AWEContent.Models.GmapItem(b)}return new AWEContent.Models.GmapItem({boxModelSettings:new AWEContent.Models.BoxModelSettings()})}});AWEContent.Views.GmapPanel=AWEContent.Views.ItemPanel.extend({tagName:"div",className:"awe-obj-panel panel-gmap",panelName:"gmap",initPanel:function(){AWEContent.Views.ItemPanel.prototype.initPanel.call(this);var b=this;a("#gmap-height",b.$el).change(function(d,c){b.editingModel.set("height",c.value);if(c.value==-1){a(".display-font",a(this)).text("DF")}});a("#gmap-zoom",b.$el).change(function(d,c){b.editingModel.set("zoom",c.value)});a("#gmap-enter-link input",b.$el).change(function(){b.editingModel.set("latLong",a(this).val())});a("#gmap-map-type",this.$el).change(function(d,c){b.editingModel.set("mapType",c.value)});a("#gmap-select-type",this.$el).change(function(d,c){b.editingModel.set("style",c.value)});a("#gmap-scroll-zoom input",b.$el).change(function(c,d){if(!d){b.editingModel.set("disableScrollZoom",parseInt(a(this).val()))}});a("#gmap-custom-info-active input",b.$el).change(function(d,c){if(!c){var e=b.editingModel.set("enableCustomInfo",parseInt(a(this).val()));if(b.editingModel.get("enableCustomInfo")==1){a("#gmap-custom-info-active",b.el).nextAll().show()}else{a("#gmap-custom-info-active",b.el).nextAll().hide()}}});a("#gmap-custom-info-marker .img-bg",b.$el).change(function(){var c=a("> input",this).val().trim(),d=c?JSON.parse(c):{fid:-1,file_url:""};b.editingModel.iconMarkerURL=d.file_url;b.editingModel.set("iconMarker",d.fid)});a("#text-gmap-custom-info-title",b.$el).change(function(){b.editingModel.set("infoTitle",a(this).val())});a("#textarea-gmap-custom-info-description",b.$el).change(function(){b.editingModel.set("infoDescriptions",a(this).val())});a("#gmap-custom-info-animation",this.$el).change(function(d,c){b.editingModel.set("infoAnimation",c.value)});a("#gmap-custom-id input",this.$el).change(function(){b.editingModel.set("customID",a(this).val())});a("#gmap-custom-class input",this.$el).change(function(){b.editingModel.set("customClass",a(this).val())});a("#gmap-column-box-model",b.el).initBoxModelPanel(b,"boxModelSettings");a("#gmap-custom-attributes",this.el).initAttributesPanel(b)},setPanelElementsValue:function(){var b=this,d=b.editingModel.toJSON(),c=!isNaN(parseInt(d.iconMaker))?d.iconMaker:-1;a("#gmap-height",b.el).aweSlider("value",d.height);a("#gmap-zoom",b.el).aweSlider("value",d.zoom);a("#gmap-enter-link #text-gmap-enter-link",b.$el).val(d.latLong);a("#gmap-map-type",b.el).aweSelect("value",d.mapType);a("#gmap-select-type",b.el).aweSelect("value",d.style);a("#gmap-scroll-zoom input",b.el).val(d.disableScrollZoom).trigger("change",true);a("#gmap-custom-info-active input",b.el).val(d.enableCustomInfo).trigger("change",true);if(d.enableCustomInfo){a("#gmap-custom-info-active",b.el).nextAll().show()}else{a("#gmap-custom-info-active",b.el).nextAll().hide()}a("#gmap-custom-info-marker .img-bg",b.el).css({"background-image":"url("+b.editingModel.iconMarkerURL+")"});if(c===-1){a("#gmap-custom-info-marker .delete-bg-img",b.el).hide()}a("#text-gmap-custom-info-title",b.el).val(d.infoTitle);a("#textarea-gmap-custom-info-description",b.el).val(d.infoDescriptions);a("#text-gmap-custom-id",b.el).val(d.customID);a("#text-gmap-custom-class",b.el).val(d.customClass);a("#gmap-column-box-model",b.el).initBoxModel(d.boxModelSettings);a("#gmap-custom-attributes",b.el).initAttributes(d.customEnableAttributes,d.customDataAttributes)},buildPanel:function(){return{title:{type:"markup",markup:'<div class="awe-title"><h2>Google map</h2></div>'},custom_attributes:{type:"section",enter_link:{type:"text_field",title:"latlong",attributes:{placeholder:"address"}},title:{type:"markup",markup:'<div class="small-quote"><span>Visit <a href="https://www.google.com/maps" target="_blank">Google maps </a>find your address and then click \u201cLink\u201d button to obtain your map link.</span></div>'},map_type:{type:"select",title:"Map type",options:{HYBRID:"Hybrid",ROADMAP:"RoadMap",SATELLITE:"Satellite",TERRAIN:"Terrain"}},select_type:{type:"select",title:"Style",options:{style1:"Subtle Grayscale",style2:"Pale Dawn",style3:"Blue water",style4:"Shades of Grey"}},zoom:{type:"slider",title:"Zoom",values:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],default_value:8,allow_type:true,},height:{type:"slider",title:"Height",min_value:-1,max_value:999,default_value:300,allow_type:true,unit:"px"},scroll_zoom:{type:"toggle",title:"Disable scroll to zoom",default_value:1}},custom_box_info:{type:"section",column_box_info:{type:"tabs",tabs:[{tab_title:"Informations",contents:{custom_info_active:{type:"toggle",title:"Enable",default_value:0},custom_info_marker:{type:"media",title:"Marker"},custom_info_title:{type:"text_field",title:"Title",default_value:""},custom_info_description:{type:"textarea_field",title:"Desctiption",default_value:""},custom_info_animation:{type:"select",title:"Marker animation",options:{none:"None",DROP:"Drop",BOUNCE:"Bounce"}}}}]}},custom_box_model:{type:"section",column_box_model:{type:"tabs",tabs:[{tab_title:"Border",contents:{custom_border:{type:"box_border",min_value:0,max_value:100,default_value:0}}},{tab_title:"Radius",contents:{custom_border_radius:{type:"box_model",model_type:"border_radius",allow_type:true,min_value:0,max_value:100,default_value:0}}},{tab_title:"Padding",contents:{custom_padding:{type:"box_model",model_type:"padding",allow_type:true,min_value:0,max_value:100,default_value:0}}},{tab_title:"Margin",contents:{custom_margin:{type:"box_model",model_type:"margin",allow_type:true,min_value:0,max_value:100,default_value:0}}}]}},custom_definitions:{type:"section",custom_id:{type:"text_field",title:"ID",attributes:{placeholder:"Custom ID"},default_value:""},custom_class:{type:"text_field",title:"CSS class",attributes:{placeholder:"Custom class"},default_value:""},custom_attributes:{type:"custom_attributes"}}}}});a(document).ready(function(){AWEContent.Controllers.gmap=new AWEContent.Views.GmapItemController();AWEContent.Panels.gmap=new AWEContent.Views.GmapPanel()})})(jQuery);