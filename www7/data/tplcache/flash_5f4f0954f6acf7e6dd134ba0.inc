<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo $cfg_soft_lang; ?>">
<title>###</title>
<link href="css/base.css" rel="stylesheet" type="text/css">
<link href='css/tb-box.css' rel='stylesheet' type='text/css' />
<link href='css/dahui.css' rel='stylesheet' type='text/css' />
</head>
<body>
<div class="clearfix">
<a id="home" class="fl" href="flash_add.php">���ӻõ�Ƭ</a>
<a id="home" style="margin-left:10px;" class="fr" target="_blank" href="http://www.webyjs.com/dvt/">DedeCms��Ƶ�̳�</a>
<a id="home" style="margin-left:10px;"  class="fr ml5" target="_blank" href="http://www.webyjs.com/">�����������վ</a>
<a id="home" style="margin-left:10px;"  class="fr ml5" target="_blank" href="http://www.webyjs.com/archives/203.html">�������ҳ</a>

</div>
<?php
$i = 1;
?>
<table width="100%">
	<tr>
		<td>���</td>
		<td>ͼƬ</td>
		<td>����</td>
		<td>alt</td>
		<td>����</td>
		<td>�Ƿ���ʾ</td>
		<td>�༭</td>
		<td>ɾ��</td>
	</tr>
	<?php
$atts = array();
$atts['tagname'] = 'datalist';
$blockValue = $this->refObj->GetArcList($atts,$this->refObj,$fields); 
if(is_array($blockValue)){
foreach( $blockValue as $key=>$fields )
{
?>
	<tr>
		<td><h1 style="color:red;font-size:36px;"><?php echo $i++;?></h1></td>
		<td><img height="80" src="<?php echo $fields['img_path']; ?>"/></td>
		<td><?php echo $fields['sequence']; ?></td>
		<td><?php echo $fields['alt']; ?></td>
		<td><?php echo $fields['link']; ?></td>
		<td>
		<a <?php
			if($fields['hidden']) echo 'style="background:#000;"'; else echo 'style="background:orangered;"';
		?>href="flash.php?ac=hidden&id=<?php echo $fields['id']; ?>" class="edit">
		<?php
			if($fields['hidden'])
				echo 'δ��ʾ';
			else
				echo '��ʾ��...';
		?>
		</a>
		</td>
		<td><a href="flash_edit.php?id=<?php echo $fields['id']; ?>" class="edit">�༭</a></td>
	<td><a href="flash.php?ac=delete&id=<?php echo $fields['id']; ?>" class="edit delete" onclick="javascript:return confirm('ȷ��Ҫɾ����?');">ɾ��</a>
		</td>
	</tr>
	<?php
}
}?>
</table>
</body>
</html>