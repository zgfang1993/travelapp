angular.module('App')
.controller('RestaurantsController', function ($scope, $http) {
  /*1.创建视图的作用域变量*/
  $scope.page = 0;  //记录最后一次从API请求到的页面
  $scope.total = 1;  //存储API中可用的页数，第一次请求后获取这个值
  $scope.restaurants = [];
  /*2.定义加载餐厅方法 getRestaurants()*/
  $scope.getRestaurants = function () {
    $scope.page++;  //3.页数递增
    $http
    .get('https://ionic-in-action-api.herokuapp.com/restaurants?page=' + $scope.page)
    .success(function (response) {
        angular.forEach(response.restaurants, function (restaurant) { //每次加载9个餐厅数据
            $scope.restaurants.push(restaurant); //4.把返回的json数组添加到$scope.restaurants数组中
        });
        $scope.total = response.totalPages; //5.获取api的页数赋值给$scope.total
        $scope.$broadcast('scroll.infiniteScrollComplete'); //6. 广播事件，告诉无线滚动组件已经加载完成
    })
    .error(function (err) {
        $scope.$broadcast('scroll.infiniteScrollComplete'); //7.处理错误，广播事件并打印出错信息
        console.log(err);
    });
  };

  $scope.getRestaurants();  //8.载入页面时从API加载第一页数据
});
