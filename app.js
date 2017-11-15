var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require('method-override');
// var nodeMailer = require('nodemailer');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/sweet_stitches");

//===========
// SCHEMA
//===========

var productSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    price: String,
    size: String,
    id: String,
    featured: String
});

var Product = mongoose.model("Product", productSchema);

//===========
// ROUTES
//===========

app.get('/', function(req, res){
    Product.find({featured: 'Yes'}, function(err, featuredProducts){
        if(err){
            console.log('Error displaying featured products: ' + err);
            res.render('home');
        } else {
            res.render('home', {products: featuredProducts});
        }
    });
});

app.get("/shop", function(req, res){
    Product.find({}, function(err, allProducts){
        if(err){
            console.log(err);
        } else {
            res.render("shop", {products: allProducts});
        }
    });
});

app.get("/add", function(req, res){
    res.render("add");
});

app.get("/remove", function(req, res){
   res.render("remove"); 
});

app.get('/update', function(req, res){
    res.render('update');
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/contact', function(req, res){
    res.render('contact');
});

app.get('/shop/:id', function(req, res){
    Product.findById(req.params.id, function(err, foundProduct){
        if(err){
            console.log(err);
        } else {
            res.render('product', {product: foundProduct});
        }
    });
});

app.post("/shop", function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var price = req.body.price;
    var size = req.body.size;
    var id = req.body.id;
    var featured = req.body.featured;
    var newProduct = {name: name, image: image, desc: desc, price: price, size: size, id: id, featured: featured};
    Product.create(newProduct, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect("/shop");
        }
    });
});

app.post('/contact', function(req, res){
    // var transporter = nodeMailer.createTransport(smtpTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: 'coughlinw97@gmail.com',
    //         pass: 'goliath2010'
    //     }
    // }));
    // var mailOptions = {
    //     to: 'coughlinw97@gmail.com',
    //     subject: req.body.subject,
    //     message: req.body.message
    // };
    // transporter.sendMail(mailOptions, (err) => {
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log('message sent');
    //     }
    // });
    // transporter.close();
    // res.redirect('/contact');
});

app.post("/remove", function(req, res){
    Product.findOneAndRemove({id: req.body.id}, function(err){
        if(err){
            console.log(err);
            res.send('Error has occured while removing product: ' + err);
        } else {
            res.redirect('/shop');
        }
    });
});

app.post('/update', function(req, res){
    // var name = req.body.newName;
    // var id = req.body.newId;
    // var image = req.body.newImage;
    // var price = req.body.newPrice;
    // var size = req.body.newSize;
    // var desc = req.body.newDesc;
    // var featured = req.body.newFeatured;
    
    Product.findOneAndUpdate({id: req.body.id}, {
        name: req.body.newName,
        id: req.body.newId,
        image: req.body.newImage,
        price: req.body.newPrice,
        size: req.body.newSize,
        desc: req.body.newDesc,
        featured: req.body.newFeatured
    }, function(err){
        if(err){
            console.log('Error updating item: ' + err);
            res.send('Failed to update item');
        } else {
            res.redirect('/shop');
        }
    });
});

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("SERVER IS LISTENING"); 
});