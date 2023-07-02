# Preval test case

# decl_escape_caught_upd.md

> Arr mutation > Decl escape caught upd
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
function f(a) {
  a[0] = 2;
}
const arr = [];
f(arr);
arr[0] = 1;
$(arr);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  a[0] = 2;
};
const arr = [];
f(arr);
arr[0] = 1;
$(arr);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  a[0] = 2;
  return undefined;
};
const arr = [];
f(arr);
arr[0] = 1;
$(arr);
`````

## Output

`````js filename=intro
const arr = [1];
$(arr);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
