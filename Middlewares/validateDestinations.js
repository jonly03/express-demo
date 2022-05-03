function validateUserInput(req, res, next) {
  // ONLY grab what I need
  const { destination, location } = req.body;

  // VALIDATE that I got what I expected (i.e destination & location are BOTH present and NOT empty strings)
  if (
    !destination ||
    !location ||
    destination.length === 0 ||
    location.length === 0
  ) {
    return res
      .status(400)
      .send({ error: "Destination AND location are BOTH required" });
  }

  next();
}

module.exports = {
  validateUserInput,
};
