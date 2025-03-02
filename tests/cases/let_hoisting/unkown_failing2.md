# Preval test case

# unkown_failing2.md

> Let hoisting > Unkown failing2
>
> ?

This was failing. Passing if A renames to x.

Caused by a regression in let hoisting.

## Input

`````js filename=intro
let A = false;
let f = function () {
  let tmpssa2_A = undefined;
  let y = 0;
  tmpssa2_A = true;
  return y;
};
$(f);
`````

## Pre Normal


`````js filename=intro
let A = false;
let f = function () {
  debugger;
  let tmpssa2_A = undefined;
  let y = 0;
  tmpssa2_A = true;
  return y;
};
$(f);
`````

## Normalized


`````js filename=intro
let A = false;
let f = function () {
  debugger;
  let tmpssa2_A = undefined;
  let y = 0;
  tmpssa2_A = true;
  return y;
};
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
