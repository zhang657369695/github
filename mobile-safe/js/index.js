$(function(){
	//
	$('.name p').click(function(){
		$('.off').show();	
	})
	$('.off').mouseout(function(){
		$(this).hide();	
	})
	
	//窗口高度
	
	//左侧菜单伸缩效果
		menu();
	//添加tab
	addtab();
	//左右添加删除
	addDle();
	//选项卡切换
	
	
	//选项卡切换
	function atb(){
		var list=$('#nav').children('li');
		var centBox=$('#tcBox').children('div');
		$(list).click(function(){
			$(this).addClass('active').siblings('li').removeClass('active');
			$(centBox).eq($(this).index()).show().siblings(centBox).hide();	
		})
}

	
	
		
	
})

//左侧菜单伸缩效果
function menu(){
	$('.listtg h4').click(function(){
		var par=$(this).parent('li').hasClass('zw');
		if(par==false){
			$(this).parent('li').addClass('zw');
				$(this).siblings('dl').slideDown();
				$(this).parent('li').find('.r-ioc').show();
		}else
		{
			$(this).parent('li').removeClass('zw');	
			$(this).siblings('dl').slideUp(300);
			$(this).parent('li').find('.r-ioc').hide();
		}
		
	})		
}

//窗口高度
function height(){
	var h=$(window).height();
	$('.widow-height').height(h-52);	
}




function addtab(){
	
	var html='';
		  html+='<tr height="46" align="center" valign="middle">';
				html+='<td width="110" align="left">';
					html+='<select class="selest form-control " style="width:108px">';
						html+='<option>调用失败率</option>';
					html+='</select>';
				html+='</td>';
				html+='<td width="306">';
					html+='<select class="selest form-control " style="width:108px">';
						html+='<option>5分钟</option>';
					html+='</select>';
				html+='</td>';
				html+='<td width="494">';
					html+='<select class="selest form-control " style="width:86px; position:relative; left:-10px;">';
						html+='<option>平均值</option>';
					html+='</select>';
					html+='<select class="selest form-control " style="width:35px; margin-left:14px; position:relative; left:-4px;">';
						html+='<option>〉</option>';
					html+='</select>';
					html+='<label>阈值</label>';
					html+='<input type="text" class="text form-control" style="width:80px; height:22px;  position:relative; left:6px; border:#cbcbcb solid 1px" placeholder="10">';
					html+='<label style="position:relative; left:8px">%</label>';
				html+='</td>';
				html+='<td width="206">';
					html+='<a href="javascript:;" class="del" style="padding:0">删除</a>';
				html+='</td>'; 
			html+='</tr>';
			
		$('.add-Alarm-rules').click(function(){
			$('.addBg').before(html);
			dele();
		})	
		function dele(){
			var _this;
			$('td').delegate('.del','click',function(){
				$('.shows').show();
				$('.popoBox').show();
				$(this).addClass('a')
				return _this;
			})
			$('.no').click(function(){
				$('.popoBox').hide();
				$('.shows').hide();	
			})
			$('.popoBox').delegate('.ok','click',function(){
				$('.popoBox').hide();
				$('.shows').hide();	
				$('.a').parents('tr').remove();
				
			})
		}
		dele();	
	
}

function addDle(){
	function b(){
			var html='';
			$('.lg').delegate('li','click',function(){
				html='';
				var text=$(this).children('span').text();
				$(this).addClass('lm').siblings('li').removeClass('lm');
				html +='<li><span>'+ text +'</span></li>';
			})
			$('.sadd').click(function(){
					$('.rg').append(html);
					$('.lm').remove();
			})	
		}
		b();
		function s(){
			var html='';
			$('.rg').delegate('li' ,'click',function(){
				html='';
				var text=$(this).children('span').text();
				$(this).addClass('lm').siblings('li').removeClass('lm');
				html +='<li><span>'+ text +'</span></li>';
			})
			$('.sremove').click(function(){
					$('.lg').append(html);
					$('.lm').remove();
			})	
		}
		s();	
	
}



