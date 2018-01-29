<?php

/**
 * Implement hook_preprocess_awe_dropcaps()
 * @param $vars
 */
function awe_dropcaps_object_preprocess_awe_dropcaps(&$vars) {
  $settings = $vars['settings'];

  $dropcaps_id = $settings['customID'] != '' ? drupal_html_id($settings['customID']) : FALSE;
  $vars['id'] = $dropcaps_id;
  $dropcaps_class = empty($settings['customClass']) ? $vars['class_random'] : $settings['customClass'];
  $node_style = _ac_render_item_id_tag($dropcaps_id, $dropcaps_class, $vars['class_random']);
  $node_style = $node_style['result'];

  $dropcaps['description']['css'] = "color: $settings[color];";
  if (isset($settings['fontFamilyDescription']))
    $dropcaps['description']['css'] .= "font-family:$settings[fontFamilyDescription];";
  if (isset($settings['fontSizeDescription']))
    $dropcaps['description']['css'] .= "font-size:$settings[fontSizeDescription]px;";
  if (isset($settings['lineHeightDescription']))
    $dropcaps['description']['css'] .= "line-height: $settings[lineHeightDescription]px;";
  if (isset($settings['letterSpacingDescription']))
    $dropcaps['description']['css'] .= "letter-spacing: $settings[letterSpacingDescription]px;";
  if(isset($settings['fontStyleDescription']) && !empty($settings['fontStyleDescription'])){
      $fontStyleDescription = json_decode($settings['fontStyleDescription']);
      foreach ($fontStyleDescription as $key=>$value){
          $dropcaps['description']['css'] .= "$key:$value;";
      }
  }

  $attributes = array(
    'enable' => $settings['customEnableAttributes'],
    'attributes' => $settings['customDataAttributes']
  );

  $animations = array(
    'enable' => $settings['customEnableAnimations'],
    'animations' => $settings['customDataAnimations']
  );
  $responsive = array(
    'lgResponsive' => $settings['lgResponsive'],
    'xsResponsive' => $settings['xsResponsive'],
    'mediumResponsive' => $settings['mediumResponsive'],
    'smResponsive' => $settings['smResponsive']
  );
  $box_model = $settings['boxModelSettings'];

  $attributes = _ac_render_item_attributes_settings($attributes);
  $animations = _ac_render_item_animations_settings($animations);
  $responsive = _ac_render_item_responsive_settings($responsive);
  $boxModel = _ac_render_item_box_model_settings($box_model);

  $color_settings = array(
    'color' => $settings['color']
  );
  $color = _ac_render_item_hover_settings($color_settings);

  $responsive != '' ? " ".$responsive : '';
  $class = $responsive;

  $vars['classes_array'] = array('awe-item', 'item-dropcaps', $vars['class_random']);
  if ($dropcaps_class != ''){
    $vars['classes_array'][] = $dropcaps_class;
  }
  if ($responsive != '') {
    $vars['classes_array'][] = $responsive;
  }
  $vars['attributes_array'] = array_merge($vars['attributes_array'], $attributes);
  $animations !== '' ? $vars['attributes_array']['data-animation'] = $animations : '';

  $id_class = empty($dropcaps_id)?".$dropcaps_class":"#$dropcaps_id";

  $style = render_css($node_style, array($boxModel, $color['normal']));

  $style .="$id_class p {" . $dropcaps['description']['css'] . "}";
  
  if($settings['color'] != '') {
    $style .="$node_style p {color: $settings[color]}";
  }

  if($settings['letterColor'] != '') {
    $style .="$node_style .first-letter {color: $settings[letterColor]; border-color: $settings[letterColor]; }";
  } else {
    $style .="$node_style .first-letter {color: #444444; border-color: #444444; }";
  }

  if($settings['bgColor'] != '') {
    $style .="$node_style .first-letter {background-color: $settings[bgColor]; }";
  } else {
    $style .="$node_style .first-letter {background-color: #fff; }";
  }

  drupal_add_css(drupal_get_path('module', 'awe_dropcaps_object') . '/awecontent-dropcaps-item.css');
  drupal_add_css( $style, array('type' => 'inline', 'group' => CSS_THEME));

}