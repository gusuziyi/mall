var http=require('http');
var fs=require('fs');
var url=require('url');
var netEx=require('netEx');
http.createServer(function(req,res){

	var target_get=url.parse(req.url, true).query;//取得get传值
		if(req.url=='/')
			var target_url='./jigsaw.html';
		else 
			var target_url= './'+url.parse(req.url).pathname;
	    // console.log(url.parse(req.url)); //url解析对象
	fs.readFile(target_url, function(err,url_data){
		if(err){
			console.log(err);
			return false;
		}

		netEx.getType(target_url,function(data){
			var content_type=data;
			//表现网页
			res.writeHead(200,{'content-type':content_type}); 
			res.write(url_data);
			res.end();
		});
	});
	

}).listen(8888);