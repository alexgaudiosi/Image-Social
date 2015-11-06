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

			$scope.policy = 'ewogICJleHBpcmF0aW9uIjogIjIwMjAtMDEtMDFUMDA6MDA6MDBaIiwKICAiY29uZGl0aW9ucyI6IFsKICAgIHsiYnVja2V0IjogIm5ld2xvb2std2lzaGluZ3dhbGwifSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJGtleSIsICIiXSwKICAgIHsiYWNsIjogInByaXZhdGUifSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJENvbnRlbnQtVHlwZSIsICIiXSwKICAgIFsic3RhcnRzLXdpdGgiLCAiJGZpbGVuYW1lIiwgIiJdLAogICAgWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsIDAsIDUyNDI4ODAwMF0KICBdCn0';
			$scope.signature = 'tmVW4GgnXhpmJ0YmO7ljYIRxkOQ';
	
			$scope.upload = function (dataUrl) {
		        Upload.upload({
		            url: 'https://newlook-wishingwall.s3.amazonaws.com',
		            method: 'POST',
		            data: {
		                key: 'myfile', // the key to store the file on S3, could be file name or customized
				        AWSAccessKeyId: 'AKIAJLYV54GKLASAVVVA',
				        acl: 'private', // sets the access to the uploaded file in the bucket: private, public-read, ...
				        policy: $scope.policy, // base64-encoded json policy (see article below)
				        signature: $scope.signature, // base64-encoded signature based on policy string (see article below)
				        // "Content-Type": file.type != '' ? file.type : 'application/octet-stream', // content type of the file (NotEmpty)
				        // filename: file.name, // this is needed for Flash polyfill IE8-9
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