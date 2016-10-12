;(function($){
		jQuery(function($){ 
	//----1 、首页的轮播图用加载的方式------
			var $logolist =$(".dl_carousel");
			$.ajax({
				url:"js/logo.json", 
				dataType:"json",
				success:function(res){ 
					var $ul =$("<ul/>");
					$.each(res, function(idex,item) {
						var $li =$("<li/>").addClass("img"+(idex+1));
						$("<img/>").attr({src:item.imgurl,title:item.title}).appendTo($li);
						$li.appendTo($ul);
					});
					$ul.appendTo($logolist);
					
	//--2 、-等待图片加载完成后对其进行轮播------------
				 var $list = $("#dl_bao");
				//获取ul
				$ul = $(".dl_carousel ul");
				//获取第一张图片
				$img = $ul.find("img").eq(0);
				//获取图片的宽度
				var iWidth = $img.width();
				
				$ul.html($ul.html()+$ul.html())
				var leng = $ul.children().length;
//				console.log(leng)
				//页码
				$page = $("<div/>").addClass("page");
					for(var i=1;i<=3;i++){
						var $span =$("<span/>");  
						if(i==1){
						  $span.addClass("active");	
						}
						$span.text(i).appendTo($page);
					}
					$page.appendTo( $(".dl_carousel"));  
					//页码切换
					$page.on("click","span",function(){
						index = $(this).index();
						clearInterval(timer);
						show();
					})
				
				//ul的宽度增加
				$ul.attr({width:iWidth*leng});
				//初始化
				var timer;
				var index=0;
				$list.css("background-color","#f6914d");   
				var $page; 
				var arr =["#f6914d","#fcc7cf","#1690d3","#f6914d"];
				//鼠标移入移出事件
				$ul.on("mouseenter",function(){
					clearInterval(timer);
				}).on("mouseleave",function(){
					timer=setInterval(function(){
						
						index++; show();
					},3000); 
				}).trigger("mouseleave");
			
				//展示图片
				function show(){ 
					//连贯性
//					console.log(index);
						$ul.animate({left:-index*iWidth},fn); 
						
					$page.children().removeClass().eq(index).addClass("active"); 
					if(index==leng/2){
							$page.children().removeClass().eq(0).addClass("active");
						}
					//背景色变化  
					for(var i =0;i<arr.length;i++){
						if(i==index){
							$list.css("background-color",arr[i]); 
						}
					}
				}
					function fn(){
					if(index>=leng/2){    
						index =0;  
						$ul.css({"left":0}); 
					} 
				}
				//--------轮播图结束------------------	
				}
			});
//-------------------------------------------------------------------

		
//-------今日上新的切换内容---------------------------------------------------------------
			var a=0;
		$("#index_new").on("click",".change",function(){
			//		console.log("a");
			var $newlist = $(".new_box");
			var leng = $newlist.children(".new_list_mix").length;
//			console.log(a);
			if(a>=leng-1){ 
				a=0;   
			}else {
				a++;  
			}
			$newlist.children(".new_list_mix").hide().eq(a).show();
			$newlist.children(".new_list_max").hide().eq(a).show();
		
		});  
		//-----------大家都说好---------------------
		//获取选项
		var $tab =$(".good_tab");
		//获取商品列表
		var $glist =$(".good_list"); 
		//点击切换内容
		$tab.on("click","li",function(){
			//获取下标
			var e = $(this).index(); 
			$("li",$tab).removeClass("current").eq(e).addClass("current");
			 $glist.children("ul").hide().eq(e).show();
		})
//--------------------------------------	
		var $buy_list=$(".index_buy_list");
	$(".index_buy_list dt dd:not(:eq(0))").css({padding:"20px 10px"})
		$buy_list.on("mouseover","dd",function(){
			var indx =$(this).index();  
			console.log(indx);
			$(this).siblings().css({padding:"20px 10px"}).eq(indx).css({padding:" 0 10px  30px 10px "});
			
		})

//----------------------新品黑马-------------------------------------------
	$.ajax({ 
		url:"js/dark_horse.json",
		dataType:"json",
		success:function(res){  
//			console.log(res); 
			
			var $dark_horse = $(".dark_horse_list");
			//创建ul
			var $ul =$("<ul/>"); 
			 $.each(res,function(idex,item){ 
			 	//创建li
			 	var $li = $("<li/>"); 
			 	var $a =$("<a/>").attr({href:item.url});
			 	var $div=$("<div/>");
			 	var newprice = Math.ceil(item.price*item.off).toFixed(2);
//			 	console.log(newprice); 
			 	
			 	$("<img/>").attr({src:item.imgurl}).appendTo($a);
			 	$("<div/>").addClass("option").html("加入购物车<span class='new_car'></span>").appendTo($a); 
			 	
$("<p/>").addClass("price").html("<span class='collect'>"+item.commentCount+"人收藏</span><span class='redel'>&yen;</span><span class='new_price'>"+newprice+"</span><span class='old_price'>&yen;"+item.price.toFixed(2)+"</span>").appendTo($div);
			 	$("<p/>").addClass("title").html("<span class='discount'>"+item.off*10+"折</span><span class='detail'><a href='#'>"+item.title+"</a></span>").appendTo($div);
			 	 $a.appendTo($li); 
				 $div.addClass("date").appendTo($li); 
				 $li.appendTo($ul);
			 });
			$ul.appendTo($dark_horse);  
		} 
		
		
	})	 
		
		
	//--------------------懒加载--------------------------- ----------
$(".lazybtn").on("click",function(){
	
	$.ajax({ 
		url:"js/newlist.json",
		dataType:"json",
		success:function(res){  
			console.log(res); 
			
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
	})  
	//把加载更多这句移除
	$(this).empty(); 
		 
	})
//-------------------右侧的窗口固定菜单------------------------------
		
			$(".car-mind .yen").on("mouseenter",function(){
				$(".yhui").show();
			}).on("mouseleave",function(){
				$(".yhui").hide();
			});
			
			$(".min_2 .heart").on("mouseenter",function(){
				$(".shouc").show();
			}).on("mouseleave",function(){
				$(".shouc").hide();
			});
			$(".car-top").on("click",function(){
				$("#scroll_right").animate({width:"200px"},function(){
					$(".close").show();
				})
			});
			
			$(".close").on("click",function(){
				$("#scroll_right").animate({width:"0px"},function(){
					$(".close").hide();
				});
			});
			$(".close").on("click",function(){
				$("#scroll_right").animate({width:"0px"},function(){
					$(".close").hide();
				});
			});
			//滑动滚动条事件
			$(window).scroll(function(){
				var scrollTop =document.documentElement.scrollTop||document.body.scrollTop;
				if(scrollTop>200){
					$(".car-last").fadeIn()
				}else{
					$(".car-last").fadeOut();
				}
			});
			//点击回到顶部
			$(".scro_top").on("click",function(){
					$("html body").animate({"scrollTop":0})
				});
		
		});
})(jQuery);
	
