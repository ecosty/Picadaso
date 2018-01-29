<?php

/**
 * Implement hook_preprocess_awe_info()
 */
function awe_info_object_preprocess_awe_info(&$vars) {
  $module_path = drupal_get_path('module', 'awe_info_object');
  drupal_add_css($module_path . '/awecontent-info-item.css');
  $settings = $vars['settings'];
  $vars['src_img'] = 'http://placehold.it/960x572';
  if ($settings['fid'] != -1){
    $file = file_load($settings['fid']);
    if (isset($file->uri)){
      $src_img = $settings['styleImage'] != 'none'
        ? image_style_url($settings['styleImage'], $file->uri)
        : file_create_url($file->uri);
      $vars['src_img'] = $src_img;
    }
  }

  $info['title']['css'] = "";
  if (isset($settings['fontFamilyTitle']))
    $info['title']['css'] .= "font-family: $settings[fontFamilyTitle];";
  if (isset($settings['fontSizeTitle']))
    $info['title']['css'] .= "font-size: $settings[fontSizeTitle]px;";
  if (isset($settings['lineHeightTitle']))
    $info['title']['css'] .= "line-height: $settings[lineHeightTitle]px;";
  if(isset($settings['letterSpacingTitle']))
    $info['title']['css'] .= "letter-spacing: $settings[letterSpacingTitle]px;";
  if (isset($settings['fontStyleTitle'])&& !empty($settings['fontStyleTitle'])) {
      $fontStyleTitle = json_decode($settings['fontStyleTitle']);
      foreach ($fontStyleTitle as $key => $value) {
          $info['title']['css'] .= "$key:$value;";
      }
  }

  $info_id = $settings['customID'];
  $vars['id'] = $info_id;
  $info_class = empty($settings['customClass']) ? $vars['class_random'] : $settings['customClass'];
  $node_style = _ac_render_item_id_tag($info_id, $info_class, $vars['class_random']);
  $node_style = $node_style['result'];

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

  
  //$color = _ac_render_item_hover_settings($color_settings);

  $responsive != '' ? " ".$responsive : '';
  $class = $responsive;

  $vars['classes_array'] = array('awe-item', 'item-info', $vars['class_random']);
  if ($info_class != ''){
    $vars['classes_array'][] = $info_class;
  }

  if ($responsive != '') {
    $vars['classes_array'][] = $responsive;
  }
  $vars['attributes_array'] = array_merge($vars['attributes_array'], $attributes);
  $animations !== '' ? $vars['attributes_array']['data-animation'] = $animations : '';

  $style = "";
  //$style = render_css($node_style, array($boxModel, $color['normal']));
  $id_class = empty($info_id)?".$info_class":"#$info_id";

  $style .="$id_class h3 {" . $info['title']['css'] . "}";

  if(isset($settings['title_color'])) {
    $style .="$id_class h3 {color:$settings[title_color];}";
  }

  drupal_add_css( $style, array('type' => 'inline', 'group' => CSS_THEME));
}