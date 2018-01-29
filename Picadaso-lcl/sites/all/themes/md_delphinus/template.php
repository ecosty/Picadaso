<?php
include_once './' . drupal_get_path('theme', 'md_delphinus') . '/inc/front/html.preprocess.inc';
include_once './' . drupal_get_path('theme', 'md_delphinus') . '/inc/front/page.preprocess.inc';
include_once './' . drupal_get_path('theme', 'md_delphinus') . '/inc/front/function.theme.inc';

/**
 * Implements theme_menu_tree().
 */
function md_delphinus_menu_tree__main_menu($variables) {
	return '<ul id="main-navigation">' . $variables['tree'] . '</ul>';
}

/**
 * Implements theme_menu_link__[MENU NAME].
 */
function md_delphinus_menu_link__main_menu($variables) {

  $element = $variables['element'];
  $output = l($element['#title'], $element['#href'], $element['#localized_options']);
  $sub_menu = drupal_render($element['#below']);

  if($element['#below']) {
	$title = $element['#title'];
	$output = l($title, $element['#href'], array('html' => TRUE));
	if($element['#attributes']['layout'][0] == "menu-list") {
		$sub_menu = str_replace('id="main-navigation"','class="sub-menu-dropdown"',$sub_menu);
		$sub_menu = str_replace('class="navigation-mobile"','class="sub-menu-dropdown"',$sub_menu);
		return '<li>' . $output . $sub_menu . "</li>\n";
	}
	if($element['#attributes']['layout'][0] == "menu-col") {
		$sub_menu = str_replace('<ul id="main-navigation">','<ul class="kt-megamenu-ul clearfix">',$sub_menu);
		$sub_menu = str_replace('class="navigation-mobile"','<ul class="kt-megamenu-ul clearfix">',$sub_menu);
		$sub_menu = str_replace('sub-menu-dropdown','sub-menu-megamenu',$sub_menu);
		return '<li class="kt-megamenu-item megamenu-width-80">' . $output . '<div class="kt-megamenu-wrapper megamenu-columns-' . $element['#attributes']['layout_col'][0] . ' megamenu-position-center">' . $sub_menu . '</div>' . "</li>\n";
	}
  }
  else {
	return '<li>' . $output . "</li>\n";
  }
}

function md_delphinus_form_comment_form_alter(&$form, &$form_state) {
	unset($form['actions']['preview']);
	if($form['#form_id'] == "comment_node_product_form") {
		$form['#attributes']['class'][] = 'comment-form' ;
		$form['author']['name']['#attributes'] = array('placeholder' => t('Your name'));
		$form['author']['_author']['#title_display'] = 'invisible';
		if(user_is_logged_in()) {
			$form['author']['_author']['#prefix'] = '<div class="comment-form-author">';
			$form['author']['_author']['#suffix'] = '</div>';
		} else {
			$form['author']['name']['#prefix'] = '<div class="comment-form-author">';
			$form['author']['name']['#suffix'] = '</div>';
		}
		$form['author']['name']['#title_display'] = 'invisible';

		$form['subject']['#attributes'] = array('placeholder' => t('Your subject'));
		$form['subject']['#title_display'] = 'invisible';
		$form['subject']['#prefix'] = '<div class="comment-form-subject">';
		$form['subject']['#suffix'] = '</div>';

		$form['comment_body']['und'][0]['value']['#attributes'] = array('placeholder' => t('Your review'));
		$form['comment_body']['und'][0]['value']['#title_display'] = 'invisible';
		$form['comment_body']['und'][0]['value']['#prefix'] = '<div class="comment-form-comment">';
		$form['comment_body']['und'][0]['value']['#suffix'] = '</div>';

		$form['actions']['submit']['#value'] = 'Add Review';
		$form['actions']['submit']['#prefix'] = '<div class="form-submit">';
		$form['actions']['submit']['#suffix'] = '</div>';
		$form['actions']['submit']['#attributes']['class'][] = 'btn btn-addtocart-b';
	} else {
		$form['#attributes']['class'][] = 'comment-form' ;
		$form['author']['name']['#attributes'] = array('placeholder' => t('Your name'));
		$form['author']['_author']['#title_display'] = 'invisible';
		if(user_is_logged_in()) {
			$form['author']['_author']['#prefix'] = '<div class="row"><div class="comment-form-author col-sm-4">';
			$form['author']['_author']['#suffix'] = '</div>';
		} else {
			$form['author']['name']['#prefix'] = '<div class="comment-form-author col-sm-4">';
			$form['author']['name']['#suffix'] = '</div>';
		}
		$form['author']['name']['#title_display'] = 'invisible';

		$form['subject']['#attributes'] = array('placeholder' => t('Your subject'));
		$form['subject']['#title_display'] = 'invisible';
		$form['subject']['#prefix'] = '<div class="comment-form-url col-sm-4">';
		$form['subject']['#suffix'] = '</div>';

		$form['field_comment_email']['und'][0]['#attributes'] = array('placeholder' => t('Your email'));
		$form['field_comment_email']['und'][0]['#title_display'] = 'invisible';
		$form['field_comment_email']['und']['#prefix'] = '<div class="comment-form-email col-sm-4">';
		$form['field_comment_email']['und']['#suffix'] = '</div></div>';

		$form['field_comment_title']['und'][0]['email']['#attributes'] = array('placeholder' => t('Title'));
		$form['field_comment_title']['und'][0]['email']['#title_display'] = 'invisible';
		$form['field_comment_title']['und'][0]['email']['#prefix'] = '<div class="comment-form-title">';
		$form['field_comment_title']['und'][0]['email']['#suffix'] = '</div>';

		$form['comment_body']['und'][0]['value']['#attributes'] = array('placeholder' => t('Your Review'));
		$form['comment_body']['und'][0]['value']['#title_display'] = 'invisible';
		$form['comment_body']['und'][0]['value']['#prefix'] = '<div class="comment-form-comment">';
		$form['comment_body']['und'][0]['value']['#suffix'] = '</div>';

		$form['actions']['submit']['#value'] = 'Submit';
		$form['actions']['submit']['#prefix'] = '<div class="form-submit">';
		$form['actions']['submit']['#suffix'] = '</div>';
		$form['actions']['submit']['#attributes']['class'][] = 'btn btn-dark-b btn-lg';
	}
}

function md_delphinus_form_webform_client_form_47_alter(&$form, &$form_state) {
	$form['#attributes']['class'][] = 'contactform' ;
  	$form['submitted']['name']['#title_display'] = 'invisible';
	$form['submitted']['name']['#attributes'] = array('placeholder' => t('Your Name'));
	$form['submitted']['name']['#prefix'] = '<div class="row"><div class="col-md-4 col-sm-4"><p>';
	$form['submitted']['name']['#suffix'] = '</p></div>';

	$form['submitted']['email']['#title_display'] = 'invisible';
	$form['submitted']['email']['#attributes'] = array('placeholder' => t('Your Email'));
	$form['submitted']['email']['#prefix'] = '<div class="col-md-4 col-sm-4"><p>';
	$form['submitted']['email']['#suffix'] = '</p></div>';

	$form['submitted']['website']['#title_display'] = 'invisible';
	$form['submitted']['website']['#attributes'] = array('placeholder' => t('Your Website'));
	$form['submitted']['website']['#prefix'] = '<div class="col-md-4 col-sm-4"><p>';
	$form['submitted']['website']['#suffix'] = '</p></div></div>';

	$form['submitted']['title']['#title_display'] = 'invisible';
	$form['submitted']['title']['#attributes'] = array('placeholder' => t('Title'));
	$form['submitted']['title']['#prefix'] = '<p>';
	$form['submitted']['title']['#suffix'] = '</p>';

	$form['submitted']['review']['#title_display'] = 'invisible';
	$form['submitted']['review']['#default_value'] = 'Your review';
	$form['submitted']['review']['#prefix'] = '<p>';
	$form['submitted']['review']['#suffix'] = '</p>';

	$form['actions']['submit']['#value'] = 'Send';
	$form['actions']['submit']['#attributes']['class'][] = 'btn btn-dark-b btn-lg';
	$form['actions']['submit']['#prefix'] = '<p>';
	$form['actions']['submit']['#suffix'] = '</p>';
}

function md_delphinus_form_user_login_alter(&$form, &$form_state) {
	$form['actions']['submit']['#attributes']['class'][] = 'btn btn-dark-b';
}

function md_delphinus_form_user_register_form_alter(&$form, &$form_state) {
	$form['actions']['submit']['#attributes']['class'][] = 'btn btn-dark-b';
}

function md_delphinus_form_user_pass_alter(&$form, &$form_state) {
	$form['actions']['submit']['#attributes']['class'][] = 'btn btn-dark-b';

}

function md_delphinus_theme($existing, $type, $theme, $path) {
  return array(
    'user_profile_form' => array(
      // Forms always take the form argument.
      'arguments' => array('form' => NULL),
      'render element' => 'form',
      'template' => 'templates/user/user-profile-edit',
    ),
  );
}