jQuery(function($) {

    var goodList = localStorage.getItem('goodList');
    goodList = goodList ? JSON.parse(goodList) : [];


    var $car = $("table.date-empty");
    var $table = $("<table/>");
    
    if (goodList != []) {
        //如果获取到商品其清空原来的列表 
        $car.hide();
        $.each(goodList, function(idx, item) {
			var $tr = $("<tr/>");

                var number = item.num;
                $("<td/>").html("<input type='checkbox'/>").appendTo($tr);
                var $img = $("<img/>").attr({
                    "src": item.copysrc,
                    dispaly: "block",
                    "id": item.Id
                })
                $("<td/>").html($("<p/>").html(item.name)).addClass("name").append($img).appendTo($tr);
                $("<td/>").html("&yen;" + item.price).addClass("price").appendTo($tr);
                $("<td/>").html("<p><span class='del'>-</span><input type='text' value=" + number + " class='numb'  size='2' /><span class='add'>+</span></p>").addClass("num").appendTo($tr);
                $("<td/>").html("&yen;" + (number * item.price).toFixed(2)).addClass("total").appendTo($tr);
                $("<td/>").html("<a href='#' class='delete'>删除</a>").appendTo($tr);
                $tr.appendTo($table);
            })
        
    
}$table.addClass("listtab").appendTo($(".data_list"));
    //购买数量的加减按钮
    var inpnum;
    $(".del").on("click", function() {
    	var trindex =$(this).closest('tr').index();
        inpnum = $(this).siblings('input').val();
        if (inpnum == 1) {
            return;
        } else {
            inpnum--;
           $(this).siblings('input').val(inpnum);
            goodList[trindex].num=inpnum;
            localStorage.setItem('goodList',JSON.stringify(goodList));

        }
    });
    $(".add").on("click", function() {
    	var trindex =$(this).closest('tr').index();
        inpnum = $(this).siblings('input').val();
        inpnum++;
        $(this).siblings('input').val(inpnum);
         goodList[trindex].num=inpnum;
         localStorage.setItem('goodList',JSON.stringify(goodList));
    });
    //删除物品
    $(".delete").on("click", function() {

   		var trindex =$(this).closest('tr').index();
      
      goodList.splice(trindex,1);
      localStorage.setItem('goodList',JSON.stringify(goodList));
        //初始的空空购物车显示出来
     $(this).closest('tr').remove();
        if ($('tr').length==0) {
            $car.show();
        }

    });
    // //全选的按钮
    var $allcheck = $(".check");
    var $alllast = $(".checkb");
    var $checkbox = $(":checkbox").prop("checked",true);

    $allcheck.on("click", function() {
 		$checkbox.prop("checked", $(this).prop("checked"));
        })
    $alllast.on("click", function() {
 		$checkbox.prop("checked", $(this).prop("checked"));
        })

// 去结算
    $(".btn-count").click(function() {
        var r = confirm("请登录");
        if (r) {
            window.open("login.html");
        }
    })
});
