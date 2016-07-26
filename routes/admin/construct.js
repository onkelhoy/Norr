var sql = require('../helpers/sql');
var filter = require('../helpers/filter');
var admin = require('../admin');

function check(data) {
    return filter.text(data.name) && filter.text(data.category) &&
            filter.link(data.images) && filter.text(data.info) && 
            filter.num(data.rea) && filter.num(data.price) &&
            filter.num(data.stock);
}

function put(req, res, callback) {
    admin.check(req, res, function(sess) {
        var data = req.body.data;
        if(data != undefined) {
            // now call the run function to query 
            callback(check(data) && filter.num(data.id), data);
        } else res.status(204).send('no content');
    });
}
function delet(req, res, callback) {
    admin.check(req, res, function(sess) {

        var id = req.body.id;
        if(id) {
            callback(filter.num(id), {id: id});

        } else res.status(204).send('no id');
    });
}
function get(req, res, callback) {
    admin.check(req, res, function(sess) {
        var order = req.params.order,
            offset = req.params.offset;
        if(order != undefined && offset != undefined) {
            callback(filter.text(order) && filter.num(offset), {offset: offset, order: order});
            
        } else {
            res.status(204).send('no data');
        }
    });
}
function post(req, res, callback) {
    admin.check(req, res, function(sess) {
        var data = req.body.data;
        if(data) {
            callback(check(data) && filter.num(data.id), data);
        } else res.status(204).send('no content');
    });
}

function run(ok, command, res, type){
    if(ok) {
        sql.query(command, function(err, rows) {
            if(err) {
                // console.log(err);
                res.status(404).send('database error');}
            else {
                if(type == 'post') res.status(201).send('created');
                if(type == 'put') res.status(201).send('updated');
                if(type == 'delete') res.status(201).send('deleted');
                if(type == 'get') res.status(200).json(rows);
            }
        });
    } else res.status(404).send('invalid charactures');
}

exports.RUN = function(ok, command, res, type) {
    run(ok, command, res, type);
}
exports.GET = function(req, res, callback){
    get(req, res, callback);
}
exports.PUT = function(req, res, callback){
    put(req, res, callback);
}
exports.POST = function(req, res, callback){
    post(req, res, callback);
}
exports.DELETE = function(req, res, callback){
    delet(req, res, callback);
}