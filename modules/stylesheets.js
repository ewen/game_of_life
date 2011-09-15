var stylesheets = [];

exports.list = function () {
    return stylesheets;
};

exports.add = function (spec) {
    var stylesheet = {};
    stylesheet.href = spec.href || '';
    stylesheet.media = spec.media || 'screen';
    stylesheet.type = spec.type || 'text/css';
    stylesheet.rel = spec.rel || 'stylesheet';
    stylesheets.push(stylesheet);
};