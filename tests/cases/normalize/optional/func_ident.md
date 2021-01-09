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
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  {
    tmpTernaryTest = global == null;
    tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = global.foo), tmpTernaryAlternate);
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
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  tmpTernaryTest = global == null;
  tmpArg = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = global.foo), tmpTernaryAlternate);
  let tmpStmtArg = $(tmpArg);
  return tmpStmtArg;
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````