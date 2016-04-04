/**
 * 
 */

var app=angular.module("MyCat",[]);

app.controller("CatController",function($scope, $http){
	/** */
	$scope.availableProductInBD=[];
	$scope.produits=[];
	$scope.motCle=null;
	$scope.pageCourante=0;
	$scope.formProduit=[];
	$scope.designation=null;
	$scope.prix=null;
	
	$scope.saveProduit=function(){
		$http.get("/save?designation="+$scope.designation+"&prix="+$scope.prix)
		.success(function(data){
			$scope.formProduit=data;
		})
		.error(function(err){
			console.log(err);
		}); 
	};
	
	$http.get("/all")
		.success(function(data){
			$scope.availableProductInBD=data;
	});
	
	
	$scope.charger=function(){
		$http.get("/produitsParMC?mc="+$scope.motCle+"&page="+$scope.pageCourante)
			.success(function(data){
				$scope.produits = data;
				$scope.pages=new Array(data.totalPages);
			});
	};
	
	/** p = numero page courante*/
	$scope.gotoPage=function(p){
		$scope.pageCourante=p;
		/** quand on click, on appelle a nouveau la function charger() */
		$scope.charger();
	};
	
});
