# Preval test case

# unkown_passing.md

> Let hoisting > Unkown passing
>
> ?

This was passing. Failing if x renames to A.

Caused by a regression in let hoisting.

## Input

`````js filename=intro
let x = false;
function f() {
    let y = 0;
    x = true;
    return y;
}
$(f);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let y = 0;
  x = true;
  return y;
};
let x = false;
$(f);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let y = 0;
  x = true;
  return y;
};
let x = false;
$(f);
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  return 0;
};
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return 0;
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
