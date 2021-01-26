/*
 * Copyright (c) 2019. Crypttech Yazılım
 * Author: Cihan Öztürk
 * Email: cihanozturk@crypttech.com
 */
class CapException extends  Error{
    constructor(name, props) {
        super(props);
        this.name = name || 'CapException'
        this.stack = props.stack;
        this.message = props.message;
        this.code = props.code
        // Error.captureStackTrace(this,CapException)
    }
}
// const CapException = function CapException(name = 'CapException', message) {
//
//     modul.content
//
//
//     modul.content
//     this.message = message;
//     this.name = 'CapException';
// }
export default CapException

