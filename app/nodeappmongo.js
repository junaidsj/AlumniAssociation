var express = require("express");
var app = express();
var port = 5000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Namenode
const dbName = 'alumniDbsBackup';

str = "string";

var billNum = 1001;

app.route('/').get(function (req, res) {

    res.render('login',{username:""});
});


app.route('/admin').get(function (req, res) {

    res.render('adminlogin', { username: "" });
});

app.route('/candidate').post(function (req, res) {

    res.render('candidate');
});


app.route('/corpEvent').post(function (req, res) {

    res.render('corpEvent');
});


app.route('/prodEvent').post(function (req, res) {

    res.render('prodEvent');
});

app.route('/contactus').post(function (req, res) {

    res.render('contact_us');
});

app.route('/homepageredirection').post(function(req,res) {

    res.render('homepageredirection');
});

app.route('/orders').post(function (req, res) {

    res.render('orders');
});


app.route('/corpEventView').post(function (req, res) {

    res.render('corpEventView');
});

app.route('/corpEventView').get(function (req, res) {

    res.render('corpEventView');
});


app.route('/prodEventView').get(function (req, res) {

    res.render('prodEventView');
});

app.route('/prodEventView').post(function (req, res) {

    res.render('prodEventView');
});

app.route('/requestStall').post(function (req, res) {

    res.render('reqStall');
});

app.route('/requestStallView').get(function (req, res) {

    res.render('reqStallView');
});

app.route('/requestStallView').post(function (req, res) {

    res.render('reqStallView');
});



app.route('/adminhome2').post(function (req, res) {

    res.render('adminhome');
});

app.route('/userhome2').post(function (req, res) {

    res.render('userhome');
});


app.route('/payment').post(function (req, res) {
    res.render('payment', { products: req.body.products });
});


app.route('/register').post(function (req, res) {

    res.render('register');
});

app.post('/addcandidate', function (req, res) {
    //var prodD = req.body.prods;
    var prodArr = [];
    console.log(req.body);
    //prodArr = JSON.parse(req.body);
    prodArr = req.body;
    console.log("prodArr array from addemployee http post");
    console.log(prodArr);
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('candidate');

        col.insert(prodArr, { w: 1 }, function (err, result) {

            //col.insert({ pCost: 100, hosName: 'Something' }, { w: 1 }, function (err, result) {
            if (err) {
                console.log('error occured');
                res.json("error occured");
            }
            else {
                db.close;
                res.json("Data Submitted Successfully");
            }
        });
    });
});

app.post('/getcandidate', function (req, res) {
    var prodArr = [];
    prodArr = req.body;
    console.log("prodArr array from getProduct http post");
    console.log(prodArr);
    console.log(prodArr[0].eid);

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('candidate');
        db.collection('candidate').findOne({ eid: prodArr[0].eid }, { projection: { _id: 0 } }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid product code');
            }
            else {
                db.close;
                console.log("result");
                console.log(result);
                var r = [];
                r.push(result);

                console.log(r);
                //                console.log(Array.isArray(r));
                s = JSON.stringify(r);

                console.log(s);
                res.json(s);

            }
        });

    });
});



app.post('/updatecandidate', function (req, res) {
    //var prodD = req.body.prods;
    var prodArr = [];
    console.log(req.body);
    //prodArr = JSON.parse(req.body);
    prodArr = req.body;
    prodString = prodArr[0];
    console.log("prodArr array from updateemployee http post");
    console.log(prodString);
    console.log(prodArr[0].eid);
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('candidate');

        col.update({ eid: prodArr[0].eid }, prodString, function (err, result) {
            //col.insert({ pCost: 100, hosName: 'Something' }, { w: 1 }, function (err, result) {
            if (err) {
                console.log(err);
                res.json("error occured");
            }
            else {
                db.close;
                res.json("Employee Data Updated Successfully");
            }
        });

    });
});






app.post('/deletecandidate', function (req, res) {
    var prodArr = [];
    prodArr = req.body;
    console.log("prodArr array from deleteemployee http post");
    console.log(prodArr);
    console.log(prodArr[0].eid);

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('candidate');
        db.collection('candidate').deleteOne({ eid: prodArr[0].eid }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid Employee ID');
            }
            else {
                db.close;
                console.log(result);
                res.json("candidate deleted successfully");
            }
        });

    });
});



app.post('/addcorpEventDetails', function (req, res) {
    //var prodD = req.body.prods;
    var prodArr = [];
    console.log(req.body);
    //prodArr = JSON.parse(req.body);
    prodArr = req.body;
    console.log(prodArr);
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('corpEvent');

        col.insert(prodArr, { w: 1 }, function (err, result) {

            //col.insert({ pCost: 100, pName: 'Something' }, { w: 1 }, function (err, result) {
            if (err) {
                console.log('error occured');
                res.json("error occured");
            }
            else {
                db.close;
                res.json("Data Submitted Successfully");
            }
        });
    });
});

app.post('/addprodEventDetails', function (req, res) {
    //var prodD = req.body.prods;
    var prodArr = [];
    console.log(req.body);
    //prodArr = JSON.parse(req.body);
    prodArr = req.body;
    console.log(prodArr);
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('prodEvent');

        col.insert(prodArr, { w: 1 }, function (err, result) {

            //col.insert({ pCost: 100, pName: 'Something' }, { w: 1 }, function (err, result) {
            if (err) {
                console.log('error occured');
                res.json("error occured");
            }
            else {
                db.close;
                res.json("Data Submitted Successfully");
            }
        });
    });
});

app.post('/addreqEventDetails', function (req, res) {
    //var prodD = req.body.prods;
    var prodArr = [];
    console.log(req.body);
    //prodArr = JSON.parse(req.body);
    prodArr = req.body;
    console.log(prodArr);
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('reqEvent');

        col.insert(prodArr, { w: 1 }, function (err, result) {

            //col.insert({ pCost: 100, pName: 'Something' }, { w: 1 }, function (err, result) {
            if (err) {
                console.log('error occured');
                res.json("error occured");
            }
            else {
                db.close;
                res.json("Data Submitted Successfully");
            }
        });
    });
});



app.post('/getEvent', function (req, res) {
    var prodArr = [];
    prodArr = req.body;
    var n = prodArr[0].etype;
//    var bno = parseInt(prodArr[0].billNo, 10);
    var eventtype = prodArr[0].etype;



    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('corpEvent');
        db.collection('corpEvent').find({ etype: eventtype }, { projection: { _id: 0 } }).toArray(function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid product code');
            }
            else {
                db.close;
                console.log("result");
                console.log(result);

                // var r = [];
                // r.push(result);

                //console.log(r);
                //console.log(Array.isArray(r));
                s = JSON.stringify(result);

                console.log(s);

                res.json(s);

            }
        });

    });
});

app.post('/getreqStall', function (req, res) {
    var prodArr = [];
    prodArr = req.body;
    var n = prodArr[0].etype;
    //    var bno = parseInt(prodArr[0].billNo, 10);
    var eventcode = prodArr[0].ecode;
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('reqEvent');
        db.collection('reqEvent').find({ ecode: eventcode }, { projection: { _id: 0 } }).toArray(function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid product code');
            }
            else {
                db.close;
                console.log("result");
                console.log(result);

                // var r = [];
                // r.push(result);

                //console.log(r);
                //console.log(Array.isArray(r));
                s = JSON.stringify(result);

                console.log(s);

                res.json(s);

            }
        });

    });
});

app.post('/getprodEvent', function (req, res) {
    var prodArr = [];
    prodArr = req.body;
    var n = prodArr[0].etype;
    //    var bno = parseInt(prodArr[0].billNo, 10);
    var eventtype = prodArr[0].etype;



    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('prodEvent');
        db.collection('prodEvent').find({ etype: eventtype }, { projection: { _id: 0 } }).toArray(function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid product code');
            }
            else {
                db.close;
                console.log("result");
                console.log(result);

                // var r = [];
                // r.push(result);

                //console.log(r);
                //console.log(Array.isArray(r));
                s = JSON.stringify(result);

                console.log(s);

                res.json(s);

            }
        });

    });
});


app.post('/getcorpEventDetails', function (req, res) {
    var prodArr = [];
    prodArr = req.body;
    console.log("prodArr array from getProduct http post");
    console.log(prodArr);
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('corpEvent');
        db.collection('corpEvent').findOne({ ecode: prodArr[0].ecode }, { projection: { _id: 0 } }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid register number');
            }
            else {
                db.close;
                console.log("result");
                console.log(result);
                var r = [];
                r.push(result);

                console.log(r);
                //                console.log(Array.isArray(r));
                s = JSON.stringify(r);

                console.log(s);
                res.json(s);
            }
        });
    });
});

app.post('/getprodEventDetails', function (req, res) {
    var prodArr = [];
    prodArr = req.body;
    console.log("prodArr array from getProduct http post");
    console.log(prodArr);
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('prodEvent');
        db.collection('prodEvent').findOne({ ecode: prodArr[0].ecode }, { projection: { _id: 0 } }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid register number');
            }
            else {
                db.close;
                console.log("result");
                console.log(result);
                var r = [];
                r.push(result);

                console.log(r);
                //                console.log(Array.isArray(r));
                s = JSON.stringify(r);

                console.log(s);
                res.json(s);
            }
        });
    });
});




app.post('/updatecorpEventDetails', function (req, res) {
    //var prodD = req.body.prods;
    var prodArr = [];
    console.log(req.body);
    //prodArr = JSON.parse(req.body);
    prodArr = req.body;
    prodString = prodArr[0];
    console.log("prodArr array from updateService http post");
    console.log(prodString);
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('corpEvent');

        col.update({ ecode: prodArr[0].ecode }, prodString, function (err, result) {
            if (err) {
                console.log(err);
                res.json("error occured");
            }
            else {
                db.close;
                res.json("Data Updated Successfully");
            }
        });

    });

});


app.post('/updateprodEventDetails', function (req, res) {
    //var prodD = req.body.prods;
    var prodArr = [];
    console.log(req.body);
    //prodArr = JSON.parse(req.body);
    prodArr = req.body;
    prodString = prodArr[0];
    console.log("prodArr array from updateService http post");
    console.log(prodString);
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('prodEvent');

        col.update({ ecode: prodArr[0].ecode }, prodString, function (err, result) {
            if (err) {
                console.log(err);
                res.json("error occured");
            }
            else {
                db.close;
                res.json("Data Updated Successfully");
            }
        });

    });
});



app.post('/deletecorpEventDetails', function (req, res) {
    var prodArr = [];
    prodArr = req.body;
    console.log("prodArr array from deleteProduct http post");
    console.log(prodArr);

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('corpEvent');
        db.collection('corpEvent').deleteOne({ ecode: prodArr[0].ecode }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid product code');
            }
            else {
                db.close;
                console.log(result);
                res.json("product deleted successfully");
            }
        });

    });
});



app.post('/deleteprodEventDetails', function (req, res) {
    var prodArr = [];
    prodArr = req.body;
    console.log("prodArr array from deleteProduct http post");
    console.log(prodArr);

    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);
        var col = db.collection('prodEvent');
        db.collection('prodEvent').deleteOne({ ecode: prodArr[0].ecode }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.json('Invalid product code');
            }
            else {
                db.close;
                console.log(result);
                res.json("product deleted successfully");
            }
        });

    });
});




app.route('/registered').post(function (req, res) {
    MongoClient.connect(url, function (err, client) {

        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        db.collection('login').insert({
            fname: req.body.fname, sname: req.body.sname, email: req.body.email,
            userPassword: req.body.userPassword, dob: req.body.dob, gender: req.body.gender, phone: req.body.phone, address: req.body.address, city: req.body.city, landmark: req.body.landmark 
        }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.send("Registration Error");
            }
            else {
                db.close;
                res.render('login', { username: "" });
            }
        });
    });
    //    res.send(req.body);
});

app.route('/adminregister').post(function (req, res) {

    res.render('adminregister');
});

app.route('/adminregistered').post(function (req, res) {
    MongoClient.connect(url, function (err, client) {

        assert.equal(null, err);
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        db.collection('adminlogin').insert({
            fname: req.body.fname, sname: req.body.sname, email: req.body.email,
            userPassword: req.body.userPassword, dob: req.body.dob, gender: req.body.gender, phone: req.body.phone
        }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.send("Registration Error");
            }
            else {
                db.close;
                res.render('adminlogin', { username: "" });
            }
        });
    });
    //    res.send(req.body);
});




app.route('/adminhome').post(function (req, res) {

    MongoClient.connect(url, function (err, client) {

        assert.equal(null, err);
        console.log("Connected successfully to server");
        //console.log(req.body.userid);
        //console.log(req.body.username);
        //uid=req.body.userid;
        const db = client.db(dbName);
        db.collection('adminlogin').findOne({ email: req.body.email, userPassword: req.body.userPassword }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.send("Invalid Login");
            }
            else {
                db.close;
                res.render('adminhome');
            }
        });
    });
});

app.route('/userhome').post(function (req, res) {

    MongoClient.connect(url, function (err, client) {

        assert.equal(null, err);
        console.log("Connected successfully to server");
        //console.log(req.body.userid);
        //console.log(req.body.username);
        //uid=req.body.userid;
        const db = client.db(dbName);
        db.collection('login').findOne({ email: req.body.email, userPassword: req.body.userPassword }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.send("Invalid Login");
            }
            else {
                db.close;
                res.render('userhome');
            }
        });
    });
});




app.route('/apparels').post(function (req, res) {

    MongoClient.connect(url, function (err, client) {

        assert.equal(null, err);
        console.log("Connected successfully to server");
        //console.log(req.body.userid);
        //console.log(req.body.username);
        //uid=req.body.userid;
        const db = client.db(dbName);
        db.collection('login').findOne({ email: req.body.email, userPassword: req.body.userPassword }, function (err, result) {
            if (err) throw err;

            if (!result) {
                db.close;
                res.send("Invalid Login");
            }
            else {
                db.close;
                res.render('apparelsCat');
            }
        });
    });
});







app.route('/homepage').post(function (req, res) {
    res.render('apparelsCat');
});


var exp = app.listen(port, function () {
    console.log('5000 is the magic port');
});

//exp.close;
