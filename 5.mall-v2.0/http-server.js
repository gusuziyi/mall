//初始化bodyParser,用于接收req的post值
var bodyParser=require('body-Parser');
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var express=require('express');
var app=new express();

var cookieParser=require('cookie-Parser');
app.use(cookieParser('cat'));
var session = require('express-session');
var  MongoStore  = require("connect-mongo")(session);

app.use(session({
	secret: 'cat',
	resave: true,
	saveUninitialized: true,
	cookie: { maxAge:600000},
	rolling:true,
	store:new MongoStore({
			url: 'mongodb://127.0.0.1:27017/mall',  //数据库的地址
			touchAfter: 24 * 3600  //自动更新
		})
}))
// var doMongo=require('do-mongo');


app.set('view engine','ejs');
app.use(express.static('resource'));//静态路由

app.get('/',function(req,res){
	if(!session.visitNum){
		session.visitNum=1;
		console.log(session.visitNum);
	}else{
		session.visitNum+=1;
		console.log(session.visitNum);
	}
	var username='';
	var longined=false;
	if(req.cookies.username){
		username=req.cookies.username;
		logined=true;
	}
	// console.log('Cookies: ', req.cookies);
	// res.render('mall',{'title':"拼图游戏",'username':username,'logined':longined});
	res.render('cart');
});

// app.post('/login',urlencodedParser,function(req,res){
// 	// console.log(req.body);// post值
// 	if(req.body.username!=null){ //登录按钮
// 		res.cookie('username',req.body.username,{maxAge:60000});
// 		doMongo('find',req.body.username,function(datas){
// 			if(!datas){
// 				console.log("用户不存在");
// 				res.render('jigsaw',{'title':"拼图游戏",'username':"",'logined':false});
// 			}
// 			else{
// 				var n=datas.length;
// 				console.log(datas[0]);
// 				res.render('jigsaw',{'title':"拼图游戏",'username':datas[0].username,'logined':true});
// 			}
// 		});
// 	}else{ // 退出按钮
// 		res.render('jigsaw',{'title':"拼图游戏",'username':"",'logined':false});
// 		return ;
// 	}
// });

// app.get('/register',function(req,res){
// 	res.render('register',{msg:"请选择操作"});
// });
// app.post('/register',urlencodedParser,function(req,res){
// 	if(req.body.add){
// 		doMongo('add',req.body.add,function(err){
// 			res.render('register',{msg:err});
// 		});
// 	}
// 	if(req.body.delete){
// 		doMongo('delete',req.body.delete,function(err){
// 			res.render('register',{msg:err});
// 		});
// 	}
// 	if(req.body.old_update&&req.body.new_update){
// 		doMongo('update',req.body.old_update,req.body.new_update,function(err){
// 			res.render('register',{msg:err});
// 		});
// 	}
	
// });
app.listen(3000,'127.0.0.1');