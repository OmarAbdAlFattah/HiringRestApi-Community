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

module.exports = user;