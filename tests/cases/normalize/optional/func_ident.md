# Preval test case

# global_ident.md

> normalize > member_access > global_ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
function f() {
  return $(global?.foo);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  var tmpTernaryAlternate;
  var tmpTernaryTest;
  tmpTernaryTest = global == null;
  if (tmpTernaryTest) {
    tmpArg = undefined;
  } else {
    tmpTernaryAlternate = global.foo;
    tmpArg = tmpTernaryAlternate;
  }
  let tmpReturnArg = $(tmpArg);
  return tmpReturnArg;
}
var tmpArg$1;
('<hoisted func decl `f`>');
tmpArg$1 = f();
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  var tmpTernaryAlternate;
  var tmpTernaryTest;
  tmpTernaryTest = global == null;
  if (tmpTernaryTest) {
    tmpArg = undefined;
  } else {
    tmpTernaryAlternate = global.foo;
    tmpArg = tmpTernaryAlternate;
  }
  let tmpReturnArg = $(tmpArg);
  return tmpReturnArg;
}
var tmpArg$1;
tmpArg$1 = f();
$(tmpArg$1);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: null
 - 2: undefined

Normalized calls: Same

Final output calls: Same
