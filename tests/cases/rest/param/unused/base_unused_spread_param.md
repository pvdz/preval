# Preval test case

# base_unused_spread_param.md

> Rest > Param > Unused > Base unused spread param
>
> A function with a spread param that we know will not receive any args should be an empty array

## Input

`````js filename=intro
function f(...rest) {
  $(rest);
}
f();
`````

## Pre Normal


`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let rest = $$0;
  debugger;
  $(rest);
};
f();
`````

## Normalized


`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let rest = $$0;
  debugger;
  $(rest);
  return undefined;
};
f();
`````

## Output


`````js filename=intro
const rest /*:array*/ = [];
$(rest);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- drop unused rest param?