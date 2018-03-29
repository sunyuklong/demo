<?php
require_once(dirname(__FILE__).'/config.php');
require_once(DEDEINC.'/datalistcp.class.php');

if(isset($ac) && $ac == 'delete'){
	$query = "DELETE FROM `#@__flash` WHERE `id`='{$id}'";
	$dsql->ExecuteNoneQuery($query);
	ShowMsg("删除成功!", 'flash.php');
	exit;
}
if(isset($ac) && $ac == 'hidden'){
	$query = "UPDATE `#@__flash` SET hidden= 1-hidden WHERE `id`='{$id}'";
	$dsql->ExecuteNoneQuery($query);
	ShowMsg("设置成功!", 'flash.php');
	exit;
}
$sql = "SELECT * FROM `#@__flash` ORDER BY sequence ASC";
$dlist = new DataListCP();
$dlist->SetTemplet(DEDEADMIN."/templets/flash.htm");
$dlist->SetSource($sql);
$dlist->display();