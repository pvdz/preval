# Preval test case

# recursion.md

> One timers > Recursion
>
> When trying to inline itself into itself...

## Input

`````js filename=intro
const tmpCalleeParam$11 = {};
let p = '';
let tmpSSA_e = function($$0) {
  debugger;
  tmpBinBothLhs = tmpSSA_e($(2));
  return tmpBinBothLhs;
};
$(p);
`````

## Pre Normal


`````js filename=intro
const tmpCalleeParam$11 = {};
let p = ``;
let tmpSSA_e = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  tmpBinBothLhs = tmpSSA_e($(2));
  return tmpBinBothLhs;
};
$(p);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam$11 = {};
let p = ``;
let tmpSSA_e = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const tmpCallCallee = tmpSSA_e;
  const tmpCalleeParam = $(2);
  tmpBinBothLhs = tmpCallCallee(tmpCalleeParam);
  return tmpBinBothLhs;
};
$(p);
`````

## Output


`````js filename=intro
const tmpSSA_e /*:()=>unknown*/ = function () {
  debugger;
  $(2);
  tmpBinBothLhs = tmpSSA_e();
  return tmpBinBothLhs;
};
$(``);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( 2 );
  tmpBinBothLhs = a();
  return tmpBinBothLhs;
};
$( "" );
`````

## Globals

BAD@! Found 1 implicit global bindings:

tmpBinBothLhs

## Result

Should call `$` with:
 - 1: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
