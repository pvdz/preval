# Preval test case

# double_alias.md

> Self assign > Closure > Closure alias > Double alias

## Input

`````js filename=intro
// Should NOT inline because x retains reference to original sealer, x() keeps re-sealing zzzz
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


## Settled


`````js filename=intro
let zzzz /*:()=>unknown*/ = function () {
  debugger;
  const a /*:array*/ /*truthy*/ = [];
  zzzz = function ($$0, $$1) {
    debugger;
    return a;
  };
  const tmpReturnArg$23 /*:unknown*/ = zzzz();
  return tmpReturnArg$23;
};
const x /*:unknown*/ = zzzz;
const tmpBinBothLhs /*:unknown*/ = zzzz();
const tmpBinBothRhs /*:unknown*/ = zzzz();
const tmpCalleeParam /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
$(`eq`, tmpCalleeParam);
const y /*:unknown*/ = zzzz;
const tmpBinBothLhs$1 /*:unknown*/ = x();
const tmpBinBothRhs$1 /*:unknown*/ = zzzz();
const tmpCalleeParam$1 /*:boolean*/ = tmpBinBothLhs$1 === tmpBinBothRhs$1;
$(`eq, x should update z`, tmpCalleeParam$1);
const tmpBinBothLhs$3 /*:unknown*/ = zzzz();
const tmpBinBothRhs$3 /*:unknown*/ = x();
const tmpCalleeParam$3 /*:boolean*/ = tmpBinBothLhs$3 === tmpBinBothRhs$3;
$(`neq, z is read before x updates it`, tmpCalleeParam$3);
const tmpBinBothLhs$5 /*:unknown*/ = x();
const tmpBinBothRhs$5 /*:unknown*/ = x();
const tmpCalleeParam$5 /*:boolean*/ = tmpBinBothLhs$5 === tmpBinBothRhs$5;
$(`xx diff`, tmpCalleeParam$5);
const tmpBinBothLhs$7 /*:unknown*/ = y();
const tmpBinBothRhs$7 /*:unknown*/ = y();
const tmpCalleeParam$7 /*:boolean*/ = tmpBinBothLhs$7 === tmpBinBothRhs$7;
$(`yy same`, tmpCalleeParam$7);
const tmpBinBothLhs$9 /*:unknown*/ = x();
const tmpBinBothRhs$9 /*:unknown*/ = y();
const tmpCalleeParam$9 /*:boolean*/ = tmpBinBothLhs$9 === tmpBinBothRhs$9;
$(`xy diff`, tmpCalleeParam$9);
const tmpBinBothLhs$11 /*:unknown*/ = y();
const tmpBinBothRhs$11 /*:unknown*/ = x();
const tmpCalleeParam$11 /*:boolean*/ = tmpBinBothLhs$11 === tmpBinBothRhs$11;
$(`yx diff`, tmpCalleeParam$11);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let zzzz = function () {
  const a = [];
  zzzz = function ($$0, $$1) {
    return a;
  };
  const tmpReturnArg$23 = zzzz();
  return tmpReturnArg$23;
};
const x = zzzz;
const tmpBinBothLhs = zzzz();
$(`eq`, tmpBinBothLhs === zzzz());
const y = zzzz;
const tmpBinBothLhs$1 = x();
$(`eq, x should update z`, tmpBinBothLhs$1 === zzzz());
const tmpBinBothLhs$3 = zzzz();
$(`neq, z is read before x updates it`, tmpBinBothLhs$3 === x());
const tmpBinBothLhs$5 = x();
$(`xx diff`, tmpBinBothLhs$5 === x());
const tmpBinBothLhs$7 = y();
$(`yy same`, tmpBinBothLhs$7 === y());
const tmpBinBothLhs$9 = x();
$(`xy diff`, tmpBinBothLhs$9 === y());
const tmpBinBothLhs$11 = y();
$(`yx diff`, tmpBinBothLhs$11 === x());
`````


## PST Settled
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


## Normalized
(This is what phase1 received the first time)

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
const tmpBinBothLhs = zzzz();
const tmpBinBothRhs = zzzz();
let tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
$(`eq`, tmpCalleeParam);
const y = zzzz;
const tmpBinBothLhs$1 = x();
const tmpBinBothRhs$1 = zzzz();
let tmpCalleeParam$1 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
$(`eq, x should update z`, tmpCalleeParam$1);
const tmpBinBothLhs$3 = zzzz();
const tmpBinBothRhs$3 = x();
let tmpCalleeParam$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
$(`neq, z is read before x updates it`, tmpCalleeParam$3);
const tmpBinBothLhs$5 = x();
const tmpBinBothRhs$5 = x();
let tmpCalleeParam$5 = tmpBinBothLhs$5 === tmpBinBothRhs$5;
$(`xx diff`, tmpCalleeParam$5);
const tmpBinBothLhs$7 = y();
const tmpBinBothRhs$7 = y();
let tmpCalleeParam$7 = tmpBinBothLhs$7 === tmpBinBothRhs$7;
$(`yy same`, tmpCalleeParam$7);
const tmpBinBothLhs$9 = x();
const tmpBinBothRhs$9 = y();
let tmpCalleeParam$9 = tmpBinBothLhs$9 === tmpBinBothRhs$9;
$(`xy diff`, tmpCalleeParam$9);
const tmpBinBothLhs$11 = y();
const tmpBinBothRhs$11 = x();
let tmpCalleeParam$11 = tmpBinBothLhs$11 === tmpBinBothRhs$11;
$(`yx diff`, tmpCalleeParam$11);
`````


## Todos triggered


- (todo) Found a self-closing function shell but it did not match a known pattern...
- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


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

Post settled calls: Same

Denormalized calls: Same
