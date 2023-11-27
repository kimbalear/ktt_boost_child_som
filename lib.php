<?php

// Every file should have GPL and copyright in the header - we skip it in tutorials but you should not skip it for real.

// This line protects the file from being accessed by a URL directly.
defined('MOODLE_INTERNAL') || die();

// We will add callbacks here as we add features to our theme.
function theme_ktt_boost_child_som_get_main_scss_content($theme) {
    global $CFG;

    $scss = '';
    $filename = !empty($theme->settings->preset) ? $theme->settings->preset : null;
    $fs = get_file_storage();

    $context = context_system::instance();
    if ($filename == 'default.scss') {
        // We still load the default preset files directly from the boost theme. No sense in duplicating them.
        $scss .= file_get_contents($CFG->dirroot . '/theme/boost/scss/preset/default.scss');
    } else if ($filename == 'plain.scss') {
        // We still load the default preset files directly from the boost theme. No sense in duplicating them.
        $scss .= file_get_contents($CFG->dirroot . '/theme/boost/scss/preset/plain.scss');

    } else if ($filename && ($presetfile = $fs->get_file($context->id, 'theme_ktt_boost_child_som', 'preset', 0, '/', $filename))) {
        // This preset file was fetched from the file area for theme_ktt_boost_child_som and not theme_boost (see the line above).
        $scss .= $presetfile->get_content();
    } else {
        // Safety fallback - maybe new installs etc.
        $scss .= file_get_contents($CFG->dirroot . '/theme/boost/scss/preset/default.scss');
    }
    // Pre CSS - this is loaded AFTER any prescss from the setting but before the main scss.
    $pre = file_get_contents($CFG->dirroot . '/theme/ktt_boost_child_som/scss/pre.scss');
    // Post CSS - this is loaded AFTER the main scss but before the extra scss from the setting.
    $post = file_get_contents($CFG->dirroot . '/theme/ktt_boost_child_som/scss/post.scss');
    // Combine them together.
    return $pre . "\n" . $scss . "\n" . $post;
}

function ktt_boost_child_som_extend_navigation(global_navigation $navigation) {
    $url_contact = new moodle_url('/theme/ktt_boost_child_som/pages/contact.php');
    $url_about = new moodle_url('/theme/ktt_boost_child_som/pages/about.php');
    
    $node_contact = navigation_node::create('Página contact', $url_contact, navigation_node::NODETYPE_LEAF, null, 'contact');
    $node_about = navigation_node::create('Página about', $url_about, navigation_node::NODETYPE_LEAF, null, 'about');
    
    $navigation->add_node($node_contact);
    $navigation->add_node($node_about);
}