<?php
/*
 * callback render block list
 */
function _md_block_painter_list() {
  $header = array(t('NAME'),t('DESCRIPTION'), t('UPDATED'), t('OPERATIONS'));
  $rows = array();
  $blocks = db_select('block_painter', 'items')
    ->fields('items')
    ->orderBy('updated', 'desc')
    ->orderBy('id', 'desc')
    ->execute()
    ->fetchAll();
  foreach ($blocks as $item) {
    $edit_link = url('admin/structure/block-painter/edit/' . $item->id, array('absolute' => TRUE));
    $operations = array(
      array(
        'title' => 'Edit',
        'href' => $edit_link
      ),
      array(
        'title' => 'Delete',
        'href' => url('admin/structure/block-painter/delete/' . $item->id, array('absolute' => TRUE)),
        'attributes' => array(
          'id' => 'delete-megamenu-' . $item->id,
          'onclick' => 'return confirm("Are you sure to delete this block?");'
        )
      )
    );
    
    $links = theme('links',
      array(
        'links' => $operations,
        'attributes' => array('class' => array('links', 'inline'))
      ));

    $rows[] = array(
      $item->name,
      $item->description,
      date('Y-m-d H:i:s', $item->updated),
      $links
    );
  }

  $result = theme('table', array('header' => $header, 'rows' => $rows));
  return $result;
}

/*
 * callback delete block
 */
function _md_block_painter_delete(){
  $id = arg(4);
  db_delete('block_painter')->condition('id',$id)->execute();
  $delta = 'block_painter_'.$id;
  db_delete('block')
    ->condition('module', 'md_block_painter')
    ->condition('delta', $delta)
    ->execute();
  db_delete('block_role')
    ->condition('module', 'md_block_painter')
    ->condition('delta', $delta)
    ->execute();
  drupal_goto('admin/structure/block-painter');
}

/*
 * callback render form block
 */
function _md_block_painter_form($form, &$form_state){
  $params = arg();
  $template = $type = 'block';
  $style = "#-md-block-painter-form textarea{width:700px; max-width:100%;}";
  drupal_add_css($style, array('type'=>'inline'));
  drupal_add_css(drupal_get_path('module', 'awecontent').'/css/font.css');
  //default data
  $item = array('id'=>'','name'=>'', 'description'=>'','build_data'=>'','settings'=>array('font'=>'','max_width'=>'300'));
  
  // get data from database
  if($params['3'] == 'edit' && isset($params['4']) && $params['4'] > 0){
    $block = db_select('block_painter', 'block')->fields('block')->condition('id', $params['4'] )->execute()->fetch(PDO::FETCH_ASSOC);
    if($block){
      $block['settings'] = drupal_json_decode($block['settings']);
      $item = $block;
    }
  }
    
  $form['block_name'] = array(
    '#type' => 'textfield',
    '#title' => t('Name'),
    '#default_value' => $item['name'],
    '#size' => 50,
    '#maxlength' => 255,
    '#required' => TRUE,
  );
  $form['button_buil'] = array(
    '#type' => 'markup',
    '#markup'=>'<div style="margin-bottom:20px;"><a href="#" id="bt-build-block" class="awe-actionbutton ac-active-builder-btn">Build Block</a></div>'
  );
  $form['block_id'] = array(
    '#type' => 'hidden',
    '#default_value' => $item['id']
  );
  $form['block_path_config'] = array(
    '#type' => 'hidden',
    '#default_value' => drupal_json_encode(_ac_path_configuration(_block_get_layout_url($type))),
    '#attributes' => array('id' => 'path_config', 'name' => 'path_config')
  );
  $form['block_max_width'] = array(
    '#type' => 'textfield',
    '#title' => t('Max width (px)'),
    '#description' => t('Enter the width value to preview. However, its width will be equal to the width of region where it is assigned.'),
    '#default_value' => (isset($item['settings']['max_width']) && $item['settings']['max_width'])?$item['settings']['max_width']:300,
    '#required' => FALSE
  );
  $form['block_description'] = array(
    '#type' => 'textarea',
    '#title' => t('Description'),
    '#default_value' => $item['description'],
    '#rows' => 3,
    '#required' => FALSE,
    '#resizable' => FALSE
  );
  
  $form['block_font'] = array(
    '#type' => 'textarea',
    '#title' => t('Google fonts'),
    '#default_value' => $item['settings']['font'],
    '#rows' => 3,
    '#required' => FALSE,
    '#resizable' => FALSE
  );
  $form['ac_container_full_width'] = array(
    '#type' => 'checkbox',
    '#default_value' => 1,
    '#attributes' => array('style' => 'display:none')
  );
  $form['block_content'] = array(
    '#type' => 'textarea',
    '#default_value' => $item['build_data'],
    '#attributes' => array(
      'id' => 'edit-ac-content',
      'class' => array('block_ac_content'),
      'style' => 'display:none;'
    ),
    '#attached' => array('js' => array('jQuery(function($){$(".block_ac_content").parents(".form-item:first").hide();});' => array('type' => 'inline')))
  );  
  $form['megamenu_save'] = array(
    '#type' => 'submit',
    '#value' => t('Save'),
    '#submit' => array('_block_save_submit')
  );  
  
  drupal_add_library('system', 'jquery.once');
  
  // attach libraries
  $form['#attached']['library'][] = array('system', 'ui.core');
  $form['#attached']['library'][] = array('system', 'ui.widget');
  $form['#attached']['library'][] = array('system', 'ui.tabs');
  $form['#attached']['library'][] = array('system', 'ui.sortable');
  $form['#attached']['library'][] = array('system', 'ui.resizable');
  $form['#attached']['library'][] = array('system', 'ui.draggable');
  $form['#attached']['library'][] = array('system', 'ui.slider');
  $form['#attached']['library'][] = array('awecontent', 'ac_builder');
  $form['#attached']['js'][] = drupal_get_path('module', 'md_block_painter') . '/js/block-form.js';
  $form['#attached']['css'][] = drupal_get_path('module', 'awecontent') . '/css/awecontent-style.css';

  // add icon css bundle
  drupal_add_js(array('enable_icon' => FALSE), 'setting');
  if (module_exists('icon') && module_exists('fontello')) {
    $bundles = icon_bundles();
    foreach ($bundles as $type => $bundle) {
      if ($bundle['provider'] == 'fontello') {
        fontello_process_attached($bundle['name']);
      }
    }
    drupal_add_js(array('enable_icon' => TRUE), 'setting');
  }

  //Support Module Font awesome
  if (module_exists('icon') && module_exists('fontawesome')) {
    $form['#attached']['library'][] = array('fontawesome', 'fontawesome');
    drupal_add_js(array('enable_icon' => TRUE), 'setting');
  }

  // add page wrapper element configure
  if (!$page_wrapper = variable_get("ac_{$type}_page_wrapper_element", variable_get("ac_page_wrapper_element", 'body'))) {
    $page_wrapper = 'body';
  }
  drupal_add_js(array('acPageWrapper' => $page_wrapper), 'setting');

  // save current session form and form state
  $_SESSION['ac-form-state'] = $form_state;
  $_SESSION['ac-form'] = $form_state;
  // check page template
  $theme_templates = awecontent_get_theme_templates($template);
  $db_templates = _ac_load_templates(0, 10, $template);
  $page_templates = array_merge($theme_templates, $db_templates['templates']);
  if (count($page_templates))
    drupal_add_js(array('ac_has_page_template' => TRUE), 'setting');
  else
    drupal_add_js(array('ac_has_page_template' => FALSE), 'setting');
  
  return $form;
}

/*
 * callback submit form create block
 */
function _block_save_submit(&$form, &$form_state){
  $values = $form_state['values'];
  $time = time();
  $fields = array(
    'status' => 1,
    'name' => $values['block_name'],
    'description' => $values['block_description'],
    'build_data' => $values['block_content'],
    'settings' => array(
        'font' => $values['block_font'],
        'max_width' => $values['block_max_width']
    ),    
    'updated' => $time
  );
  $fields['settings'] = json_encode($fields['settings']);
  $id = $values['block_id'];
  if($id > 0){
    // update block
    db_update('block_painter')->fields($fields)->condition('id', $id)->execute();
  }else{
    // add new block
    $fields['created'] = $time;
    db_insert('block_painter')->fields($fields)->execute();
  }  
  drupal_goto('admin/structure/block-painter');
}

/**
 * Callback to get layout url
 */
function _block_get_layout_url() {
  $url = url('awe-content/template-layout', array('absolute' => TRUE));
  $params = arg();
  if ($params[2] == 'block-painter' && $params[3] != '') {
    if (isset($params[4]) && is_numeric($params[4]) && $params[3] == 'edit') {
      $build_node = $params[4];
    }
    else if ($params[3] == 'add') {
        $params[4] = -1;
      }
    // create layout url for builder
    $url = url("awe-content/template-layout/block", array(
        'absolute' => TRUE,
        'query' => array('ac_layout' => 1, 'build_node' => $params[4])
      ));
  }

  return $url;
}
