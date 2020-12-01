var focus = document.querySelector('.focus')
var arrowL = document.querySelector('.arrow-l')
var arrowR = document.querySelector('.arrow-r')
var circle = document.querySelector('.circle')

// 当focus鼠标划入时， arrow出现
focus.addEventListener('mouseenter', function () {
    arrowL.style.display = 'block';
    arrowR.style.display = 'block';
})

focus.addEventListener('mouseleave', function () {
    arrowL.style.display = 'none';
    arrowR.style.display = 'none';
})

// 动态生成 ol li的 circle
var ul = focus.querySelector('ul')
var ol = focus.querySelector('.circle')
for (let i = 0; i < ul.children.length; i++) {
    const li = document.createElement('li')
    li.setAttribute('index',i ) 
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
        var target = -index*focus.offsetWidth
        animate(ul, target)

    } )
}
ol.children[0].className = 'current'

// clone 第一张 照片到ul最后
var imgCopy = ul.children[0].cloneNode(true) 
ul.appendChild(imgCopy)

var num = 0;
var circle = 0;
// 点击arrow-r 可以滚动 
arrowR.addEventListener('click', function () {
    
    if (num === ul.children.length-1) { 
        ul.style.left = 0
        num = 0
    }
    num++;
    circle++;
    animate(ul, -num * focus.offsetWidth)


    // circle 和 arrow的点击事件对应
    // 多命名一个circle变量记录
    if (circle === ol.children.length) {
        circle = 0 
    }
    for (let i = 0; i < ol.children.length; i++){
        ol.children[i].className = ''
    }
    ol.children[circle].className = 'current'
    
})

// 点击arrow-l 可以滚动
arrowL.addEventListener('click', function () {
    
    if (num === 0) { 
        ul.style.right = 0
        num = ul.children.length-1
    }
    num--;
    circle--;
    animate(ul, -num * focus.offsetWidth)


    // circle 和 arrow的点击事件对应
    // 多命名一个circle变量记录
    if (circle === -1) {
        circle = ol.children.length - 1
    }
    for (let i = 0; i < ol.children.length; i++){
        ol.children[i].className = ''
    }
    ol.children[circle].className = 'current'
    
})

setInterval(() => {
    arrowR.click()
}, 3000);

// animate
function animate(obj, target, callback) {
    clearInterval(obj.timer)
    obj.timer = setInterval(() => {
        var currentLocation = obj.offsetLeft;
        var step = (target - currentLocation) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        obj.style.left = currentLocation + step + 'px'

        if (currentLocation === target) {
            clearInterval(obj.timer)
            if (callback) {
                callback()
            }
        }
    }, 15);
}
