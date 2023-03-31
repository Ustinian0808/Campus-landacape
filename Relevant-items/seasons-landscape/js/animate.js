//缓动动画函数封装obj目标对象 target 目标位置
//1.让盒子每次移动的距离慢慢变小，速度就会慢慢落下来
//2.核心算法：（目标值 - 现在位置）/10 作为每次移动距离 步长
//3.停止条件是：让当前位置等于目标位置就停止定时器
function animate(obj, target, callback) {
    //callback = function() {} 在调用的时候

    //先清除以前的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer)
    obj.timer = setInterval(function(){
        //步长值写到定时器的里面
        //把步长值改为整数，不要出现小数
        //let step = Math.ceil((target - obj.offsetLeft) /10)
        let step = (target - obj.offsetLeft) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        if(obj.offsetLeft == target) {
            //停止动画，本质是停止定时器
            clearInterval(obj.timer)
            //回调函数写在定时器结束里
            if(callback){
                //调用函数
                callback()
            }
        }
        //把每次加1 这个步长值改为慢慢变小的值 步长公式（目标值 - 现在位置）/10
        obj.style.left = obj.offsetLeft + step + 'px'
    },15)
}

function animate_up(obj, target, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function(){
        let step = (target - window.pageYOffset) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        if(window.pageYOffset == target) {
            clearInterval(obj.timer)
            if(callback){
                callback()
            }
        }
        // console.log(step)
        // obj.style.left = window.pageYOffset + step + 'px'
        window.scroll(0,window.pageYOffset + step) 
    },15)
}

function animate_mask(obj, target, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(function(){
        let step = (target -obj.offsetTop) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        if(obj.offsetTop == target) {
            clearInterval(obj.timer)
            if(callback){
                callback()
            }
        }
        console.log(step)
        // obj.style.left = window.pageYOffset + step + 'px'
        obj.style.top = obj.offsetTop + step + 'px'
    },15)
}



// 登录弹窗
function mask_block(obj){
    obj.style.display = 'block'
    obj.style.animation = 'move_mask 1s ease forwards'
}

function mask_dis(obj){
    obj.style.animation = 'move_mask1 1s ease forwards'
        // 动画结束后调用函数
        setTimeout(function () {
            obj.style.display = 'none'
        }, 1000)
}