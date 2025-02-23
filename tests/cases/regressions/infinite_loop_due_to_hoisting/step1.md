# Preval test case

# step1.md

> Regressions > Infinite loop due to hoisting > Step1
>
> Minimal test case for an infinite loop at some point. This is after one step of normalization (at the time).

This would be the reported output after one step. However, on its own it would work fine (so the problem must have been state in the AST).

## Input

`````js filename=intro
function g() {}
var tmpBinaryLeft;
var tmpArg;
var tmpTernaryTest;
(tmpTernaryTest = ((tmpBinaryLeft = a.x), tmpBinaryLeft === 1)), (tmpArg = tmpTernaryTest ? 2 : 3);
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
(tmpTernaryTest = ((tmpBinaryLeft = a.x), tmpBinaryLeft === 1)), (tmpArg = tmpTernaryTest ? 2 : 3);
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
const tmpClusterSSA_tmpBinaryLeft /*:unknown*/ = a.x;
const tmpClusterSSA_tmpTernaryTest /*:boolean*/ = tmpClusterSSA_tmpBinaryLeft === 1;
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
