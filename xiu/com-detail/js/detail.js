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
		this.ocont = document.querySelector(".left .left-t");
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
		this.goodsId = getUrlParam("goodsId")
		var str = "";
		for (var i=0;i<this.res.length;i++) {
			if (this.res[i].goodsId == this.goodsId) {
				str += `<img src=${this.res[i].src} class="msg"/>
					<img src="img/goods1.png"class="msg2 msg"/ >
					<img src="img/goods2.png"class="msg3 msg"/ >`
			}		
		}
		this.ocont.innerHTML = str;
		this.ocont.style.cursor = "pointer";
		this.aimg = document.querySelectorAll(".left-b img");
		this.amsg = document.querySelectorAll(".left-t .msg");
		this.tabs();
	}
	tabs(){
		var that = this;
		console.log(this.aimg);
		console.log(this.amsg);
		for (var i=0;i<this.aimg.length;i++) {
			this.aimg[i].index = i;
			this.aimg[i].onclick = function(){
				for (var j=0;j<that.aimg.length;j++) {
					that.aimg[j].className = "";
					that.amsg[j].style.display = "none";
				}
				this.className ="active";
				var index2 = this.index;
				that.amsg[index2].style.display = "block";
			}
		}		
	}
}
new Shopping;



//购物车
class Set{
	constructor(){
		this.btncart = document.querySelector(".btncart");
		this.addEvent();
	}
	addEvent(){
		var that = this;
		this.btncart.addEventListener("click",function(){
				// 1.点击时存储当前的商品id
				that.id = getUrlParam("goodsId");
				console.log(that.id)
				// 2.准备设置cookie
				that.setLocal()
		})
	}
	setLocal(){
		// 点击商品的情况
		// 存cookie，存什么格式的字符
			// 商品：对象		{id:,num:}
			// 所有商品：数组	[{id:,num:},{id:,num:},{id:,num:}]
		
		// 3.先获取cookie用来判断第一次还是后面的次
		this.goods = localStorage.getItem("shangpin");
		// 开始判断
		if(this.goods){
			// 5.之后点击，先解析数据
			this.goods = JSON.parse(this.goods)
			// 6.判断点的是否是重复数据
			var onoff = true;
			for(var i=0;i<this.goods.length;i++){
				if(this.goods[i].id == this.id){
					// 是重复数据
					this.goods[i].num ++;
					onoff = false;
				}
			}
			// 7.点的是新数据
			if(onoff){
				this.goods.push({
					id:this.id,
					num:1
				})
			}
		}else{
			// 4.第一次点击，直接存
			this.goods = [{
				id:this.id,
				num:1
			}]
		}
		// 8.以上都只是在操作数组，最后要设置回cookie
		localStorage.setItem("shangpin",JSON.stringify(this.goods))
	}
}

new Set;





//获取url(链接)参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}



