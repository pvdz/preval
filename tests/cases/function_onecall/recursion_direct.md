# Preval test case

# recursion_direct.md

> Function onecall > Recursion direct
>
> Ouroboros! This was triggering a problem in another test. Turns out to be caused by recursion.

#TODO

## Input

`````js filename=intro
function f() {
  let x = 1;
  f();
  $(x);
}
// Do not call f(). That did not trigger the path.
// Yes that means this test ends with an empty output. Or should, anyways.
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  f();
  $(x);
};
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  f();
  $(x);
  return undefined;
};
`````

## Output

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same