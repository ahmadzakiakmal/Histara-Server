const midtransClient = require("midtrans-client");
const dotenv = require("dotenv");
dotenv.config();

// SWITCH TO PROD
exports.midtransCoreApi = new midtransClient.CoreApi({
  isProduction: true,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});
