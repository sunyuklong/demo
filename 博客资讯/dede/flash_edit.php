<?php
require_once(dirname(__FILE__).'/config.php');
require_once(DEDEINC.'/datalistcp.class.php');
require_once(DEDEINC.'/common.func.php');
if($dopost=="edit")
{
	if(is_uploaded_file($_FILES['flashimg']['tmp_name'])) {
		$tmp_name = $_FILES['flashimg']['tmp_name'];
		$name = $_FILES['flashimg']['name'];
		
		// get file extension
		$ext = explode(".", $name);
		$extension = $ext[count($ext) - 1];
		
		$n_name = time();
		
		$img_path =  DEDEROOT."/static/flash/$n_name.$extension";
		
		if(!move_uploaded_file($flashimg, $img_path)){
			ShowMsg("图片上传出错!", 'flash.php');
			exit;
		}
		//获得相对路径
		$img_path = str_replace(DEDEROOT, '', $img_path);
	}
	
	if(isset($img_path))
		$query = "update `#@__flash` SET alt = '{$alt}' ,link = '{$link}',sequence = '{$sequence}', img_path = '{$img_path}' WHERE id = '{$id}'";
	else
		$query = "update `#@__flash` SET alt = '{$alt}' ,link = '{$link}',sequence = '{$sequence}' WHERE id = '{$id}'";
	
	$dsql->ExecuteNoneQuery($query);
	
	ShowMsg("更新成功!", $_SERVER["REQUEST_URI"]);

	exit;
}
$sql = "SELECT * FROM `#@__flash` WHERE id='{$id}'";
$dlist = new DataListCP();
$dlist->SetTemplet(DEDEADMIN."/templets/flash_edit.htm");
$dlist->SetSource($sql);
$dlist->display();