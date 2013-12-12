/**
 * Date: 13-12-6
 * Time: 下午4:35
 */
var users = [];
var cards = [['猪仔卡',"card_pig.png"],['狗仔卡',"card_dog.jpg"],['鸡仔卡',"card_chicken.png"],['猴仔卡',"card_monkey.png"],['熊猫卡',"card_panda.png"],['浣熊卡',"card_raccoon.jpg"]]


var lottery = function(req,res){
    console.log(req.query);
    res.header("Access-Control-Allow-Origin","http://localhost");

    //res.end(JSON.stringify({success:true,prizetype:3,sn:12345}));
    res.end(checkAuth(req.query.user));
};


var submit = function(req,res){
    console.log(req.body);
    res.header("Access-Control-Allow-Origin","*");
    res.end(JSON.stringify({success:true}));

};


var guagua = function(req,res){
    console.log(req.query);
    var r = Math.floor(Math.random()*6);

    res.header("Access-Control-Allow-Origin","*");
    res.end(JSON.stringify({"result":"再试一次","tips":"继续努力吧！","cardName":cards[r][0],"cardURL":cards[r][1]}));
}


/**
 * 检测用户的抽奖次数，
 * @param user
 */
function checkAuth(user){

    for(var i in users){

        if(users[i][0] == user){

            if(users[i][2] > 0){//已经中奖
                return JSON.stringify({error:'getsn',prizetype:users[i][2],sn:users[i][3]});
            }else if(users[i][1] > 0){//没有中奖，但还有机会
                var prizetype = Math.ceil(Math.random()*3);
                users[i][1] -- ;
                console.log('===========当前抽奖结果：',prizetype,'剩余抽奖次数',users[i][1])
                if(prizetype > 3){
                    return JSON.stringify({});
                }else{
                    var sn = user+new Date().getTime();
                    users[i][2] = prizetype;
                    users[i][3] = sn;

                    return JSON.stringify({success:true,prizetype:prizetype,sn:sn});
                }

            } else{
                return JSON.stringify({error:'invalid'})
            }

        }

        return JSON.stringify({});
    }
    return JSON.stringify({});
}

/**
 * 保存抽奖记录、中奖记录
 */
function saveRecord(){

}

/**
 * @param  {express.app} app
 */
exports.init = function(app){
   app.get('/lottery',lottery);
   app.post('/submit',submit);

   app.get('/guagua',guagua);

};

exports.addUser = function(user){
    users.push([user,3]);
    console.log('抽奖用户：',user);
};


/*
 订阅号不能直接取到用户的信息，只能通过用户线发消息的形式拿到sp。服务号可以？
 用户回复“抽奖”，server拿到一个sp，根据sp返回响应的抽奖地址(http://../act/lottery?u=sp)
 当用户请求该地址，发起抽奖请求的时候，带上参数sp,server根据sp查询该用户的抽奖权限
 */

