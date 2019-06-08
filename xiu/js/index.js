//轮播
var mySwiper = new Swiper ('.swiper-container', {
    //direction: 'vertical',
    loop: true,
    
    // 如果需要分页器
    pagination: '.swiper-pagination',
    
    // 如果需要前进后退按钮
    //nextButton: '.swiper-button-next',
    //prevButton: '.swiper-button-prev',
    
    // 如果需要滚动条
    //scrollbar: '.swiper-scrollbar',
    
    autoplay: 2000,
	autoplayDisableOnInteraction: true,
	observer:true, //修改swiper自己或子元素时，自动初始化swiper
	observeParents:true //修改swiper的父元素时，自动初始化swiper
});


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
		this.url = "http://localhost/xiu/data/goods.json";
		this.init();	
	}
	init(){
		var that = this;
		ajax({
			url:this.url,
			success:function(res){
				that.res = JSON.parse(res);
				that.display();
					
			}
		})
	}
	display(){
		console.log(this.res);
		var str = "";
		for (var i=0;i<this.res.length;i++) {
			str += `<li index="${this.res[i].goodsId}">
						<div class="box">
							<img  src="${this.res[i].src}"/>
							<p>Burberry</p>
							<h3>${this.res[i].name}</h3>
							<span>${this.res[i].price}</span>
						</div>	
					</li>`
		}
		this.ocont.innerHTML = str;
		this.ocont.style.cursor = "pointer";
		this.ali = document.querySelectorAll("#find ul li")
		this.addEvent()		
	}
	addEvent(){
		var that = this
		for (var i=0;i<this.ali.length;i++) {
			this.ali[i].style.cursor = "pointer";
			
			this.ali[i].onclick = function(){
					var goodsId = this.getAttribute("index");
					location.href = "com-detail/detail.html?goodsId="+goodsId;
				}
			}				
		}
		
		
}
new Shopping;

