
var marginTop = 0;//注意命名
		      var scroll = true; 
		      //定时函数，每150毫秒执行一次函数
		      setInterval(function(){
		        if(scroll){ 
		          $("#list li:first").animate(  //第一个li开始执行动画
		            {marginTop:marginTop--}, //设置上面的外边距自减
		            0,
		            function(){  //动画之后执行的函数
		 
		              if( -marginTop==$(this).height()+1){ //判断li移动的距离是否超过自身的高度
		                var $f = $(this); //复制一个li
		                $(this).remove(); //把第一个移除。第一个移除之后，第二个就自动变为第一个
		                marginTop=0;
		                $f.css("margin-top","0px");
		                $("#list ul").append($f); //把第一个追加加到列表的最后，变成一个无缝连接
		              }
		            }
		          );
		        }
		      },50);
		      

$(function(){
	 $("#list ul").hover(function(){scroll = false;},function(){scroll = true;});
		      function off(){
		      	  $(".cancel").bind("click",function(){
		     				$(this).parents(".promptMessagePop").remove();
		     		});
		      }
		   
		      
		      //tab切换
		     
		      $(".tournamentTab nav li").bind("click",function(){
		      	var _this =  $(this).index();
		      	$(this).addClass("active").siblings("li").removeClass("active");
		      	
		      	$(".tournamentCent section").eq(_this).show().siblings("section").hide();
		      });
				
				
			
			//表单处理北京单场
			function submit(){
				
				//按钮选中状态
				$(".tournamentCentbj .tournamentCentListbtnBox span a").bind("click",function(){
					$(".tournamentCentbj .tournamentCentListbtnBox span").removeClass("yellow");
					$(this).parents("span").addClass("yellow");
					
					var num = $(this).attr("n");//比赛赔率
						var value =  $(".tournamentCentbj .containerText").val();
						var i = value;
  						$(".tournamentCentbj .containerText").val(i);
  						var zstext = $(".tournamentCentbj .numberyuan").text();
  						var zsi = i*2;
  						$(".tournamentCentbj .numberyuan").text(zsi+'.00');
  						var jjin = (zsi*num*0.65).toFixed(2);
  						$(".tournamentCentbj .sum").text(jjin);
  						
  					
					
				/*	//清空金额
					$(".tournamentCentbj .containerText").val('10');
					$(".tournamentCentbj .numberyuan").text("20.00");
					$(".tournamentCentbj .sum").text("23.66");*/
				});
				
				
				
				$(".tournamentCentbj .containerText").blur(function(){
					var textIfText =  $(".tournamentCentbj .containerText").val();
					var reg=/^[1-9]\d*$|^0$/;   // 注意：故意限制了 0321 这种格式，如不需要，直接reg=/^\d+$/;
					if(reg.test(textIfText)==true){
					    //alert("都是数字！通过");
					    var x=parseInt($(".tournamentCentbj .containerText").val());
						if (isNaN(x) || x<10 || x>99999){
							
							//alert('倍数1-999999');
							var html = '';
						html+='<div class="promptMessagePop">';
							html+='<h4>倍数10-99999!</h4>';
							html+='<div>';
								html+='<a href="javascript:;" class="btn cancel okLinkbg">知道了</a>';
							html+='</div>';
						html+='</div>';
						$("body").append(html);
						off();
							$(".tournamentCentbj .containerText").val("10");
						}
					    return true;
					}else{
					    //alert("请填写数字");
					    var html = '';
						html+='<div class="promptMessagePop">';
							html+='<h4>请填写数字!</h4>';
							html+='<div>';
								html+='<a href="javascript:;" class="btn cancel okLinkbg">知道了</a>';
							html+='</div>';
						html+='</div>';
						$("body").append(html);
						off();
					    return false;
					}
					
				});
				//加
				$(".tournamentCentbj .increase").bind("click",function(){
					var isyellow = $(".tournamentCentbj .tournamentCentListbtnBox span").hasClass("yellow");
					if(isyellow==false){
						//alert("请选择赔付比例");	
						/*var html = '';
						html+='<div class="promptMessagePop">';
							html+='<h4>请选择赔付比例!</h4>';
							html+='<div>';
								html+='<a href="javascript:;" class="btn cancel okLinkbg">知道了</a>';
							html+='</div>';
						html+='</div>';
						$("body").append(html);
						off();*/
					}else{
						var num = $(".tournamentCentbj .tournamentCentListbtnBox span.yellow").find("a").attr("n");//比赛赔率
						var value =  $(".tournamentCentbj .containerText").val();
						var i = value;
					  	value = i++;
  						$(".tournamentCentbj .containerText").val(i);
  						var zstext = $(".tournamentCentbj .numberyuan").text();
  						var zsi = i*2;
  						$(".tournamentCentbj .numberyuan").text(zsi+'.00');
  						var jjin = (zsi*num*0.65).toFixed(2);
  						$(".tournamentCentbj .sum").text(jjin);
					}
				});
				$(".tournamentCentbj .containerText").blur(function(){
					var num = $(".tournamentCentbj .containerText").val();
					if(num<=10){
						$(".tournamentCentbj .containerText").val("10");
					}else{
						var v = window.event.keyCode;
			    if (!(v >= 48 && v <= 57)) {
			    	console.log($(this).val());
						var value = $(this).val();
					var num = $(".tournamentCentbj .tournamentCentListbtnBox span.yellow").find("a").attr("n");
					var i = value;
  						$(".tournamentCentbj .containerText").val(i);
  						var zstext = $(".tournamentCentbj .numberyuan").text();
  						var zsi = i*2;
  						$(".tournamentCentbj .numberyuan").text(zsi+'.00');
  						var jjin = (zsi*num*0.65).toFixed(2);
  					//alert(num)
  						$(".tournamentCentbj .sum").text(jjin);
			    	
			        window.event.keyCode = 0;
			        window.event.returnValue = false;
			    }
						
						
					}
					
					
					
				});
				
				
				
				//减
				$(".tournamentCentbj .minus").bind("click",function(){
					var value =  $(".tournamentCentbj .containerText").val();
					var num = $(".tournamentCentbj .tournamentCentListbtnBox span.yellow").find("a").attr("n");//比赛赔率
					var i = value;
					  value = i--;
					  if(value==10){
					  	//alert("不能小于0")
					  	
					  	$(".promptMessagePop").remove();
					  	var html = '';
						html+='<div class="promptMessagePop">';
							html+='<h4>不能小于10倍!</h4>';
							html+='<div>';
								html+='<a href="javascript:;" class="btn cancel okLinkbg">知道了</a>';
							html+='</div>';
						html+='</div>';
						$("body").append(html);
						off();
					  }else{
					  	$(".tournamentCentbj .containerText").val(i);
					  	var n = $(".tournamentCentbj .numberyuan").text();
					  	$(".tournamentCentbj .numberyuan").text(n-2+'.00');
					  	var zsi = i*2;
					  	var jjin = (zsi*num*0.65).toFixed(2);
  						$(".tournamentCentbj .sum").text(jjin);
					  	
					  }
  						
				});
				
				
				
				//提交表单
				
				$(".submitBtn1").bind("click",function(){
					var bonus = $(this).parents(".form01").find(".sum").text();//获取奖金
				 	var loginMoney = $(this).parents(".form01").find(".loginMoney").text();	//获取余额
		 			//var slice = loginMoney.slice(1,10);
		      			//比较是否余额不足
					if(parseInt(loginMoney) < parseInt(bonus)){
						var html = '';
						html+='<div class="promptMessagePop">';
							html+='<h2>温馨提示</h2>';
							html+='<h4>您的余额已不足，请及时充值！</h4>';
							html+='<div>';
								html+='<a href="javascript:;" class="btn cancel cancelbg">取消</a>';
								html+='<a href="javascript:;" class="btn okLink okLinkbg">充值</a>';
							html+='</div>';
						html+='</div>';
						$("body").append(html);
						off();
						$(".promptMessagePop").show();
						//alert("余额不足,请充值");
					}else{
							var conutrie1 = $(this).parents(".tournameentContent").find(".conutriesname").text();//队名称
							var conutrie2 = $(this).parents(".tournameentContent").find(".conutriesnames").text();//队名称
							var lottery = $(this).parents(".tournameentContent").find(".lottery").children(".active").attr("name");//比赛玩发
							var betItem = $(this).parents(".form01").find(".yellow").children("a").text();//选择项
							var multiple = $(this).parents(".form01").find(".containerText").val();//倍数
							var money = $(this).parents(".form01").find(".numberyuan").text();//金额
							var bonus = $(this).parents(".form01").find(".sum").text();//奖金
							
							console.log(conutrie1+'-战队1');
							console.log(conutrie2+'-战队2');
							console.log(lottery+'-比赛玩法');
							console.log(betItem+'-选择项');
							console.log(multiple+'-倍数');
							console.log(money+'-金额');
							console.log(bonus+'-奖金');
							
							var html = '';
						html+='<div class="promptMessagePop">';
							html+='<h4>投注成功，再来一单加奖更多！</h4>';
							html+='<div>';
								html+='<a href="javascript:;" class="btn cancel okLinkbg">知道了</a>';
							html+='</div>';
						html+='</div>';
						$("body").append(html);
						off();
							//alert("投注成功，再来一单加奖更多！")
						}
					})
					
				
			};
			
			submit();
			
			
			//表单处理竞彩足球
			function submit2(){
				//按钮选中状态
				
				$(".tournamentCentjc .tournamentCentListbtnBox span a").bind("click",function(){
					$(".tournamentCentjc .tournamentCentListbtnBox span").removeClass("yellow");
					$(this).parents("span").addClass("yellow");
					
					var num = $(".tournamentCentjc .tournamentCentListbtnBox span.yellow").find("a").attr("n");//比赛赔率
						var value =  $(".tournamentCentjc .containerText").val();
						var i = value;
  						$(".tournamentCentjc .containerText").val(i);
  						var zstext = $(".tournamentCentjc .numberyuan").text();
  						var zsi = i*2;
  						$(".tournamentCentjc .numberyuan").text(zsi+'.00');
  						var jjin = (zsi*num).toFixed(2);
  						$(".tournamentCentjc .sum").text(jjin);
					
					
					
					//清空金额
					/*$(".tournamentCentjc .containerText").val('10');
					$(".tournamentCentjc .numberyuan").text("20.00");
					$(".tournamentCentjc .sum").text("36.40");*/
				});
				
				$(".tournamentCentjc .containerText").val(10);
				$(".tournamentCentjc .containerText").blur(function(){
					var textIfText =  $(".tournamentCentjc .containerText").val();
					var reg=/^[1-9]\d*$|^0$/;   // 注意：故意限制了 0321 这种格式，如不需要，直接reg=/^\d+$/;
					if(reg.test(textIfText)==true){
					    //alert("都是数字！通过");
					    var x=parseInt($(".containerText").val());
						if (isNaN(x) || x<10 || x>99999){
							//alert('倍数1-99999');
							var html = '';
						html+='<div class="promptMessagePop">';
							html+='<h4>倍数10-99999!</h4>';
							html+='<div>';
								html+='<a href="javascript:;" class="btn cancel okLinkbg">知道了</a>';
							html+='</div>';
						html+='</div>';
						$("body").append(html);
						off();
						}
					    return true;
					}else{
					   // alert("请填写数字");
					    var html = '';
						html+='<div class="promptMessagePop">';
							html+='<h4>请填写数字!</h4>';
							html+='<div>';
								html+='<a href="javascript:;" class="btn cancel okLinkbg">知道了</a>';
							html+='</div>';
						html+='</div>';
						$("body").append(html);
						off();
					    return false;
					}
					
				});
				//加
				$(".tournamentCentjc .increase").bind("click",function(){
					var isyellow = $(".tournamentCentjc .tournamentCentListbtnBox span").hasClass("yellow");
					if(isyellow==false){
						//alert("请选择赔付比例");	
						var html = '';
						html+='<div class="promptMessagePop">';
							html+='<h4>请选择赔付比例!</h4>';
							html+='<div>';
								html+='<a href="javascript:;" class="btn cancel okLinkbg">知道了</a>';
							html+='</div>';
						html+='</div>';
						$("body").append(html);
						off();
					}else{
						var num = $(".tournamentCentjc .tournamentCentListbtnBox span.yellow").find("a").attr("n");//比赛赔率
						var value =  $(".tournamentCentjc .containerText").val();
						var i = value;
					  	value = i++;
  						$(".tournamentCentjc .containerText").val(i);
  						var zstext = $(".tournamentCentjc .numberyuan").text();
  						var zsi = i*2;
  						$(".tournamentCentjc .numberyuan").text(zsi+'.00');
  						var jjin = (zsi*num).toFixed(2);
  						$(".tournamentCentjc .sum").text(jjin);
					}
				});
				//减
				$(".tournamentCentjc .minus").bind("click",function(){
					var value =  $(".tournamentCentjc .containerText").val();
					var num = $(".tournamentCentjc .tournamentCentListbtnBox span.yellow").find("a").attr("n");//比赛赔率
					var i = value;
					  value = i--;
					  if(value==10){
					  	//alert("不能小于0")
					  	var html = '';
						html+='<div class="promptMessagePop">';
							html+='<h4>不能小于10倍!</h4>';
							html+='<div>';
								html+='<a href="javascript:;" class="btn cancel okLinkbg">知道了</a>';
							html+='</div>';
						html+='</div>';
						$("body").append(html);
						off();
					  }else{
					  	$(".tournamentCentjc .containerText").val(i);
					  	var n = $(".tournamentCentjc .numberyuan").text();
					  	$(".tournamentCentjc .numberyuan").text(n-2+'.00');
					  	var zsi = i*2;
					  	var jjin = (zsi*num).toFixed(2);
  						$(".tournamentCentjc .sum").text(jjin);
					  	
					  }
  						
				});
				
				//提交表单
				
				$(".submitBtn2").bind("click",function(){
					var bonus = $(this).parents(".form02").find(".sum").text();//获取奖金
				 	var loginMoney =  $(".loginMoney").text();	//获取余额
		 			var slice = loginMoney.slice(1,10);
		      			//比较是否余额不足
					if(parseInt(bonus)>parseInt(slice)){
						//alert("余额不足,请充值");
						var html = '';
						html+='<div class="promptMessagePop">';
							html+='<h2>温馨提示</h2>';
							html+='<h4>您的余额已不足，请及时充值！</h4>';
							html+='<div>';
								html+='<a href="javascript:;" class="btn cancel cancelbg">取消</a>';
								html+='<a href="javascript:;" class="btn okLink okLinkbg">充值</a>';
							html+='</div>';
						html+='</div>';
						$("body").append(html);
						off();
					}else{
							var conutrie1 = $(this).parents(".tournameentContent").find(".conutriesname").text();//队名称
							var conutrie2 = $(this).parents(".tournameentContent").find(".conutriesnames").text();//队名称
							var lottery = $(this).parents(".tournameentContent").find(".lottery").children(".active").attr("name");//比赛玩发
							var betItem = $(this).parents(".form02").find(".yellow").children("a").text();//选择项
							var multiple = $(this).parents(".form02").find(".containerText").val();//倍数
							var money = $(this).parents(".form02").find(".numberyuan").text();//金额
							var bonus = $(this).parents(".form02").find(".sum").text();//奖金
							
							console.log(conutrie1+'-战队1');
							console.log(conutrie2+'-战队2');
							console.log(lottery+'-比赛玩法');
							console.log(betItem+'-选择项');
							console.log(multiple+'-倍数');
							console.log(money+'-金额');
							console.log(bonus+'-奖金');
							
							//alert("投注成功，再来一单加奖更多！")
							var html = '';
						html+='<div class="promptMessagePop">';
							html+='<h4>投注成功，再来一单加奖更多！</h4>';
							html+='<div>';
								html+='<a href="javascript:;" class="btn cancel okLinkbg">知道了</a>';
							html+='</div>';
						html+='</div>';
						$("body").append(html);
						off();
						}
						
				});
			};
			
			submit2();
	
	
	//遮罩弹框btnball
	$(".btnball").bind("click",function(){
		$(".showPop").show();
	});
	
	$(".pop .colse").bind("click",function(){
		$(".showPop").hide();
	});
	
});
