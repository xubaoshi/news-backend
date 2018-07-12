// var prdBaseURL = "";
// var url = process.env.NODE_ENV === JSON.stringify('development') ? devBaseURL : prdBaseURL;
// var devBaseURL = "http://64.32.5.133:7001";
// var url = "http://64.32.5.133:7001";
// var devBaseURL = "http://127.0.0.1:7001";
// var url = "http://127.0.0.1:7001";
var devBaseURL = "https://xubaoshi.top";
var url = "https://xubaoshi.top";
module.exports = {
  name: "意适美后台系统",
  // prefix: "fomenyesu",
  footerText: "意适美后台系统  版权所有 © 2018",
  logoSrc: url + "/public/assets/logo.png",
  // logoSrc: './assets/logo.png',
  logoText: "意适美后台系统",
  needLogin: true,
  devBaseURL:devBaseURL,
  iconFontUrl: url + "/public/assets/znfont.js",
  // iconFontUrl: './assets/znfont.js',
  attachmentURL: url + "/api/upload",
  uploadURL: url + "/public/uploads",
  tempUploadURL: url + "/public/tempUploads",
};
