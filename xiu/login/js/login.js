class Login{
    constructor(){
        this.user = document.querySelector(".user");
        this.pass = document.querySelector(".pssd");
        this.btn = document.querySelector(".btn");
        this.msg = document.querySelector(".msg");
        this.init()
    }
    init(){
        var that = this;
        this.btn.onclick = function(){
            // 点击时先获取localStorage
            that.getUserMsg()
        }
    }
    getUserMsg(){
        // 获取的同时直接转换，方便实用
        this.usermsg = localStorage.getItem("usermsg") ? JSON.parse(localStorage.getItem("usermsg")) : [];
        // 开始验证
        this.check()
    }
    check(){
        // 遍历所有的用户名
        for(var i=0;i<this.usermsg.length;i++){
            // 每次判断当前用户名是否和指定用户名密码是否符合
            if(this.usermsg[i].user == this.user.value && this.usermsg[i].pass == this.pass.value){
                // 如果符合，登录成功，修改账号状态
                this.usermsg[i].onoff = 1;
                // 在存回去，才能实现修改
                localStorage.setItem("usermsg",JSON.stringify(this.usermsg))
                // 给提示语句
                this.msg.innerHTML = "登录成功，三秒后跳转到首页";
                // 三秒后跳转
                setTimeout(() => {
                    location.href = "../index.html";
                }, 3000);
                // 结束
                return;
            }
        }
        // 如果没结束，表示登录失败，那么显示失败信息
        this.msg.innerHTML = "账号密码不符，请重新登录，或去注册"
    }
}


new Login;