# Preval test case

# unkown_failing.md

> Let hoisting > Unkown failing
>
> ?

This was failing. Passing if A renames to x.

Caused by a regression in let hoisting.

## Input

`````js filename=intro
let A = false;
function f() {
  let y = 0;
  A = true;
  return y;
}
$(f);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let y = 0;
  A = true;
  return y;
};
let A = false;
$(f);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let y = 0;
  A = true;
  return y;
};
let A = false;
$(f);
`````

## Output


`````js filename=intro
const f = function () {
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
