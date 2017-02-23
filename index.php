<?php
$data = array(
	'max' => 9,
	'legal' => array('png', 'jpeg', 'jpg', 'gif'),
	'limitSize' => 31457280,
	'col' => 5,
	'inputName' => 'illusion',
	'stripWidth' => 200,
	'stripAmount' => 10,
	'uri' => 'illuTransFunc.php',
	'withCredentials' => true,
	'useLightbox' => true, //use default lightbox effect
	'coolTime' => 10000, //error remove
	'params' => array(
		'id' => 'mei',
		'type' => 'item-preview'
	),
	'placeholder' => array(
		array(
			'icon' => 'img/illuTrans/shiseido_jojo_1_150.jpg', //must have
			'preview' => 'img/illuTrans/shiseido_jojo_1.jpg', //must have
			'id' => 'mei-0'
		),
		array(
			'icon' => 'img/illuTrans/shiseido_jojo_2_150.jpg', //must have
			'preview' => 'img/illuTrans/shiseido_jojo_2.jpg', //must have
			'id' => 'mei-1'
		),
		array(
			'icon' => 'img/illuTrans/shiseido_jojo_3_150.jpg', //must have
			'preview' => 'img/illuTrans/shiseido_jojo_3.jpg', //must have
			'id' => 'mei-2'
		),
		array(
			'icon' => 'img/illuTrans/shiseido_jojo_4_150.jpg', //must have
			'preview' => 'img/illuTrans/shiseido_jojo_4.jpg', //must have
			'id' => 'mei-3'
		)
	)
);

if (isset($_REQUEST['virgin'])) unset($data['placeholder']);
if (isset($_REQUEST['error'])) $data['params']['err'] = true;

$data = ' data-conf=\''.htmlspecialchars(json_encode($data), ENT_QUOTES, 'UTF-8').'\'';
?>
<!DOCTYPE html>
<html lang="en" x-frame-options="sameorigin">
<head>
<meta http-equiv="CACHE-CONTROL" content="NO-CACHE">
<meta http-equiv="PRAGMA" content="NO-CACHE">
<meta http-equiv="Expires" content="Wed, 26 Feb 1997 08:21:57 GMT">
<meta http-equiv="imagetoolbar" content="no">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
<meta name="description" content="圖片上傳一直都是筆者感興趣的 module, 從早期單一檔案到借助 Flash 來達成複檔上傳, 甚至是現在的 HTML5 原生 support, 它可以說是一段活生生的 Web 進化史, 由 HTML5 和 CSS3 的交錯渲染下, Image upload 也變的更加活潑有趣, 連帶的也大大的增進了使用者體驗, 選取待上傳檔案的方式更是一大進化, User 除了點擊 input button 的選項之外, 更可以直接從檔案總管 drag / drop 檔案進來, 亦或 drag 其他視窗的網頁內容進來都不是問題, 筆者經手的幾個服務中都有 image upload 的需求, 為了能可以快速 plug 這樣的 feature 到不同的 property 上, 便開發了 illuTrans 這個 module, 更把幾個這些年來開發經驗去蕪存菁通通融入到這個 module 中, 除了基本的上傳功能外, 更是多了拖曳排序, 圖片預覽等功能, 亦抽出一些常用的 method / property 出來, 讓 developer 可以做更多元的變化與監控, 可以說集力與美於一身的強力 module, 接下來藉由以下的篇幅, 讓筆者為你慢慢揭開 illuTrans 一切一切.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@mei">
<meta name="twitter:creator" content="@mei">
<meta name="twitter:title" content="illuTrans - web components based image upload application">
<meta name="twitter:description" content="圖片上傳一直都是筆者感興趣的 module, 從早期單一檔案到借助 Flash 來達成複檔上傳, 甚至是現在的 HTML5 原生 support, 它可以說是一段活生生的 Web 進化史, 由 HTML5 和 CSS3 的交錯渲染下, Image upload 也變的更加活潑有趣, 連帶的也大大的增進了使用者體驗, 選取待上傳檔案的方式更是一大進化, User 除了點擊 input button 的選項之外, 更可以直接從檔案總管 drag / drop 檔案進來, 亦或 drag 其他視窗的網頁內容進來都不是問題, 筆者經手的幾個服務中都有 image upload 的需求, 為了能可以快速 plug 這樣的 feature 到不同的 property 上, 便開發了 illuTrans 這個 module, 更把幾個這些年來開發經驗去蕪存菁通通融入到這個 module 中, 除了基本的上傳功能外, 更是多了拖曳排序, 圖片預覽等功能, 亦抽出一些常用的 method / property 出來, 讓 developer 可以做更多元的變化與監控, 可以說集力與美於一身的強力 module, 接下來藉由以下的篇幅, 讓筆者為你慢慢揭開 illuTrans 一切一切.">
<meta name="twitter:image:src" content="http://mei.homin.com.tw/img/preview/illuTransC.png">
<meta property="og:title" content="illuTrans - web components based image upload application">
<meta property="og:site_name" content="mei">
<meta property="og:description" content="圖片上傳一直都是筆者感興趣的 module, 從早期單一檔案到借助 Flash 來達成複檔上傳, 甚至是現在的 HTML5 原生 support, 它可以說是一段活生生的 Web 進化史, 由 HTML5 和 CSS3 的交錯渲染下, Image upload 也變的更加活潑有趣, 連帶的也大大的增進了使用者體驗, 選取待上傳檔案的方式更是一大進化, User 除了點擊 input button 的選項之外, 更可以直接從檔案總管 drag / drop 檔案進來, 亦或 drag 其他視窗的網頁內容進來都不是問題, 筆者經手的幾個服務中都有 image upload 的需求, 為了能可以快速 plug 這樣的 feature 到不同的 property 上, 便開發了 illuTrans 這個 module, 更把幾個這些年來開發經驗去蕪存菁通通融入到這個 module 中, 除了基本的上傳功能外, 更是多了拖曳排序, 圖片預覽等功能, 亦抽出一些常用的 method / property 出來, 讓 developer 可以做更多元的變化與監控, 可以說集力與美於一身的強力 module, 接下來藉由以下的篇幅, 讓筆者為你慢慢揭開 illuTrans 一切一切.">
<meta property="og:image" content="http://mei.homin.com.tw/img/preview/illuTransC.png">
<title>illuTrans - web components based image upload application</title>
<link rel="dns-prefetch" href="//mei.homin.com.tw">
<link rel="canonical" href="http://mei.homin.com.tw/illuTransCompletePrototype.php">
<link rel="stylesheet" href="css/cssbase.css">
<link rel="stylesheet" href="css/adornFormElements.css">
<link rel="stylesheet" href="css/illu-trans.css">
<script src="js/pageRender.js" data-source="js/pack-illu-trans.js&js/illuTransCInit.js"></script>
</head>

<body>
<header id="hd" role="banner">
	<h1>illuTrans - web components based image upload application</h1>
</header>

<main id="bd" role="main">
	<section>
		<illu-trans hidden<?php echo $data; ?>>
			<h3>illuTrans</h3>
		</illu-trans>
		<p class="warn">message</p>
	</section>
</main>

<footer id="ft">
	<small role="contentinfo">Powered by mei's studio.</small>
</footer>

<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "CreativeWork",
  "name": "illuTrans - web components based image upload application",
  "url": "http://mei.homin.com.tw/illuTransCompletePrototype.php",
  "description": "圖片上傳一直都是筆者感興趣的 module, 從早期單一檔案到借助 Flash 來達成複檔上傳, 甚至是現在的 HTML5 原生 support, 它可以說是一段活生生的 Web 進化史, 由 HTML5 和 CSS3 的交錯渲染下, Image upload 也變的更加活潑有趣, 連帶的也大大的增進了使用者體驗, 選取待上傳檔案的方式更是一大進化, User 除了點擊 input button 的選項之外, 更可以直接從檔案總管 drag / drop 檔案進來, 亦或 drag 其他視窗的網頁內容進來都不是問題, 筆者經手的幾個服務中都有 image upload 的需求, 為了能可以快速 plug 這樣的 feature 到不同的 property 上, 便開發了 illuTrans 這個 module, 更把幾個這些年來開發經驗去蕪存菁通通融入到這個 module 中, 除了基本的上傳功能外, 更是多了拖曳排序, 圖片預覽等功能, 亦抽出一些常用的 method / property 出來, 讓 developer 可以做更多元的變化與監控, 可以說集力與美於一身的強力 module, 接下來藉由以下的篇幅, 讓筆者為你慢慢揭開 illuTrans 一切一切.",
  "image": "http://mei.homin.com.tw/img/preview/illuTransC.png",
  "author": {
	  "@type": "Person",
	  "name": "Paul Li",
	  "jobTitle": "Front End engineer",
	  "affiliation": "mei's studio",
	  "additionalName": "mei",
	  "url": "https://www.facebook.com/mei.studio.li",
	  "image": "https://graph.facebook.com/mei.studio.li/picture",
	  "brand": "mei's studio",
	  "familyName": "Li",
	  "gender": "M",
	  "givenName": "Paul",
	  "owns": "mei's studio",
	  "worksFor": "Yahoo",
	  "description": "People who loves all front end skills"
  },
  "dateCreated": "2017-02-22",
  "datePublished": "2017-02-22",
  "genre": "web components",
  "keywords": "illuTrans,webcomponents"
}
</script>
</body>
</html>