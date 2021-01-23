# Preval test case

# minimal.md

> regressions > infinite_loop_due_to_hoisting > minimal
>
> Minimal test case for an infinite loop at some point. The problem was hoisting triggering "changes" when there weren't any.

#TODO

## Input

`````js filename=intro
function g() {}
f(a.x === 1 ? 2 : 3);
`````

## Normalized

`````js filename=intro
function g() {}
var tmpArg;
var tmpBinaryLeft;
var tmpTernaryTest;
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpBinaryLeft` decl without init>');
('<hoisted var `tmpTernaryTest` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpBinaryLeft` decl without init>');
('<hoisted var `tmpTernaryTest` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpTernaryTest` decl without init>');
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
 - 0: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same
