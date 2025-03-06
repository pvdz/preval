# Preval test case

# unused_param_only.md

> Rest > Param > Unused > Unused param only
>
> A function with a spread param that we know will not receive any args should be an empty array

## Input

`````js filename=intro
function f(...rest) {
  return $('fwep');
}
f();
`````

## Pre Normal


`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let rest = $$0;
  debugger;
  return $(`fwep`);
};
f();
`````

## Normalized


`````js filename=intro
let f = function (...$$0 /*:array*/) {
  let rest = $$0;
  debugger;
  const tmpReturnArg = $(`fwep`);
  return tmpReturnArg;
};
f();
`````

## Output


`````js filename=intro
$(`fwep`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "fwep" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'fwep'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- drop unused rest param?