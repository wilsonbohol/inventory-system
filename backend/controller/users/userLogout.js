async function userLogout(req, res) {
  try {
    res.clearCookie("token");

    res.json({
      message: "Logout Successfully",
      success: true,
      error: false,
      data: [],
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
  console.log("test", res);
}

module.exports = userLogout;
