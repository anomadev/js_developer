module.exports = function(request, response, next) {
    if(request.mainObj && (request.mainObj._user == request.user._id)) return next();
    next(new Error('You have no permissions to be here'));
}