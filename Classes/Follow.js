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
module.exports = Follow;