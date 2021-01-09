# Preval test case

# global_call_prop.md

> normalize > member_access > global_call_prop
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  return $(parseInt(15)??foo);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpArg;
  var tmpNullish;
  var tmpTernaryTest;
  {
    tmpNullish = parseInt(15);
    tmpTernaryTest = tmpNullish == null;
    tmpArg = tmpTernaryTest ? foo : tmpNullish;
    let tmpStmtArg = $(tmpArg);
    return tmpStmtArg;
  }
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````

## Uniformed

`````js filename=intro
function x() {
  var x;
  var x;
  var x;
  {
    x = x(8);
    x = x * x;
    x = x ? x : x;
    var x = x(x);
    return x;
  }
}
var x;
x = x();
x(x);
`````

## Output

`````js filename=intro
function f() {
  var tmpArg;
  var tmpNullish;
  var tmpTernaryTest;
  tmpNullish = parseInt(15);
  tmpTernaryTest = tmpNullish == null;
  tmpArg = tmpTernaryTest ? foo : tmpNullish;
  let tmpStmtArg = $(tmpArg);
  return tmpStmtArg;
}
var tmpArg_1;
tmpArg_1 = f();
$(tmpArg_1);
`````