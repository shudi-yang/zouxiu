//登录注册
class Index{
    constructor(){
        this.notLogin = document.querySelector(".not-login")
        this.loginS = document.querySelector(".login-success")
        this.user = document.querySelector(".login-success span")

        this.logout = document.querySelector(".logout");

        // 获取所有的用户信息
        this.init();
        // 添加注销事件
        this.addEvent();
    }
    addEvent(){
        // 点击注销时
        this.logout.onclick = ()=>{
            for(var i=0;i<this.usermsg.length;i++){
                // 找到要注销的账号
                if(this.name == this.usermsg[i].user){
                    // 修改当前账号的登录状态为0
                    this.usermsg[i].onoff = 0;
                    // 隐藏登录成功的信息
                    this.notLogin.style.display = "block";
                    this.loginS.style.display = "none";
                    // 再将用户的信息设置回去，实现真正的注销
                    localStorage.setItem("usermsg",JSON.stringify(this.usermsg))
                    // 结束
                    return ;
                }
            }
        }
    }
    init(){
        // 获取所有的用户信息直接转换，方便使用
        this.usermsg = localStorage.getItem("usermsg") ? JSON.parse(localStorage.getItem("usermsg")) : [];
        // 开始验证
        this.check()
    }
    check(){
        // 拿到所有的信息
        for(var i=0;i<this.usermsg.length;i++){
            // 判断哪个用户的状态为已登录
            if(this.usermsg[i].onoff == 1){
                // 显示登录成功的信息
                this.notLogin.style.display = "none";
                this.loginS.style.display = "block";
                // 设置当前用户名
                this.user.innerHTML = this.usermsg[i].user;
                // 保存当前用户名，用作注销
                this.name = this.usermsg[i].user;
                
                return;
            }
        }
    }
}
new Index;


//商品数据
class Shopping{
	constructor(){
		this.ocont = document.querySelector("#find ul");
		console.log(this.ocont)
		this.url = "http://localhost/xiu/com-list/data/goods.json";
		this.init();
		this.lilength = 0;
	}
	init(){
		var that = this;
		ajax({
			url:this.url,
			success:function(res){
				that.res = JSON.parse(res);
				that.lilength = that.res.length;
				that.display();				
			}
		})
	}
	display(){
		console.log(this.res);
		var str = "";
		for (var i=0;i<this.res.length;i++) {
			str += `<li>
						<div class="box">
							<img  src="${this.res[i].src}"/>
							<p>Burberry</p>
							<h3>${this.res[i].name}</h3>
							<span>${this.res[i].price}</span>
						</div>	
					</li>`
		}
		this.ocont.innerHTML = str;
		this.ali = document.querySelectorAll("#find ul li");
		this.ocont.style.cursor = "pointer";
		this.addEvent();
		this.lazy()
	}
	addEvent(){
		for (var i=0;i<this.ali.length;i++) {
			this.ali[i].style.cursor = "pointer";
			this.ali[i].onclick = function(){
				location.href = "../com-detail/detail.html";
			}				
		}
	}
	lazy(){
		this.clientH = document.documentElement.clientHeight;
		var on = 1;
		var that = this;
		onscroll = function(){
		    that.lazyLog();
		}		
	}
	lazyLog(){
	    this.scrollT = document.documentElement.scrollTop;
	    //console.log(this.clientH, this.ali[this.lilength-1].offsetTop, this.scrollT)
	    
	    if(this.ali[this.lilength-2].offsetTop<this.scrollT){
	    	console.log('loading + 1');
	    	this.displaytwo();
	    	this.lilength += this.res.length;
	    	this.ali = document.querySelectorAll("#find ul li");
	    }
	}	
	displaytwo(){
		for(var i=0;i<this.res.length;i++){
/*			str += `<li>
						<div class="box">
							<img  src="${this.res[i].src}"/>
							<p>Burberry</p>
							<h3>${this.res[i].name}</h3>
							<span>${this.res[i].price}</span>
						</div>	
					</li>`*/
			var img = document.createElement("img");
			img.src = this.res[i].src;
			var p = document.createElement("p");
			p.innerHTML = "Burberry";
			var h3 = document.createElement("h3");
			img.innerHTML = this.res[i].name;
			var span = document.createElement("span");
			img.innerHTML = this.res[i].price;			
			var box = document.createElement("div");
			box.className = "box";
			box.appendChild(img);
			box.appendChild(p);
			box.appendChild(h3);
			box.appendChild(span);
			var li = document.createElement("li")
			li.appendChild(box);
			this.ocont.appendChild(li)
		}
	}
	
}
new Shopping;


//懒加载

/*function lazyLog(arr){
    var scrollT = document.documentElement.scrollTop;
    
    for(var i=0;i<arr.length;i++){
        if(on == 0) continue;

        if(arr[i].offsetTop < clientH + scrollT){      		
				new Shopping();
				on = 0;
        }
    }
}*/


