# Preval test case

# stepx.md

> Regressions > Infinite loop due to hoisting > Stepx
>
> This was after some steps. I think it should be finished here.

#TODO

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

## Normalized

`````js filename=intro
let tmpArg = undefined;
let tmpBinaryLeft = undefined;
let tmpTernaryTest = undefined;
let g = function () {};
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
let tmpArg = undefined;
const SSA_tmpBinaryLeft = a.x;
const SSA_tmpTernaryTest = SSA_tmpBinaryLeft === 1;
if (SSA_tmpTernaryTest) {
  tmpArg = 2;
} else {
  tmpArg = 3;
}
f(tmpArg);
`````

## Globals

BAD@! Found 2 implicit global bindings:

a, f

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same
