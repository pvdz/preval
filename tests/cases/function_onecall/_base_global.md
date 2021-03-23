# Preval test case

# _base_global.md

> Function onecall > Base global
>
> Functions that are called once should be inlined when possible

#TODO

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
};
f();
`````

## Output

`````js filename=intro
$(1);
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
