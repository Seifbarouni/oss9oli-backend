const asyncHandler = require("express-async-handler");
const { google } = require("googleapis");
var jwt = require("jsonwebtoken");
var axios = require("axios");

const { createUser } = require("../controllers/userController");
// @desc    Authenticate user using google oauth
// @route   get /auth/google
// @access  Public

const authenticateUserGoogle = asyncHandler(async (req, res) => {
  try {
    const { code } = req.query;
    //code is needed
    if (!code) {
      return res.status(400).json({
        success: false,
        error: "Code is required",
      });
    }
    //initiate google Oauth client
    const googleClient = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI
    );
    //exchange code for access token
    const r = await googleClient.getToken(code);

    googleClient.setCredentials({ access_token: r.tokens.access_token });

    var oauth2 = new google.oauth2({
      auth: googleClient,
      version: "v2",
    });

    //exchange token for user info
    oauth2.userinfo.get(async function (err, response) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        //get user
        let user = await createUser(
          response.data.id,
          response.data.name,
          response.data.picture,
          response.data.email
        );

        //create Json Web Token
        var JWToken = jwt.sign(
          { userId: user._id, name: user.name, picture: user.picture },
          process.env.JWT_SECRET
        );

        //return token
        return res.status(200).json({
          success: true,
          token: JWToken,
        });
      }
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// @desc    Authenticate user using facebook oauth
// @route   GET /auth/facebook
// @access  Public

const authenticateUserFacebook = asyncHandler(async (req, res) => {
  try {
    const { code } = req.query;
    //exchange code to acess token
    let facebookToken = await axios.get(
      `https://graph.facebook.com/v14.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=${process.env.FACEBOOK_REDIRECT_URL}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${code}`
    );
    //exchange token to user info
    let userInfo = await axios.get(
      `https://graph.facebook.com/me?fields=name,picture,email&access_token=${facebookToken.data.access_token}`
    );
    //Get User
    let user = await createUser(
      userInfo.data.id,
      userInfo.data.name,
      userInfo.data.picture.data.url,
      userInfo.data.email
    );

    //create Json Web Token
    var JWToken = jwt.sign(
      { userId: user._id, name: user.name, picture: user.picture },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      success: true,
      token: JWToken,
    });
    
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

module.exports = {
  authenticateUserGoogle,
  authenticateUserFacebook,
};
