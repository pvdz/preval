# Preval test case

# rest_typing.md

> Function inlining > Rest typing
>
> When inferring the type of rest to "array", make sure the param and the function get this both.

## Input

`````js filename=intro
function f(...arr) {
  $(arr);
}
f(1,2,3);
`````

## Pre Normal


`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let arr = $$0;
  debugger;
  $(arr);
};
f(1, 2, 3);
`````

## Normalized


`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let arr = $$0;
  debugger;
  $(arr);
  return undefined;
};
f(1, 2, 3);
`````

## Output


`````js filename=intro
const f /*:(array)=>undefined*/ = function (...$$0 /*:array*/) {
  const arr /*:array*/ = $$0;
  debugger;
  $(arr);
  return undefined;
};
f(1, 2, 3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( b );
  return undefined;
};
a( 1, 2, 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
