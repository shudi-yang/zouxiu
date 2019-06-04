class Register{
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
            // 先获取指定的localStorage，用来判断是否是第一次注册
            that.getUserMsg()
        }
    }
    getUserMsg(){
        this.usermsg = localStorage.getItem("usermsg");
        // console.log(this.usermsg);
        // 开始判断是否是第一次
        this.setUserMsg()
    }
    setUserMsg(){
        // localStorage中的数据的格式为:[{user:"admin",pass:1234,onoff:0},{user:"admin",pass:1234,onoff:0}]
        // 如果是第一次，直接注册，如果不是第一次要判断是否重名
        if(this.usermsg == null){
            // 第一次
            this.usermsg = [{
                user:this.user.value,
                pass:this.pass.value,
                onoff:0
            }]
            this.msg.innerHTML = "";
        }else{
            // 不是第一次:获取的同时，转成数组，然后开始判断是否重名
            this.usermsg = JSON.parse(localStorage.getItem("usermsg"));
            for(var i=0;i<this.usermsg.length;i++){
                if(this.usermsg[i].user == this.user.value){
                    this.msg.innerHTML = "重名";
                    return;
                }
            }
            this.msg.innerHTML = "";
            this.usermsg.push({
                user:this.user.value,
                pass:this.pass.value,
                onoff:0
            })
        }

        localStorage.setItem("usermsg",JSON.stringify(this.usermsg))
    }
}

new Register;