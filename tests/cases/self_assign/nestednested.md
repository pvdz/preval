# Preval test case

# nestednested.md

> Self assign > Nestednested

## Input

`````js filename=intro
function outer() {
  let f = function() {
    const a = [];
    f = function($$0, $$1) {
      return a;
    };
    const tmpReturnArg$23 = f();
    return tmpReturnArg$23;
  };
  const g = f;
  f() === f();   // a1 === a1
  g() !== g();   // a2 === a3
  g() === f();   // a4 === a4
  return [f, g]; // escapes, note: the passed on f will be locked regardless of future calls of g
}

const [ff, gg] = outer();

$(ff(), ff());
$(ff() === ff());

$(gg(), gg());
$(gg() === gg());

$(gg() === ff());
$(ff() === gg());

$(outer);
`````


## Settled


`````js filename=intro
const outer /*:()=>array*/ = function () {
  debugger;
  let f /*:()=>unknown*/ = function () {
    debugger;
    const a /*:array*/ /*truthy*/ = [];
    f = function ($$0, $$1) {
      debugger;
      return a;
    };
    const tmpReturnArg$23 /*:unknown*/ = f();
    return tmpReturnArg$23;
  };
  const g /*:unknown*/ = f;
  f();
  f();
  g();
  g();
  g();
  f();
  const tmpReturnArg /*:array*/ /*truthy*/ = [f, g];
  return tmpReturnArg;
};
const tmpBindingPatternArrRoot /*:array*/ /*truthy*/ = outer();
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpBindingPatternArrRoot];
const ff /*:unknown*/ = tmpArrPatternSplat[0];
const gg /*:unknown*/ = tmpArrPatternSplat[1];
const tmpCalleeParam /*:unknown*/ = ff();
const tmpCalleeParam$1 /*:unknown*/ = ff();
$(tmpCalleeParam, tmpCalleeParam$1);
const tmpBinBothLhs /*:unknown*/ = ff();
const tmpBinBothRhs /*:unknown*/ = ff();
const tmpCalleeParam$3 /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam$3);
const tmpCalleeParam$5 /*:unknown*/ = gg();
const tmpCalleeParam$7 /*:unknown*/ = gg();
$(tmpCalleeParam$5, tmpCalleeParam$7);
const tmpBinBothLhs$1 /*:unknown*/ = gg();
const tmpBinBothRhs$1 /*:unknown*/ = gg();
const tmpCalleeParam$9 /*:boolean*/ = tmpBinBothLhs$1 === tmpBinBothRhs$1;
$(tmpCalleeParam$9);
const tmpBinBothLhs$3 /*:unknown*/ = gg();
const tmpBinBothRhs$3 /*:unknown*/ = ff();
const tmpCalleeParam$11 /*:boolean*/ = tmpBinBothLhs$3 === tmpBinBothRhs$3;
$(tmpCalleeParam$11);
const tmpBinBothLhs$5 /*:unknown*/ = ff();
const tmpBinBothRhs$5 /*:unknown*/ = gg();
const tmpCalleeParam$13 /*:boolean*/ = tmpBinBothLhs$5 === tmpBinBothRhs$5;
$(tmpCalleeParam$13);
$(outer);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const outer = function () {
  let f = function () {
    const a = [];
    f = function ($$0, $$1) {
      return a;
    };
    const tmpReturnArg$23 = f();
    return tmpReturnArg$23;
  };
  const g = f;
  f();
  f();
  g();
  g();
  g();
  f();
  const tmpReturnArg = [f, g];
  return tmpReturnArg;
};
const tmpBindingPatternArrRoot = outer();
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const ff = tmpArrPatternSplat[0];
const gg = tmpArrPatternSplat[1];
$(ff(), ff());
const tmpBinBothLhs = ff();
$(tmpBinBothLhs === ff());
$(gg(), gg());
const tmpBinBothLhs$1 = gg();
$(tmpBinBothLhs$1 === gg());
const tmpBinBothLhs$3 = gg();
$(tmpBinBothLhs$3 === ff());
const tmpBinBothLhs$5 = ff();
$(tmpBinBothLhs$5 === gg());
$(outer);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  let b = function() {
    debugger;
    const c = [];
    b = function($$0,$$1 ) {
      debugger;
      return c;
    };
    const d = b();
    return d;
  };
  const e = b;
  b();
  b();
  e();
  e();
  e();
  b();
  const f = [ b, e ];
  return f;
};
const g = a();
const h = [ ...g ];
const i = h[ 0 ];
const j = h[ 1 ];
const k = i();
const l = i();
$( k, l );
const m = i();
const n = i();
const o = m === n;
$( o );
const p = j();
const q = j();
$( p, q );
const r = j();
const s = j();
const t = r === s;
$( t );
const u = j();
const v = i();
const w = u === v;
$( w );
const x = i();
const y = j();
const z = x === y;
$( z );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let outer = function () {
  debugger;
  let f = function () {
    debugger;
    const a = [];
    f = function ($$0, $$1) {
      let $dlr_$$0 = $$0;
      let $dlr_$$1 = $$1;
      debugger;
      return a;
    };
    const tmpReturnArg$23 = f();
    return tmpReturnArg$23;
  };
  const g = f;
  f();
  f();
  g();
  g();
  g();
  f();
  const tmpReturnArg = [f, g];
  return tmpReturnArg;
};
const tmpBindingPatternArrRoot = outer();
const tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
const ff = tmpArrPatternSplat[0];
const gg = tmpArrPatternSplat[1];
let tmpCalleeParam = ff();
let tmpCalleeParam$1 = ff();
$(tmpCalleeParam, tmpCalleeParam$1);
const tmpBinBothLhs = ff();
const tmpBinBothRhs = ff();
let tmpCalleeParam$3 = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam$3);
let tmpCalleeParam$5 = gg();
let tmpCalleeParam$7 = gg();
$(tmpCalleeParam$5, tmpCalleeParam$7);
const tmpBinBothLhs$1 = gg();
const tmpBinBothRhs$1 = gg();
let tmpCalleeParam$9 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
$(tmpCalleeParam$9);
const tmpBinBothLhs$3 = gg();
const tmpBinBothRhs$3 = ff();
let tmpCalleeParam$11 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
$(tmpCalleeParam$11);
const tmpBinBothLhs$5 = ff();
const tmpBinBothRhs$5 = gg();
let tmpCalleeParam$13 = tmpBinBothLhs$5 === tmpBinBothRhs$5;
$(tmpCalleeParam$13);
$(outer);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) Found a self-closing function shell but it did not match a known pattern...
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type ReturnStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [], []
 - 2: true
 - 3: [], []
 - 4: false
 - 5: false
 - 6: false
 - 7: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
