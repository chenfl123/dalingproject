
;(function($){
	
	 var $user = $(".dl_login #username");
	 var $pass= $(".dl_login #passcheck");
 
	var strings=JSON.parse(getCookie("strings"));
	console.log(strings[0].user)
		var $yzusr=$(".yz-usersc");
		var fn=false;
		if (strings)
		{		
			$user.on("blur",function(){
					$.each(strings, function(idex,item) {
				if($user.val()==item.user){ 
					 fn=true;  
					$pass.val(item.pass);  
					$yzusr.hide();
				}else if($user.val()!=item.user){  
					$yzusr.show().text("非常遗憾，未注册成功？");}
			
			$(".dl_login").on("click","button",function(e){
					if(fn){
						window.open("../index.html");
						 
					}
						
			 }) 
					})
			});
			
		 
	
		}
	
		
	
})(jQuery);
