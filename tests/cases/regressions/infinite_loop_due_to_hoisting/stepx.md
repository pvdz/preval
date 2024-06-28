# Preval test case

# stepx.md

> Regressions > Infinite loop due to hoisting > Stepx
>
> This was after some steps. I think it should be finished here.

## Input

`````js filename=intro
function g() {}
var tmpBinaryLeft;
var tmpArg;
var tmpTernaryTest;
tmpBinaryLeft = a.x;
tmpTernaryTest = tmpBinaryLeft === 1;
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
tmpTernaryTest = tmpBinaryLeft === 1;
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
tmpTernaryTest = tmpBinaryLeft === 1;
if (tmpTernaryTest) {
  tmpArg = 2;
} else {
  tmpArg = 3;
}
f(tmpArg);
`````

## Output


`````js filename=intro
const tmpClusterSSA_tmpBinaryLeft = a.x;
const tmpClusterSSA_tmpTernaryTest = tmpClusterSSA_tmpBinaryLeft === 1;
if (tmpClusterSSA_tmpTernaryTest) {
  f(2);
} else {
  f(3);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = a.x;
const b = a === 1;
if (b) {
  f( 2 );
}
else {
  f( 3 );
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
