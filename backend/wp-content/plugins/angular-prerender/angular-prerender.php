<?php
/*
Plugin Name: Angular Prerender
Plugin URI: https://github.com/kmturley/angular-universal-wordpress-cms
Description: Plugin which triggers Angular static prerender functionality whenever a post/page is published.
Version: 0.1
Author: Kim T
Author URI: https://github.com/kmturley
License: GPL
Copyright: Kim T
*/

add_action('publish_page', 'publish_static_hook');
add_action('publish_post', 'publish_static_hook');

function publish_static_hook($id) {
  // trigger your static build here
  exec('echo '.$id.' > post.txt');
}

?>