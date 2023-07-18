# Preval test case

# _base_global.md

> One timers > Var > Base global
>
> Functions that are called once should be inlined when possible

#TODO

## Input

`````js filename=intro
function f() {
  $(1);
}
const x = f();
$(x);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $(1);
};
const x = f();
$(x);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(1);
  return undefined;
};
const x = f();
$(x);
`````

## Output

`````js filename=intro
$(1);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
