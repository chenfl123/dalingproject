
//注册
jQuery(function($){
	//先注册
	var $user= $("#username");
	var rep = /^1\d{10}$/; 
	
	//验证码验证
	var $code=$(".dl_register #codecheck");
	var $yzCode=$(".dl_register .dl_code .yz_code");
	//点击获取验证码
	$yzCode.on("click",function(){  
		var str = "";
		for(var i=0;i<4;i++){
			var nice = parseInt(Math.random()*10)%2;//0或1
			if(nice)//1
			{
				 str +=String.fromCharCode(parseInt(Math.random() * 26) + 65);
			}else{
				str += parseInt(Math.random() * 10);
			}
		}
		 $yzCode.text(str);  
	});
	 
	
	//手机验证
	var $text = $("#textcheck");
	var $yzText =$(".yz_text");
	
	
	//设置密码
	var $passMake=$("#passmake"); 
	//提交注册
	var $btn =$(".dl_register .submit_btn");
	//点击注册时，如果同意条款，即记下cookies
	$btn.on("click",function(){
		//如果用户名为准确手机号
		if(rep.test($user.val())){
			//如果验证码输入无误
			if($code.val()==$yzCode.text()){ 
				//如果同意注册条款
				if($(":checkbox").is(":checked"))
				{	
					var user =$user.val();
					var pass =$passMake.val(); 
					var d= new Date();
					d.setDate(d.getDate()+10);
					var username =setCookie("user",user,d,"/");
					var passwords =setCookie("pass",pass,d);
					var r=confirm("注册成功！快去登录吧");
					if(r==true){
						window.open("login.html"); 
					}
				} 
			}
	  }else{alert("注册失败");}
	
	//-----------------------------------------------
	
});

	
	
});
