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
class company
{
    static getAllCompanies(callback)
    {
        let sql = `SELECT * FROM community.company;`;

        db.query(sql,function(err,result){
            if (err) callback(err,null);
            else callback(null,result); 
        });
    }
    static getCompany(companyId,callback)
    {
        let sql = `SELECT * FROM community.company WHERE community.company.COMPANYID = '${companyId}' ;`;

        db.query(sql,function(err,result){
            if (err) callback(err,null);
            else callback(null,result); 
        });
    }
}
module.exports = company;