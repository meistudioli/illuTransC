<?php
header("Access-Control-Allow-Origin: *");
header("Content-type: application/json; charset=utf-8");
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header("Cache-Control: no-store, no-cache, must-revalidate");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");
header("x-frame-options:sameorigin");
import_request_variables("gp");
ini_set('display_errors', 0);
require_once './libs/cls_commom.php';
foreach ($_REQUEST as $k => $v) $$k = $v;

$libs = new CommonClass();

if (isset($callBack)) sleep(1);

$FilePath = './illuTransLog.inc';
$file_content = '';
foreach ($_POST as $key => $value) {
	$file_content .= $key.': '.urldecode($value)."\n";
}//end for

foreach ($_FILES as $Key => $Value) {
	$file_content .= 'ColName: '.$Key."\n";
	$file_content .= 'FileName: '.$Value['name']."\n";
	$file_content .= 'FileSize: '.$Value['size']."\n";
	$MovePath = str_replace('\\', '/', realpath("./").'/inputFiles/'.$Value['name']);
	$file_content .= 'RealPath: '.$MovePath."\n\n";
	move_uploaded_file($Value['tmp_name'], $MovePath);
}//end for

$FH = fopen($FilePath, "a+");
fwrite($FH, $file_content);
fclose($FH);

if (isset($jojo)) {
	$key = rand(0, 18);
	$DataArray = array();
	$DataArray[] = array(
						'icon' => 'img/illuTrans/shiseido_jojo_'.$key.'_150.jpg',//must have
						'preview' => 'img/illuTrans/shiseido_jojo_'.$key.'.jpg',//must have
						'id' => 'mei'
					);
} else {
	$key = rand(0, 8);
	// $key = 1;
	$DataArray = array();
	$DataArray[] = array(
						'icon' => 'img/illuTrans/anri_'.$key.'_150.jpg',//must have
						'preview' => 'img/illuTrans/anri_'.$key.'.jpg',//must have
						'id' => 'mei'
					);
}//end if

$status = (!isset($err)) ? 'success' : ((rand(0, 1)) ? 'success' : 'fail');
$libs->callBack($status, $DataArray);
/*中文*/
?>