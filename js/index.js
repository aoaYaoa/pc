window.onload=function(){
    var headerLiNodes=document.querySelectorAll('.nav li');
    var arrowNode=document.querySelector('.arrow');
    var upNode=document.querySelectorAll('.up');
    headerHandle();
    function headerHandle() {
        arrowNode.style.left=headerLiNodes[0].offsetLeft+headerLiNodes[0].offsetWidth/2
            -arrowNode.offsetWidth/2+'px';
        upNode[0].style.width='100%'
        for (var i = 0; i < headerLiNodes.length; i++) {
            headerLiNodes[i].index=i;
            headerLiNodes[i].onclick=function(){
                for (var j = 0; j < upNode.length; j++) {
                    upNode[j].style.width='0';

                }
                upNode[this.index].style.width='100%';
                arrowNode.style.left=this.offsetLeft+this.offsetWidth/2
                    -arrowNode.offsetWidth/2+'px';

            }

        }
    };

};
