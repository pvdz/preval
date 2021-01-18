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
var tmpTernaryTest;
var tmpTernaryAlternate;
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
var tmpTernaryTest;
var tmpTernaryAlternate;
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
[[10], null];

Normalized calls: Same

Final output calls: Same
