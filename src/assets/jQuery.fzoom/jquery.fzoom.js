
;(function($){
	
	$.fn.fzoom=function(options){
		//1、插件默认参数
		var defaults={
			width:300,
			height:300, 
			position:"right",
			gap:30 
		};
		//2、扩展默认值
		var opt= $.extend({},defaults,options);
		//3、防止多个jQuery对象
			//这里的this是实例对象
		this.each(function(){
			var $self = $(this);//1)这里是jquery对象
			//2)全局变量（所针对的对象）
			var $big,//大图外框
				$bigImg,//大图
				$glass,//放大镜 
				ratio,
				ratioH;//放大比例
			//3)获取小图	
			var $smallImg = $("img",$self);  
			//4)大图路径  
			var bigurl =  $smallImg.attr("data-big") || $smallImg.attr("src");
			
			// 5)等图片加载完后,执行初始化操作 
//			$smallImg.load(function(){  
				init();
//			});	 
			//7) 鼠标移入
			$self.on("mouseenter",function(e){
				//(1)把大图放大页面
				$big.append($bigImg).appendTo("#detail_content");
				//(2)把放大镜写入
				$glass.css({
					width:opt.width/2, 
					height:opt.height/2, 
				}).appendTo($self);
			}).on("mouseleave",function(){
				//鼠标移出，移除大图和放大镜
				$big.remove();
				$glass.remove();
			}).on("mousemove",function(e){ 
				//pageX属性是鼠标指针的位置，相对于文档的左边缘( 包括滚动条)
				var top = e.pageY - $smallImg.offset().top - $glass.outerHeight()/2; 
				var left = e.pageX - $smallImg.offset().left - $glass.outerWidth()/2;
				
				// 防止放大镜移出小图区域 
				if(left<0){
					left = 0;
				}else if(left > $smallImg.outerWidth() - $glass.outerWidth()){
					left = $smallImg.outerWidth() - $glass.outerWidth();
				}

				if(top < 0 ){
					top = 0;
				}else if(top > $smallImg.outerHeight() - $glass.outerHeight()){
					top = $smallImg.outerHeight() - $glass.outerHeight();
				}
				//把属性值赋给放大镜
				$glass.css({
					left:left,
					top:top
				});
				
				// 移动大图
				$bigImg.css({
					top:-top*ratioH,
					left:-left*ratio
				})
				
			})
			//6)初始化函数
			function init(){ 
				//(1) 给实例加类,设置其宽度与图片的宽度一样
				$self.addClass("fzoom").css({width:$smallImg.outerWidth()});
				//(2) 创建大图
				$big = $("<div/>").addClass("fzoom-big");
				$bigImg = $("<img />").attr({src:bigurl});
				//(3 )把大图写入页面 
				$big.append($bigImg).appendTo("#detail_content"); 
				//(4) 大图加载完后计算放大的比例 
				$bigImg.load(function(){ 
					ratio =parseInt($bigImg.outerWidth()/$smallImg.outerWidth()*100)/100; 
					ratioH=parseInt($bigImg.outerHeight()/$smallImg.outerHeight()*100)/100;
//					console.log(ratio) 
					$big.remove(); //起始不显示 
				});
					//(5)大图默认的位置 (右边)
				var pos = {
					left:$smallImg.offset().left + $smallImg.outerWidth() + opt.gap,
					top:$smallImg.offset().top
				};
				
					//(6) 大图位置的设置
				if(opt.position == "bottom"){
					pos.left = $smallImg.offset().left;
					pos.top = $smallImg.offset().top + $smallImg.outerHeight() + opt.gap;
				}else if(opt.position == "left"){
					pos.left = $smallImg.offset().left - $big.outerWidth() - opt.gap;
				}
				$big.css(pos); //添加到大图中
				//(7) 创建放大镜
				$glass = $("<span/>").addClass("fzoom-glass");
				
			}
			

		})
		//4、最后返回this实例，以便于链式运用
		return this;
	}
	
})(jQuery);
