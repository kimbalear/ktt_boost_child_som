<?php
require_once(__DIR__ . '/../../config.php');
global $PAGE, $OUTPUT;

$PAGE->set_context(context_system::instance());
$PAGE->set_url(new moodle_url('/theme/ktt_boost_child_som/pages/service.php'));
$PAGE->set_title(get_string('service_title', 'theme_ktt_boost_child_som'));
$PAGE->set_heading(get_string('service_heading', 'theme_ktt_boost_child_som'));

echo $OUTPUT->header();
//echo $OUTPUT->render_from_template('theme_ktt_boost_child_som/pages/service', []);
echo $OUTPUT->footer();