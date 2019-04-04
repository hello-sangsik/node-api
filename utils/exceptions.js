const exceptions = {};

exceptions.UserException = function (message) {
    this.name = 'UserException';
    this.message = message;
};

module.exports = exceptions;