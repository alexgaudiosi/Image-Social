angular.module('wishingWall')

	.controller('MainCtrl', [
		'$scope',
		'posts',
		'Upload',
		'$timeout',

		function($scope, posts, Upload, $timeout){

			$scope.posts = posts.posts;

			$scope.addPost = function(){
				if (!$scope.title || $scope.title === ''){
					return;
				}
				$scope.posts.push({
					title: $scope.title, 
					link: $scope.link,
					upvotes: 0,
					comments: [
						{author: 'Joe', body: 'Cool post!', upvotes: 0},
					    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
					]

				});
					$scope.title = '';
					$scope.link = '';
			};

			$scope.incrementUpvotes = function(post){
				post.upvotes += 1;
			}

	
			$scope.upload = function (dataUrl) {
		        Upload.upload({
		            url: '/assets/images/',
		            data: {
		                file: Upload.dataUrltoBlob(dataUrl)
		            },
		        }).then(function (response) {
		            $timeout(function () {
		                $scope.result = response.data;
		            });
		        }, function (response) {
		            if (response.status > 0) $scope.errorMsg = response.status 
		                + ': ' + response.data;
		        }, function (evt) {
		            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
		        });
			    }
	}])