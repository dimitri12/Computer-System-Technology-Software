module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
     /*   var dbConfig = {
            server: "DIMITRI",
            database: "Kurser",
            user: "dimitri12",
            password: "mydatabase",
            port: 1433
    
        };*/
        
        res.render('loginpage.html'); // load the file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/createEvaluations',isLoggedIn, function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('createEvaluations.html', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/evaluationResults',isLoggedIn, function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('evaluationResults.html', {
            user: req.user // get the user out of session and pass to template
        });
    });
    app.get('/evaluation',isLoggedIn, function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('evaluation.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });
    app.get('/createQuestion',isLoggedIn, function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('createQuestion.html', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/createEvaluationLogin',isLoggedIn, function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('createEvaluationLogin.html', {
            user: req.user // get the user out of session and pass to template
        });
    });
    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        if(hash(user.local.username)=="teacher"){
        res.render('evaluate.html', {
            user: req.user // get the user out of session and pass to template
        });
        connection.connect();

    }
    else if(hash(user.local.username)=="student"){
        res.render('evaluate2.html', {
            user: req.user // get the user out of session and pass to template
        });
        connection.connect();
    }
    });
    


    app.get('/kurser', isLoggedIn, function (req, res) {
        res.render('kurser.html', {
            user: req.user // get the user out of session and pass to template
        });
    });
    app.get('/fragor', isLoggedIn, function (req, res) {
        res.render('frågor.html', {
            user: req.user // get the user out of session and pass to template
        });
    });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
        connection.end();

    });
    app.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('loginseq.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash : true
    }));

    app.get('/evlogin', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('evaluationLogin.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/evlogin', passport.authenticate('local-evlogin', {
        successRedirect: '/evaluation',
        failureRedirect: '/evlogin',
        failureFlash : true
    }));
    app.get('/evlogout', function (req, res) {
        req.logout();
        res.redirect('/profile');
    });
	var server = require('/views/server');
	app.post('/skapakurser', function(req,res){
		server.createCourse(req.body);
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
function isLoggedIn2(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/evlogin');
}
function hash(id) {
    var user;
    if (id.length == 8 && isInteger(parseInt(id.charAt(6))) && isInteger(parseInt(id.charAt(7)))) {
        return user = "student";
    }
    else if (id.length == 6) {
        return user="teacher";
    }
    else { return user = "error";}
}