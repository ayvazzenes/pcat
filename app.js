const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const methodOverride = require("method-override");
const ejs = require("ejs");
const app = express();
const photoController = require("./controllers/photoControllers");
const pageController = require("./controllers/pageController");

mongoose.connect("mongodb://127.0.0.1:27017/pcat-test-db");

//!!TEMPLATE ENGİNE
app.set(
  "view engine",
  "ejs"
); /*biz template engine olarak ejs kullancaz diye expresse bildiriyoruz*/

//!!MIDDLEWARES

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //urldeki datayı okur
app.use(express.json()); //urldeki datayı jsona çevirir
app.use(fileUpload());
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

//!!ROUTESS

//?-----PHOTO CONTROLLERS--------
app.get("/", photoController.getAllPhotos);
app.get("/photos/:id", photoController.getPhoto);
app.post("/photos", photoController.createPhoto);
app.put("/photos/:id", photoController.updatePhoto);
app.delete("/photos/:id", photoController.deletePhoto);

//?-----PAGE CONTROLLERS--------
app.get("/about", pageController.getAboutPage);
app.get("/add", pageController.getAddPhotoPage);
app.get("/photos/edit/:id", pageController.getEditPhotoPage);

//?BAĞLANILCAK OLAN PORT
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışmaya başladı`);
});
