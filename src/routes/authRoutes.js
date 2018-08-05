const express = require('express');
var User = require('../models/user');

const authRouter = express.Router();

const USER_FOUND = 'The email already exists'

function router() {
  authRouter.route('/signUp')
    .post((req, res) => {
      const { email, name, password } = req.body;

      var resObject = {
        hasError: false,
        message: name + ' (' + email + ')' + ' is saved'
      };

      (async function addUser() {
        try {
          var userData = {
            email,
            name,
            password
          };

          const userFound = await User.findOne({email});
          if(!userFound){
            const results = await User.create(userData);
          }
          else{
            resObject.hasError = true;
            resObject.message = USER_FOUND;
          }
          
          res.json(resObject);

        } catch (err) {
          resObject.hasError = true;
          resObject.message = err._message;
          res.json(resObject);
        }
      }());
    });
  return authRouter;
}


module.exports = router;
