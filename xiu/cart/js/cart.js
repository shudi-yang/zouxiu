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


class Cart{
    constructor(){
        this.tbody = document.querySelector("tbody");
        this.url = "http://localhost/htdocs/xiu/cart/data/goods.json";

        // 请求所有数据
        this.init();
        // D1.绑定span的点击事件
        this.addEvent()
    }
    init(){
        var that = this;
        ajax({
            url:this.url,
            success:function(res){
            	console.log(res)
                that.res = JSON.parse(res)
                // 拿到cookie
                that.getlocal()
            }
        })
    }
    getlocal(){
        this.goods = JSON.parse(localStorage.getItem("shangpin"));
        console.log(this.goods)
        // 渲染页面
        this.display();
    }
    display(){
        // console.log(this.res)
        // console.log(this.goods)
        var str = "";
        // 遍历所有数据
        for(var i=0;i<this.res.length;i++){
            // 遍历所有cookie
            for(var j=0;j<this.goods.length;j++){
                // 两相对比，发现id重复，那就是要加入购物车的商品
                if(this.res[i].goodsId == this.goods[j].id){
                    str += `<tr index="${this.goods[j].id}" align="center">
                                <td><input type="checkbox"></td>
                                <td><img src="${this.res[i].src}"></td>
                                <td>${this.res[i].name}</td>
                                <td>${this.res[i].price}</td>
                                <td><input type="number" value="${this.goods[j].num}" min=1></td>
                                <td><span class="delete">删除</span></td>
                            </tr>`
                }
            }
        }
        this.tbody.innerHTML = str;
    }
    addEvent(){
        var that = this;
        // 利用事件委托绑定span的事件
        this.tbody.addEventListener("click",function(eve){
            if(eve.target.className == "delete"){
                // D2.保存商品id
                that.id = eve.target.parentNode.parentNode.getAttribute("index");
                // D3.删除DOM元素
                eve.target.parentNode.parentNode.remove()
                // D4.删除cookie中的数据
                that.changeCookie(function(i){
                    that.goods.splice(i,1)
                })
            }
        })
        this.tbody.addEventListener("input",function(eve){
            if(eve.target.type == "number"){
                // U1.保存商品id
                that.id = eve.target.parentNode.parentNode.getAttribute("index");
                // 保存输入框的值
                // that.num = eve.target.value;
                // U2.修改cookie中的数据
                that.changeCookie(function(i){
                    that.goods[i].num = eve.target.value;
                })
            }
        })
    }
    changeCookie(callback){
        for(var i=0;i<this.goods.length;i++){
            if(this.goods[i].id == this.id){
                // 删除或修改
                callback(i)
                break;
            }
        }
        localStorage.setItem("shangpin",JSON.stringify(this.goods))
    }
}

new Cart;


