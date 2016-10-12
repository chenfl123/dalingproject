jQuery(function($) {
	//获取cookies
	var carcookie = JSON.parse(getCookie("carcookie"));
	//		var name = getCookie("name");  
	//		var price = parseInt(getCookie("price")); 
	//		console.log(discount);
	//		var copysrc = getCookie("copysrc");  
	var number = getCookie("num");
	var discount = parseInt(carcookie[0].discount) / 10;

	var $car = $("table.date-empty");
	var $table = $("<table/>");
	var $tr = $("<tr/>");
	if(carcookie) {
		//如果获取到商品其清空原来的列表 
		$car.hide();
		$("<td/>").html("<input type='checkbox'/>").appendTo($tr);
		var $img = $("<img/>").attr({
			"src": carcookie[0].copysrc,
			dispaly: "block",
			"id": carcookie[0].iId
		})
		$("<td/>").html($("<p/>").html(carcookie[0].name)).addClass("name").append($img).appendTo($tr);
		$("<td/>").html("&yen;" + carcookie[0].price).addClass("price").appendTo($tr);
		$("<td/>").html("<p><span class='del'>-</span><input type='text' value=" + number + " class='numb'  size='2' /><span class='add'>+</span></p>").addClass("num").appendTo($tr);
		$("<td/>").html("&yen;" + (number * carcookie[0].price).toFixed(2)).addClass("total").appendTo($tr);
		$("<td/>").html("<a href='#' class='delete'>删除</a>").appendTo($tr);
		$tr.appendTo($table);
	}
	$table.addClass("listtab").appendTo($(".data_list"));
	//购买数量的加减按钮
	var inpnum;
	$(".del").on("click", function() {
		inpnum = $(".numb").val();
		if(inpnum == 1) {
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
	//删除物品
	$(".delete").on("click", function() {
		//		removeCookie("discount");
		//		removeCookie("copysrc");
		//		removeCookie("price");		
		removeCookie("carcookie");
		removeCookie("num");
		//初始的空空购物车显示出来
		$(this).closest("tr").remove();
		if(number == 0 || !isNaN(number)) {
			$car.show();
		}

	});
	//全选的按钮
	var $allcheck = $(".check");
	var $alllast = $(".checkb");
	var $checkbox = $(":checkbox");
	$allcheck.on("click", function() {
		$checkbox.prop("checked", $allcheck.prop("checked"));
		$(".rede1").text(number);
		$(".f20").text(carcookie[0].price * number);
		$(".f11").text(parseInt(carcookie[0].price * discount / (1 - discount)) * number);
	})
	//有一个产品取消立即取消全选按钮啊勾选
	$checkbox.click(function() {
		var $check = $checkbox.filter(":checked");
		$allcheck.prop("checked", $checkbox.length == $check.length);
	})

	$(".btn-count").click(function(){
		var r=confirm("请登录");
		if(r){
			window.open("http://127.0.0.1:8020/project/src/html/login.html");
		}
	})
});