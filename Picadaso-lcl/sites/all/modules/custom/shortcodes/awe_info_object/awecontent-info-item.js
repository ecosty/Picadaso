/**
 * File: awecontent-message-item.js
 * Author: AWEThemes
 * Website: http://awethemes.com/
 */
(function($) {
    "use strict";

    /**
     * Define model for header item
     */
    AWEContent.Models.InfoItem = AWEContent.Models.Item.extend({
        defaults: {
            machine_name: "info",
            fid: -1,
            styleImage: 'none',
            srcImage : 'http://placehold.it/960x572',
            title: 'Title',
            title_color: '',
			buttonText: 'SELECT DEMO',
			buttonUrl: '',
			buttonTarget:'',
			fontFamilyTitle : '',
			fontStyleTitle : '',
			fontSizeTitle:-1,
            lineHeightTitle:-1,
            letterSpacingTitle:0,
            boxModelSettings : {},
            customID : '',
            customClass : '',
            customEnableAttributes: 0,
            customDataAttributes: '[] ', // Array Json
            customActionAttributes: '{"newAction": "", "newAttrName": "", "newAttrValue": ""}',
            customEnableAnimations: 0,
            customDataAnimations: '{"type" : "none"}', // Data Object
            lgResponsive: true,
            xsResponsive: true,
            mediumResponsive: true,
            smResponsive: true
        },
        relations: [
            {
                type: Backbone.HasOne,
                key: "boxModelSettings",
                relatedModel: AWEContent.Models.BoxModelSettings
            }
        ],
        createView: function() {
            this.view = new AWEContent.Views.InfoItem({model: this});
        },
        clone : function(){
            var cloneModel = {};
            $.each(this.toJSON(), function(key,value){
                cloneModel[key] = value;
            });
            cloneModel.boxModelSettings = new AWEContent.Models.BoxModelSettings(cloneModel.boxModelSettings);
            return new AWEContent.Models.InfoItem(cloneModel);
        }
    });

    /**
     * Define View for InfoItem
     */
    AWEContent.Views.InfoItem = AWEContent.Views.Item.extend({
        infoTemplate: _.template(
            '<div class="banner banner-dark no-margin">\
				<img src="<%= srcImage %>" alt=""/>\
				<div class="banner-content">\
					<h3 class="white"><%= title %></h3>\
				</div>\
			 </div>'
        ),
        initialize: function(){
            AWEContent.Views.Item.prototype.initialize.call(this);
            this.listenTo(this.model.get('boxModelSettings'), 'change', this.applySettingsChanged);
        },
        renderItemContent: function() {
            var self = this,
                html = '',
                settings = self.model.toJSON(),
                $info = $('<div class="media awe-item info-item"></div>'),
				fontCssTitle = {
                    'font-size' : settings.fontSizeTitle == -1 ? '' : (settings.fontSizeTitle + 'px'),
                    'line-height' : settings.lineHeightTitle == -1 ? '' : (settings.lineHeightTitle + 'px'),
                    'letter-spacing' : settings.letterSpacingTitle == -1 ? ''  : (settings.letterSpacingTitle + 'px'),
                    'font-family': settings.fontFamilyTitle,
					'color': settings.title_color
                };
				
			if (settings.fontStyleTitle)
                fontCssTitle = $.extend({}, fontCssTitle, JSON.parse(settings.fontStyleTitle));
			
			// get image URLs
            this.$el.aweImageURL({
                fid: [settings.fid],
                styles: [settings.styleImage],
                success: function(el, fid, styles, response) {
                    self.processImageURL(el, fid, styles, response);
                }
            });
			
            html = self.infoTemplate({
                srcImage: settings.srcImage,
                title : settings.title,
				buttonText: settings.buttonText
            })
			$info
                .html(html)
                .renderItemDefaultBoxModel(settings.boxModelSettings);
			
			$info.find('h3').css(fontCssTitle);
			
            self.iframeJQuery(this.el).delegate('.media', "itemReady", function() {
                var heightBefore, heightAfter;
                self.initHallo(self.iframeJQuery(this).find('h3'), heightBefore, heightAfter);
            });
            self.$el.defaultResponsive(settings);
            self.$el.attr('id', settings.customID);
            self.$el.addClass(settings.customClass);
            $info.renderItemDefaultAttributes(settings.customEnableAttributes, settings.customDataAttributes);
            if (settings.customEnableAnimations)
                $info.processAnimations(settings.customDataAnimations)
				
            if(settings.buttonUrl!='')
                $info.find('.ts-button').attr('href',settings.buttonUrl);
            else
                $info.find('.ts-button').attr('href','#');
            if(settings.buttonTarget!='')
                $info.find('.ts-button').attr('target',settings.buttonTarget);
				
            return $info;
        },
        applySettingsChanged: function(model) {
            var self = this,
                settings = self.model.toJSON(),
                $info = $('> .media', self.el),
                heightBefore = self.$el.height();
            $.each(model.changedAttributes(), function(key, value){
                self.$el.changeResponsive(key, value);
                $info.renderChangeSettingBoxModel(key, value, model);
                switch (key) {
					case 'fid' :
                        var prevFid = model.previousAttributes().fid;

                        self.$el.aweImageURL({
                            fid: [settings.fid],
                            styles: [settings.styleImage],
                            success: function(el, fid, styles, response) {
                                self.processImageURL(el, fid, styles, response);
                            }
                        });
                        break;
                    case 'styleImage':
                        var fid = self.model.get('fid');
                        if (fid > 0)
                            //AWEContent.getImageURL(fid, value, self.$el);
                            self.$el.aweImageURL({
                                fid: [settings.fid],
                                styles: [settings.styleImage],
                                success: function(el, fid, styles, response) {
                                    self.processImageURL(el, fid, styles, response);
                                }
                            });
                        break;
					case 'title_color' :
                        $info.find('h3').css('color', value);
                        break;
						
					case 'fontFamilyTitle':
                        $info.find('h3').css('font-family', value);
                        break;

                    case 'fontStyleTitle':
                        var fontStyle = (value) ? JSON.parse(value) : {'font-weight': '', 'font-style': ''};
                        $info.find('h3').css(fontStyle);
                        break;
					case 'fontSizeTitle':
                        value == -1 ? $info.find('h3').css('font-size', '') : $info.find('h3').css('font-size', value + 'px');
                        break;

                    case 'lineHeightTitle' :
                        value == -1 ? $info.find('h3').css('line-height', '') : $info.find('h3').css('line-height', value + 'px');
                        break;
                    case 'letterSpacingTitle':
                        value == -1 ? $info.find('h3').css('letter-spacing', '') : $info.find('h3').css('letter-spacing', value + 'px');
                        break;
						
					case 'buttonUrl':
                        if(value!='')
                            $info.find('.ts-button').attr('href',value);
                        else
                            $info.find('.ts-button').attr('href','#');
                        break;
                    case 'buttonTarget':
                        $info.find('.ts-button').attr('target',settings.buttonTarget);
                        break;

                    case 'customID':
                        self.$el.attr('id', value);
                        break;
                    case 'customClass':
                        var prevClass = self.model.previousAttributes().customClass;
                        self.$el.removeClass(prevClass).addClass(value);
                        break;
                    case 'customEnableAttributes':
                        $info.renderChangeSettingsAttributes(key, value, settings.customDataAttributes);
                        break;
                    case 'customActionAttributes':
                        $info.renderChangeSettingsAttributes(key, value);
                        break;

                    case 'customEnableAnimations':
                        var animation, prevAnimation;
                        if (value) {
                            animation = settings.customDataAnimations;
                            prevAnimation = null;
                            $info.processAnimations(animation);
                        }
                        else {
                            animation = null;
                            prevAnimation = settings.customDataAnimations;
                            $info.processAnimations(animation, prevAnimation);
                        }

                        break;
                    case 'customDataAnimations':
                        var animation, prevAnimation;
                        animation = settings.customDataAnimations;
                        prevAnimation = self.model.previousAttributes().customDataAnimations;
                        $info.processAnimations(animation, prevAnimation);
                        break;
                }
            });

            // Listen event change height of item
            setTimeout(function() {
                self.checkChangeHeight(heightBefore);
            }, 50);
        },
        changeContent: function(el, select){
            var _html = $(el.currentTarget).html();
            switch (select.selector) {
                case 'h3':
                    this.model.set('title', _html);
                    break;
            }


        },
        initHallo: function(select, heightBefore, heightAfter) {
            var self = this;
            select.hallo({
                plugins: {
                    halloformat: {
                        formattings: {
                            bold: true,
                            italic: true,
                            underline: true,
                            strikethrough: true
                        }
                    },
                    hallojustify: {},
                    hallolists: {
                        lists: {
                            ordered: true,
                            unordered: true
                        }
                    }
                },
                create : function(){
                    this.addEventListener("paste", function(e) {
                        e.preventDefault();
                        var text = e.clipboardData.getData("text/plain");
                        AWEContent.documentIframe.execCommand("insertHTML", false, text);

                    });
                },
                editable: true,
                activate: function (event) {
                    heightBefore = $(event.target).height();
                },
                deactivated: function(event) {
                    self.changeContent(event, select);
                    heightAfter = $(event.target).height();
					if (heightAfter != heightBefore) {
                        self.resizeItem();
                    }
                }
            });
        },
		processImageURL: function(el, fid, styles, files) {
            var fid = this.model.get('fid'),
                style = this.model.get('styleImage'),
                fileURLs = files && files[fid]? files[fid]: null;

            if (fileURLs && fileURLs[style] !== undefined) {
                // assign image URL
                this.model.imageURL = fileURLs[style];

                // change image url src
                $('img', this.$el).attr('src', fileURLs[style]);
            }
        }
    });

    /**
     * Define view for Header Controller
     * li tag what is contained by items panel
     */
    AWEContent.Views.InfoItemController = AWEContent.Views.ItemController.extend({
        machineName: 'info',
        controllerHtml: function() {
            return '<div class="title-icon">Info Box</div><i class="ic ac-icon-star-outline"></i>';
        },
        createItemModel: function(templateData) {
            var boxModelSettings;
            if (templateData!= undefined) {

                boxModelSettings = new AWEContent.Models.BoxModelSettings(templateData.boxModelSettings);
                templateData.boxModelSettings = boxModelSettings;

                return new AWEContent.Models.InfoItem(templateData);
            }

            return new AWEContent.Models.InfoItem({'boxModelSettings' : new AWEContent.Models.BoxModelSettings()});
        }
    });

    /**
     * Define header panel
     */
    AWEContent.Views.infoPanel = AWEContent.Views.ItemPanel.extend({
        tagName: "div",
        className: "awe-obj-panel panel-info",
        panelName: "info",
        initPanel: function() {
            AWEContent.Views.ItemPanel.prototype.initPanel.call(this);
            var self = this;
			
			$('#info-select-image input[name=selected_media]', self.el).change(function () {
                var strFileData = $(this).val().trim(),
                    file = strFileData ? JSON.parse(strFileData) : false,
                    fileURL = file && file.file_url ? file.file_url : '',
                    fid = file && file.fid > 0 ? file.fid : -1;

                // set panel thumbnail by chose image
                $('img', self.$el).attr('src', fileURL);

                // set model fid
                self.editingModel.set('fid', fid);
            });
			$('#info-thumb-style', this.el).change(function (event, values) {
                self.editingModel.set('styleImage', values.value);
            });
			$('#info-title-color', this.$el).change( function(event, color) {
                if (color)
                    color = color.toRgbString();
                else
                    color = '';
                self.editingModel.set('title_color', color);
            });
			
			// for button
            $('#text-info-button-url', this.el).change(function() {
                self.editingModel.set('buttonUrl', $(this).val());
            });
            $('#info-button-target', this.el).change(function(event, values) {
                self.editingModel.set('buttonTarget', values.value);
            });

            $('#info-column-box-model', self.el).initBoxModelPanel(self, 'boxModelSettings');
            $('#info-custom-id', this.$el).change( function(){
                self.editingModel.set('customID', $(this).find('input').val());
            });
            $('#info-custom-class', this.$el).change( function(){
                self.editingModel.set('customClass', $(this).find('input').val());
            });
            $('#info-custom-attributes', this.el).initAttributesPanel(self);
            $('#info-animations', this.el).change(function(event, data) {
                self.editingModel.set('customEnableAnimations', data.enabled);
                if (data)
                    self.editingModel.set('customDataAnimations', data.animations);
            });
			
			$('#info-font-title-field', this.$el).bind('fontFamilyChange', function(event, fontName) {
                self.editingModel.set('fontFamilyTitle', fontName);
            }).bind('fontStyleChange', function(event, fontStyle) {
                self.editingModel.set('fontStyleTitle', fontStyle.value);
            }).bind('textAlignChange', function(event, textAlign) {
                self.editingModel.set('textAlignTitle', textAlign.value);
            }).bind('fontSizeChange', function(event, fontSize) {
                self.editingModel.set('fontSizeTitle', fontSize.value);
            }).bind('letterSpacingChange', function(event, letterSpacing) {
                self.editingModel.set('letterSpacingTitle', letterSpacing.value);
            }).bind('lineHeightChange', function(event, lineHeight) {
                self.editingModel.set('lineHeightTitle', lineHeight.value);
            });


        },
        setPanelElementsValue: function() {
            var self = this,
                settings = this.editingModel.toJSON();

            $('#info-select-image img', self.el).attr('src', self.editingModel.imageURL == null ? 'http://placehold.it/960x572' : self.editingModel.imageURL );
            if (AWEContent.Path.imageStyleURL != '') {
                $('#info-thumb-style', self.el).aweSelect('value', settings.styleImage);
            }
			
            $('#info-title-color', this.$el).aweColorPicker('value', settings.title_color);
			$('#text-info-button-url', this.el).val(settings.buttonUrl);
			$('#info-button-target', this.el).aweSelect('value', settings.buttonTarget);
            $('#info-column-box-model', this.$el).initBoxModel(settings.boxModelSettings);
            $('#info-custom-id input', this.el).val(settings.customID);
            $('#info-custom-class input', this.el).val(settings.customClass);
            $('#info-custom-attributes', this.$el).initAttributes(settings.customEnableAttributes, settings.customDataAttributes);
            
			$('#info-animations', this.el).aweAnimation('value', {
                enabled: settings.customEnableAnimations,
                animations: settings.customDataAnimations,
                previewEl: self.editingModel.view.$el
            });
			
			$('#info-font-title-field', this.$el).aweFont('options', {
                fontFamily: settings.fontFamilyTitle,
                //fontStyle: settings.fontStyleTitle,
                fontSize: settings.fontSizeTitle,
                textAlign: settings.textAlignTitle,
                letterSpacing: settings.letterSpacingTitle,
                lineHeight: settings.lineHeightTitle
            });
        },
        buildPanel: function() {
            return {
                "title": {
                    "type": "markup",
                    "markup": "<div class=\"awe-title\"><h2>Info Box<\/h2><\/div>"
                },
                custom_style: {
                    'type': 'section',
                    'select_image': {
                        'type': 'button',
                        'title': 'Select Image'
                    },
                    image_style_title: {
                        type: 'markup',
                        markup: '<div class="awe-style-list-title image-style-title"><span>Image Style</span></div>'
                    },
                    'thumb_style': {
                        type: "image_style_list"
                    }
                },
                "custom_color": {
                    "type": "section",
					"title_color": {
                        "type": "colorpicker",
                        "title": "Title Color",
                        "options": {
                            "preferredFormat"  : "rgb",
                            "AlphaVerticle"  : true,
                            "showAlpha"  : true,
                            "allowEmpty" : true,
                            "showInput" : true
                        }
                    }
                },
				"custom_feature": {
					"type": "section",
					"button_url": {
					  "type": "text_field",
					  "title": "Link",
					  "attributes": {
						"placeholder": "http:\/\/..."
					  },
					  "default_value": "http:\/\/"
					},
					"button_target": {
					  "type": "select",
					  "title": "Target",
					  "options": {
						"_self" : "_self",
						"_blank": "_blank",
						"_parent": "_parent",
						"_top": "_top",
					  },
					  "default_value": "_self"
					}
                },
				"custom_text": {
                    "type": "section",
                    "label_title_font": {
                        "type": "markup",
                        "markup": "<div class=\"awe-title\"><h3>Heading font<\/h3><\/div>"
                    },
                    font_title_field:{
                      type: "font",
                        disabledElements: ['textAlign']
                    }
                },
                "custom_box_model": {
                    "type": "section",
                    "column_box_model": {
                        "type": "tabs",
                        "tabs": [{
                            "tab_title": "Border",
                            "contents": {
                                "custom_border": {
                                    "type": "box_border",
                                    "min_value": 0,
                                    "max_value": 100,
                                    "default_value": 0
                                }
                            }
                        }, {
                            "tab_title": "Radius",
                            "contents": {
                                "custom_border_radius": {
                                    "type": "box_model",
                                    "model_type": "border_radius",
                                    allow_type: true,
                                    "min_value": 0,
                                    "max_value": 100,
                                    "default_value": 0
                                }
                            }
                        }, {
                            "tab_title": "Padding",
                            "contents": {
                                "custom_padding": {
                                    "type": "box_model",
                                    "model_type": "padding",
                                    allow_type: true,
                                    "min_value": 0,
                                    "max_value": 100,
                                    "default_value": 0
                                }
                            }
                        }, {
                            "tab_title": "Margin",
                            "contents": {
                                "custom_margin": {
                                    "type": "box_model",
                                    "model_type": "margin",
                                    allow_type: true,
                                    "min_value": 0,
                                    "max_value": 100,
                                    "default_value": 0
                                }
                            }
                        }]
                    }
                },
                "custom_definitions": {
                    "type": "section",
                    "custom_id": {
                        "type": "text_field",
                        "title": "ID",
                        "attributes": {
                            "placeholder": "wrapper"
                        },
                        "default_value": ""
                    },
                    "custom_class": {
                        "type": "text_field",
                        "title": "CSS class",
                        "attributes": {
                            "placeholder": "wrapper"
                        },
                        "default_value": ""
                    },
                    "custom_attributes": {
                        "type": "custom_attributes"
                    },
                    animations: {
                        type: "animations"
                    }
                }
            };
        }
    });

    


    $(document).ready(function() {
        AWEContent.Controllers.info = new AWEContent.Views.InfoItemController();
        AWEContent.Panels.info = new AWEContent.Views.infoPanel();
    });
})(jQuery);