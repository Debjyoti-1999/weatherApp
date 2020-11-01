
const express=require('express');
const path=require('path');
const app=express();
const ejsMate=require('ejs-mate');
const methodOverride=require('method-override');
const weatherData=require('../utils/weatherData');


const publicStaticDirPath=path.join(__dirname,'../public');
app.use(express.static(publicStaticDirPath));
const viewsPath=path.join(__dirname,'../templates/views');


app.set('view engine','ejs');
app.set('views',viewsPath);
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);

//-----------------------------------------------------

app.get('/home',function(req,res){
	res.render('home');
})

app.get('/weather',function(req,res){
	res.render('index');
})


app.post("/weather",function(req,res){
	const address=req.body.address;
	weatherData(address,function(error,result){
		if(error){
			 res.send(error);
		}
		else{
         res.render('climate',{climate:result});
	} 
	});
})

app.use(function(req,res){
	res.send("Invalid req");
})
//----------------------------------------------------
const port=process.env.PORT||3000;
app.listen(port,function(){
	console.log("Listening on port:"+port);
})