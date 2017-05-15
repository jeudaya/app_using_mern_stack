var mysql = require('mysql');
var MD5 = require("crypto-js/md5");
exports.userCRUD = userCRUD;

function userCRUD(app, router, con) {

    router.get('/getusers', function(req, res) {
        userModel.find({ isAdmin: { $ne: true } }, { password: 0 }).sort({ addedDate: -1 }).exec(function(err, data) {
            res.json({ success: true, data: data })
        });
    })

    router.get('/getusers/:id', function(req, res) {
        userModel.findById(req.params.id, { password: 0 }, function(err, data) {
            if (err) {
                res.json({ success: false, msg: "No user with this id" })
            } else {
                res.json({ success: true, data: data })
            }

        })
    })

    router.put('/updateuser/:id', function(req, res) {
        var user = {};
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.firstname) {
            user.firstname = req.body.firstname
        }
        if (req.body.lastname) {
            user.lastname = req.body.lastname
        }
        userModel.findOneAndUpdate({ '_id': mongoose.Types.ObjectId(req.params.id) }, { $set: user }, function(err, data) {
            if (err) {
                res.json({ success: false, msg: "No user with this id" })
            } else {
                res.json({ success: true, data: data, msg: "User Updated Succesfully" })
            }
        })
    })


    router.post('/loginuser', function(req, res) {
    	 var user = {};
        if (req.body.username) {
            user.username = req.body.username;
        }
        if (req.body.password) {
            user.password = MD5(req.body.password);
        }
        
       
        var query = ("SELECT *  from users WHERE username='"+user.username+"' AND password='"+user.password+"'");
                con.query("SELECT *  from users WHERE username='"+user.username+"' AND password='"+user.password+"'" , function(err, rows, fields) {
            if (err) {
                res.json({ success: false, msg: "Error in Log in " })
            } else {
            	console.log(JSON.stringify(rows))
            	console.log(JSON.stringify(fields))
                if (rows) {
                    res.json({ success: true, data: rows, msg: "User Logged in Succesfully" })
                } else {
                    res.json({ success: false, msg: "Error in Log in " })
                }

            }
        })


    })

    router.delete('/removeuser/:id', function(req, res) {
        userModel.remove({ '_id': mongoose.Types.ObjectId(req.params.id) }, function(err, data) {
            if (err) {
                res.json({ success: false, msg: "No user with this id" })
            } else {
                res.json({ success: true, data: data, msg: "User Deleted Succesfully" })
            }

        })
    })

    router.post('/adduser', function(req, res) {
        var user = new userModel();
        user.password = req.body.password;
        user.email = req.body.email;
        user.lastname = req.body.lastname;
        user.firstname = req.body.firstname;
        user.addedDate = new Date();
        user.save(function(err, data) {
            if (err) {
                res.json({ success: false, msg: "Error in User Creation", data: err })
            } else {
               /* if (req.body.sendPassword) {
                    var mailOptions = {
                        from: From,
                        to: data.email,
                        subject: 'Project Tracking Management - Please Check Your Password',
                        html: '<p>User Name: <b>' + data.email + '</b> <hr/> Password:+'
                        data.password + ' <b></b> <hr/></p>'
                    }
                    transporter.sendMail(mailOptions, function(error, response) {
                        if (error) {
                            console.log("error" + JSON.stringify(error))
                            console.log("mail Not send Some Error Occursc" + JSON.stringify(error));
                        } else {
                            console.log('Mail Send Successfully');
                        }
                    });
                }*/
                res.json({ success: true, data: data, msg: "User Created Succesfully" })
            }
        })


    })


}