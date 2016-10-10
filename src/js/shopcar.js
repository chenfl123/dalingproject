
jQuery(function($){
	 //获取cookies
		var name = getCookie("name");  
		var price = parseInt(getCookie("price")); 
		var number = getCookie("num"); 
		var discount = parseInt(getCookie("discount"))/10; 
//		console.log(discount);
		var copysrc = getCookie("copysrc");  
		
		var $car = $("table.date-empty");	 
		var $table =$("<table/>");   
		var $tr=$("<tr/>"); 
		if(name){ 
			//如果获取到商品其清空原来的列表 
		 	 $car.hide(); 
			$("<td/>").html("<input type='checkbox'/>").appendTo($tr); 
			var $img =$("<img/>").attr({"src":copysrc,dispaly:"block"})
			$("<td/>").html($("<p/>").html(name)).addClass("name").append($img).appendTo($tr);
			$("<td/>").html("&yen;"+price).addClass("price").appendTo($tr);
			$("<td/>").html("<p><span class='del'>-</span><input type='text' value="+number+" class='numb'  size='2' /><span class='add'>+</span></p>" ).addClass("num").appendTo($tr);   
			$("<td/>").html("&yen;"+(number*price).toFixed(2)).addClass("total").appendTo($tr);
			$("<td/>").html("<a href='#' class='delete'>删除</a>").appendTo($tr);
			$tr.appendTo($table); 
		}
		$table.addClass("listtab").appendTo($(".data_list"));
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
	//删除物品
	$(".delete").on("click",function(){
		
		removeCookie("name");
		removeCookie("price");
		removeCookie("num");
		removeCookie("discount");
		$(this).closest("tr").remove();
		if(number==0||!isNaN(number)){
			$car.show(); 
		}
		
	});
	//全选的按钮
	var $allcheck =$(".check");
	var $alllast=$(".checkb");
	var $checkbox=$(":checkbox");
	  $allcheck.on("click",function(){
	  	$checkbox.prop("checked",$allcheck.prop("checked"));
	  	$(".rede1").text(number);
	  	$(".f20").text(price*number);
	  	$(".f11").text(parseInt(price*discount/(1-discount))*number); 
	  }) 
	$checkbox.click(function(){
				var $check =$checkbox.filter(":checked"); 
				$allcheck.prop("checked",$checkbox.length==$check.length);
			})
	

});  
