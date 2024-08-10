# Preval test case

# another3.md

> Function self assign closure alias > Another3

## Input

`````js filename=intro
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
`````

## Pre Normal


`````js filename=intro
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
`````

## Normalized


`````js filename=intro
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
`````

## Output


`````js filename=intro
const tmpssa2_a$11 = [1, 2, 3];
const tmpssa2_a$9 = [1, 2, 3];
const tmpCalleeParam = tmpssa2_a$11 === tmpssa2_a$9;
$(tmpCalleeParam);
const tmpssa2_a$7 = [1, 2, 3];
const tmpssa2_a$5 = [1, 2, 3];
const tmpCalleeParam$1 = tmpssa2_a$7 !== tmpssa2_a$5;
$(tmpCalleeParam$1);
const tmpssa2_a$3 = [1, 2, 3];
const tmpssa2_a$1 = [1, 2, 3];
const tmpCalleeParam$3 = tmpssa2_a$3 === tmpssa2_a$1;
$(tmpCalleeParam$3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
const b = [ 1, 2, 3 ];
const c = a === b;
$( c );
const d = [ 1, 2, 3 ];
const e = [ 1, 2, 3 ];
const f = d !== e;
$( f );
const g = [ 1, 2, 3 ];
const h = [ 1, 2, 3 ];
const i = g === h;
$( i );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - 2: true
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
