module.exports = function() {
    return new Promise(function(resolve) {
        setTimeout(function() {console.log('Promise1 returning after 2 seconds...'); resolve();}, 2000);
    });
};