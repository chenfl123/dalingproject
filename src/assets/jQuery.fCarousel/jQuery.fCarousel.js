
//轮播图插件
//逗号是为了避免多个插件进行压缩优化时出现问题
//用匿名函数传参的方法避免$是有 其他意义而出现歧义
;(function($){
	$.prototype.fCarousel = function(options){   
		//1、插件默认参数
		var defaults = {
			width:810,
			height:320,
			page:true,//是否显示页码
			autoPlay:true,//是否自动轮播
			type:"y",//动画类型：水平滚动x, 垂直滚动y, 渐现效果fade
			buttons:true,//是否显示前后按钮
			speed:3000,//轮播图速度  
		}
		//2、扩展默认值
	     var opt = $.extend({},defaults,options);
		//3、防止多个jQuery对象，进行遍历this
		this.each(function(){
			//这是轮播图的外框
			//这里的this是指dom节点
			var $self = $(this);
			//获取ul  ，在$self里面找到ul
			var $ul = $("ul",$self);
			var $firstImg = $self.children("img").eq(0);//获取第一张图片
		
			
			//初始化
			var index =0; //起始下标
			var leng = $ul.children("li").length; //获取长度，轮播图的数量
			var $page; 
			
			init();
			
			//是否自动轮播
			if(opt.autoPlay){
				var timer;
				$self.on("mouseenter",function(){
					clearInterval(timer);
				}).on("mouseleave",function(){
					timer = setInterval(function(){
						index ++;
						show();
					},opt.speed);
				}).trigger("mouseleave");//模拟手动触发一件事情
			}
			
			
			
			
			function init(){
				//页码
				if(opt.page){
					$page = $("<div/>").addClass("page");
					for(var i=1;i<=leng;i++){
						var $span =$("<span/>");  
						if(i==1){
						  $span.addClass("active");	
						}
						$span.text(i).appendTo($page);
					}
					$page.appendTo($self);
					//页码切换
					$page.on("click","span",function(){
						index = $(this).index();
						show();
					})
				}
				
				
				//添加类名   并加样式
				$self.addClass("fCarousel").css({
					height:opt.height,
					width:opt.width
				});
				//设置ul 的高
				$ul.css({height:opt.height}); 
				
				//水平 移动
				if(opt.type==="x")
				{
					$ul.addClass("type-x").css({width:opt.width*leng});
				}else if(opt.type==="fade"){
					$ul.addClass("type-fade").children().css({opacity:0}).eq(index).css({opacity:1})
				}
				
				// 左右按钮
				if(opt.buttons){
					$("<div/>").html("&gt;").addClass("next").appendTo($self);
					$("<div/>").html("&lt;").addClass("previous").appendTo($self);
					$self.on("click",".next",function(){
						index++;
						show();
					}).on("click",".previous",function(){
						index--;
						show();
					});
				}
				
			}
			
			function show(){
				if(index>=leng){
					index=0;
				}else if(index<0){
					index =leng-1;
				}
				if(opt.type==="y")
				{
					$ul.animate({top:-opt.height*index});
				}
				else if(opt.type==="x")
				{
					$ul.animate({left:-opt.width*index});
					
				}else if(opt.type === "fade"){
					$ul.children().eq(index).animate({opacity:1}).siblings("li").animate({opacity:0});
				}
				
				if(opt.page)
				{ 
					$page.children().removeClass().eq(index).addClass("active");
				}
			}
			
		});
		
		//4、最后返回this，以便链式调用
		return this;
	}
})(jQuery);
