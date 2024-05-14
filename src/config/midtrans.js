const midtransClient = require("midtrans-client");

/*
    ENV NOT WORKING WTFF
*/
exports.midtransCoreApi = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: "",
  clientKey: "",
});
