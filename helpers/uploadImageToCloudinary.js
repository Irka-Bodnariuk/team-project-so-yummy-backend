const { nanoid } = require("nanoid");

const { CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dwaqddoag",
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const uploadImageToCloudinary = async (buffer, saveAvatarURL, userId) => {
  const options = {
    resource_type: "image",
    public_id: `${userId}/${nanoid()}`,
  };
  try {
    const result = await cloudinary.uploader
      .upload_stream(options, async (error, result) => {
        if (error) {
          console.log(error.message);
        } else {
          try {
            await saveAvatarURL(result);
          } catch (error) {
            console.log(error.message);
          }
        }
      })
      .end(buffer);
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = uploadImageToCloudinary;
