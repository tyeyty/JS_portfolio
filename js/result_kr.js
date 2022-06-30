$(function(){
	
	var score = 0;
	if(localStorage.getItem('nyankoshindan_point') != null ){
		score = localStorage.getItem('nyankoshindan_point');
	}
	
	console.log(score);


	var name_area = document.getElementById('txt_name');
	var name_txt = name_area.value
	name_area.addEventListener('input',function(){
		
		name_txt = name_area.value
		
		if (name_txt.length != 0){
			$('#btn_start').css({"display":"block"});
			$('#btn_start_off').css({"display":"none"});
		}else {
			$('#btn_start').css({"display":"none"});
			$('#btn_start_off').css({"display":"block"});
		}
		
		if (name_txt.length > 10){
			alert("글자수를 초과하였습니다.");
		}
		
	});


	$("#btn_start").click(function(){
		$('#name_block').remove();
		
		$('#result').css({"display":"block"});
		$('.r_loader').css({"display":"block"});
		$('.r_loader').delay(300).animate({"opacity":0},500,"swing",function(){
			$('#result').animate({"opacity":1},600,"swing");
		});
		
	
		score_result(score);
		text_maker();
		drawImage();
		
		
		localStorage.setItem('nyankoshindan_second', 1);
		
	});
	
	
	
	var mql = window.matchMedia("screen and (max-width: 768px)");
	var _canvas = document.querySelector("#image1");
	
	
	
	
	

	function Base64toBlob(arg_data){
		var tmp = arg_data.split(',');
		var data = atob(tmp[1]);
		var mime = tmp[0].split(':')[1].split(';')[0];
		var buf = new Uint8Array(data.length);
		for (var i = 0; i < data.length; i++) {
			buf[i] = data.charCodeAt(i);
		}
		var blob = new Blob([buf], { type: mime });
		return blob;
	}

	function cvsCapture(arg_btn){
		var target_cvs = document.querySelector("#image1");
		var imgdata = target_cvs.toDataURL("image/png");
		var blobimg = Base64toBlob(imgdata);
		var elm_canvasimg = document.createElement('img')
		elm_canvasimg.classList.add('canvasimg');
		elm_canvasimg.src = imgdata;
		var url = (window.URL || window.webkitURL);
		var dataUrl = url.createObjectURL(blobimg);
		arg_btn.href = dataUrl;
		
		$('#card').attr('src', dataUrl);
		
		arg_btn.download = "냥코 진단 캠페인" + ".png";
	}

	var dl_btn = document.querySelector('#dl_btn a');
	var bgimg;
	var txt1 = '';
	var txt2 = '';
	var txt3 = '';



	// カード画像を描画
	function drawImage(){
		

		//画面サイズが変動ある場合
		mql.addListener(function(e) {
			screen_card();		
		});
		
		screen_card();

	}

	
	//sizeによってカードサイズ修正して作成：mobile/PC
	function screen_card(){
		if (mql.matches) {
			//console.log("Mobile");

			_canvas.width = 300;
			_canvas.height = 375;

			//console.log(_canvas.width);

			var Card = new Image();
			Card.src = "img/card_base_" + bgimg + "_kr.png";
			Card.onload = function(){
				var canvas = document.querySelector("#image1");
				var ctx = canvas.getContext("2d");
				ctx.drawImage(Card, 0, 0, canvas.width, canvas.height);
				ctx.font = "bold 19px arial";
				ctx.fillStyle = "Black";
				
				ctx.textAlign = "center";
				ctx.fillText(name_txt, 150, 213);

				ctx.font = "12px arial";
				ctx.textAlign = "center";
				ctx.fillText(txt1, 150, 271);
				ctx.fillText(txt2, 150, 308);
				ctx.fillText(txt3, 150, 345);

				cvsCapture(dl_btn);
			}

		} else {
			//console.log("PC");
			
			_canvas.width = 400;
			_canvas.height = 500;

			var Card = new Image();

			//console.log(_canvas.width);
			//Card.src = "img/hokaku/card_base.jpg";
			Card.src = "img/card_base_" + bgimg + ".png";
			Card.onload = function(){
				var canvas = document.querySelector("#image1");
				var ctx = canvas.getContext("2d");
				ctx.drawImage(Card, 0, 0, canvas.width, canvas.height);
				ctx.font = "bold 27px arial";
				ctx.fillStyle = "Black";
				
				ctx.textAlign = "center";
				ctx.fillText(name_txt, 200, 284);

				ctx.font = "15px arial";
				ctx.textAlign = "center";
				ctx.fillText(txt1, 200, 362);
				ctx.fillText(txt2, 200, 412);
				ctx.fillText(txt3, 200, 460);

				cvsCapture(dl_btn);
			}
		}
	}
	
	
	//等級計算
	function score_result(arg_score){
		if (arg_score <= 19){
			//score = 'ノーマル';
			bgimg = "01";
			$(".r_txt01").eq(0).css({"display":"block"});
		}else if (arg_score <= 39){
			//score = 'EX';
			bgimg = "02";
			$(".r_txt01").eq(1).css({"display":"block"});
		}else if (arg_score <= 59){
			//score = 'レア';
			bgimg = "03";
			$(".r_txt01").eq(2).css({"display":"block"});
		}else if (arg_score <= 79){
			//score = '激レア';
			bgimg = "04";
			$(".r_txt01").eq(3).css({"display":"block"});
		}else if (arg_score <= 99){
			//score = '超激レア';
			bgimg = "05";
			$(".r_txt01").eq(4).css({"display":"block"});
		}else if (arg_score == 100){
			//score = '伝説レア';
			bgimg = "06";
			$(".r_txt01").eq(5).css({"display":"block"});
		}
	}
	

	//ワード生成
	function text_maker() {

		var A_txt = ['사과', '부자', '선배', '목욕탕', '시험', '스마트폰', '사장님', '김밥', '지구', '후배', '숙제', '오덕', '몸짱', '라면', '마른 사람', '뚱뚱한 사람', '미인계', '미소녀', '아저씨', '훈남', '고층 빌딩', '수상한 사람', '날라리', '편의점', '비밀조직', '블랙기업', '유치원생', '대학원생', '미녀', '할아버지', '연예인', '도둑', '원시인', '이장님', '직장상사', '지옥', '할머니', '모기', '이상한 냄새', '화장실', '보이스 피싱', '발모제', '유령', '교장선생님', '알바생', '쓰레기', '아버지', '어머니', '스승님', '고양이 집사', '커플', '감옥', '패션', '변태', '일반인', '친구', '변호사', '만원 전철', '척척박사', '아이돌 그룹'];
		var B_txt = ['에 엄청 강하다', '에 엄청 약하다', '에 맷집이 좋다', '에 맷집이 약하다', '에 초 데미지', '에게만 공격 가능', '에게 딱 1번 살아남을 수 있다', '에게 머니를 많이 얻을 수 있다', '에 초 맷집이 좋다', '에 극 데미지'];
		var C_txt = ['반드시 ', '가끔 ', '아주 가끔 ', '때때로 ', '극히 드물게 '];
		var D_txt = ['을(를) 날려버린다', '의 움직임을 멈춘다', '의 움직임을 느리게 한다', '을(를) 저주한다', '을(를) 파괴한다', '에게 파동을 뿜어낸다', '(으)로부터 데미지를 받지 않는다', '을(를) 없앤다', '의 능력을 낮춘다', '에게 크리티컬 공격을 낸다'];
		var E_txt = ['을(를) 좋아한다', '을(를) 싫어한다', '에게 사랑받고 있다', '에게 미움받고 있다', '을(를) 존경하고 있다', '에게 무시당하고 있다', '에게 감사하고 있다', '에게 상냥하다', '에게 엄격하다', '을(를) 동경하고 있다', '에 깐깐하다', '을(를) 무서워한다', '을(를) 신뢰하고 있다', '을(를) 경계하고 있다', '을(를) 기대하고 있다'];

		var rand1 = Math.floor(Math.random() * A_txt.length);
		var rand2 = Math.floor(Math.random() * B_txt.length);
		var rand3 = Math.floor(Math.random() * C_txt.length);
		var rand4 = Math.floor(Math.random() * D_txt.length);
		var rand5 = Math.floor(Math.random() * E_txt.length);
		var rand6 = Math.floor(Math.random() * A_txt.length);
		var rand7 = Math.floor(Math.random() * A_txt.length);

		txt1 = A_txt[rand1] + B_txt[rand2] ;
		txt2 = C_txt[rand3] + A_txt[rand6] + D_txt[rand4];
		txt3 = A_txt[rand7] + E_txt[rand5];
		//console.log(txt1);
		//console.log(txt2);
		//console.log(txt3);
	}

	/*
	if(localStorage.getItem('nyankoshindan_second') == 1 ){
		$("#name_block").remove();
		$('#finish').css({"display":"block"});
	}
	*/

	
});

