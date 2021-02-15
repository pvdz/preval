# Preval test case

# step1.md

> regressions > func_call_ternary > step1
>
> Minimal test case for an infinite loop at some point. This is after one step of normalization (at the time).

This would be the reported output after one step. However, on its own it would work fine (so the problem must have been state in the AST).

#TODO

## Input

`````js filename=intro
function g() {}
var tmpBinaryLeft;
var tmpArg;
var tmpTernaryTest;
(tmpTernaryTest = ((tmpBinaryLeft = a.x), tmpBinaryLeft === 1)), (tmpArg = tmpTernaryTest ? 2 : 3);
f(tmpArg);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpTernaryTest;
function g() {}
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
var tmpArg;
function g() {}
const tmpBinaryLeft = a.x;
const tmpTernaryTest = tmpBinaryLeft === 1;
if (tmpTernaryTest) {
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
