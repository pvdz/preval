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
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  {
    tmpOptionalChaining = parseInt(15);
    tmpTernaryTest = tmpOptionalChaining == null;
    if (tmpTernaryTest) {
      tmpArg = undefined;
    } else {
      tmpTernaryAlternate = tmpOptionalChaining.foo;
      tmpArg = tmpTernaryAlternate;
    }
    let tmpStmtArg = $(tmpArg);
    return tmpStmtArg;
  }
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  tmpOptionalChaining = parseInt(15);
  tmpTernaryTest = tmpOptionalChaining == null;
  if (tmpTernaryTest) {
    tmpArg = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining.foo;
    tmpArg = tmpTernaryAlternate;
  }
  let tmpStmtArg = $(tmpArg);
  return tmpStmtArg;
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Result

Should call `$` with:
[[null], [null], null];

Normalized calls: Same

Final output calls: Same
