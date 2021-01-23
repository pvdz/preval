# Preval test case

# _base_call_func.md

> normalize > optional > _base_call_func
>
> Simple example

#TODO

## Input

`````js filename=intro
function f(){}
$(f?.());
`````

## Normalized

`````js filename=intro
function f() {}
var tmpArg;
var tmpTernaryAlternate;
var tmpTernaryTest;
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpTernaryAlternate` decl without init>');
('<hoisted var `tmpTernaryTest` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpTernaryAlternate` decl without init>');
('<hoisted var `tmpTernaryTest` decl without init>');
('<hoisted var `tmpArg` decl without init>');
('<hoisted var `tmpTernaryAlternate` decl without init>');
('<hoisted var `tmpTernaryTest` decl without init>');
tmpTernaryTest = f == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = f();
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Output

`````js filename=intro
function f() {}
var tmpArg;
var tmpTernaryAlternate;
var tmpTernaryTest;
tmpTernaryTest = f == null;
if (tmpTernaryTest) {
  tmpArg = undefined;
} else {
  tmpTernaryAlternate = f();
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
