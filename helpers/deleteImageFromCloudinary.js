const { CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dwaqddoag",
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const deleteImageFromCloudinary = async (url) => {
  const pathArr = url.split("/");
  const fileName = pathArr.at(-1);
  const imgId = fileName.split(".")[0];
  const userId = pathArr.at(-2);
  const fullImgId = `${userId}/${imgId}`;
  try {
    const result = await cloudinary.uploader.destroy(
      fullImgId,
      async (error) => {
        if (error) {
          console.log(error.message);
        }
      }
    );
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = deleteImageFromCloudinary;
