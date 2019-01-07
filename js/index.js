window.onload=function() {
    var headerLiNodes = document.querySelectorAll('.nav li');
    var arrowNode = document.querySelector('.arrow');
    var upNode = document.querySelectorAll('.up');
    var ulNode = document.querySelector('.content-main');
    var content = document.querySelector('.content');
    var contentH = content.offsetHeight;
    var nowIndex = 0;
    var timer = null;
    var firLi = document.querySelectorAll('.firstCar li');
    var littleP = document.querySelectorAll('section .littleP li');
    var teamUl = document.querySelector('.teamPerson');
    var teamLis = document.querySelectorAll('.teamPerson li');
    var sideNav =document.querySelectorAll('.sideNav li');
    var musicon =document.querySelector('.musicon');
    var audio =document.querySelector('audio');

    headerHandle();
    function headerHandle() {
        arrowNode.style.left = headerLiNodes[0].offsetLeft + headerLiNodes[0].offsetWidth / 2
            - arrowNode.offsetWidth / 2 + 'px';
        upNode[0].style.width = '100%'
        for (var i = 0; i < headerLiNodes.length; i++) {
            headerLiNodes[i].index = i;
            headerLiNodes[i].onclick = function () {
                nowIndex = this.index
                move(nowIndex);

            }

        }
    };

    function move(nowIndex) {
        for (var j = 0; j < upNode.length; j++) {
            upNode[j].style.width = '0';
            sideNav[j].className = '';
        }
        upNode[nowIndex].style.width = '100%';
        arrowNode.style.left = headerLiNodes[nowIndex].offsetLeft + headerLiNodes[nowIndex].offsetWidth / 2
            - arrowNode.offsetWidth / 2 + 'px';
        ulNode.style.top = -contentH * nowIndex + 'px';
        sideNav[nowIndex].className = 'active';

    }

    contentHandle();
    function contentHandle() {
        document.onmousewheel = wheel;
        document.addEventListener('DOMMouseScroll', wheel);
        function wheel(event) {
            event = event || window.event;
            timer = setTimeout(function () {

                clearTimeout(timer);
                var flag = '';
                if (event.wheelDelta) {
                    //ie/chrome
                    if (event.wheelDelta > 0) {
                        flag = 'up';
                    } else {
                        flag = 'down'
                    }
                } else if (event.detail) {
                    //firefox
                    if (event.detail < 0) {
                        flag = 'up';
                    } else {
                        flag = 'down'
                    }
                }

                switch (flag) {
                    case 'up' :
                        console.log('up');
                        if (nowIndex > 0) {
                            nowIndex--;
                            move(nowIndex);
                        }
                        break;
                    case 'down' :
                        console.log('down');
                        if (nowIndex < 4) {
                            nowIndex++;
                            move(nowIndex);
                        }
                        break;
                }


            }, 500);
            //禁止默认行为
            event.preventDefault && event.preventDefault();
            return false;

        }
    }

    window.onresize = function () {
        arrowNode.style.left = headerLiNodes[nowIndex].offsetLeft + headerLiNodes[nowIndex].offsetWidth / 2
            - arrowNode.offsetWidth / 2 + 'px';
        ulNode.style.top = -contentH * nowIndex + 'px';
    };
    homeHandle();
    function homeHandle() {
        var lastIndex = 0;
        var nowIndex = 0;
        var lastTime = 0;
        var timer = null;

        for (var i = 0; i < littleP.length; i++) {
            littleP[i].index = i;
            littleP[i].onclick = function () {
                var nowTime = Date.now();
                if (nowTime - lastTime < 2100) {
                    //说明两次点击间隔时间少于两秒
                    return;
                }

                nowIndex = this.index;

                if (nowIndex == lastIndex) return;
                clearInterval(timer);
                for (var j = 0; j < firLi.length; j++) {
                    firLi[j].className = 'fontCon';
                }
                if (nowIndex > lastIndex) {
                    firLi[nowIndex].className = 'fontCon rightShow';
                    firLi[lastIndex].className = 'fontCon leftHide';
                } else {
                    firLi[nowIndex].className = 'fontCon leftShow';
                    firLi[lastIndex].className = 'fontCon rightHide';
                }
                littleP[lastIndex].className = '';
                littleP[nowIndex].className = 'active';

                //同步下标
                lastIndex = nowIndex;
                lastTime = nowTime;
                //autoPlay();
            }

        }

        autoPlay();
        function autoPlay() {
            //自动轮播
            timer = setInterval(function () {
                //相当于点击右边小圆点  右边显示 左边隐藏
                nowIndex++;

                if (nowIndex === 4) {
                    nowIndex = 0;
                }

                firLi[nowIndex].className = 'fontCon rightShow';
                firLi[lastIndex].className = 'fontCon leftHide';
                //修正小圆点的显示
                littleP[lastIndex].className = '';
                littleP[nowIndex].className = 'active';

                //同步下标
                lastIndex = nowIndex;
                //更新lastTime时间
                lastTime = Date.now();

            }, 2100)
        }

        content.onmouseenter = function () {
            clearInterval(timer);
        }
        content.onmouseleave = autoPlay;

    }

    teamHandle();
    function teamHandle() {
        //保存canvas的容器
        var canvas = null;
        //保存的定时器变量
        var timer1 = null;
        var timer2 = null;

        //给li绑定鼠标移入事件
        for (var i = 0; i < teamLis.length; i++) {
            teamLis[i].index = i;

            teamLis[i].onmouseenter = function () {
                //其他li透明度为0.5
                for (var j = 0; j < teamLis.length; j++) {
                    teamLis[j].style.opacity = 0.5;
                }
                this.style.opacity = 1;
                //创建画布，产生气泡运动
                addCanvas(this.index);
            }
        }

        //给ul绑定鼠标移出事件
        teamUl.onmouseleave = function () {
            //将所有li透明度改为1
            for (var j = 0; j < teamLis.length; j++) {
                teamLis[j].style.opacity = 1;
            }
            //清除画布
            canvas.remove();
            canvas = null; //为了让下一次能产生新的画布
            //清除定时器
            clearInterval(timer1);
            clearInterval(timer2);
        }

        //添加画布
        function addCanvas(index) {
            /*
             如果之前没有，我要新创建一个
             如果之前有，使用之前的，改变位置left
             */
            if (!canvas) {
                //创建canvas
                canvas = document.createElement('canvas');
                //设置宽度和高度
                canvas.width = 236;
                canvas.height = 448;

                canvas.style.position = 'absolute';
                canvas.style.left = index * 236 + 'px';
                //产生气泡运动
                bubble();
                //添加到ul中
                teamUl.appendChild(canvas);
            } else {
                canvas.style.left = index * 236 + 'px';
            }
        }
        //气泡运动函数
        function bubble() {
            if (canvas.getContext) {
                var ctx = canvas.getContext('2d');

                var circleArr = [];

                //生成随机圆
                timer1 = setInterval(function () {
                    //颜色随机
                    var r = Math.round(Math.random() * 255);
                    var g = Math.round(Math.random() * 255);
                    var b = Math.round(Math.random() * 255);
                    //半径随机
                    var c_r = Math.round(Math.random() * 8 + 2);
                    //缩放系数
                    var s = Math.round(Math.random() * 50 + 50);
                    //起始位置 x轴坐标随机 y轴坐标不变
                    var x = Math.round(Math.random() * canvas.width);
                    var y = canvas.height + c_r;

                    //添加到数组中
                    circleArr.push({
                        r: r,
                        g: g,
                        b: b,
                        c_r: c_r,
                        s: s,
                        x: x,
                        y: y,
                        d: 0  //角度
                    })

                }, 20)

                //画圆
                timer2 = setInterval(function () {
                    //清除画布, 清除上一次画的东西
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    for (var i = 0; i < circleArr.length; i++) {
                        //获取单个圆
                        var item = circleArr[i];
                        //角度增加
                        item.d += 4;
                        //计算得出弧度
                        var rad = item.d * Math.PI / 180;
                        //计算圆心的坐标
                        var x = Math.round(item.x + Math.sin(rad) * item.s);
                        var y = Math.round(item.y - rad * item.s);
                        //判断y轴的坐标，如果小于0，清除掉
                        if (y <= 0) {
                            circleArr.splice(i, 1);
                            continue;
                        }

                        //画圆
                        ctx.fillStyle = 'rgb(' + item.r + ',' + item.g + ',' + item.b + ')';
                        ctx.beginPath();
                        ctx.arc(x, y, item.c_r, 0, 2 * Math.PI);
                        ctx.fill();
                    }

                }, 1000 / 60)

            } else {
                alert('您的浏览器不支持canvas');
            }
        }

    }

    for (var i = 0; i < sideNav.length; i++) {
        sideNav[i].index = i;
        sideNav[i].onclick = function () {
            nowIndex = this.index;
            move(nowIndex);
        }
    }
    musicon.onclick = function () {
        if (audio.paused) {
            //说明当前音乐是暂停的，点击播放
            audio.play();
            this.style.backgroundImage = 'url("img/musicon.gif")';
        } else {
            //说明当前音乐是播放的，点击暂停
            audioNode.pause();
            this.style.backgroundImage = 'url("img/musicoff.gif")';
        }
    }.onclick = function () {
        if (audio.paused) {
            //说明当前音乐是暂停的，点击播放
            audio.play();
            this.style.backgroundImage = 'url("img/musicon.gif")';
        } else {
            //说明当前音乐是播放的，点击暂停
            audio.pause();
            this.style.backgroundImage = 'url("img/musicoff.gif")';
        }
    }
}

