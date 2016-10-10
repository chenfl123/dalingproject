
function setCookie(name,value,expirse,path,domain,secure)
				{
					var cookietext=encodeURIComponent(name)+"="+encodeURIComponent(value);
					if (expirse instanceof Date)
					{
						cookietext +=";expirse="+expirse;
					}
					if (path)
					{
						cookietext +=";path="+path;
					}
					if (domain)
					{
						cookietext +=";domain="+domain;
					}
					if (secure)
					{
						cookietext +=";secure";
					}
					document.cookie=cookietext;
					return document.cookie;
					
				}
				function getCookie (name){
					var cookie =decodeURIComponent(document.cookie);
					
					var arr=cookie.split("; ");
					for (var i=0;i<arr.length;i++)
					{
						var arr2=arr[i].split("=");
						if (arr2.length>=2)
						{
							if (arr2[0]==name)
							{
								return arr2[1];
							}
						}
					}return "";
				}
				//删除cookie
				function removeCookie (name){
					var d=new Date();
					document.cookie=encodeURIComponent(name)+"=;expires="+d;
				
					return document.cookie;
				}
				