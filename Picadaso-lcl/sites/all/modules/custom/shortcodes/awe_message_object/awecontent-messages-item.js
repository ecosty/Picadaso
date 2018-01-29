/**
 * File: awecontent-messages-item.js
 * Author: AWEThemes
 * Website: http://awethemes.com/
 */
(function($) {
    "use strict";

    /**
     * Define model for Messages item
     */
    AWEContent.Models.MessagesItem = AWEContent.Models.Item.extend({
        defaults: {
            machine_name: "messages",
            title: 'This is title',
			description: 'This is description',
			style: 'alert-normal',
            titleColor:'',
			descColor:'',
			fontFamilyTitle : '',
			fontStyleTitle : '',
            fontSizeTitle:-1,
            lineHeightTitle:-1,
            letterSpacingTitle:-1,
			fontFamilyDesc : '',
			fontStyleDesc : '',
            fontSizeDesc:-1,
            lineHeightDesc:0,
            letterSpacingDesc:0,
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
            this.view = new AWEContent.Views.MessagesItem({model: this});
        },
        clone : function(){
            var cloneModel = {};
            $.each(this.toJSON(), function(key,value){
                cloneModel[key] = value;
            });
            cloneModel.boxModelSettings = new AWEContent.Models.BoxModelSettings(cloneModel.boxModelSettings);
            return new AWEContent.Models.MessagesItem(cloneModel);
        }
    });

    /**
     * Define View for Messages Item
     */
    AWEContent.Views.MessagesItem = AWEContent.Views.Item.extend({
        messagesTemplate: _.template(
			'<div role="alert" class="message-item alert <%= style %>" data-style="<%= style %>">\
				<button aria-label="Close" data-dismiss="alert" class="close" type="button">\
					<span aria-hidden="true"><i class="fa fa-times"></i></span>\
				</button>\
				<h3 class="alert_title"><%= title %></h3>\
				<span class="desc"><%= description %></span>\
			 </div>'
        ),
        initialize: function(){
            AWEContent.Views.Item.prototype.initialize.call(this);
            this.listenTo(this.model.get('boxModelSettings'), 'change', this.applySettingsChanged);
        },
        renderItemContent: function() {
            var self = this,
                settings = self.model.toJSON(),
                $messages = $('<div class="ts-messages awe-item"></div>'),
                css = {},
                fontCssTitle = {
                    'font-size' : settings.fontSizeTitle == -1 ? '' : (settings.fontSizeTitle + 'px'),
                    'line-height' : settings.lineHeightTitle == -1 ? '' : (settings.lineHeightTitle + 'px'),
                    'letter-spacing' : settings.letterSpacingTitle == -1 ? ''  : (settings.letterSpacingTitle + 'px'),
                    'font-family': settings.fontFamilyTitle,
                    'color':settings.titleColor
                },
				fontCssDesc = {
                    'font-size' : settings.fontSizeDesc == -1 ? '' : (settings.fontSizeDesc + 'px'),
                    'line-height' : settings.lineHeightDesc == -1 ? '' : (settings.lineHeightDesc + 'px'),
                    'letter-spacing' : settings.letterSpacingDesc == -1 ? ''  : (settings.letterSpacingDesc + 'px'),
                    'font-family': settings.fontFamilyDesc,
                    'color':settings.descColor
                };
				
			if (settings.fontStyleTitle)
                fontCssTitle = $.extend({}, fontCssTitle, JSON.parse(settings.fontStyleTitle));
				
			if (settings.fontStyleDesc)
                fontCssDesc = $.extend({}, fontCssDesc, JSON.parse(settings.fontStyleDesc));
				
            $messages.css(css);
            $messages.attr({'id' : settings.customID}).addClass(settings.customClass).renderItemDefaultBoxModel(settings.boxModelSettings);
            $messages.renderItemDefaultAttributes(settings.customEnableAttributes, settings.customDataAttributes);
            $messages.html(self.messagesTemplate({title : settings.title, description : settings.description, style: settings.style}));
            self.iframeJQuery(this.el).delegate('.ts-messages', "itemReady", function() {
                var heightBefore, heightAfter;
                self.initHallo(self.iframeJQuery(this).find('h3'), heightBefore, heightAfter);
				self.initHallo(self.iframeJQuery(this).find('.desc'), heightBefore, heightAfter);
            });
            self.$el.defaultResponsive(settings);
            $messages.find('h3').css(fontCssTitle);
			$messages.find('.desc').css(fontCssDesc);
            return $messages;
        },
        applySettingsChanged: function(model) {
            var self = this,
				style = '',
                settings = self.model.toJSON(),
                $messages = $('> .ts-messages', self.el),
                heightBefore = self.$el.height(),$messages_title;
            $.each(model.changedAttributes(), function(key, value){
                self.$el.changeResponsive(key, value);
                $messages.renderChangeSettingBoxModel(key, value, model);
                $messages_title = $messages.find('h3');
                switch (key) {
					case 'style':
						style = $messages.find('.message-item').attr('data-style');
						$messages.find('.message-item').removeClass(style);
						$messages.find('.message-item').addClass(value);
						$messages.find('.message-item').attr('data-style', value);
                        break;
                    case 'titleColor' :
                        $messages_title.css('color', value);
                        break;
					case 'descColor' :
                        $messages.find('.desc').css('color', value);
                        break;
                  	
                    case 'fontFamilyTitle':
                        $messages_title.css('font-family', value);
                        break;

                    case 'fontStyleTitle':
                        var fontStyle = (value) ? JSON.parse(value) : {'font-weight': '', 'font-style': ''};
                        $messages_title.css(fontStyle);
                        break;

                    case 'fontSizeTitle':
                        value == -1 ? $messages_title.css('font-size', '') : $messages_title.css('font-size', value + 'px');
                        break;

                    case 'lineHeightTitle' :
                        value == -1 ? $messages_title.css('line-height', '') : $messages_title.css('line-height', value + 'px');
                        break;
                    case 'letterSpacingTitle':
                        value == -1 ? $messages_title.css('letter-spacing', '') : $messages_title.css('letter-spacing', value + 'px');
                        break;
						
					case 'fontFamilyDesc':
                        $messages.find('.desc').css('font-family', value);
                        break;

                    case 'fontStyleDesc':
                        var fontStyle = (value) ? JSON.parse(value) : {'font-weight': '', 'font-style': ''};
                        $messages.find('.desc').css(fontStyle);
                        break;

                    case 'fontSizeDesc':
                        value == -1 ? $messages.find('.desc').css('font-size', '') : $messages.find('.desc').css('font-size', value + 'px');
                        break;

                    case 'lineHeightDesc' :
                        value == -1 ? $messages.find('.desc').css('line-height', '') : $messages.find('.desc').css('line-height', value + 'px');
                        break;
                    case 'letterSpacingDesc':
                        value == -1 ? $messages.find('.desc').css('letter-spacing', '') : $messages.find('.desc').css('letter-spacing', value + 'px');
                        break;
						
                    case 'customID':
                        $messages.attr('id', value);
                        break;
                    case 'customClass':
                        var prevClass = self.model.previousAttributes().customClass;
                        $messages.removeClass(prevClass).addClass(value);
                        break;
                    case 'customEnableAttributes':
                        $messages.renderChangeSettingsAttributes(key, value, settings.customDataAttributes);
                        break;

                    case 'customActionAttributes':
                        $messages.renderChangeSettingsAttributes(key, value);
                        break;

                    case 'customEnableAnimations':
                        var animation, prevAnimation;
                        if (value) {
                            animation = settings.customDataAnimations;
                            prevAnimation = null;
                            $messages.processAnimations(animation);
                        }
                        else {
                            animation = null;
                            prevAnimation = settings.customDataAnimations;
                            $messages.processAnimations(animation, prevAnimation);
                        }

                        break;
                    case 'customDataAnimations':
                        var animation, prevAnimation;
                        animation = settings.customDataAnimations;
                        prevAnimation = self.model.previousAttributes().customDataAnimations;
                        $messages.processAnimations(animation, prevAnimation);
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
				case '.desc':
                    this.model.set('description', _html);
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
        generateStyle: function() {
            var self = this,
                settings = this.model.toJSON();

            if (self.updateColor)
                clearTimeout(self.updateColor);

            self.updateColor = setTimeout(function() {

                // update style color
                //$('style', self.$el).html(self.messagesStyle({cid : self.model.cid}));

                // clear inline style for all color
                $('span.title-accr', self.$el).css('color', '');
                $('.ui-accordion-header', self.$el).css('background-color', '');

                // clear timeout
                self.updateColor = false;
            }, 100);
        }
    });

    /**
     * Define view for Messages Controller
     * li tag what is contained by items panel
     */
    AWEContent.Views.MessagesItemController = AWEContent.Views.ItemController.extend({
        machineName: 'messages',
        controllerHtml: function() {
            return '<div class="title-icon">Messages</div><i class="ic ac-icon-star-outline"></i>';
        },
        createItemModel: function(templateData) {
            var boxModelSettings;
            if (templateData!= undefined) {

                boxModelSettings = new AWEContent.Models.BoxModelSettings(templateData.boxModelSettings);
                templateData.boxModelSettings = boxModelSettings;

                return new AWEContent.Models.MessagesItem(templateData);
            }

            return new AWEContent.Models.MessagesItem({'boxModelSettings' : new AWEContent.Models.BoxModelSettings()});
        }
    });

    /**
     * Define Messages panel
     */
    AWEContent.Views.MessagesPanel = AWEContent.Views.ItemPanel.extend({
        tagName: "div",
        className: "awe-obj-panel panel-messages",
        panelName: "messages",
        initPanel: function() {
            AWEContent.Views.ItemPanel.prototype.initPanel.call(this);
            var self = this;
			
			$('#messages-style', this.$el).change(function (event, values) {
				self.editingModel.set('style', values.value);
            });
            $('#messages-title-color', this.$el).change(function(event, color) {
                if (color)
                    color = color.toRgbString();
                else
                    color = '';
                self.editingModel.set('titleColor', color);
            });
			$('#messages-desc-color', this.$el).change(function(event, color) {
                if (color)
                    color = color.toRgbString();
                else
                    color = '';
                self.editingModel.set('descColor', color);
            });

            $('#messages-font-title-field', this.$el).bind('fontFamilyChange', function(event, fontName) {
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
			
			$('#messages-font-desc-field', this.$el).bind('fontFamilyChange', function(event, fontName) {
                self.editingModel.set('fontFamilyDesc', fontName);
            }).bind('fontStyleChange', function(event, fontStyle) {
                self.editingModel.set('fontStyleDesc', fontStyle.value);
            }).bind('textAlignChange', function(event, textAlign) {
                self.editingModel.set('textAlignDesc', textAlign.value);
            }).bind('fontSizeChange', function(event, fontSize) {
                self.editingModel.set('fontSizeDesc', fontSize.value);
            }).bind('letterSpacingChange', function(event, letterSpacing) {
                self.editingModel.set('letterSpacingDesc', letterSpacing.value);
            }).bind('lineHeightChange', function(event, lineHeight) {
                self.editingModel.set('lineHeightDesc', lineHeight.value);
            });

            $('#messages-column-box-model', self.el).initBoxModelPanel(self, 'boxModelSettings');
            $('#text-messages-custom-id', self.el).change( function(){
                self.editingModel.set('customID', $(this).val());
            });
            $('#text-messages-custom-class', self.el).change( function(){
                self.editingModel.set('customClass', $(this).val());
            });
            $('#messages-custom-attributes', this.el).initAttributesPanel(self);
            $('#messages-animations', this.el).change(function(event, data) {
                self.editingModel.set('customEnableAnimations', data.enabled);
                if (data)
                    self.editingModel.set('customDataAnimations', data.animations);
            });
        },
        setPanelElementsValue: function() {
            var self = this,
                settings = this.editingModel.toJSON();

            $('#messages-style', this.$el).aweSelect('value', settings.style);
            $('#messages-title-color', this.$el).aweColorPicker('value', settings.titleColor);
			$('#messages-desc-color', this.$el).aweColorPicker('value', settings.descColor);

            $('#messages-font-title-field', this.$el).aweFont('options', {
                fontFamily: settings.fontFamilyTitle,
                //fontStyle: settings.fontStyleTitle,
                fontSize: settings.fontSizeTitle,
                textAlign: settings.textAlignTitle,
                letterSpacing: settings.letterSpacingTitle,
                lineHeight: settings.lineHeightTitle
            });
			
			$('#messages-font-desc-field', this.$el).aweFont('options', {
                fontFamily: settings.fontFamilyDesc,
                //fontStyle: settings.fontStyleDesc,
                fontSize: settings.fontSizeDesc,
                textAlign: settings.textAlignDesc,
                letterSpacing: settings.letterSpacingDesc,
                lineHeight: settings.lineHeightDesc
            });
			
            $('#messages-column-box-model', this.$el).initBoxModel(settings.boxModelSettings);
            $('#text-messages-custom-id', this.$el).val(settings.customID);
            $('#text-messages-custom-class', this.$el).val(settings.customClass);
            $('#messages-custom-attributes', this.$el).initAttributes(settings.customEnableAttributes, settings.customDataAttributes);
            $('#messages-animations', this.el).aweAnimation('value', {
                enabled: settings.customEnableAnimations,
                animations: settings.customDataAnimations,
                previewEl: self.editingModel.view.$el
            });
        },
        buildPanel: function() {
            return {
                "title": {
                    "type": "markup",
                    "markup": "<div class=\"awe-title\"><h2>Message<\/h2><\/div>"
                },
                "custom_color": {
                    "type": "section",
					'style': {
						"type": "select",
						"title": "Style",
						"options": {
							"alert-normal": "Normal",
							"alert-info": "Info",
							"alert-success": "Success",
							"alert-warning": "Warning",
							"alert-danger": "Danger"
						},
						"default_value": "alert-normal"
					},
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
                    },
					"desc_color": {
                        "type": "colorpicker",
                        "title": "Description Color",
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
                    "label_title_font": {
                        "type": "markup",
                        "markup": "<div class=\"awe-title\"><h3>Title font<\/h3><\/div>"
                    },
                    font_title_field:{
                      type: "font",
                        disabledElements: ['textAlign']
                    },
					"label_desc_font": {
                        "type": "markup",
                        "markup": "<div class=\"awe-title\"><h3>Description font<\/h3><\/div>"
                    },
                    font_desc_field:{
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
        AWEContent.Controllers.messages = new AWEContent.Views.MessagesItemController();
        AWEContent.Panels.messages = new AWEContent.Views.MessagesPanel();
    });
})(jQuery);
