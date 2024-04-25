# Preval test case

# decl_upd_escape_caught.md

> Arr mutation > Decl upd escape caught
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
function f(a) {
  a[0] = 2;
}
const arr = [];
arr[0] = 1;
f(arr);
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
arr[0] = 1;
f(arr);
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
arr[0] = 1;
f(arr);
$(arr);
`````

## Output

`````js filename=intro
const arr = [2];
$(arr);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 2 ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [2]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
