const Photo = require("../models/Photo");

exports.getAboutPage = (req, res) => {
  res.render("about");
};

exports.getAddPhotoPage = (req, res) => {
  res.render("add");
};

exports.getEditPhotoPage = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  res.render("edit", {
    photo,
  });
};
