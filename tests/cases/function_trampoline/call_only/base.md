# Preval test case

# base.md

> Function trampoline > Call only > Base
>
> Calls to a function that only call another function should immediately call that other function instead 

#TODO

## Input

`````js filename=intro
function f() {
  $('inline me');
}
f();
f();
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $(`inline me`);
};
f();
f();
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(`inline me`);
  return undefined;
};
f();
f();
`````

## Output

`````js filename=intro
$(`inline me`);
$(`inline me`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'inline me'
 - 2: 'inline me'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
