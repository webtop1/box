/**
 * @fileOverview �ű��ļ�����
 * @author thliu-pc
 * @version 3.4.1.0
 * @updateDate 2016/1/4
 */
fileApp.factory('fileInfoService',['$http','$q',function($http,$q){
    return{
        query:function(){
            var defer=$q.defer();  //�����Ӻ�ִ��
            $http({method:'GET',url:'../app/module/file/json.json'}).
                success(function(data,status,headers,config){
                    defer.resolve(data);  //����ִ�гɹ�
                    console.log('UserInfoService success');
                }).
                error(function(data,status,headers,config){
                    defer.reject();      //����ִ��ʧ��
                });

            return defer.promise; //���س�ŵ�����ػ�ȡ���ݵ�API
        },
        link:function(params){
            console.log("link ..............");
        },
        download:function(params){
            console.log("download ..............");
        },
        delete:function(params){
            console.log("delete ..............");
        },
        open:function(params){
            console.log("open ..............");
        },
        showlink:function(params){
            console.log("showlink ..............");
        },
        cancellink:function(params){
            console.log("cancellink ..............");
        },
        clean:function(params){
            console.log("clean ..............");
        },
        attr:function(params){
            console.log("attr ..............");
        },
        favroite:function(params){
            console.log("favroite ..............");
        }
    }
}]);