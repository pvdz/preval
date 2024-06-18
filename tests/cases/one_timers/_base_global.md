# Preval test case

# _base_global.md

> One timers > Base global
>
> Functions that are called once should be inlined when possible

## Input

`````js filename=intro
function f() {
  $(1);
}
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  $(1);
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return undefined;
};
f();
`````

## Output


`````js filename=intro
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
