/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */


const CapException = function CapException(name = 'UserException', message) {
    this.message = message;
    this.name = 'UserException';
}
export default CapException

