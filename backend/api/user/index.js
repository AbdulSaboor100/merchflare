const express = require("express");
const User = require("../../modals/User");
const userController = require("../../middleware/authControllers");
const passport = require("passport");
const router = express();

router.get("/", [passport.authenticate("jwt")], async (req, res) => {
  try {
    const user = await User.findById(req?.user?.id).select("-password");
    if (!user) {
      return res.status(400).json({ errors: [{ message: "User not found" }] });
    }
    if (!user?.is_verified) {
      return res.status(400).json({
        errors: [
          {
            message:
              "Account is not verified. Please confirm your email address by clicking the verification link sent to your email.",
          },
        ],
      });
    }

    res
      .status(200)
      .json({
        data: user,
        message: "User fetched successfully",
        success: true,
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
