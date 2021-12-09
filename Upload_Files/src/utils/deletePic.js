const fs = require("fs");

module.exports = deleteOldPic = (profile_pic) => {
  fs.unlink(profile_pic, () => {
    console.log(`old profile_pic Deleted.`);
  });
};
