# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $(parseInt(15)?.foo);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  var tmpOptionalChaining;
  var tmpTernaryAlternate;
  var tmpTernaryTest;
  {
    tmpOptionalChaining = parseInt(15);
    tmpTernaryTest = tmpOptionalChaining == null;
    if (tmpTernaryTest) {
      tmpArg = undefined;
    } else {
      tmpTernaryAlternate = tmpOptionalChaining.foo;
      tmpArg = tmpTernaryAlternate;
    }
    let tmpReturnArg = $(tmpArg);
    return tmpReturnArg;
  }
}
var tmpArg$1;
('<hoisted var `tmpArg$1` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
('<hoisted var `tmpArg$1` decl without init>');
tmpArg$1 = f();
$(tmpArg$1);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  var tmpOptionalChaining;
  var tmpTernaryAlternate;
  var tmpTernaryTest;
  tmpOptionalChaining = parseInt(15);
  tmpTernaryTest = tmpOptionalChaining == null;
  if (tmpTernaryTest) {
    tmpArg = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining.foo;
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
