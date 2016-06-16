
// shopping.js

//db설정 데이터 가지고오기
var db = require('../models/db');
require('../models/itemmodel');
require('../models/moviemodel');
require('../models/purchasemodel');
require('../models/usermodel');
require('../models/reviewmodel');
var ItemModel = db.model('Item');
var MovieModel = db.model('Movie');
var PurchaseModel = db.model('Purchase');
var UserModel = db.model('User');
var ReviewModel = db.model('Review');

//서버 설정
var server = "http://localhost:3000";

var express = require('express');
var router = express.Router();

var server = "http://localhost:3000";

//async 설정
var async = require('async');

router.post('/shopping/create', function(req,res,next){
    console.log('/admin/shopping/create ok');
    console.log(req.body);

    var item_name = req.body.item_name;
    var item_brand = req.body.item_brand;
    var item_image_url = req.body.item_image_url;  //이미지
    var item_intro = req.body.item_intro;  //이미지
    var item_price = req.body.item_price;
    var item_category = req.body.item_category;
    var item_critical_information = req.body.item_critical_information;  //이미지
    var item_main_name = req.body.item_main_name;
    var option_name = req.body.option_name;
    var option_price = req.body.option_price;
    // "item_like_num"  //default:0
    // "item_hit"  //default:0
    // var movie_id -> Movie Database에서
    // var item_like_user -> User Database에서

    var createItem = new ItemModel({
        //item_id
        "item_name":item_name,
        "item_brand":item_brand,
        "item_image_url":item_image_url,
        "item_intro":item_intro,
        "item_price":item_price,
        "item_category":item_category,
        "item_critical_information":item_critical_information,
        "item_main_name":item_main_name,
        "item_option":
        [
            {
                "option_name":option_name,
                "option_price":option_price
            }

        ],
        "item_registration_date":Date.now();
    });

    createItem.save(function(err,result){
        if(err){
            callback(err);
        } else {
            callback(null,result);
        }
    })

});





module.exports = router;