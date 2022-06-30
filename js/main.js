$(function() {
	//page-topの表示
	var showFlag = false;
	var topBtn = $('#page-top');
	topBtn.css('bottom', '-195px');
	var showFlag = false;

	//スクロールが100に達したらボタン表示
	$(window).scroll(function() {
		if ($(this).scrollTop() > 100) {
			if (showFlag == false) {
				showFlag = true;
				topBtn.stop().animate({
					'bottom': '10px'
				}, 300);
			}
		} else {
			if (showFlag) {
				showFlag = false;
				topBtn.stop().animate({
									'bottom': '-195px'
				}, 300);
			}
		}
	});

	// ページ内リンク
	$('a[href^=#]').click(function() {
		 var speed = 500;
		 var href= $(this).attr("href");
		 var target = $(href == "#" || href == "" ? 'html' : href);
		 var position = target.offset().top;
		 // スムーススクロール
		 $('body,html').animate({scrollTop:position}, speed, 'swing');
		 return false;
	});
});
