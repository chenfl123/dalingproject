
jQuery(function($){
	
		      
//	//放大镜效果
			$(".glass_show").fzoom({ 
				width:320,  
				height:400
			});
	//加入购物车 
				//加入购物车的按钮
			var $addcar = $(".add_car");
			var i=0;
	$addcar.on("click",function(){
			//获取图片
			var $showImg = $(".glass_show img");
			//获取内容
			var $content =$(".shop_price");
			//复制原图
			var $copyImg = $showImg.clone(); 
			//获取原图的坐标位置
			var pos=$showImg.offset();
			var iWidth =$showImg.width();
			//给复制的图片一个样式
			$copyImg.css({
				position:"absolute",
				left:pos.left,
				top:pos.top,
				width:iWidth 
			});
			//把复制的图片加到body
			$copyImg.appendTo("body");
			//获取购物车的位置
			//购物车   
			var carpos = $(".shop_car").offset();
			//飞的动作
			$copyImg.animate({left:carpos.left,top:carpos.top,width:0,opacity:0},function(){
				//移出复制的图片
				$copyImg.remove();
				
				//图片src
				var copysrc = $showImg.attr("src");  
				
//				console.log(copysrc);
				var numbers =parseInt( getCookie("num"));
				
				//数量  
				var num =$(".number").find("input").val(); 
				
				if(!isNaN(numbers)){
					num=parseInt(num)+numbers; 
				}else{  
				//名称 
				var name =$(".shop_price").find("h2").text();
				//价格
				var price = $(".prices").text(); 
				//折扣
				var discount = $(".price-off").text();
				
//				var car =[{"name":name},{"price":price},{"discount":discount},{"number":num}];
//				var car ={"name":name};  
				var d=new Date();  
				d.setDate(d.getDate()+10);  
				var carcookie =setCookie("name",name,d);    
				var carcookie =setCookie("price",price,d);
				var carcookie =setCookie("discount",discount,d);
				var carcookie =setCookie("copysrc",copysrc,d); 
				
			}
				var carcookie =setCookie("num",num,d);  
				//购物车中显示物品的件数  
		      $(".shop_car").find("span").text(getCookie("num"));
//				 console.log(carcookie) 
			})
			 
	}) ;
	  
	//购买数量的加减按钮
	var inpnum;
	$(".del").on("click",function(){
		inpnum=$(".numb").val();
		if(inpnum==1){
			return;
		}else{inpnum--;
			$(".numb").val(inpnum);
		}
	});
	$(".add").on("click",function(){
		inpnum=$(".numb").val();
		inpnum++;
		$(".numb").val(inpnum);
	});



});
