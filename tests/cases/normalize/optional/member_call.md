# Preval test case

# member_call.md

> normalize > optional > member_call
>
> Optional chaining fun

#TODO

## Input

`````js filename=intro
function f(){ return 10; }
$(f?.());
`````

## Normalized

`````js filename=intro
function f() {
  return 10;
}
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
function f() {
  return 10;
}
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
 - 0: 10
 - 1: undefined

Normalized calls: Same

Final output calls: Same
