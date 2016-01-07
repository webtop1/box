/**
 * @fileOverview 脚本文件描述
 * @author thliu-pc
 * @version 3.4.1.0
 * @updateDate 2016/1/4
 */
fileApp.directive('file',['fileInfoService',function(fileInfoService){
    return {
        restrict:'E',
        templateUrl:'../app/templates/file-item.html',
        replace:true,
        controller:function($scope, $attrs, fileInfoService){
            $scope.fileInfoService=fileInfoService;
        },
        link:function(scope,ele,attr){
            var item=scope.item;
            scope.item.auth="preview";

            if(item.is_dir){
                ele.find(".icon").addClass("folder");
                scope.item.auth="download";
            }else{
                ele.find(".icon").addClass("file");
            }

            ele.bind('mouseenter',function(event){
                setMenus({event:event,parent:ele.find(".file-item-operate")});
            });

            ele.bind('mouseleave',function(event){
                setMenus({event:event});
            });

            ele.delegate('li','click',function(){
                var cmd=_$(this).attr('class');
                scope.fileInfoService[cmd].call(scope.item);
            })

            ele.bind('contextmenu',function(event){
                setMenus({event:event});
            });
        }
    };
}]);

function setMenus(params){
    var event=params.event;
    var eventType=event.type;
    var $menus=_$("#file-menus");
    function render(){
        if(!$menus.length){
            var html=[];
            html.push("<div class='file-menus' id='file-menus'><ul>");
            html.push("<li class='open'>打开</licmd>");
            html.push("<li class='showlink'>查看外链</li>");
            html.push("<li class='cancellink'>取消外链</li>");
            html.push("<li class='clean'>设置定期清理</li>");
            html.push("<li class='attr'>查看属性</li>");
            html.push("<li class='favroite'>收藏</li>");
            html.push("<li class='download'>下载</li>");
            html.push("<li class='delete'>删除</li>");
            html.push("</ul></div>");
            $("body").append(html.join(""));
            $menus=_$("#file-menus");
            $menus.hide();
        }
    }

   function contextmenu(){
       var x = event.clientX;
       var y = event.clientY;
       $menus.css({
           top: y + 'px',
           left: x + 'px'
       });
       $menus.show();
       $menus.one('mouseleave',function(){
           $menus.hide();
       });
   }

    function mouseenter(parent){
        $menus.css({"display":"inline-block"}).appendTo(parent);
    }

    function mouseleave(){
        $menus.hide();
    }

    $menus.removeClass("contextmenu mouseenter mouseleave");
    $menus.addClass(eventType);

    switch (eventType){
        case "contextmenu":
            contextmenu();
            break;
        case "mouseenter":
            mouseenter(params.parent);
            break;
        case "mouseleave":
            mouseleave();
            break;
    }

    render();
}