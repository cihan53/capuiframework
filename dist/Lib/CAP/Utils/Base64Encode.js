/*
 *  Copyright (c) 2019. Crypttech Yazılım
 *  Author: Cihan Öztürk
 *  Email: cihanozturk@crypttech.com
 *
 *
 */
import { TextEncoder } from "text-encoding";

const base64js = require("base64-js");

const Base64Encode = (str, encoding = "utf-8") => {
  let bytes = new TextEncoder(encoding).encode(str);
  return base64js.fromByteArray(bytes);
};

export default Base64Encode;