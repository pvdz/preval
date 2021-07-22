# Preval test case

# unused_spread_param_multi-call.md

> Rest > Param > Unused > Unused spread param multi-call
>
> A function with a spread param that we know will not receive any args should be an empty array

#TODO

## Input

`````js filename=intro
function f(...rest) {
  $(rest);
}
f();
f();
f();
`````

## Pre Normal

`````js filename=intro
let f = function (...$$0) {
  let rest = $$0;
  debugger;
  $(rest);
};
f();
f();
f();
`````

## Normalized

`````js filename=intro
let f = function (...$$0) {
  let rest = $$0;
  debugger;
  $(rest);
  return undefined;
};
f();
f();
f();
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const rest = [];
  $(rest);
  return undefined;
};
f();
f();
f();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: []
 - 2: []
 - 3: []
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
