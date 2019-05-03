const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mysql = require('mysql');
const moment = require('moment');
const Port = process.env.Port || 5500;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'community'
})
db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("MySql Connected...");
})
const app = express();
app.listen(Port,()=>console.log(`listening on port ${Port}...`));

class user
{
    static showPosts(userId,callback)
    {
        let sql = `SELECT * FROM community.post WHERE post.USERID IN 
        (SELECT distinct FOLLOWED_USERID
        FROM community.followuser,community.followcompany,community.normaluser
        WHERE community.followuser.FOLLOW_USERID = '${userId}' and community.followcompany.USERID='${userId}')
        
        union
        
        SELECT * FROM community.post WHERE post.COMPANYID IN
        (SELECT distinct companyID
        FROM community.followuser,community.followcompany,community.normaluser
        WHERE community.followuser.FOLLOW_USERID = '${userId}' and community.followcompany.USERID='${userId}')`;

        db.query(sql,function(err,result){
            if (err) callback(err,null);
            else callback(null,result); 
        });
    }

   
        
    
    
}
class post
{
    static addPostUser(userId, content)
    {
        let timeStamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        let Post = {
            userId: userId,
            content: content,
            TimeStamp: timeStamp,
            Votes: 0
        }
        let sql = `INSERT INTO Post (userID, Contents,TimeStamp,Votes)
                   VALUES(${Post.userId},'${Post.content}','${Post.TimeStamp}',${Post.Votes})`
        db.query(sql, (err,result)=>
        {
            if(err) throw err;
            console.log(result)
        });
        return Post;
    }
    static addPostCompany(companyId,content)
    {
        let timeStamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'); 
        let Post = {
            companyId: companyId,
            content: content,
            TimeStamp: timeStamp,
            Votes: 0
        }
        let sql = `INSERT INTO Post (CompanyID, Contents,TimeStamp,Votes)
                   VALUES(${Post.companyId},'${Post.content}','${Post.TimeStamp}',${Post.Votes})`
        db.query(sql, (err,result)=>
        {
            if(err) throw err;
            console.log(result)
        });
        return Post;
    }
    
}

class Follow 
{
    static followUser(followerUserID, followedUserID)
    {
        let sql = `INSERT INTO FollowUser(follow_userID, followed_userID) VALUES (${followerUserID}, ${followedUserID})`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
        });
    }

    static followCompany(followerUserID, followedCompanyID)
    {
        let sql = `INSERT INTO FollowCompany(userID, CompanyID) VALUES (${followerUserID}, ${followedCompanyID})`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
        });
    }

    static unfollowCompany(followerUserID, followedCompanyID)
    {
        let sql = `DELETE FROM FollowCompany WHERE CompanyID = ${followedCompanyID} and userID = ${followerUserID}`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
        });
    }

    static unfollowUser(followerUserID, followedUserID)
    {
        let sql = `DELETE FROM FollowUser WHERE follow_userID = ${followerUserID} and followed_userID = ${followedUserID}`;
        db.query(sql, (err, result) => {
            if(err) throw err;
            console.log(result);
        });
    }

}

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



