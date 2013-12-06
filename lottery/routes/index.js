
/*
 * GET home page.
 */

exports.index = function(req, res){
 // res.render('index', { title: 'Express' });
    console.log(req.query.token);
    res.header("Access-Control-Allow-Origin","http://localhost");

    res.end(JSON.stringify({success:true,prizetype:1,sn:12345}));
};

exports.submit = function(req,res){
    console.log(123);
    res.header("Access-Control-Allow-Origin","*");
    res.end(JSON.stringify({success:true}));

};