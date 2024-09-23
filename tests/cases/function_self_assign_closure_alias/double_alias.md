# Preval test case

# double_alias.md

> Function self assign closure alias > Double alias

## Input

`````js filename=intro
let zzzz = function() {
  debugger;
  const a = [];
  zzzz = function($$0, $$1) {
    return a;
  };
  const tmpReturnArg$23 = zzzz();
  return tmpReturnArg$23;
};
const x = zzzz; // Alias the locking func, fresh array every call
$('eq', zzzz() === zzzz());
const y = zzzz; // Alias the locked func, always returns the same array ref no matter
$('eq, x should update z', x() === zzzz());
$('neq, z is read before x updates it', zzzz() === x());
$('xx diff', x() === x()); // Should return two _diff_ array refs
$('yy same', y() === y()); // Should return the _same_ array ref
$('xy diff', x() === y()); // Should return two _diff_ array refs (x cannot influence y)
$('yx diff', y() === x()); // Should return two _diff_ array refs (x cannot influence y)
`````

## Pre Normal


`````js filename=intro
let zzzz = function () {
  debugger;
  const a = [];
  zzzz = function ($$0, $$1) {
    let $dlr_$$0 = $$0;
    let $dlr_$$1 = $$1;
    debugger;
    return a;
  };
  const tmpReturnArg$23 = zzzz();
  return tmpReturnArg$23;
};
const x = zzzz;
$(`eq`, zzzz() === zzzz());
const y = zzzz;
$(`eq, x should update z`, x() === zzzz());
$(`neq, z is read before x updates it`, zzzz() === x());
$(`xx diff`, x() === x());
$(`yy same`, y() === y());
$(`xy diff`, x() === y());
$(`yx diff`, y() === x());
`````

## Normalized


`````js filename=intro
let zzzz = function () {
  debugger;
  const a = [];
  zzzz = function ($$0, $$1) {
    let $dlr_$$0 = $$0;
    let $dlr_$$1 = $$1;
    debugger;
    return a;
  };
  const tmpReturnArg$23 = zzzz();
  return tmpReturnArg$23;
};
const x = zzzz;
const tmpCallCallee = $;
const tmpCalleeParam = `eq`;
const tmpBinBothLhs = zzzz();
const tmpBinBothRhs = zzzz();
const tmpCalleeParam$1 = tmpBinBothLhs === tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const y = zzzz;
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = `eq, x should update z`;
const tmpBinBothLhs$1 = x();
const tmpBinBothRhs$1 = zzzz();
const tmpCalleeParam$5 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
tmpCallCallee$1(tmpCalleeParam$3, tmpCalleeParam$5);
const tmpCallCallee$3 = $;
const tmpCalleeParam$7 = `neq, z is read before x updates it`;
const tmpBinBothLhs$3 = zzzz();
const tmpBinBothRhs$3 = x();
const tmpCalleeParam$9 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
tmpCallCallee$3(tmpCalleeParam$7, tmpCalleeParam$9);
const tmpCallCallee$5 = $;
const tmpCalleeParam$11 = `xx diff`;
const tmpBinBothLhs$5 = x();
const tmpBinBothRhs$5 = x();
const tmpCalleeParam$13 = tmpBinBothLhs$5 === tmpBinBothRhs$5;
tmpCallCallee$5(tmpCalleeParam$11, tmpCalleeParam$13);
const tmpCallCallee$7 = $;
const tmpCalleeParam$15 = `yy same`;
const tmpBinBothLhs$7 = y();
const tmpBinBothRhs$7 = y();
const tmpCalleeParam$17 = tmpBinBothLhs$7 === tmpBinBothRhs$7;
tmpCallCallee$7(tmpCalleeParam$15, tmpCalleeParam$17);
const tmpCallCallee$9 = $;
const tmpCalleeParam$19 = `xy diff`;
const tmpBinBothLhs$9 = x();
const tmpBinBothRhs$9 = y();
const tmpCalleeParam$21 = tmpBinBothLhs$9 === tmpBinBothRhs$9;
tmpCallCallee$9(tmpCalleeParam$19, tmpCalleeParam$21);
const tmpCallCallee$11 = $;
const tmpCalleeParam$23 = `yx diff`;
const tmpBinBothLhs$11 = y();
const tmpBinBothRhs$11 = x();
const tmpCalleeParam$25 = tmpBinBothLhs$11 === tmpBinBothRhs$11;
tmpCallCallee$11(tmpCalleeParam$23, tmpCalleeParam$25);
`````

## Output


`````js filename=intro
let zzzz /*:()=>*/ = function () {
  debugger;
  const a /*:array*/ = [];
  zzzz = function ($$0, $$1) {
    debugger;
    return a;
  };
  const tmpReturnArg$23 = zzzz();
  return tmpReturnArg$23;
};
const x = zzzz;
const tmpBinBothLhs = zzzz();
const tmpBinBothRhs = zzzz();
const tmpCalleeParam$1 /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
$(`eq`, tmpCalleeParam$1);
const y = zzzz;
const tmpBinBothLhs$1 = x();
const tmpBinBothRhs$1 = zzzz();
const tmpCalleeParam$5 /*:boolean*/ = tmpBinBothLhs$1 === tmpBinBothRhs$1;
$(`eq, x should update z`, tmpCalleeParam$5);
const tmpBinBothLhs$3 = zzzz();
const tmpBinBothRhs$3 = x();
const tmpCalleeParam$9 /*:boolean*/ = tmpBinBothLhs$3 === tmpBinBothRhs$3;
$(`neq, z is read before x updates it`, tmpCalleeParam$9);
const tmpBinBothLhs$5 = x();
const tmpBinBothRhs$5 = x();
const tmpCalleeParam$13 /*:boolean*/ = tmpBinBothLhs$5 === tmpBinBothRhs$5;
$(`xx diff`, tmpCalleeParam$13);
const tmpBinBothLhs$7 = y();
const tmpBinBothRhs$7 = y();
const tmpCalleeParam$17 /*:boolean*/ = tmpBinBothLhs$7 === tmpBinBothRhs$7;
$(`yy same`, tmpCalleeParam$17);
const tmpBinBothLhs$9 = x();
const tmpBinBothRhs$9 = y();
const tmpCalleeParam$21 /*:boolean*/ = tmpBinBothLhs$9 === tmpBinBothRhs$9;
$(`xy diff`, tmpCalleeParam$21);
const tmpBinBothLhs$11 = y();
const tmpBinBothRhs$11 = x();
const tmpCalleeParam$25 /*:boolean*/ = tmpBinBothLhs$11 === tmpBinBothRhs$11;
$(`yx diff`, tmpCalleeParam$25);
`````

## PST Output

With rename=true

`````js filename=intro
let a = function() {
  debugger;
  const b = [];
  a = function($$0,$$1 ) {
    debugger;
    return b;
  };
  const c = a();
  return c;
};
const d = a;
const e = a();
const f = a();
const g = e === f;
$( "eq", g );
const h = a;
const i = d();
const j = a();
const k = i === j;
$( "eq, x should update z", k );
const l = a();
const m = d();
const n = l === m;
$( "neq, z is read before x updates it", n );
const o = d();
const p = d();
const q = o === p;
$( "xx diff", q );
const r = h();
const s = h();
const t = r === s;
$( "yy same", t );
const u = d();
const v = h();
const w = u === v;
$( "xy diff", w );
const x = h();
const y = d();
const z = x === y;
$( "yx diff", z );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'eq', true
 - 2: 'eq, x should update z', true
 - 3: 'neq, z is read before x updates it', false
 - 4: 'xx diff', false
 - 5: 'yy same', true
 - 6: 'xy diff', false
 - 7: 'yx diff', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
