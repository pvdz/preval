# Preval test case

# nested.md

> Function self assign closure alias > Nested

## Input

`````js filename=intro
function g() {
  let zzzz = function() {
    debugger;
    a = [1,2,3];
    return a;
  };
  let a;
  const x = zzzz;
  $(zzzz() === zzzz());
  $(x() !== x());
  $(x() === zzzz());
  return zzzz();
}
$(g() === g());
$(g());
`````

## Pre Normal


`````js filename=intro
let g = function () {
  debugger;
  let zzzz = function () {
    debugger;
    a = [1, 2, 3];
    return a;
  };
  let a;
  const x = zzzz;
  $(zzzz() === zzzz());
  $(x() !== x());
  $(x() === zzzz());
  return zzzz();
};
$(g() === g());
$(g());
`````

## Normalized


`````js filename=intro
let g = function () {
  debugger;
  let zzzz = function () {
    debugger;
    a = [1, 2, 3];
    return a;
  };
  let a = undefined;
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
  const tmpReturnArg = zzzz();
  return tmpReturnArg;
};
const tmpCallCallee$5 = $;
const tmpBinBothLhs$5 = g();
const tmpBinBothRhs$5 = g();
const tmpCalleeParam$5 = tmpBinBothLhs$5 === tmpBinBothRhs$5;
tmpCallCallee$5(tmpCalleeParam$5);
const tmpCallCallee$7 = $;
const tmpCalleeParam$7 = g();
tmpCallCallee$7(tmpCalleeParam$7);
`````

## Output


`````js filename=intro
const g = function () {
  debugger;
  const tmpssa2_a$13 /*:array*/ = [1, 2, 3];
  const tmpssa2_a$11 /*:array*/ = [1, 2, 3];
  const tmpCalleeParam /*:boolean*/ = tmpssa2_a$13 === tmpssa2_a$11;
  $(tmpCalleeParam);
  const tmpssa2_a$9 /*:array*/ = [1, 2, 3];
  const tmpssa2_a$7 /*:array*/ = [1, 2, 3];
  const tmpCalleeParam$1 /*:boolean*/ = tmpssa2_a$9 !== tmpssa2_a$7;
  $(tmpCalleeParam$1);
  const tmpssa2_a$5 /*:array*/ = [1, 2, 3];
  const tmpssa2_a$3 /*:array*/ = [1, 2, 3];
  const tmpCalleeParam$3 /*:boolean*/ = tmpssa2_a$5 === tmpssa2_a$3;
  $(tmpCalleeParam$3);
  const tmpssa2_a$1 /*:array*/ = [1, 2, 3];
  return tmpssa2_a$1;
};
const tmpBinBothLhs$5 = g();
const tmpBinBothRhs$5 = g();
const tmpCalleeParam$5 /*:boolean*/ = tmpBinBothLhs$5 === tmpBinBothRhs$5;
$(tmpCalleeParam$5);
const tmpCalleeParam$7 = g();
$(tmpCalleeParam$7);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = [ 1, 2, 3 ];
  const c = [ 1, 2, 3 ];
  const d = b === c;
  $( d );
  const e = [ 1, 2, 3 ];
  const f = [ 1, 2, 3 ];
  const g = e !== f;
  $( g );
  const h = [ 1, 2, 3 ];
  const i = [ 1, 2, 3 ];
  const j = h === i;
  $( j );
  const k = [ 1, 2, 3 ];
  return k;
};
const l = a();
const m = a();
const n = l === m;
$( n );
const o = a();
$( o );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: true
 - 3: false
 - 4: false
 - 5: true
 - 6: false
 - 7: false
 - 8: false
 - 9: true
 - 10: false
 - 11: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
