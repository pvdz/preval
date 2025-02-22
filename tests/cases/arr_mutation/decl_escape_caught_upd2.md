# Preval test case

# decl_escape_caught_upd2.md

> Arr mutation > Decl escape caught upd2
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
function f(a) {
  a[0] = 2;
}
const arr = 1;
f(arr);
arr[0] = 1;
arr[0] = 'x';
$(arr);
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let a = $$0;
  debugger;
  a[0] = 2;
};
const arr = 1;
f(arr);
arr[0] = 1;
arr[0] = `x`;
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
const arr = 1;
f(arr);
arr[0] = 1;
arr[0] = `x`;
$(arr);
`````

## Output


`````js filename=intro
(1)[0] = 2;
(1)[0] = 1;
(1)[0] = `x`;
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
1[0] = 2;
1[0] = 1;
1[0] = "x";
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot create property '0' on number '1' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
