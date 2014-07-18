<?
foreach (array(32,36,48,57,62,72,80,96,114,128,144,173) as $key=>$val) {
    thumb($val);
}

function thumb ($s) {
	global $filename;
	$filename = "./dasmspam.png";
	$thumb = imagecreatetruecolor($s, $s);
	$source = 0;
	$source = @imagecreatefrompng($filename);
	imagealphablending($thumb, false);	
	imagesavealpha($thumb, true);
	imagecopyresampled($thumb, $source, 0, 0, 0, 0, $s, $s, 512, 512);
//	header("Content-Type: image/jpeg");
	imagepng($thumb,$s.".png");
//    }
//    else {
//	return 'Error';
//    }
	@imagedestroy($thumb);
	@imagedestroy($source);
    
}

?>