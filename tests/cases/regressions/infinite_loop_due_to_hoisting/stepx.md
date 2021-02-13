# Preval test case

# stepx.md

> regressions > infinite_loop_due_to_hoisting > stepx
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
function g() {}
var tmpArg;
var tmpBinaryLeft;
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

## Output

`````js filename=intro
function g() {}
var tmpArg;
var tmpBinaryLeft;
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

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Normalized calls: Same

Final output calls: Same