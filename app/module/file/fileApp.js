'use strict';

var fileApp = angular.module('fileApp', ['ngRoute']);

fileApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/files', {
                templateUrl: '../app/templates/file-main.html',
                controller: 'filelistController'
            }).
            when('/share', {
                templateUrl: '../app/templates/share.html',
                controller: 'shareController'
            }).
            when('/files/self', {
                templateUrl: '../app/templates/file-self.html',
                controller: 'shareController'
            }).
            otherwise({
                redirectTo: '/files'
            });
    }]);


fileApp.controller('filelistController',['$scope','fileInfoService',function($scope,fileInfoService){
    var promise = fileInfoService.query();  //同步调用，获取承诺接口
    promise.then(function(data){
        $scope.mapList={};
        var items=data.content;
        for(var i in items){
            items[i].auth="";
            $scope.mapList[items[i].neid]=items[i];
            if(items[i].is_dir){
                items[i].auth="folder"
            }
        }
        $scope.list=data.content;
    },function(data){
        $scope.user={error:'数据不存在。。。'}; //调用承诺接口reject();
    });
    resize();
    $scope.selected = [];
    $scope.selectedTags = [];

    var $head=_$("#file-main-head");

    var updateSelected = function(action,id,name){
        if(action == 'add' && $scope.selected.indexOf(id) == -1){
            $scope.selected.push(id);
            $scope.selectedTags.push(name);
        }
        if(action == 'remove' && $scope.selected.indexOf(id)!=-1){
            var idx = $scope.selected.indexOf(id);
            $scope.selected.splice(idx,1);
            $scope.selectedTags.splice(idx,1);
        }
        $scope.selectedItems=$scope.selected.join(',');


        if(!$head.find(".file-menus").length){
            var headMenus=_$("#file-menus").clone();
            headMenus.addClass("head-menus");
            headMenus.removeAttr("id").appendTo($head);
        }
        $head.find(".file-menus").removeClass("multi mouseenter");
        if($scope.selected.length>1){
            $head.find(".file-menus").addClass("multi");
        }
        $head.find(".file-menus").show();
        //$scope.$apply();
    }

    $scope.isSelected = function(id){
        return $scope.selected.indexOf(id)>=0;
    }

    $scope.updateSelection = function($event, id){
        var checkbox = $event.target;
        var action = (checkbox.checked?'add':'remove');
        updateSelected(action,id,checkbox.name);
    }

    $head.delegate('li','click',function(){
        var cmd=_$(this).attr("class");
        var params=[];
        _$($scope.selected).each(function(){
            params.push($scope.mapList[this]);
        });
        fileInfoService[cmd].call();
    });

}]);


fileApp.filter('dateFormat',function(){
    return function(input,formatStyle){
      input=input.replace('T'," ").replace('+',' ');
      var ar=input.split(" ");
      return ar[0];
    };
})


/*fileApp.controller('templateController',['$scope','$templateCache','$rootScope',function(scope,cache,rootScope){
    scope.templateCache=cache;
    scope.$on('$includeContentLoaded', function(data) {
        var html=data.currentScope.templateCache.get("template_userPanel");
        console.log(html);
    });
}]);*/

var _$=angular.element;

function resize(){
    var win=_$(window);
    _$("#file-main-right").width(win.width()-205);
}
