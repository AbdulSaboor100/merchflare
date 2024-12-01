const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../../modals/User");
const { check, validationResult } = require("express-validator");
const {
  encryptPassword,
  comparePassword,
  generateUniqueNumber,
} = require("../../utils/helper");
const Verify = require("../../modals/Verify");
const {
  getVerifyEmailHtmlTemplate,
  getVerifyEmailTextTemplate,
} = require("../../emailTemplates/verifyEmail");
const sendMail = require("../../utils/mail");
const router = express();
const jwtSecret = process.env.JWT_SECRET || "";
const CLIENT_URL = process.env.CLIENT_URL || `http://`;

// User routes
router.post(
  "/user/signup",
  [
    check("email", "Email not found or is invalid").isEmail(),
    check("name", "Name is required").exists(),
    check(
      "password",
      "Password is required and must have 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const result = errors.formatWith((error) => {
      return { message: error.msg, error: true };
    });

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { email, name, password } = req.body;
    try {
      const isUserAlready = await User.findOne({ email });
      if (isUserAlready) {
        return res.status(400).json({
          errors: [
            {
              message: "User already exists",
            },
          ],
        });
      }
      let userDetails = {
        is_verified: false,
        password: await encryptPassword(password),
        name,
        email,
      };
      const user = new User(userDetails);
      const response = await user.save();

      res.status(200).json({
        message: "User created successfully",
        success: true,
        email: user?.email,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/user/signin",
  [
    check(
      "email",
      "No registered account found against this email address"
    ).isEmail(),
    check(
      "password",
      "Password is required and must have 6 or more characters"
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const result = errors.formatWith((error) => {
      return { message: error.msg, error: true };
    });

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ message: "Invalid Credientials" }] });
      }
      const isPasswordMatched = await comparePassword(password, user?.password);
      if (!isPasswordMatched) {
        return res
          .status(400)
          .json({ errors: [{ message: "Invalid Credentials" }] });
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
      const payload = {
        user: {
          id: user?._id,
        },
      };
      jwt.sign(payload, jwtSecret, {}, (err, token) => {
        if (err) {
          throw err;
        } else {
          res
            .status(200)
            .json({ token, message: "User logged in successfully" });
        }
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/user/verify",
  [check("email", "Email is required or is invalid").isEmail()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email } = req.body;

    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ message: "User not found to verify" }] });
    }

    if (user?.is_verified) {
      return res
        .status(400)
        .json({ errors: [{ message: "User already verified" }] });
    }

    const verify = await Verify.findOne({ email });
    if (verify) {
      return res
        .status(400)
        .json({ errors: [{ message: "Verification email already sent" }] });
    }

    let code = generateUniqueNumber(22, true);

    const result = await sendMail(
      email,
      "Please verify your email",
      getVerifyEmailTextTemplate(CLIENT_URL, code),
      getVerifyEmailHtmlTemplate(CLIENT_URL, code)
    );
    if (!result?.success) {
      return res.status(400).json({ errors: result?.error?.response?.body });
    }

    const verifyDetailsToSave = {
      email,
      code,
    };
    const codeSaved = new Verify(verifyDetailsToSave);
    await codeSaved.save();

    res.status(200).json({
      message: "Verification email sent successfully",
      success: true,
    });

    try {
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  }
);

// router.post('/user/code', [check('code', 'Code is required').exists()], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const { code } = req.body;
//   try {
//     if (!code) {
//       return res.status(400).json({ errors: [{ message: 'Code not found' }] });
//     }
//     const verify = await Verify.findOne({ code });
//     if (!verify) {
//       return res.status(400).json({ errors: [{ message: 'Link expired' }] });
//     }
//     if (verify?.code !== code) {
//       return res.status(400).json({ errors: [{ message: 'Link expired' }] });
//     }

//     const user = await User.findOne({
//       'profile.email': verify?.email,
//     }).select('-password');

//     if (!user) {
//       return res.status(400).json({ errors: [{ message: 'User not found to verify' }] });
//     }
//     await User.findOneAndUpdate({ 'profile.email': verify?.email }, { active: true });
//     await Verify.findOneAndDelete({ code });

//     const payload = {
//       user: {
//         id: user?._id,
//       },
//     };
//     jwt.sign(payload, jwtSecret, {}, (err, token) => {
//       if (err) {
//         throw err;
//       } else {
//         res.status(200).json({
//           token,
//           message: 'User verified successfully',
//           success: true,
//         });
//       }
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send('Server error');
//   }
// });

// router.post('/user/forget-password-request', [check('email', 'Email is required')], async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   const { email } = req.body;
//   try {
//     if (!email) {
//       return res.status(400).json({ errors: [{ message: 'Email not found' }] });
//     }

//     const user = await User.findOne({ 'profile.email': email }).select('-password');

//     if (!user) {
//       return res.status(400).json({
//         errors: [{ message: 'No account found against this email address' }],
//       });
//     }

//     if (!user?.active) {
//       return res.status(400).json({ errors: [{ message: 'Account is not verified. Please confirm your email address by clicking the verification link sent to your email.' }] });
//     }

//     if (user?.is_google) {
//       return res.status(400).json({
//         errors: [{ message: 'This email was used as Google login. You cannot reset password.' }],
//       });
//     }

//     const verify = await Verify.findOne({ email });
//     if (verify) {
//       return res.status(400).json({
//         errors: [{ message: 'Password reset request was already sent' }],
//       });
//     }

//     let code = generateUniqueNumber(22, true);

//     const result = await sendMail(
//       email,
//       'Reset your password',
//       getForgotPasswordTextTemplate(CLIENT_URL, code),
//       getForgotPasswordHtmlTemplate(CLIENT_URL, code)
//     );

//     if (!result?.success) {
//       return res.status(400).json({ errors: result?.error?.response?.body });
//     }

//     const verifyDetailsToSave = {
//       email,
//       code,
//     };
//     const codeSaved = new Verify(verifyDetailsToSave);
//     await codeSaved.save();

//     res.status(200).json({
//       message: 'An email with details to reset password was sent to the given email',
//       success: true,
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send('Server error');
//   }
// });

// router.post(
//   '/user/set-password',
//   [
//     check('code', 'Code is required').isLength({
//       min: 1,
//     }),
//     check('password', 'Password is required. It must have 6 or more characters').isLength({
//       min: 6,
//     }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }
//     const { code, password } = req.body;
//     try {
//       const verify = await Verify.findOne({ code });
//       if (!verify) {
//         return res.status(400).json({ errors: [{ message: 'The link to reset password has expired' }] });
//       }
//       if (verify?.code !== code) {
//         return res.status(400).json({ errors: [{ message: 'The code to reset password is invalid or expired' }] });
//       }

//       const user = await User.findOne({
//         'profile.email': verify?.email,
//       });

//       if (!user) {
//         return res.status(400).json({ errors: [{ message: 'No user found against this email' }] });
//       }

//       await user.updateOne({ password: await encryptPassword(password) });
//       await Verify.findOneAndDelete({ code });

//       res.status(200).json({ message: 'Password reset successfully', success: true });
//     } catch (error) {
//       console.log(error.message);
//       res.status(500).send('Server error');
//     }
//   }
// );

// router.get('/google', passport.authenticate('google', ['profile', 'email']));

// router.get('/google/callback', passport.authenticate('google'), async (req, res) => {
//   if (!req?.user) {
//     return res.redirect(`/api/auth/google/failed/Google login failed`);
//   }
//   const { name, email, email_verified } = req?.user?._json;
//   try {
//     const isUserAlready = await User.findOne({
//       'profile.email': email,
//     }).select('-password');

//     if (isUserAlready) {
//       if (!isUserAlready?.is_google) {
//         return res.redirect(
//           `/api/auth/google/failed/This email was not registered using Google account. Please use normal login.`
//         );
//       }
//       const payload = {
//         user: {
//           id: isUserAlready?._id,
//         },
//       };
//       jwt.sign(payload, jwtSecret, {}, (err, token) => {
//         if (err) {
//           throw err;
//         } else {
//           res.redirect(`${CLIENT_URL}/google?token=${token}`);
//         }
//       });
//     } else {
//       let userDetails = {
//         type: 'user',
//         active: email_verified,
//         is_google: true,
//         profile: {
//           name,
//           email,
//         },
//       };
//       const user = new User(userDetails);
//       const response = await user.save();
//       const payload = {
//         user: {
//           id: response?._id,
//         },
//       };
//       jwt.sign(payload, jwtSecret, {}, (err, token) => {
//         if (err) {
//           throw err;
//         } else {
//           res.redirect(`${CLIENT_URL}/google?token=${token}`);
//         }
//       });
//     }
//   } catch (error) {
//     console.log(error.message);
//     res.redirect(`/api/auth/google/failed/Google login failed`);
//   }
// });

// router.get('/google/failed/:message', (req, res) => {
//   const { message } = req.params;
//   res.redirect(`${CLIENT_URL}/google?failed=${message}`);
// });

// router.get('/google/logout', (req, res) => {
//   if (!req?.user) {
//     return res.status(400).json({ errors: [{ message: 'Not Authorized' }] });
//   }
//   req.logout(req?.user, (err) => {
//     if (err) {
//       return res.status(400).json({ errors: [{ message: 'Error occurred while logging out', details: err }] });
//     }
//     res.status(200).json({ message: 'User logged out successfully', success: true });
//   });
// });

module.exports = router;
