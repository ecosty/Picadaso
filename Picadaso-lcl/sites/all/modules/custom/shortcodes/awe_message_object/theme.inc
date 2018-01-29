<?php

/**
 * Implement hook_preprocess_awe_messages()
 * @param $vars
 */
function awe_messages_object_preprocess_awe_messages(&$vars) {
  $module_path = drupal_get_path('module', 'awe_messages_object');
  drupal_add_css($module_path . '/awecontent-messages-item.css');


  $style = '';
  $settings = $vars['settings'];
  $messages = array();

  $messages['title']['css'] = "color: $settings[titleColor] !important;";
  if (isset($settings['fontFamilyTitle']))
    $messages['title']['css'] .= "font-family:$settings[fontFamilyTitle];";
  if (isset($settings['fontSizeTitle']))
    $messages['title']['css'] .= "font-size:$settings[fontSizeTitle]px;";
  if (isset($settings['lineHeightTitle']))
    $messages['title']['css'] .= "line-height: $settings[lineHeightTitle]px;";
  if (isset($settings['letterSpacingTitle']))
    $messages['title']['css'] .= "letter-spacing: $settings[letterSpacingTitle]px;";
  if(isset($settings['fontStyleTitle']) && !empty($settings['fontStyleTitle'])){
      $fontStyleTitle = json_decode($settings['fontStyleTitle']);
      foreach ($fontStyleTitle as $key=>$value){
          $messages['title']['css'] .= "$key:$value;";
      }
  }

  $messages['desc']['css'] = "color: $settings[descColor] !important;";
  if (isset($settings['fontFamilyDesc']))
    $messages['desc']['css'] .= "font-family:$settings[fontFamilyDesc];";
  if (isset($settings['fontSizeDesc']))
    $messages['desc']['css'] .= "font-size:$settings[fontSizeDesc]px;";
  if (isset($settings['lineHeightDesc']))
    $messages['desc']['css'] .= "line-height: $settings[lineHeightDesc]px;";
  if (isset($settings['letterSpacingDesc']))
    $messages['desc']['css'] .= "letter-spacing: $settings[letterSpacingDesc]px;";
  if(isset($settings['fontStyleDesc']) && !empty($settings['fontStyleDesc'])){
      $fontStyleDesc = json_decode($settings['fontStyleDesc']);
      foreach ($fontStyleDesc as $key=>$value){
          $messages['desc']['css'] .= "$key:$value;";
      }
  }


  $vars['messages'] = $messages;
  $messages_id = $settings['customID'] != '' ? drupal_html_id($settings['customID']) : FALSE;
  $vars['id'] = $messages_id;
  $messages_class = empty($settings['customClass']) ? $vars['class_random'] : $settings['customClass'];
  $attributes = array(
    'enable' => $settings['customEnableAttributes'],
    'attributes' => $settings['customDataAttributes']
  );

  $animations = array(
    'enable' => $settings['customEnableAnimations'],
    'animations' => $settings['customDataAnimations']
  );

  $box_model = $settings['boxModelSettings'];
  $node_style = _ac_render_item_id_tag($messages_id, $messages_class, $vars['class_random']);

  $node_style = $node_style['result'];
  $attributes = _ac_render_item_attributes_settings($attributes);
  $animations = _ac_render_item_animations_settings($animations);
  $boxModel = _ac_render_item_box_model_settings($box_model);

  $class = $messages_class;

  $vars['classes_array'][] = $class;
  $vars['attributes_array'] = array_merge($vars['attributes_array'], $attributes);
  $animations !== '' ? $vars['attributes_array']['data-animation'] = $animations : '';

  $style .= render_css($node_style, array($boxModel));

  $id_class = empty($messages_id)?".$messages_class":"#$messages_id";

  $style .="$node_style h3 {" . $messages['title']['css'] . "}";
  $style .="$node_style .desc {" . $messages['desc']['css'] . "}";

  drupal_add_css( $style, array('type' => 'inline', 'group' => CSS_THEME));
}