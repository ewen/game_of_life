var scripts = [];

exports.list = function () {
    return scripts;
};

exports.add = function (spec) {
    var script = {};
    script.src = spec.src || '';
    script.type = spec.type || 'text/javascript';
    scripts.push(script);
};