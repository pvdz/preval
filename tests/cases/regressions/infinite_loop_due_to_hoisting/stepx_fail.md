# Preval test case

# stepx_fail.md

> Regressions > Infinite loop due to hoisting > Stepx fail
>
> This was after some steps. I think it should be finished here.

## Input

`````js filename=intro
function g() {}
var tmpBinaryLeft;
var tmpArg;
var tmpTernaryTest;
tmpBinaryLeft = a.x;
tmpTernaryTest = tmpBinaryLeft !== 1;
if (tmpTernaryTest) {
  tmpArg = 2;
} else {
  tmpArg = 3;
}
f(tmpArg);
`````

## Pre Normal


`````js filename=intro
let tmpArg = undefined;
let tmpBinaryLeft = undefined;
let tmpTernaryTest = undefined;
let g = function () {
  debugger;
};
tmpBinaryLeft = a.x;
tmpTernaryTest = tmpBinaryLeft !== 1;
if (tmpTernaryTest) {
  tmpArg = 2;
} else {
  tmpArg = 3;
}
f(tmpArg);
`````

## Normalized


`````js filename=intro
let tmpArg = undefined;
let tmpBinaryLeft = undefined;
let tmpTernaryTest = undefined;
let g = function () {
  debugger;
  return undefined;
};
tmpBinaryLeft = a.x;
tmpTernaryTest = tmpBinaryLeft !== 1;
if (tmpTernaryTest) {
  tmpArg = 2;
} else {
  tmpArg = 3;
}
f(tmpArg);
`````

## Output


`````js filename=intro
const tmpBinaryLeft = a.x;
const tmpTernaryTest = tmpBinaryLeft === 1;
if (tmpTernaryTest) {
  f(3);
} else {
  f(2);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = a.x;
const b = a === 1;
if (b) {
  f( 3 );
}
else {
  f( 2 );
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

a, f

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
