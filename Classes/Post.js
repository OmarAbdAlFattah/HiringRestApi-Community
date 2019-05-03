const mysql = require('mysql');
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
const moment = require('moment');
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

module.exports = post;