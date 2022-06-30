window.addEventListener("load", function(){
	
	var question = document.getElementById('question');
	var pict = document.getElementById('pict');
	var answer = document.getElementById('answer');
	var result = document.getElementById('result');
	var result_i = document.getElementById('r_img');
	var result_t = document.getElementById('r_txt01');
	var btn_first = document.getElementById('btn_first');
	var btn_second = document.getElementById('btn_second');
	var btn_third = document.getElementById('btn_third');


	var img_list = [
		'img/01_kr.jpg',
		'img/02_kr.jpg',
		'img/03_kr.jpg',
		'img/04_kr.jpg',
		'img/05_kr.jpg',
		'img/06_kr.jpg',
		'img/07_kr.jpg',
		'img/08_kr.jpg',
		'img/09_kr.jpg',
		'img/10_kr.jpg'
	];

	for(var i = 0; i < img_list.length; i++){
		var img = document.createElement('img');
		img.src = img_list[i];
	}

	var q_txt ={
		q0_0:"Q1",
		q1_0:"Q2",
		q2_0:"Q3",
		q3_0:"Q4",
		q4_0:"Q5",
		q5_0:"Q6",
		q6_0:"Q7",
		q7_0:"Q8",
		q8_0:"Q9",
		q9_0:"Q10"
	}

	var a_list ={
		a0:"3",
		a1:"1",
		a2:"1",
		a3:"2",
		a4:"1",
		a5:"2",
		a6:"3",
		a7:"3",
		a8:"1",
		a9:"2"
	}
	
	var b_list ={
		b0:"2",
		b1:"3",
		b2:"2",
		b3:"1",
		b4:"2",
		b5:"3",
		b6:"2",
		b7:"1",
		b8:"2",
		b9:"1"
	}

	var s_txt ={
		s0_0:"뭐니 뭐니 해도 근력",s0_1:"뭐니 뭐니 해도 두뇌",s0_2:"뭐니 뭐니 해도 재력",
		s1_0:"인해전술",s1_1:"소수 정예",s1_2:"신의 힘을 발동",
		s2_0:"방법을 바꿔보며 계속 도전",s2_1:"정보를 수집한다",s2_2:"다른 사람에게 부탁한다",
		s3_0:"우선 한번 해본다",s3_1:"이벤트 정보를 읽어본다",s3_2:"일단 뒤로 미룬다",
		s4_0:"입고될 때까지 느긋하게 기다린다",s4_1:"얻을 수 있는 다른 방법을 열심히 찾아본다",s4_2:"포기하고 다른 것을 찾아본다",
		s5_0:"나도 무언가 자랑한다",s5_1:"일단 맞장구쳐준다",s5_2:"다른 이야기로 바꾼다",
		s6_0:"귀여운 미소녀 캐릭터",s6_1:"멋지고 강해 보이는 캐릭터",s6_2:"기발하고 상상을 초월하는 캐릭터",
		s7_0:"간단한 것부터 한다",s7_1:"어려운 것부터 한다",s7_2:"하고 싶은 것부터 한다",
		s8_0:"새로운 목표를 정한다",s8_1:"다른 새로운 것을 시작한다",s8_2:"여행을 떠난다",
		s9_0:"제시간에 도착한다",s9_1:"조금 빨리 도착한다",s9_2:"일부러 늦게 도착한다"
	}



	var q_num = 0;
	var r_num = 0;
	var r_param = ""
	var r_point = 0;

	function insertSelect(arg_target,arg_num){
		while(arg_target.firstChild ){arg_target.removeChild(arg_target.firstChild);}
		arg_target.insertAdjacentHTML('afterbegin', s_txt["s" + q_num + "_" + arg_num]);
	}

	function dispQuestion(arg_select){
		if(a_list["a" + q_num] == arg_select){
			r_param += "1"
			r_point += 10;
		}else{
			r_param += "0"
		}

		if(b_list["b" + q_num] == arg_select){
			r_point += 5;
		}
		
		q_num += 1;
		
		
		if(q_num < Object.keys(q_txt).length){
			while(question.firstChild ){question.removeChild(question.firstChild);}
			question.insertAdjacentHTML('afterbegin', q_txt["q" + q_num + "_0"]);
			
			//画像挿入
			pict.src = img_list[q_num];
			
			insertSelect(btn_first,0);
			insertSelect(btn_second,1);
			insertSelect(btn_third,2);
			
			
		}else{
			
			if(r_point >= 20 && r_point < 40){
				r_num = 1;
			}else if(r_point >= 40 && r_point < 60){
				r_num = 2;
			}else if(r_point >= 60 && r_point < 80){
				r_num = 3;
			}else if(r_point >= 80 && r_point < 99){
				r_num = 4;
			}else if(r_point == 100){
				r_num = 5;
			}else{
				r_num = 0;
			}
			
			localStorage.setItem('nyankoshindan_point', r_point);
			

			location.href = "result.html";
			
		}
		
		//console.log("q=" + q_num);
		//console.log("r=" + r_num);
	}

	
	btn_first.addEventListener('click', function(){
		dispQuestion(1);
		$('.box01').stop().css({"opacity":0}).animate({"opacity":1},600,"swing");
	});
	
	btn_second.addEventListener('click', function(){
		dispQuestion(2);
		$('.box01').stop().css({"opacity":0}).animate({"opacity":1},600,"swing");
	});
	
	btn_third.addEventListener('click', function(){
		dispQuestion(3);
		$('.box01').stop().css({"opacity":0}).animate({"opacity":1},600,"swing");
	});
	
	
	question.insertAdjacentHTML('afterbegin', q_txt["q0_0"]);
	
	insertSelect(btn_first,0);
	insertSelect(btn_second,1);
	insertSelect(btn_third,2);
	
});


//ブラウザバック処理
var navi = performance.getEntriesByType("navigation");
var type = null;

navi.forEach(function(np){
	type = np.type;
});

if(type == 'back_forward'){
	location.reload()
}

$(function(){

	$("#btn_start").click(function(){
		$('#intro').remove();
		$('#game_block').css({"display":"block"}).animate({"opacity":1},600,"swing");
		$("html,body").scrollTop(0);

	});
	
	
	if(localStorage.getItem('nyankoshindan_second') == 1 ){
		$("#btn_start").remove();
		$('#finish').css({"display":"block"});
	}

	
	
});

