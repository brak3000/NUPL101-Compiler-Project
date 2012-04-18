// this is all you
var endTime = function (time, musexpr) {
    var totalTime = function (expr) {
        // Base case.
        if (expr.tag === 'note') {
            return expr.dur;
        }
	// Base case.
	if (expr.tag === 'rest') {
	    return expr.dur;
	}
        if (expr.tag === 'seq') {
            return totalTime (expr.left) + totalTime (expr.right);
        }
        if (expr.tag === 'par') {
            return Math.max(totalTime(expr.left), totalTime(expr.right));
        }
    };
    
    return time + totalTime(musexpr);
};

var compile = function (musexpr) {
    var compiler = function (start, expr) {
        if (expr.tag === 'note') {
            return [{
                tag: 'note',
                pitch: expr.pitch,
                start: start,
                dur: expr.dur
            }];
        }
	if (expr.tag === 'rest') {
	    return [{
		tag: 'rest',
		start: start,
		dur: expr.dur
	    }];
	}
        if (expr.tag === 'seq') {
            return compiler(start, expr.left).concat(compiler(endTime(start, expr.left), expr.right));
        }
        if (expr.tag === 'par') {
            return compiler(start, expr.left).concat(compiler(start, expr.right));
        }
    };
    
    return compiler(0, musexpr);
};

var melody_mus = 
    { tag: 'seq',
      left: 
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'c4', dur: 500 },
         right: { tag: 'note', pitch: 'd4', dur: 500 } } };

console.log(melody_mus);
console.log(compile(melody_mus));
