# Preval test case

# throw.md

> Unroll loop with true > Throw
>
> 

## Input

`````js filename=intro
function f() {
  throw $LOOP_DONE_UNROLLING_ALWAYS_TRUE;
}
$(f);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  throw $LOOP_DONE_UNROLLING_ALWAYS_TRUE;
};
$(f);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  throw true;
};
$(f);
`````

## Output


`````js filename=intro
const f = function () {
  debugger;
  throw true;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  throw true;
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
