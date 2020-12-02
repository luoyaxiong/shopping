var focus = document.querySelector('.focus')
var arrowL = document.querySelector('.arrow-l')
var arrowR = document.querySelector('.arrow-r')
var circle = document.querySelector('.circle')
var focusWidth = focus.offsetWidth
console.log(focusWidth)
// 设置自动点击arrow
var timer = setInterval(() => {
    arrowR.click()
}, 3000);

// 当focus鼠标划入时， 
focus.addEventListener('mouseenter', function () {
    arrowL.style.display = 'block';
    arrowR.style.display = 'block';
    // 排他思想
    clearInterval(timer)
    timer = 0
})


// 当focus鼠标划出时
focus.addEventListener('mouseleave', function () {
    arrowL.style.display = 'none';
    arrowR.style.display = 'none';


    // 排他思想
    clearInterval(timer)
    timer = setInterval(() => {
        arrowR.click()
    }, 3000);
})

// 动态生成 ol li的 circle
var ul = focus.querySelector('ul')
var ol = focus.querySelector('.circle')
for (let i = 0; i < ul.children.length; i++) {
    const li = document.createElement('li')
    li.setAttribute('index', i)
    ol.appendChild(li)
    // 小圆圈绑定排他时间
    li.addEventListener('click', function () {
        // 其他 li 的 class 删除
        for (let j = 0; j < ol.children.length; j++) {
            ol.children[j].className = '';
        }
        // 留下自己为 current 类
        this.className = 'current'

        // 移动到相应的图片
        // ul 移动的距离是index* 照片的长度
        var index = this.getAttribute('index')
        var target = -index * focusWidth
        animate(ul, target)

        // 让circle点击和 arrow点击事件绑定 则需要通过index
        num = circle = index

    })
}
ol.children[0].className = 'current'

// clone 第一张 照片到ul最后
var imgCopy = ul.children[0].cloneNode(true)
ul.appendChild(imgCopy)

var num = 0;
var circle = 0;
var flag = true //节流阀 flag 
// 点击arrow-r 可以滚动 
arrowR.addEventListener('click', function () {

    if (num === ul.children.length - 1) {
        ul.style.left = 0
        num = 0
    }
    num++;
    circle++;
    animate(ul, -num * focus.offsetWidth, function () {})

    // circle 和 arrow的点击事件对应
    // 多命名一个circle变量记录s
    if (circle === ol.children.length) {
        circle = 0
    }
    for (let i = 0; i < ol.children.length; i++) {
        ol.children[i].className = ''
    }
    ol.children[circle].className = 'current'



})

// 点击arrow-l 可以滚动
arrowL.addEventListener('click', function () {

    if (num === 0) {
        num = ul.children.length - 1
        ul.style.left = -num * focusWidth + 'px'
        //ul.style.right = 0
    }
    num--;
    circle--;
    animate(ul, -num * focusWidth)

    // circle 和 arrow的点击事件对应
    // 多命名一个circle变量记录
    if (circle < 0) {
        circle = ol.children.length - 1
    }

    circleChange();


})

function circleChange() {
    // 其他 li 的 class 删除
    for (let j = 0; j < ol.children.length; j++) {
        ol.children[j].className = '';
    }
    // 留下自己为 current 类
    ol.children[circle].className = 'current'
}


function animate(obj, target, callback) {

    clearInterval(obj.timer)
    obj.timer = setInterval(() => {

        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        if (obj.offsetLeft === target) {
            clearInterval(obj.timer)
            if (callback) {
                callback()
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px'
    }, 30);
}