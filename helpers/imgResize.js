const sharp = require("sharp");
const HttpError = require("./HttpError");

const imgResize = async ({ body, width, height }) => {
  const extension = body.mimetype.split("/")[1];
  try {
    const imgResize = await sharp(body.buffer).resize({ width, height });
    const isJPEG = extension === "jpeg" || extension === "jpg";
    const isPNG = extension === "png";
    if (isJPEG) {
      return await imgResize
        .jpeg({ quality: 70, progressive: true })
        .toBuffer();
    } else if (isPNG) {
      return await imgResize
        .png({ quality: 70, compressionLevel: 9 })
        .toBuffer();
    }
  } catch (error) {
    throw HttpError(500, error);
  }
};

module.exports = imgResize;
