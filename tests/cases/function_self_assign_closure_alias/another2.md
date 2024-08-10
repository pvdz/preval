# Preval test case

# another2.md

> Function self assign closure alias > Another2

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
const x = zzzz;
$(zzzz() === zzzz());
$(x() !== x());
$(x() === zzzz());
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
$(zzzz() === zzzz());
$(x() !== x());
$(x() === zzzz());
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
const tmpBinBothLhs = zzzz();
const tmpBinBothRhs = zzzz();
const tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpBinBothLhs$1 = x();
const tmpBinBothRhs$1 = x();
const tmpCalleeParam$1 = tmpBinBothLhs$1 !== tmpBinBothRhs$1;
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpBinBothLhs$3 = x();
const tmpBinBothRhs$3 = zzzz();
const tmpCalleeParam$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
tmpCallCallee$3(tmpCalleeParam$3);
`````

## Output


`````js filename=intro
let zzzz = function () {
  debugger;
  const a = [];
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
const tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
$(tmpCalleeParam);
const tmpBinBothLhs$1 = x();
const tmpBinBothRhs$1 = x();
const tmpCalleeParam$1 = tmpBinBothLhs$1 !== tmpBinBothRhs$1;
$(tmpCalleeParam$1);
const tmpBinBothLhs$3 = x();
const tmpBinBothRhs$3 = zzzz();
const tmpCalleeParam$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
$(tmpCalleeParam$3);
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
$( g );
const h = d();
const i = d();
const j = h !== i;
$( j );
const k = d();
const l = a();
const m = k === l;
$( m );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: true
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same