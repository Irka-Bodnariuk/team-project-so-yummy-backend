const sharp = require("sharp");
const HttpError = require("./HttpError");

const resizeImg = async ({ body, width, height }) => {
  const extension = body.mimetype.split("/")[1];
  try {
    const resizedImg = await sharp(body.buffer).resize({ width, height });
    const isJPEG = extension === "jpeg" || extension === "jpg";
    const isPNG = extension === "png";
    if (isJPEG) {
      return await resizedImg
        .jpeg({ quality: 70, progressive: true })
        .toBuffer();
    } else if (isPNG) {
      return await resizedImg
        .png({ quality: 70, compressionLevel: 9 })
        .toBuffer();
    }
  } catch (error) {
    throw HttpError(500, error);
  }
};

module.exports = resizeImg;
