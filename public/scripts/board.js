GOL = {};

GOL.board = function (spec) {
    // private vars
    var h = spec.height;
    var w = spec.width;
    var dx = spec.dimensions[0];
    var dy = spec.dimensions[1];
    var grid = [];
    var ctx = spec.context;
    var cw = w / dx; // single cell width
    var ch = h / dy; // single cell height

    // private functions
    var draw = function () {
        var padding = 1;
        for (var x = 0; x < dx; x += 1) {
            for (var y = 0; y < dy; y += 1) {
                ctx.fillStyle = (grid[x][y]) ? 'rgb(0, 0, 255)' : 'rgb(230, 230, 230)';
                ctx.fillRect(
                    x * cw + padding,
                    y * ch + padding,
                    cw - padding * 2,
                    ch - padding * 2
                );
            }
        }
    };
    var neighbours = function (x, y) {
        var n = 0;
        var rangeX = [];
        var rangeY = [];
        if (x === 0) {
            rangeX = [dx - 1, x, x + 1];
        } else if (x === (dx - 1)) {
            rangeX = [x - 1, x, 0];
        } else {
            rangeX = [x - 1, x, x + 1];
        }
        if (y === 0) {
            rangeY = [dy - 1, y, y + 1];
        } else if (y === (dy - 1)) {
            rangeY = [y - 1, y, 0];
        } else {
            rangeY = [y - 1, y, y + 1];
        }
        $.each(rangeX, function (ix, vx) {
            $.each(rangeY, function (iy, vy) {
                if (!(ix === 1 && iy === 1) && grid[vx][vy]) {
                    n += 1;
                }
            });
        });
        return n;
    };

    var that = {};
    
    // public functions
    that.clear = function () {
        for (var x = 0; x < dx; x += 1) {
            grid[x] = [];
            for (var y = 0; y < dy; y += 1) {
                grid[x][y] = false;
            }
        }
        draw();
    };
    that.toggle = function (offset) {
        x = Math.floor(offset[0] / cw);
        y = Math.floor(offset[1] / cw);
        grid[x][y] = !grid[x][y];
        // @todo just redraw the single cell rather than the whole grid
        draw();
    };
    that.step = function () {
        var newGrid = $.extend(true, [], grid);
        for (var x = 0; x < dx; x += 1) {
            for (var y = 0; y < dy; y += 1) {
                var n = neighbours(x, y);
                if (n < 2) {
                    newGrid[x][y] = false;
                } else if (n > 3) {
                    newGrid[x][y] = false;
                } else if (!grid[x][y] && n === 3) {
                    newGrid[x][y] = true;
                }
            }
        }
        grid = newGrid;
        draw();
    };
    that.randomize = function () {
        for (var x = 0; x < dx; x += 1) {
            grid[x] = [];
            for (var y = 0; y < dy; y += 1) {
                if (Math.random() >= .75) {
                    grid[x][y] = true;
                } else {
                    grid[x][y] = false;
                }
            }
        }
        draw();
    };
    
    // init grid
    that.clear();
    
    return that;
};

$(function () {
    var e = $('.board canvas');
    var width = e.attr('width');
    var height = e.attr('height');
    var ctx = e.get(0).getContext('2d');
    var board = GOL.board({
        context: ctx,
        width: width,
        height: height,
        dimensions: [25, 25]
    });
    var t;
    e.click(function (event) {
        board.toggle([event.offsetX, event.offsetY]);
        return false;
    });
    $('#step').click(function () {
        board.step();
    });
    $('#clear').click(function () {
        board.clear();
    });
    $('#randomize').click(function () {
        board.randomize();
    });
    $('#run').click(function () {
        t = setInterval(board.step, 250);
    });
    $('#stop').click(function () {
        clearTimeout(t);
    });
});