<?php
class CommonClass {
	var $VerInfo = 1;
	//method
	function CommonClass() {
		//init
	}
	function getJSSource($data) {
		for ($i=-1,$l=count($data);++$i<$l;) $data[$i] = rawUrlEncode($data[$i]);
		return implode('&', $data);
	}
	function headercache($cache_time) {
        //cache_time: unit seconds
		$time = time();
        $expire_time = $time + $cache_time;
		header('Pragma: public');
        header('Cache-Control: max-age='.$cache_time.', public');
        header('Expires: '. gmdate('D, d M Y H:i',$expire_time) . ' GMT');
        header('Last-Modified: ' . gmdate('D, d M Y H:i', $time) . ' GMT');
	}
	function preg_matchs($patterns, $subject) {
		if (!is_array($patterns)) return false;
		for ($i=-1,$l=count($patterns);++$i<$l;) {
			if (preg_match($patterns[$i], $subject)) { return true; break; }
		}//end for
		return false;
	}
	function writeFile($file_path, $open_type, $msg) {
		$ret_data = array('status'=>true);
		if (!preg_match('/^(w|w\+|a|a\+)$/', $open_type)) $ret_data = array('status'=>false, 'msg'=>'invalid open_type '.$open_type);
		//if (dirname($file_path) == "." || preg_match('/\/\//', $file_path)) $ret_data = array('status'=>false, 'msg'=>'invalid file_path '.$file_path);
		if (preg_match('/\/\//', $file_path)) $ret_data = array('status'=>false, 'msg'=>'invalid file_path '.$file_path);
		if (empty($msg)) $ret_data = array('status'=>false, 'msg'=>'msg is blank');
		//create dir if not exist
		$file_dir = dirname($file_path);
		if (!file_exists($file_dir)) mkdir_recursive($file_dir);
		//file open error
		if ($ret_data['status'] && ($fp = fopen($file_path, $open_type))) { fputs($fp, $msg); fclose($fp); }
		else $ret_data = array('status'=>false, 'msg'=>'open file fail '.$file_path);
		return $ret_data['status'] || $ret_data;
	}
	function showFlashObject($objID, $objSource, $objWidth, $objHeight, $objQuality, $objWmode, $objBgcolor) {
		$swfCode = '';
		/* Default Value Setting */
		if (empty($objID)) $objID = 'ShockwaveFlash1';
		if (empty($objWidth)) $objWidth = '0';
		if (empty($objHeight)) $objHeight = '0';
		if (empty($objQuality)) $objQuality = 'best';
		$objWmode = (empty($objWmode)) ? 'transparent' : $objWmode;
		
		$swfCode .= '<OBJECT id="'.$objID.'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'."\n";
		$swfCode .= 'type="application/x-shockwave-flash" '."\n";
		$swfCode .= 'data="'.$objSource.'" '."\n";
		$swfCode .= 'codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" '."\n";
		$swfCode .= 'WIDTH="'.$objWidth.'" HEIGHT="'.$objHeight.'">'."\n";
		$swfCode .= '<PARAM NAME=menu value=false>'."\n";
		$swfCode .= '<PARAM NAME=allowScriptAccess value=always>'."\n";
		$swfCode .= '<PARAM NAME=wmode value="'.$objWmode.'">'."\n";
		$swfCode .= '<PARAM NAME=movie VALUE="'.$objSource.'">'."\n";
		$swfCode .= '<PARAM NAME=quality VALUE="'.$objQuality.'">'."\n";
		$swfCode .= '<PARAM NAME=bgcolor VALUE="'.$objBgcolor.'">'."\n";
		$swfCode .= '<embed allowScriptAccess="always" swLiveConnect="true" src="'.$objSource.'" menu="false" quality="'.$objQuality.'" wmode="'.$objWmode.'" bgcolor="'.$objBgcolor.'" width="'.$objWidth.'" height="'.$objHeight.'" type="application/x-shockwave-flash" pluginspace="http://www.macromedia.com/go/getflashplayer" name="'.$objID.'">'."\n";
		$swfCode .= '</OBJECT>'."\n";
		return $swfCode;
	}
	function rowData($data) {
		$rd = '';
		foreach($data as $k => $v) {
			if (is_array($v)) {
				$s = '';
				for ($i=-1,$l=count($v);++$i<$l;) $s .= '"'.$v[$i].'",';
				$rd .= '"'.$k.'":['.substr($s,0,strlen($s)-1).'],';
			} else $rd .= '"'.$k.'":"'.$v.'",';
		}//end for
		return '{'.substr($rd,0,strlen($rd)-1).'}';
	}
	function callBack($info, $data) {
		global $callBack;
		$json = array('info'=>$info);
		if (isset($data) && count($data) > 0) $json['data'] = $data;
		$json = json_encode($json);
		
		if (isset($callBack)) {
			$callBack = 'window.parent.'.$callBack;
			$CompleteSet = explode('.', $callBack);
			$Request = '';
			$OutSet = array('window', 'parent');
			foreach ($CompleteSet as $Key => $Value) { 
				$ObjSet .= $Value.'.';
				$Request .= "typeof(".substr($ObjSet, 0, strlen($ObjSet)-1).") != 'undefined' && ";
			}//end for
			$Request = substr($Request, 0, strlen($Request)-4);
			header("Content-type: text/html; charset=utf-8");
			$json = '<script type="text/javascript">if ('.$Request.') '.$callBack.'('.$json.');</script>';
		} else $json = ")]}',\n".$json;
		echo $json;
		die();
	}
}
/*programed by mei(李維翰), http://www.facebook.com/mei.studio.li*/
?>