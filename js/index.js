window.onload=function(){
    var headerLiNodes=document.querySelectorAll('.nav li');
    var arrowNode=document.querySelector('.arrow');
    var upNode=document.querySelectorAll('.up');
    var ulNode=document.querySelector('.content-main');
    var content=document.querySelector('.content');
    var contentH=content.offsetHeight;
    var nowIndex=0;
    var timer=null;
    headerHandle();
    function headerHandle() {
        arrowNode.style.left=headerLiNodes[0].offsetLeft+headerLiNodes[0].offsetWidth/2
            -arrowNode.offsetWidth/2+'px';
        upNode[0].style.width='100%'
        for (var i = 0; i < headerLiNodes.length; i++) {
            headerLiNodes[i].index=i;
            headerLiNodes[i].onclick=function(){
                nowIndex=this.index
                move(nowIndex);

            }

        }
    };
    
    function move (nowIndex){
        for (var j = 0; j < upNode.length; j++) {
            upNode[j].style.width='0';

        }
        upNode[nowIndex].style.width='100%';
        arrowNode.style.left=headerLiNodes[nowIndex].offsetLeft+headerLiNodes[nowIndex].offsetWidth/2
            -arrowNode.offsetWidth/2+'px';
        ulNode.style.top=-contentH*nowIndex +'px';

    }
    contentHandle();
    function contentHandle() {
        document.onmousewheel=wheel;
        document.addEventListener('DOMMouseScroll',wheel);
        function wheel(event) {
            event = event || window.event;
         timer=setTimeout(function(){

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
                        if(nowIndex > 0){
                            nowIndex--;
                            move (nowIndex);
                        }
                        break;
                    case 'down' :
                        console.log('down');
                        if(nowIndex < 4){
                            nowIndex++;
                            move (nowIndex);
                        }
                        break;
                }


            },500);
            //禁止默认行为
            event.preventDefault && event.preventDefault();
            return false;

        }
    }
    window.onresize=function(){
        arrowNode.style.left=headerLiNodes[nowIndex].offsetLeft+headerLiNodes[nowIndex].offsetWidth/2
            -arrowNode.offsetWidth/2+'px';
        ulNode.style.top=-contentH*nowIndex +'px';
    }


};
