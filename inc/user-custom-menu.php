<?php


//Adicionar novo menu

function handel_custom_menu($menu_links) {
$menu_links = array_slice($menu_links, 0, 5, true) 
+ ['assinaturas' => 'Assinaturas']
+ array_slice($menu_links, 5, NULL, true);
//remove um link
//unset($menu_links['downloads']);

  return $menu_links;
}
add_filter ('woocommerce_account_menu_items', 'handel_custom_menu');

function handel_add_endpoint() {
  add_rewrite_endpoint('assinaturas', EP_PAGES);
}
add_action('init','handel_add_endpoint');

function handel_assinaturas() {
  echo '<h2>Essas São as entregas da sua Assinatura</h2>';
}
add_action('woocommerce_account_assinaturas_endpoint','handel_assinaturas');

//flush_rewrite_rules(); *** Apagar depois de usar ***
?>