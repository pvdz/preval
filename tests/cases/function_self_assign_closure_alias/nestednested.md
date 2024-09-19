# Preval test case

# nestednested.md

> Function self assign closure alias > Nestednested

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

## Pre Normal


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
  f() === f();
  g() !== g();
  g() === f();
  return [f, g];
};
const [ff, gg] = outer();
$(ff(), ff());
$(ff() === ff());
$(gg(), gg());
$(gg() === gg());
$(gg() === ff());
$(ff() === gg());
$(outer);
`````

## Normalized


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
const bindingPatternArrRoot = outer();
const arrPatternSplat = [...bindingPatternArrRoot];
const ff = arrPatternSplat[0];
const gg = arrPatternSplat[1];
const tmpCallCallee = $;
const tmpCalleeParam = ff();
const tmpCalleeParam$1 = ff();
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
const tmpCallCallee$1 = $;
const tmpBinBothLhs = ff();
const tmpBinBothRhs = ff();
const tmpCalleeParam$3 = tmpBinBothLhs === tmpBinBothRhs;
tmpCallCallee$1(tmpCalleeParam$3);
const tmpCallCallee$3 = $;
const tmpCalleeParam$5 = gg();
const tmpCalleeParam$7 = gg();
tmpCallCallee$3(tmpCalleeParam$5, tmpCalleeParam$7);
const tmpCallCallee$5 = $;
const tmpBinBothLhs$1 = gg();
const tmpBinBothRhs$1 = gg();
const tmpCalleeParam$9 = tmpBinBothLhs$1 === tmpBinBothRhs$1;
tmpCallCallee$5(tmpCalleeParam$9);
const tmpCallCallee$7 = $;
const tmpBinBothLhs$3 = gg();
const tmpBinBothRhs$3 = ff();
const tmpCalleeParam$11 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
tmpCallCallee$7(tmpCalleeParam$11);
const tmpCallCallee$9 = $;
const tmpBinBothLhs$5 = ff();
const tmpBinBothRhs$5 = gg();
const tmpCalleeParam$13 = tmpBinBothLhs$5 === tmpBinBothRhs$5;
tmpCallCallee$9(tmpCalleeParam$13);
$(outer);
`````

## Output


`````js filename=intro
const outer = function () {
  debugger;
  let f = function () {
    debugger;
    const a /*:array*/ = [];
    f = function ($$0, $$1) {
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
  const tmpReturnArg /*:array*/ = [f, g];
  return tmpReturnArg;
};
const bindingPatternArrRoot = outer();
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const ff = arrPatternSplat[0];
const gg = arrPatternSplat[1];
const tmpCalleeParam = ff();
const tmpCalleeParam$1 = ff();
$(tmpCalleeParam, tmpCalleeParam$1);
const tmpBinBothLhs = ff();
const tmpBinBothRhs = ff();
const tmpCalleeParam$3 /*:boolean*/ = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam$3);
const tmpCalleeParam$5 = gg();
const tmpCalleeParam$7 = gg();
$(tmpCalleeParam$5, tmpCalleeParam$7);
const tmpBinBothLhs$1 = gg();
const tmpBinBothRhs$1 = gg();
const tmpCalleeParam$9 /*:boolean*/ = tmpBinBothLhs$1 === tmpBinBothRhs$1;
$(tmpCalleeParam$9);
const tmpBinBothLhs$3 = gg();
const tmpBinBothRhs$3 = ff();
const tmpCalleeParam$11 /*:boolean*/ = tmpBinBothLhs$3 === tmpBinBothRhs$3;
$(tmpCalleeParam$11);
const tmpBinBothLhs$5 = ff();
const tmpBinBothRhs$5 = gg();
const tmpCalleeParam$13 /*:boolean*/ = tmpBinBothLhs$5 === tmpBinBothRhs$5;
$(tmpCalleeParam$13);
$(outer);
`````

## PST Output

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

## Globals

None

## Result

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

Final output calls: Same
