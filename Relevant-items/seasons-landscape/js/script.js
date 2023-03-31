window.addEventListener('load', function () {

    // 1. 进入提示
    let Tips = document.querySelector('.tip')
    let count_time = Tips.children[2]
    // console.log(count_time)
    let count = 5
    let Tips_timer = setInterval(function(){
        count--
        count_time.innerHTML = count
        if(count == 0){
            Tips.style.width = 0
            Tips.style.height = 0
            clearInterval(Tips_timer)
            setTimeout(function(){
                Tips.style.display = 'none'
            },400)
        }
    },1000)
     

    //  2. nav_more部分
    let nav_more = document.querySelector('.nav_more')
    let nav_more_dis = nav_more.children[0]
    nav_more.addEventListener('mouseover', function(){
        nav_more_dis.style.height = 250 + 'px'
        setTimeout(function(){
            nav_more_dis.style.overflow = 'visible'
        },100)
    })
    nav_more.addEventListener('mouseleave', function(){
        nav_more_dis.style.height = 0
        setTimeout(function(){
            nav_more_dis.style.overflow = ''
        },100)
    })

    // 3. 搜索框
    let search = document.querySelector('.search')
    let search_input = document.querySelector('.search_in').children[0]
    search.addEventListener('mouseover', function () {
        search_input.style.width = 170 + 'px'

        search_input.style.border = " 1px solid #ccc"
        search_input.focus()
    })
    // 添加判断条件
    search_input.addEventListener('focus', function () {
        this.style.width = 170 + 'px'
        this.style.border = " 1px solid #ccc"
    })
   
    search.addEventListener('mouseleave', function () {
        if (search_input.value != '') {
            search_input.style.width = 170 + 'px'
            search_input.style.border = " 1px solid #ccc"
        } else {
            search_input.style.width = 0
            search_input.style.border = ''
            search_input.blur()
        }

    })


    // 4.登入弹窗
    let logon_mask = document.querySelector('.logon_mask')
    let logon_btn = document.querySelector('.logon_btn')
    let sign_none = document.querySelector('.sign_none')
    logon_btn.addEventListener('click', function () {

        mask_block(logon_mask)
    })
    sign_none.addEventListener('click', function () {

        mask_dis(logon_mask)
    })

    //  注册弹窗
    let rgister_mask = document.querySelector('.rgister_mask')
    let rgister_btn = document.querySelector('.rgister_btn')
    let rgister_sign_none = document.querySelector('.rgister_sign_none')
    rgister_btn.addEventListener('click', function () {

        mask_block(rgister_mask)
    })
    rgister_sign_none.addEventListener('click', function () {

        mask_dis(rgister_mask)
    })

    // 顶部注册按钮
    let rgister_btn_top = document.querySelector('.rgister_btn_top')
    rgister_btn_top.addEventListener('click', function () {

        mask_block(rgister_mask)
    })


    //  5. 轮播图部分
    // 左右按钮
    let focus = document.querySelector('.focus')
    // console.log(focus)
    let arrow_l = document.querySelector('.arrow-l')
    let arrow_r = document.querySelector('.arrow-r')
    let focus_ulWidth = focus.offsetWidth
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block'
        arrow_r.style.display = 'block'
        //清除轮播图定时器
        clearInterval(timer)
        timer = null //清除定时器变量
    })
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none'
        arrow_r.style.display = 'none'
        //离开focus开启定时器
        timer = setInterval(function () {
            arrow_r.click()
        }, 4000)
    })

    //焦点--有几张图就有几个圆
    //获取元素
    let focus_ul = focus.querySelector('ul')
    let focus_ol = focus.querySelector('.circle')
    for (let i = 0; i < focus_ul.children.length; i++) {
        // 1.创建li
        let li = document.createElement('li')
        //为li自定义编号
        li.setAttribute('index', i)

        // 2.放到ol里
        focus_ol.appendChild(li)

        //点击圆点时
        li.addEventListener('click', function () {
            //圆点排他思想
            for (let i = 0; i < focus_ol.children.length; i++) {
                focus_ol.children[i].className = ''
            }
            //留下自己
            this.className = 'current'
            //点击圆点移动图片，移动的是ul
            //ul移动距离 = li索引号 * 图片宽度 注意为负值
            //当点击小圆点时记录 索引号
            let index = this.getAttribute('index')
            //点击某个小圆点，把索引号 num
            num = index
            //点击某个小圆点，把索引号 circle
            circle = index
            // let focus_ulWidth = focus.offsetWidth

            // console.log(focus_ulWidth)
            // console.log(index)

            //调用函数
            animate(focus_ul, - index * focus_ulWidth)
        })

    }
    // 把第一个li类名设置为current
    focus_ol.children[0].className = 'current'

    //克隆第一张焦点图放到ul后面
    let focus_first_img = focus_ul.children[0].cloneNode(true)
    focus_ul.appendChild(focus_first_img)
    //点击右侧按钮，图片滚动一张
    let num = 0
    let circle = 0

    // 控制速度
    let flag = true

    arrow_r.addEventListener('click', function () {
        if (flag) {
            flag = false
            if (num == focus_ul.children.length - 1) {
                focus_ul.style.left = 0
                num = 0
            }
            num++
            animate(focus_ul, - num * focus_ulWidth, function () {
                flag = true
            })
            // 点击右侧按钮小圆点跟着变化
            circle++
            if (circle == focus_ol.children.length) {
                circle = 0
            }
            //清除圆点类名
            for (let i = 0; i < focus_ol.children.length; i++) {
                focus_ol.children[i].className = ''
            }
            focus_ol.children[circle].className = 'current'
        }

    })


    //左侧按钮
    arrow_l.addEventListener('click', function () {
        if (flag) {
            flag = false
            if (num == 0) {
                num = focus_ul.children.length - 1
                focus_ul.style.left = -num * focus_ulWidth + 'px'

            }
            num--
            animate(focus_ul, - num * focus_ulWidth, function () {
                flag = true
            })
            // 点击左侧按钮小圆点跟着变化
            circle--
            if (circle < 0) {
                circle = focus_ol.children.length - 1
            }
            //清除圆点类名
            for (let i = 0; i < focus_ol.children.length; i++) {
                focus_ol.children[i].className = ''
            }
            focus_ol.children[circle].className = 'current'
        }

    })

    //图片轮播效果
    //鼠标放上去停止效果  清除定时器
    let timer = setInterval(function () {
        arrow_r.click()
    }, 4000)

    // Spring部分
    let spring_left_ul = document.querySelector('.spring_left').children[0]
    let spring_right_ul = document.querySelector('.spring_right').children[0]
    console.log(spring_right_ul)
    let spring_lis = spring_right_ul.querySelectorAll('li')
    // console.log(spring_lis)
    for (let i = 0; i < spring_lis.length; i++) {
        // 创建索引号
        spring_lis[i].setAttribute('s_index', i)
        // console.log('s_index')

        //让第一个card有颜色
        spring_lis[0].children[0].style.color = '#2D8CF0'
        // 背景色
        spring_lis[0].style.background = '#fff'

        spring_lis[i].addEventListener('mouseover', function () {
            let s_index = this.getAttribute('s_index')
            if (s_index > 0) {
                // 如果index大于0则失去颜色
                spring_lis[0].children[0].style.color = ''
                for (let i = 0; i < spring_lis.length; i++) {
                    spring_lis[i].children[0].style.color = ''
                    spring_lis[i].style.background = '#F4F4F4'
                }
                spring_lis[s_index].children[0].style.color = '#2D8CF0'
                spring_lis[s_index].style.background = '#fff'
            } else {

                for (let i = 1; i < spring_lis.length; i++) {
                    spring_lis[i].children[0].style.color = ''
                    spring_lis[i].style.background = '#F4F4F4'
                }
                spring_lis[0].children[0].style.color = '#2D8CF0'
                spring_lis[0].style.background = '#fff'
            }

            animate(spring_left_ul, -s_index * 740)
        })
        spring_lis[i].addEventListener('mouseleave', function () {
            // 鼠标离开后图片
            let s_index = this.getAttribute('s_index')
            // animate(spring_left_ul,0)
            for (let i = 1; i < spring_lis.length; i++) {
                spring_lis[i].children[0].style.color = ''
                spring_lis[i].style.background = '#F4F4F4'
            }
            spring_lis[s_index].children[0].style.color = '#2D8CF0'
            spring_lis[s_index].style.background = '#fff'
        })
    }

    // 6. autumn start
    let cur_timer = setInterval(get_next, 2000)
    let sz = new Array()
    let cur_ul = document.querySelector('.autumn_box').children[0]
    for (let i = 0; i < 6; i++) {
        let cur_li = document.createElement('li')
        let cur_img = document.createElement('img')

        cur_img.src = "pic/Autumn/" + i + ".jpg"
        cur_li.appendChild(cur_img)
        cur_ul.appendChild(cur_li)
        sz.push(cur_li)
        sz[sz.length - 1].style.left = 0
    }
    // 创建左右箭头
    let pre_img = document.createElement('img')
    pre_img.src = 'pic/Autumn/pre.svg'
    pre_img.style.position = 'absolute'
    pre_img.style.left = 0
    pre_img.style.top = 0
    pre_img.style.bottom = 0
    pre_img.style.width = '27px'
    pre_img.style.height = '44px'
    pre_img.style.margin = 'auto'
    pre_img.style.zIndex = 100
    cur_ul.appendChild(pre_img)

    let nex_img = document.createElement('img')
    nex_img.src = 'pic/Autumn/nex.svg'
    nex_img.style.position = 'absolute'
    nex_img.style.right = 0
    nex_img.style.top = 0
    nex_img.style.bottom = 0
    nex_img.style.width = '27px'
    nex_img.style.height = '44px'
    nex_img.style.margin = 'auto'
    nex_img.style.zIndex = 100
    cur_ul.appendChild(nex_img)

    // 点击箭头
    pre_img.addEventListener('click', function () {
        clearInterval(cur_timer)
        get_pre()
        cur_timer = setInterval(get_pre, 2000)
    })
    nex_img.addEventListener('click', function () {
        clearInterval(cur_timer)
        get_next()
        cur_timer = setInterval(get_next, 2000)
    })

    let len = sz.length - 1
    sz[len - 2].style.left = 0
    sz[len - 1].style.zIndex = 100
    sz[len - 1].style.left = '200px'
    sz[len - 1].style.transform = 'scale(1.3)'
    sz[len].style.left = '400px'


    // 向后
    function get_pre() {
        let give_up = sz[0]
        // 删除第一个元素
        sz.shift()
        //末尾添加元素
        sz.push(give_up)
        for (let i = 0; i < sz.length; i++) {
            sz[i].style.zIndex = i
            sz[i].style.transform = 'scale(1)'
        }
        sz[len - 2].style.left = 0
        sz[len - 1].style.zIndex = 100
        sz[len - 1].style.left = '200px'
        sz[len - 1].style.transform = 'scale(1.3)'
        sz[len - 1].style.opacity = 1;
        sz[len].style.left = '400px'

    }
    // 向前
    function get_next() {
        let give_up = sz[len]
        //删除最后一项
        sz.pop()
        //开头添加
        sz.unshift(give_up)
        for (let i = 0; i < sz.length; i++) {
            sz[i].style.zIndex = i
            sz[i].style.transform = 'scale(1)'
        }
        sz[len - 2].style.left = 0
        sz[len - 1].style.zIndex = 100
        sz[len - 1].style.left = '200px'
        sz[len - 1].style.transform = 'scale(1.3)'
        sz[len - 1].style.opacity = 1;
        sz[len].style.left = '400px'

    }

    // 7. 微信二维码显示
    let btn_contact_wb = document.querySelector('.btn_contact_wb')
    let btn_contact_wx = document.querySelector('.btn_contact_wx')
    let contact_wb = btn_contact_wb.children[0]
    let contact_wx = btn_contact_wx.children[0]
    btn_contact_wb.addEventListener('mouseover', function () {
        contact_wb.style.display = 'block'
    })
    btn_contact_wx.addEventListener('mouseover', function () {
        contact_wx.style.display = 'block'
    })
    btn_contact_wb.addEventListener('mouseleave', function () {
        contact_wb.style.display = 'none'
    })
    btn_contact_wx.addEventListener('mouseleave', function () {
        contact_wx.style.display = 'none'
    })

    // 侧边栏
    let home_bar = document.querySelector('.home_bar')
    let banner = document.querySelector('.banner')

    // 返回顶部
    let all_seasons = document.querySelector('.all_seasons')
    let all_seasonsTop = all_seasons.offsetTop

    let bannerTop = banner.offsetTop

    // 侧边栏固定定位后变化的数值
    let home_barTop = home_bar.offsetTop - bannerTop
    // console.log(home_barTop)
    // 鼠标滚动
    document.addEventListener('scroll', function () {
        // 页面被卷去的头部
        // console.log(window.pageYOffset)
        if (window.pageYOffset >= bannerTop) {
            home_bar.style.position = 'fixed'
            home_bar.style.top = home_barTop + 'px'
        } else {
            home_bar.style.position = 'absolute'
            home_bar.style.top = '550px'
        }
        if (window.pageYOffset >= all_seasonsTop) {
            bar_lis[3].style.display = 'block'
        } else {
            bar_lis[3].style.display = 'none'
        }
    })
    // 侧边栏功能
    let bar_lis = home_bar.querySelectorAll('li')
    let bar_er = bar_lis[0].children[1]
    let personal = bar_lis[1].children[1]
    let bar_up_text = bar_lis[3].children[1]

    
    bar_lis[0].addEventListener('mouseover', function () {
        bar_er.style.display = 'block'
    })
    bar_lis[0].addEventListener('mouseleave', function () {
        bar_er.style.display = 'none'
    })

    bar_lis[1].addEventListener('mouseover', function () {
        
        personal.style.width = '70px'
    })
    bar_lis[1].addEventListener('mouseleave', function () {
        personal.style.width = 0
    })
    bar_lis[3].addEventListener('mouseover', function () {
        
        bar_up_text.style.width = '70px'
    })
    bar_lis[3].addEventListener('mouseleave', function () {
        bar_up_text.style.width = 0
    })

    // 点击返回顶部
    let bar_up = document.querySelector('.bar_up')
    bar_up.addEventListener('click', function () {
        
        // 窗口做动画
        animate_up(window, 0)
    })

})