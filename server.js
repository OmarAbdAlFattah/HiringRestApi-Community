const express = require('express');
const user = require('./Classes/User');
const post = require('./Classes/post');
const Follow = require('./Classes/Follow');
const company = require('./Classes/Company');
const Port = process.env.Port || 5500;


const app = express();
app.listen(Port,()=>console.log(`listening on port ${Port}...`));




app.post('/followUser/:fID&:fdID', (req, res) => {
    res.send(Follow.followUser(req.params.fID, req.params.fdID));
});

app.post('/followCompany/:fID&:fdID', (req, res) => {
    res.send(Follow.followCompany(req.params.fID, req.params.fdID));
});

app.post('/unfollowCompany/:fID&:fdID', (req, res) => {
    res.send(Follow.unfollowCompany(req.params.fID, req.params.fdID));
});

app.post('/unfollowUser/:fID&:fdID', (req, res) => {
    res.send(Follow.unfollowUser(req.params.fID, req.params.fdID));
});

app.post('/addPostUser/:userId',(req,res)=>{
    res.send(post.addPostUser(req.params.userId,"noice"));
});
app.post('/addPostCompany/:companyId',(req,res)=>{
    res.send(post.addPostCompany(req.params.companyId,"wanna a scholarship"));
});
app.get('/getAllCompanies',(req,res)=>
{
    company.getAllCompanies(function(err,data)
    {
        if(err) console.log(err);
        else res.end(JSON.stringify(data));
    });
});
app.get('/getCompany/:companyId',(req,res)=>
{
    company.getCompany(req.params.companyId , function(err,data)
    {
        if(err) console.log(err);
        else res.end(JSON.stringify(data));
    });
});
app.get('/getposts/:userId',(req,res)=>{
     
    user.showPosts(req.params.userId,function(err,data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);             
        } else {            
            res.end(JSON.stringify(data));   
        }    
    });
});

app.get('/',(req, res) =>{
    res.json({"message": "Welcome to Community."});
})



