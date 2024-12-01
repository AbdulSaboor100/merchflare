const User = require("../modals/User");

const userController = async (req, res, next) => {
  try {
    const user = await User.findById(req?.user?.id)?.select("-password");

    if (user?.id) {
      return next();
    }
    res?.status(401)?.send("Unauthorized");
  } catch (error) {
    res?.status(401)?.send("Unauthorized");
  }
};

module.exports = userController;
