const express = require("express");

// const {
//   ctrl: { getAll, getById, add, deleteByID, updateByID, updateStatusContact },
// } = require("../../controllers");

// const { validateBody, isValidId } = require("../../middlewares");

// const { schemas } = require("../../models");

const router = express.Router();

// router.get("/", getAll);

// router.get("/:contactId", isValidId, getById);

// router.post("/", validateBody(schemas.addSchema), add);

// router.delete("/:contactId", isValidId, deleteByID);

// router.put(
//   "/:contactId",
//   isValidId,
//   validateBody(schemas.addSchema),
//   updateByID
// );

// router.patch(
//   "/:contactId/favorite",
//   isValidId,
//   validateBody(schemas.updateFavoriteSchema),
//   updateStatusContact
// );

module.exports = router;
