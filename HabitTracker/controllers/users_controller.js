const User = require('../models/user');

// Redirects the user to sign up page.
module.exports.signUp = async function(req, res) {
    try {
        return res.render('user_sign_up', {
            title: "Sign Up"
        });
    } catch (error) {
        console.log('Error in usersController/signUp: ', error);
        return res.redirect('back');
    }
}

// Redirects the user to sign in page.
module.exports.signIn = async function(req, res) {
    try {
        return res.render('user_sign_in', {
            title: "Sign In"
        });
    } catch (error) {
        console.log('Error in usersController/signIn: ', error);
        return res.redirect('back');
    }
}

// Creates a new user.
module.exports.create = async function(req, res) {
    try {
       
        if(req.body.password != req.body.confirm_password) {
           
            console.log('Password mismatch!');
            req.flash('error', 'Password mismatch');
            return res.redirect('back');
        }
        let user = await User.findOne({ email: req.body.email });
        // If user is not present. 
        if (!user) {
            // create the user 
            await User.create(req.body);
            // Redirect to sign in page.
            return res.redirect("/users/sign-in");
        }
        console.log('User is already present');
        return res.redirect('back');
        
    } catch (error) {
        console.log('Error in creating the user ', error);
        return res.redirect('back');
    }
}

// Signs in existing user.
module.exports.createSession = async function(req, res) {
    req.flash('success', 'You are logged in!');
    return res.redirect('/');
}

// Signs out the user.
module.exports.destroySession = async function(req, res, done) {
    req.logout((err) => {
        if (err) {
            return done(err);
        }
    });
    req.flash('success' , 'You are logged out!');
    return res.redirect('/users/sign-in');
}

// Redirects the user to foget password page.
module.exports.forgetPassword = async function(req, res) {
    try {
        return res.render('forget_password', {
            title: "Reset Password"
        });
    } catch (error) {
        console.log('Error in usersController/forgetPassword: ', error);
        return res.redirect('back');
    }
}

// Reset password.
module.exports.resetPassword = async function(req, res) {
    try {
        let user = await User.findOne({email : req.body.email});

        if(!user) {
            return res.render('/users/sign-up')
        }
        if(req.body.password==req.body.confirm_password) {
            user.password = req.body.password;
            await user.updateOne({password : req.body.password});
            req.flash('success', 'Password changed successfully');
            return res.redirect('/users/sign-in');
        }
    } catch (error) {
        console.log('Error in habitController/resetPassword: ', error);
        return;
    }
}