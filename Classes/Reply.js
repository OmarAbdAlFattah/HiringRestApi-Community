const mysql = require('mysql');
const moment = require('moment');
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
class reply
{
    static replyToPostUser(userId,PostId,content)
    {
        let timeStamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'); 
        let reply = 
        {
            PostId: PostId,
            userId: userId,
            content: content,
            TimeStamp: timeStamp,
            Votes: 0
        }
        let sql = `INSERT INTO community.reply(POSTID,USERID,CONTENTS,VOTES, TIMESTAMP)
        VALUES('${reply.PostId}','${reply.userId}','${reply.content},'${reply.Votes}','${reply.TimeStamp}')`
        db.query(sql, (err,result)=>
        {
            if(err) throw err;
            console.log(result)
        });
        return reply;
    }
    static replyToPostCompany(companyId,PostId,content)
    {
        let timeStamp = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'); 
        let reply = 
        {
            PostId: PostId,
            companyId: companyId,
            content: content,
            TimeStamp: timeStamp,
            Votes: 0
        }
        let sql = `INSERT INTO community.reply(POSTID,COMPANYID,CONTENTS,VOTES, TIMESTAMP)
        VALUES('${reply.PostId}','${reply.companyId}','${reply.content}','${reply.Votes}','${reply.TimeStamp}')`
        db.query(sql, (err,result)=>
        {
            if(err) throw err;
            console.log(result)
        });
        return reply;
    }

}
module.exports = reply;