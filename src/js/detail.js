jQuery(function($) {
    var buystring=localStorage.getItem('buystring');
    buystring=buystring ? JSON.parse(buystring):[];
    if (buystring!=[]) {
       $.each(buystring,function(idx,item){
        $(".glass_show img").attr({src:item.src,id:item.id,'data-big':item.src});
        $(".shop_price").find("h2").text(item.title);
       })
    }

   
    //	//放大镜效果
    $(".glass_show").fzoom({
        width: 320,
        height: 400
    });
    
   var arr = [];
    var shopnum=0;
     //-------------------

  	var goodList = localStorage.getItem('goodList');
        goodList = goodList ? JSON.parse(goodList) : [];
        if(goodList!=[]){
        	$.each(goodList,function(idx,item){
        		arr.push(item.Id);
        		shopnum +=parseInt(item.num);
        	})//购物车中显示物品的件数  
      
        }

 	$(".shop_car").find("span").text(shopnum);
     

    //加入购物车的按钮
    var $addcar = $(".add_car");
    var i = 0;
    $addcar.on("click", function() {
    	
        var goodshop = {};
        //获取图片
        var $showImg = $(".glass_show img");
        //获取内容
        var $content = $(".shop_price");
        //复制原图
        var $copyImg = $showImg.clone();
        //获取原图的坐标位置
        var pos = $showImg.offset();
        var iWidth = $showImg.width();
        //给复制的图片一个样式
        $copyImg.css({
            position: "absolute",
            left: pos.left,
            top: pos.top,
            width: iWidth
        });
        //把复制的图片加到body
        $copyImg.appendTo("body");
        //获取购物车的位置
        //购物车   
        var carpos = $(".shop_car").offset();		
        //飞的动作
        $copyImg.animate({ left: carpos.left, top: carpos.top, width: 0, opacity: 0 }, function() {
            //移出复制的图片
            $copyImg.remove();
       		 
       		 var inoutvalue=$(".number").find("input").val();
       		 shopnum=inoutvalue;
       		  shop();

           for (var i = 0; i < arr.length; i++) {
            	var carnum=goodList[i].num;
                if (arr[i] ==$showImg.attr("id")) {
                     goodList.splice(i,1);
                    inoutvalue=parseInt(inoutvalue)+parseInt(carnum);
                    break;
                }
            }goodshop.num = inoutvalue;
            //图片src
            goodshop.copysrc = $showImg.attr("src");
          
            //名称 
            goodshop.name = $(".shop_price").find("h2").text();
            //价格
            goodshop.price = $(".prices").text();
            //折扣
            goodshop.discount = $(".price-off").text();
            //id
            goodshop.Id = $showImg.attr("id");

            goodList.push(goodshop);
            localStorage.setItem('goodList',JSON.stringify(goodList));

            $(".shop_car").find("span").text(shopnum);
        })

    });

    //购买数量的加减按钮
    var inpnum;
    $(".del").on("click", function() {
        inpnum = $(".numb").val();
        if (inpnum == 1) {
            return;
        } else {
            inpnum--;
            $(".numb").val(inpnum);
        }
    });
    $(".add").on("click", function() {
        inpnum = $(".numb").val();
        inpnum++;
        $(".numb").val(inpnum);
    });

  function shop(){
  	arr.length=0;
  	
  	var goodList = localStorage.getItem('goodList');
        goodList = goodList ? JSON.parse(goodList) : [];
        if(goodList!=[]){
        	$.each(goodList,function(idx,item){
        		arr.push(item.Id);
        		shopnum=parseInt(item.num)+parseInt(shopnum);
        	})
        }
  }

});
