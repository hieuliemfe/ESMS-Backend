import multer from "multer";

var storage = multer.memoryStorage(); 
const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};
var uploadFile = multer({ storage: storage });

export default uploadFile;
