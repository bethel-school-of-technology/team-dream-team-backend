// function for profile auth
exports.userProfile = async (req, res) => {
    console.log(req.headers);
    let myToken = req.headers.authorization;
    console.log(myToken);
  
    if (myToken) {
      let currentUser = await tokenService.verifyToken(myToken);
      console.log(currentUser);
  
      if (currentUser) {

        //ROUTE LOGIC GOES HERE

      } else {
        res.json({
          message: "Token was invaild or expired",
          status: 403,
        });
      }
    } else {
      res.json({
        message: "No token received",
        status: 403,
      });
    }
  };