
;(function($){
	
	 var $user = $(".dl_login #username");
	 var $pass= $(".dl_login #passcheck");
	 	var olduser=getCookie("user");
		var oldpass=getCookie("pass"); 
//		console.log(olduser) 
//		console.log(oldpass) 
		var $yzusr=$(".yz-usersc");
		var fn=false;
		if (getCookie("user")==olduser)
		{			
			$user.on("blur",function(){
				if($user.val()==olduser){ 
					 fn=true;  
					$pass.val(oldpass); 
					$yzusr.hide()
				}else{ 
					$yzusr.show().text("非常遗憾，未注册成功？");}
			}) 
			$(".dl_login").on("click","button",function(e){
					if(fn){
						window.open("../index.html");
						 
					}
						
			 })   
	
		}
	
		
	
})(jQuery);
