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
    AWEContent.Models.DropcapsItem = AWEContent.Models.Item.extend({
        defaults: {
            machine_name: "dropcaps",
            letter: 'L',
			description: 'Description this quote',
			style: 'dropcap-1',
            letterColor: '',
            color: '',
			bgColor: '',
			fontFamilyDescription : '',
			fontStyleDescription : '',
            fontSizeDescription:-1,
            lineHeightDescription:-1,
            letterSpacingDescription:0,
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
            this.view = new AWEContent.Views.DropcapsItem({model: this});
        },
        clone : function(){
            var cloneModel = {};
            $.each(this.toJSON(), function(key,value){
                cloneModel[key] = value;
            });
            cloneModel.boxModelSettings = new AWEContent.Models.BoxModelSettings(cloneModel.boxModelSettings);
            return new AWEContent.Models.DropcapsItem(cloneModel);
        }
    });

    /**
     * Define View for DropcapsItem
     */
    AWEContent.Views.DropcapsItem = AWEContent.Views.Item.extend({
        dropcapsTemplate: _.template(
            '<p class="<%= style %>"> <span class="first-letter kt_dropcap dropcap-sm"> <%= letter %> </span> <span class="text"><%= description %></span></p>'
        ),
        initialize: function(){
            AWEContent.Views.Item.prototype.initialize.call(this);
            this.listenTo(this.model.get('boxModelSettings'), 'change', this.applySettingsChanged);
        },
        renderItemContent: function() {
            var self = this,
                html = '',
                settings = self.model.toJSON(),
                $dropcaps = $('<div class="media awe-item"></div>'),
                fontCssDescription = {
                    'font-size' : settings.fontSizeDescription == -1 ? '' : (settings.fontSizeDescription + 'px'),
                    'line-height' : settings.lineHeightDescription == -1 ? '' : (settings.lineHeightDescription + 'px'),
                    'letter-spacing' : settings.letterSpacingDescription == -1 ? ''  : (settings.letterSpacingDescription + 'px'),
                    'font-family': settings.fontFamilyDescription,
                    'color':settings.color
                };
				
			if (settings.fontStyleDescription)
                fontCssDescription = $.extend({}, fontCssDescription, JSON.parse(settings.fontStyleDescription));
			
            html = self.dropcapsTemplate({
                description: settings.description,
				letter: settings.letter,
				style: settings.style
            })
			
            $dropcaps.html(html);
			$dropcaps.find('.text').css(fontCssDescription);
			$dropcaps.find('.first-letter').css({"color": settings.letterColor, "background-color": settings.bgColor});
			
			$dropcaps.renderItemDefaultBoxModel(settings.boxModelSettings);

            self.iframeJQuery(this.el).delegate('.media', "itemReady", function() {
                var heightBefore, heightAfter;
                self.initHallo(self.iframeJQuery(this).find('.text'), heightBefore, heightAfter);
				self.initHallo(self.iframeJQuery(this).find('.first-letter'), heightBefore, heightAfter);
            });
            self.$el.defaultResponsive(settings);
            self.$el.attr('id', settings.customID);
            self.$el.addClass(settings.customClass);
            $dropcaps.renderItemDefaultAttributes(settings.customEnableAttributes, settings.customDataAttributes);
            if (settings.customEnableAnimations)
                $dropcaps.processAnimations(settings.customDataAnimations)
            return $dropcaps;
        },
        applySettingsChanged: function(model) {
            var self = this,
                settings = self.model.toJSON(),
                $dropcaps = $('> .media', self.el),
                heightBefore = self.$el.height();
            $.each(model.changedAttributes(), function(key, value){
                self.$el.changeResponsive(key, value);
                $dropcaps.renderChangeSettingBoxModel(key, value, model);
                switch (key) {
                    case 'style':
						$('.media' , self.el).find('p').removeAttr('class').addClass(value);
                        break;
					case 'color' :
						$('.media' , self.el).find('.text').css('color', value);
                        break;
					case 'letterColor' :
						$('.media' , self.el).find('.first-letter').css('color', value);
                        break;
					case 'bgColor' :
						$('.media' , self.el).find('.first-letter').css('background-color', value);
                        break;
					case 'fontFamilyDescription':
                        $('.media' , self.el).find('.text').css('font-family', value);
                        break;

                    case 'fontStyleDescription':
                        var fontStyle = (value) ? JSON.parse(value) : {'font-weight': '', 'font-style': ''};
                        $('.media' , self.el).find('.text').css(fontStyle);
                        break;

                    case 'fontSizeDescription':
                        value == -1 ? $('.media' , self.el).find('.text').css('font-size', '') : $('.media' , self.el).find('.text').css('font-size', value + 'px');
                        break;

                    case 'lineHeightDescription' :
                        value == -1 ? $('.media' , self.el).find('.text').css('line-height', '') : $('.media' , self.el).find('.text').css('line-height', value + 'px');
                        break;
                    case 'letterSpacingDescription':
                        value == -1 ? $('.media' , self.el).find('.text').css('letter-spacing', '') : $('.media' , self.el).find('.text').css('letter-spacing', value + 'px');
                        break;
                    case 'customID':
                        self.$el.attr('id', value);
                        break;
                    case 'customClass':
                        var prevClass = self.model.previousAttributes().customClass;
                        self.$el.removeClass(prevClass).addClass(value);
                        break;
                    case 'customEnableAttributes':
                        $dropcaps.renderChangeSettingsAttributes(key, value, settings.customDataAttributes);
                        break;
                    case 'customActionAttributes':
                        $dropcaps.renderChangeSettingsAttributes(key, value);
                        break;

                    case 'customEnableAnimations':
                        var animation, prevAnimation;
                        if (value) {
                            animation = settings.customDataAnimations;
                            prevAnimation = null;
                            $dropcaps.processAnimations(animation);
                        }
                        else {
                            animation = null;
                            prevAnimation = settings.customDataAnimations;
                            $dropcaps.processAnimations(animation, prevAnimation);
                        }

                        break;
                    case 'customDataAnimations':
                        var animation, prevAnimation;
                        animation = settings.customDataAnimations;
                        prevAnimation = self.model.previousAttributes().customDataAnimations;
                        $dropcaps.processAnimations(animation, prevAnimation);
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
                case '.text':
                    this.model.set('description', _html);
                    break;
				case '.first-letter':
                    this.model.set('letter', _html);
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
        }
    });

    /**
     * Define view for Header Controller
     * li tag what is contained by items panel
     */
    AWEContent.Views.DropcapsItemController = AWEContent.Views.ItemController.extend({
        machineName: 'dropcaps',
        controllerHtml: function() {
            return '<div class="title-icon">Dropcaps</div><i class="ic ac-icon-star-outline"></i>';
        },
        createItemModel: function(templateData) {
            var boxModelSettings;
            if (templateData!= undefined) {

                boxModelSettings = new AWEContent.Models.BoxModelSettings(templateData.boxModelSettings);
                templateData.boxModelSettings = boxModelSettings;

                return new AWEContent.Models.DropcapsItem(templateData);
            }

            return new AWEContent.Models.DropcapsItem({'boxModelSettings' : new AWEContent.Models.BoxModelSettings()});
        }
    });

    /**
     * Define header panel
     */
    AWEContent.Views.dropcapsPanel = AWEContent.Views.ItemPanel.extend({
        tagName: "div",
        className: "awe-obj-panel panel-dropcaps",
        panelName: "dropcaps",
        initPanel: function() {
            AWEContent.Views.ItemPanel.prototype.initPanel.call(this);
            var self = this;
            $('#dropcaps-style', this.$el).change(function (event, values) {
				self.editingModel.set('style', values.value);
            });
			
			$('#dropcaps-letter-color', this.$el).change( function(event, color) {
                if (color)
                    color = color.toRgbString();
                else
                    color = '';
                self.editingModel.set('letterColor', color);
            });
			$('#dropcaps-background-color', this.$el).change( function(event, color) {
                if (color)
                    color = color.toRgbString();
                else
                    color = '';
                self.editingModel.set('bgColor', color);
            });
            $('#dropcaps-color', this.$el).change( function(event, color) {
                if (color)
                    color = color.toRgbString();
                else
                    color = '';
                self.editingModel.set('color', color);
            });

            $('#dropcaps-column-box-model', self.el).initBoxModelPanel(self, 'boxModelSettings');
            $('#dropcaps-custom-id', this.$el).change( function(){
                self.editingModel.set('customID', $(this).find('input').val());
            });
            $('#dropcaps-custom-class', this.$el).change( function(){
                self.editingModel.set('customClass', $(this).find('input').val());
            });
            $('#dropcaps-custom-attributes', this.el).initAttributesPanel(self);
            $('#dropcaps-animations', this.el).change(function(event, data) {
                self.editingModel.set('customEnableAnimations', data.enabled);
                if (data)
                    self.editingModel.set('customDataAnimations', data.animations);
            });
			
			$('#dropcaps-font-description-field', this.$el).bind('fontFamilyChange', function(event, fontName) {
                self.editingModel.set('fontFamilyDescription', fontName);
            }).bind('fontStyleChange', function(event, fontStyle) {
                self.editingModel.set('fontStyleDescription', fontStyle.value);
            }).bind('textAlignChange', function(event, textAlign) {
                self.editingModel.set('textAlignDescription', textAlign.value);
            }).bind('fontSizeChange', function(event, fontSize) {
                self.editingModel.set('fontSizeDescription', fontSize.value);
            }).bind('letterSpacingChange', function(event, letterSpacing) {
                self.editingModel.set('letterSpacingDescription', letterSpacing.value);
            }).bind('lineHeightChange', function(event, lineHeight) {
                self.editingModel.set('lineHeightDescription', lineHeight.value);
            });

        },
        setPanelElementsValue: function() {
            var self = this,
                settings = this.editingModel.toJSON();
			
            $('#dropcaps-style', self.el).aweSelect('value', settings.style);
			$('#dropcaps-enable input', self.el).val(settings.hover).trigger("change", true);
            $('#dropcaps-letter-color', this.$el).aweColorPicker('value', settings.letterColor);
			$('#dropcaps-background-color', this.$el).aweColorPicker('value', settings.bgColor);
            $('#dropcaps-color', this.$el).aweColorPicker('value', settings.color);
            $('#dropcaps-column-box-model', this.$el).initBoxModel(settings.boxModelSettings);
            $('#dropcaps-custom-id input', this.el).val(settings.customID);
            $('#dropcaps-custom-class input', this.el).val(settings.customClass);
            $('#dropcaps-custom-attributes', this.$el).initAttributes(settings.customEnableAttributes, settings.customDataAttributes);
            $('#dropcaps-animations', this.el).aweAnimation('value', {
                enabled: settings.customEnableAnimations,
                animations: settings.customDataAnimations,
                previewEl: self.editingModel.view.$el
            });
			
			$('#dropcaps-font-description-field', this.$el).aweFont('options', {
                fontFamily: settings.fontFamilyDescription,
                //fontStyle: settings.fontStyleDescription,
                fontSize: settings.fontSizeDescription,
                textAlign: settings.textAlignDescription,
                letterSpacing: settings.letterSpacingDescription,
                lineHeight: settings.lineHeightDescription
            });
        },
        buildPanel: function() {
            return {
                "title": {
                    "type": "markup",
                    "markup": "<div class=\"awe-title\"><h2>Dropcaps<\/h2><\/div>"
                },
                "custom_color": {
                    "type": "section",
					'style': {
						"type": "select",
						"title": "Style",
						"options": {
							"dropcap": "Dropcaps 1",
							"dropcap-bg": "Dropcaps 2",
							"dropcap-circle": "Dropcaps 3"
						},
						"default_value": "dropcap"
					},
                    "letter-color": {
                        "type": "colorpicker",
                        "title": "Letter Color",
                        "options": {
                            "preferredFormat"  : "rgb",
                            "AlphaVerticle"  : true,
                            "showAlpha"  : true,
                            "allowEmpty" : true,
                            "showInput" : true
                        }
                    },
                    "color": {
                        "type": "colorpicker",
                        "title": "Text Color",
                        "options": {
                            "preferredFormat"  : "rgb",
                            "AlphaVerticle"  : true,
                            "showAlpha"  : true,
                            "allowEmpty" : true,
                            "showInput" : true
                        }
                    },
					"background-color": {
                        "type": "colorpicker",
                        "title": "Background Color",
                        "options": {
                            "preferredFormat"  : "rgb",
                            "AlphaVerticle"  : true,
                            "showAlpha"  : true,
                            "allowEmpty" : true,
                            "showInput" : true
                        }
                    }
                },
				"custom_text": {
                    "type": "section",
                    "label_description_font": {
                        "type": "markup",
                        "markup": "<div class=\"awe-title\"><h3>Description font<\/h3><\/div>"
                    },
                    font_description_field:{
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
        AWEContent.Controllers.dropcaps = new AWEContent.Views.DropcapsItemController();
        AWEContent.Panels.dropcaps = new AWEContent.Views.dropcapsPanel();
    });
})(jQuery);