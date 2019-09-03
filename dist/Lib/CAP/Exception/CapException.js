/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
const CapException = function CapException(name = 'CapException', message) {
  this.message = message;
  this.name = 'CapException';
};

export default CapException;