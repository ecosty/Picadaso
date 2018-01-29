<?php

/**
 * Implement hook_preprocess_awe_feature()
 * @param $vars
 */
function awe_feature_object_preprocess_awe_feature(&$vars) {
  $style = '';
  $settings = $vars['settings'];
  $feature = array();
  $feature['title']['value'] = $settings['title'];

  $feature['title']['css'] = "color:$settings[titleColor];";
  if (isset($settings['fontFamilyTitle']))
    $feature['title']['css'] .= "font-family: $settings[fontFamilyTitle];";
  if (isset($settings['fontSizeTitle']))
    $feature['title']['css'] .= "font-size: $settings[fontSizeTitle]px;";
  if (isset($settings['lineHeightTitle']))
    $feature['title']['css'] .= "line-height: $settings[lineHeightTitle]px;";
  if(isset($settings['letterSpacingTitle']))
    $feature['title']['css'] .= "letter-spacing: $settings[letterSpacingTitle]px;";
  if (isset($settings['fontStyleTitle'])&& !empty($settings['fontStyleTitle'])) {
      $fontStyleTitle = json_decode($settings['fontStyleTitle']);
      foreach ($fontStyleTitle as $key => $value) {
          $feature['title']['css'] .= "$key:$value;";
      }
  }


  $vars['feature'] = $feature;
  $feature_id = $settings['customID'] != '' ? drupal_html_id($settings['customID']) : FALSE;
  $vars['id'] = $feature_id;
  $feature_class = empty($settings['customClass']) ? $vars['class_random'] : $settings['customClass'];
  $attributes = array(
    'enable' => $settings['customEnableAttributes'],
    'attributes' => $settings['customDataAttributes']
  );

  $animations = array(
    'enable' => $settings['customEnableAnimations'],
    'animations' => $settings['customDataAnimations']
  );

  $box_model = $settings['boxModelSettings'];
  $node_style = _ac_render_item_id_tag($feature_id, $feature_class, $vars['class_random']);

  $node_style = $node_style['result'];
  $attributes = _ac_render_item_attributes_settings($attributes);
  $animations = _ac_render_item_animations_settings($animations);
  $boxModel = _ac_render_item_box_model_settings($box_model);

  $class = $feature_class;

  $vars['classes_array'][] = $class;
  $vars['attributes_array'] = array_merge($vars['attributes_array'], $attributes);
  $animations !== '' ? $vars['attributes_array']['data-animation'] = $animations : '';

  $style .= render_css($node_style, array($boxModel));

  $id_class = empty($feature_id)?".$feature_class":"#$feature_id";

  $style .="$id_class .title {" . $feature['title']['css'] . "}";

  $style .="$id_class .features-box-icon i {color:$settings[iconColor] !important;}";

  drupal_add_css(drupal_get_path('module', 'awe_feature_object') . '/awecontent-feature-item.css');
  drupal_add_css( $style, array('type' => 'inline', 'group' => CSS_THEME));
}