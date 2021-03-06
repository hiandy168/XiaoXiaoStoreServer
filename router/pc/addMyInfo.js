'user static'
var express = require('express');
var router = express.Router();
var sql = require("../../db/mysqlConnect");

router.get('/', function (req, res) {

        let UserNo = req.query.UserNo;
        let UserName = req.query.Name;
        let QQ = req.query.QQ;
        let Wechat = req.query.Wechat;
        let QrCode = req.query.QrCode;

        //链接数据库，执行存储过程
        let proc = "CALL PROC_PC_ADD_MY_INFO(?,?,?,?,?)";//存储过程名称
        let params = [UserNo, UserName, QQ, Wechat, QrCode];//存储过程参数
        sql.query(proc, params, function (rows, fields) {
                console.log(rows);
                let responseData = {};
                responseData.Code = rows[0][0]["Code"];
                responseData.Message = rows[0][0]["Message"];
                res.json(
                        responseData
                )
        });

});

module.exports = router;