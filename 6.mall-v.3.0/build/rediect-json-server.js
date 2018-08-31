	module.exports=function() {
		const cors=require('cors');
		const express=require('express')
		let app=express();
		app.use(cors());
	}
	