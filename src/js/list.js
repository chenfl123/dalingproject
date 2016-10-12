
jQuery(function($){
	//定义变量,使加载三次后不再加载
	var i=0;
		$.ajaxSetup({ 
		url:"../js/goodslist.json",
		dataType:"json",
		success:function(res){  
//			console.log(res);
			i++;
			var $lazy = $("#lazy"); 
			//创建ul
			var $ul =$("<ul/>").addClass(".lazy_list"); 
			 $.each(res,function(idex,item){ 
			 	//创建li
			 	var $li = $("<li/>"); 
			 	var $a =$("<a/>").attr({href:item.url});
			 	var $div=$("<div/>");
			 	var newprice = Math.ceil(item.price*item.off).toFixed(2);
//			 	console.log(newprice); 
			 	$("<img/>").attr({src:item.imgurl}).appendTo($a);
			 	$("<div/>").addClass("option").html("加入购物车<span class='new_car'></span>").appendTo($a); 
			 	
$("<p/>").addClass("price").html("<span class='collect'>"+item.collect+"人收藏</span><span class='redel'>&yen;</span><span class='new_price'>"+newprice+"</span><span class='old_price'>&yen;"+item.price.toFixed(2)+"</span>").appendTo($div);
			 	$("<p/>").addClass("title").html("<span class='discount'>"+item.off*10+"折</span><span class='detail'><a href='#'>"+item.title+"</a></span>").appendTo($div);
			 	 $a.appendTo($li);
				 $div.addClass("date").appendTo($li); 
				 $li.appendTo($ul);
				 
			 });
			$ul.appendTo($lazy);  
		} 
	});
	$.ajax(); 
	$(window).on("scroll",function(){ 
		//滚动时到底部相距100在继续加载，提高执行的效率
			var scrolltop = $(window).scrollTop();
			if(scrolltop>=$(document).height() -  $(window).height()-600&&i<3){ 
					$.ajax();
			}  
		
	})
});
