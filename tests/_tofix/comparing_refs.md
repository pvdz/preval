# Preval test case

# comparing_refs.md

> Tests > Tofix > Comparing refs

Comparing object refs when we know they are or aren't the same can be folded to booleans.

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
$(false);
$(true);
$(false);
`````

## PST Output

With rename=true

`````js filename=intro
$( false );
$( true );
$( false );
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
