/**
 * File: awecontent-feature-item.js
 * Author: AWEThemes
 * Website: http://awethemes.com/
 */
(function($) {
    "use strict";

    /**
     * Define model for Feature item
     */
    AWEContent.Models.FeatureItem = AWEContent.Models.Item.extend({
        defaults: {
            machine_name: "feature",
			icon: 'icon-help-circled',
            title: 'Heading',
            iconColor:'',
			titleColor:'',
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
            this.view = new AWEContent.Views.FeatureItem({model: this});
        },
        clone : function(){
            var cloneModel = {};
            $.each(this.toJSON(), function(key,value){
                cloneModel[key] = value;
            });
            cloneModel.boxModelSettings = new AWEContent.Models.BoxModelSettings(cloneModel.boxModelSettings);
            return new AWEContent.Models.FeatureItem(cloneModel);
        }
    });

    /**
     * Define View for Feature Item
     */
    AWEContent.Views.FeatureItem = AWEContent.Views.Item.extend({
        featureTemplate: _.template(
            '<div class="feature-icon">\
				<div class="feature-icon-content kt-table">\
					<div class="kt-col">\
						<div class="features-box-icon"><a href="#"><i class="<%= classIcon %> icon"></i></a></div>\
						<h4 class="features-box-title"><a href="#" class="title"><%= title %></a></h4>\
					</div>\
				</div>\
			 </div>'
        ),
        initialize: function(){
            AWEContent.Views.Item.prototype.initialize.call(this);
            this.listenTo(this.model.get('boxModelSettings'), 'change', this.applySettingsChanged);
        },
        renderItemContent: function() {
            var self = this,
                settings = self.model.toJSON(),
                $feature = $('<div class="ts-feature awe-item"></div>'),
                css = {},
                fontCssTitle = {
                    'font-size' : settings.fontSizeTitle == -1 ? '' : (settings.fontSizeTitle + 'px'),
                    'line-height' : settings.lineHeightTitle == -1 ? '' : (settings.lineHeightTitle + 'px'),
                    'letter-spacing' : settings.letterSpacingTitle == -1 ? ''  : (settings.letterSpacingTitle + 'px'),
                    'font-family': settings.fontFamilyTitle,
                    'color':settings.titleColor
                };
				
			if (settings.fontStyleTitle)
                fontCssTitle = $.extend({}, fontCssTitle, JSON.parse(settings.fontStyleTitle));
				
			if (settings.fontStyleDescription)
                fontCssDescription = $.extend({}, fontCssDescription, JSON.parse(settings.fontStyleDescription));
			
            $feature.css(css);
            $feature.attr({'id' : settings.customID}).addClass(settings.customClass).renderItemDefaultBoxModel(settings.boxModelSettings);
            $feature.renderItemDefaultAttributes(settings.customEnableAttributes, settings.customDataAttributes);
            $feature.html(self.featureTemplate({classIcon: settings.icon, title: settings.title}));
            self.iframeJQuery(this.el).delegate('.ts-feature', "itemReady", function() {
                var heightBefore, heightAfter;
                self.initHallo(self.iframeJQuery(this).find('.title'), heightBefore, heightAfter);
            });
            self.$el.defaultResponsive(settings);
            $feature.find('.title').css(fontCssTitle);
			$feature.find('.icon').css('color', settings.iconColor);
			
			if(settings.buttonUrl!='')
                $feature.find('.ts-button').attr('href',settings.buttonUrl);
            else
                $feature.find('.ts-button').attr('href','#');
            if(settings.buttonTarget!='')
                $feature.find('.ts-button').attr('target',settings.buttonTarget);
			
            return $feature;
        },
        applySettingsChanged: function(model) {
            var self = this,
                settings = self.model.toJSON(),
                $feature = $('> .ts-feature', self.el),
				$i = $('.icon', self.el),
                heightBefore = self.$el.height(),$feature_title;
            $.each(model.changedAttributes(), function(key, value){
                self.$el.changeResponsive(key, value);
                $feature.renderChangeSettingBoxModel(key, value, model);
                $feature_title = $feature.find('.title');
                switch (key) {
                    case 'icon' :
                        var prevIcon = self.model.previousAttributes().icon;
                        $i.removeClass(prevIcon).addClass(value);
                        break;
					case 'iconColor' :
                        $feature.find('.icon').css('color', value);
                        break;
					case 'titleColor' :
                        $feature_title.css('color', value);
                        break;
                    case 'fontFamilyTitle':
                        $feature_title.css('font-family', value);
                        break;

                    case 'fontStyleTitle':
                        var fontStyle = (value) ? JSON.parse(value) : {'font-weight': '', 'font-style': ''};
                        $feature_title.css(fontStyle);
                        break;

                    case 'fontSizeTitle':
                        value == -1 ? $feature_title.css('font-size', '') : $feature_title.css('font-size', value + 'px');
                        break;

                    case 'lineHeightTitle' :
                        value == -1 ? $feature_title.css('line-height', '') : $feature_title.css('line-height', value + 'px');
                        break;
                    case 'letterSpacingTitle':
                        value == -1 ? $feature_title.css('letter-spacing', '') : $feature_title.css('letter-spacing', value + 'px');
                        break;
					
					case 'fontFamilyTitle':
                        $feature_title.css('font-family', value);
                        break;
					
					case 'buttonUrl':
                        if(value!='')
                            $feature.find('.ts-button').attr('href',value);
                        else
                            $feature.find('.ts-button').attr('href','#');
                        break;
                    case 'buttonTarget':
                        $feature.find('.ts-button').attr('target',settings.buttonTarget);
                        break;
					
                    case 'customID':
                        $feature.attr('id', value);
                        break;
                    case 'customClass':
                        var prevClass = self.model.previousAttributes().customClass;
                        $feature.removeClass(prevClass).addClass(value);
                        break;
                    case 'customEnableAttributes':
                        $feature.renderChangeSettingsAttributes(key, value, settings.customDataAttributes);
                        break;

                    case 'customActionAttributes':
                        $feature.renderChangeSettingsAttributes(key, value);
                        break;

                    case 'customEnableAnimations':
                        var animation, prevAnimation;
                        if (value) {
                            animation = settings.customDataAnimations;
                            prevAnimation = null;
                            $message.processAnimations(animation);
                        }
                        else {
                            animation = null;
                            prevAnimation = settings.customDataAnimations;
                            $message.processAnimations(animation, prevAnimation);
                        }

                        break;
                    case 'customDataAnimations':
                        var animation, prevAnimation;
                        animation = settings.customDataAnimations;
                        prevAnimation = self.model.previousAttributes().customDataAnimations;
                        $feature.processAnimations(animation, prevAnimation);
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
                case '.title':
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
        generateStyle: function() {
            var self = this,
                settings = this.model.toJSON();

            if (self.updateColor)
                clearTimeout(self.updateColor);

            self.updateColor = setTimeout(function() {

                // update style color
                //$('style', self.$el).html(self.featureStyle({cid : self.model.cid}));

                // clear inline style for all color
                $('span.title-accr', self.$el).css('color', '');
                $('.ui-accordion-header', self.$el).css('background-color', '');

                // clear timeout
                self.updateColor = false;
            }, 100);
        }
    });

    /**
     * Define view for Feature Controller
     * li tag what is contained by items panel
     */
    AWEContent.Views.FeatureItemController = AWEContent.Views.ItemController.extend({
        machineName: 'feature',
        controllerHtml: function() {
            return '<div class="title-icon">Feature</div><i class="ic ac-icon-star-outline"></i>';
        },
        createItemModel: function(templateData) {
            var boxModelSettings;
            if (templateData!= undefined) {

                boxModelSettings = new AWEContent.Models.BoxModelSettings(templateData.boxModelSettings);
                templateData.boxModelSettings = boxModelSettings;

                return new AWEContent.Models.FeatureItem(templateData);
            }

            return new AWEContent.Models.FeatureItem({'boxModelSettings' : new AWEContent.Models.BoxModelSettings()});
        }
    });

    /**
     * Define Feature panel
     */
    AWEContent.Views.FeaturePanel = AWEContent.Views.ItemPanel.extend({
        tagName: "div",
        className: "awe-obj-panel panel-feature",
        panelName: "feature",
        initPanel: function() {
            AWEContent.Views.ItemPanel.prototype.initPanel.call(this);
            var self = this;
            
			$('#custom-choose-icons .title-tab', self.el).click( function() {
                var $controller = $(this).closest('#custom-choose-icons');
                AWEContent.Panels.listIconPanel.processIcon($controller);
            });

            $('#custom-choose-icons', self.el).change( function(event, data) {
                if (data) {
                    self.editingModel.set('icon', data.nameIcon);
                    $('.title-tab > i', this).removeClass().addClass(data.nameIcon);
                }
            });
			
			// for button
            $('#text-feature-button-url', this.el).change(function() {
                self.editingModel.set('buttonUrl', $(this).val());
            });
            $('#feature-button-target', this.el).change(function(event, values) {
                self.editingModel.set('buttonTarget', values.value);
            });
			
			$('#feature-icon-color', this.$el).change( function(event, color) {
                if (color)
                    color = color.toRgbString();
                else
                    color = '';
                self.editingModel.set('iconColor', color);
            });
			$('#feature-title-color', this.$el).change( function(event, color) {
                if (color)
                    color = color.toRgbString();
                else
                    color = '';
                self.editingModel.set('titleColor', color);
            });

            $('#feature-font-title-field', this.$el).bind('fontFamilyChange', function(event, fontName) {
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

            $('#feature-column-box-model', self.el).initBoxModelPanel(self, 'boxModelSettings');
            $('#text-feature-custom-id', self.el).change( function(){
                self.editingModel.set('customID', $(this).val());
            });
            $('#text-feature-custom-class', self.el).change( function(){
                self.editingModel.set('customClass', $(this).val());
            });
            $('#feature-custom-attributes', this.el).initAttributesPanel(self);
            $('#feature-animations', this.el).change(function(event, data) {
                self.editingModel.set('customEnableAnimations', data.enabled);
                if (data)
                    self.editingModel.set('customDataAnimations', data.animations);
            });
        },
        setPanelElementsValue: function() {
            var self = this,
                settings = this.editingModel.toJSON();

            //$('#message-style', this.$el).aweSelect('value', settings.messageType);
			$('#custom-choose-icons i', self.el).attr('class', settings.icon);
			$('#text-feature-button-url', this.el).val(settings.buttonUrl);
			$('#feature-button-target', this.el).aweSelect('value', settings.buttonTarget);
            $('#feature-icon-color', this.$el).aweColorPicker('value', settings.iconColor);
			$('#feature-title-color', this.$el).aweColorPicker('value', settings.titleColor);
            $('#feature-font-title-field', this.$el).aweFont('options', {
                fontFamily: settings.fontFamilyTitle,
                //fontStyle: settings.fontStyleTitle,
                fontSize: settings.fontSizeTitle,
                textAlign: settings.textAlignTitle,
                letterSpacing: settings.letterSpacingTitle,
                lineHeight: settings.lineHeightTitle
            });
			
            $('#feature-column-box-model', this.$el).initBoxModel(settings.boxModelSettings);
            $('#text-feature-custom-id', this.$el).val(settings.customID);
            $('#text-feature-custom-class', this.$el).val(settings.customClass);
            $('#feature-custom-attributes', this.$el).initAttributes(settings.customEnableAttributes, settings.customDataAttributes);
			
            $('#feature-animations', this.el).aweAnimation('value', {
                enabled: settings.customEnableAnimations,
                animations: settings.customDataAnimations,
                previewEl: self.editingModel.view.$el
            });
        },
        buildPanel: function() {
            return {
                "title": {
                    "type": "markup",
                    "markup": "<div class=\"awe-title\"><h2>Feature<\/h2><\/div>"
                },
				"icon":{
                    "type": "section",
                    "custom_choose_icons": {
                        "type": "tabs_icon",
                        "title": "<div class=\"title-tab\"><span>Choose Icons <\/span><i class=\"\"><\/i><\/div>",
                        "tabs": []
                    }
                },
                 "custom_color": {
                    "type": "section",
                    "icon_color": {
                        "type": "colorpicker",
                        "title": "Icon Color",
                        "options": {
                            "preferredFormat"  : "rgb",
                            "AlphaVerticle"  : true,
                            "showAlpha"  : true,
                            "allowEmpty" : true,
                            "showInput" : true
                        }
                    },
					"title_color": {
                        "type": "colorpicker",
                        "title": "Heading Color",
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
        AWEContent.Controllers.feature = new AWEContent.Views.FeatureItemController();
        AWEContent.Panels.feature = new AWEContent.Views.FeaturePanel();
    });
})(jQuery);
