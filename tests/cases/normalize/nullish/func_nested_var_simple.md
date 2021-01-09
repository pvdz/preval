# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Want to make sure we don't accidentally screw up ordering with multiple var decls

If a group normalization would "hoist" the inits outside of the var decls without separating the decls themselves then we walk right into the TDZ.

## Input

`````js filename=intro
function f() {
  const a = 10,
        b = $(2)??toString,
        c = b??length
  return $(c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpNullish;
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  const a = 10;
  tmpNullish = $(2);
  tmpTernaryTest = tmpNullish == null;
  const b = tmpTernaryTest ? toString : tmpNullish;
  b = b;
  tmpTernaryTest_1 = b == null;
  const c = tmpTernaryTest_1 ? length : b;
  {
    let tmpStmtArg = $(c);
    return tmpStmtArg;
  }
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x() {
  var x;
  var x;
  var x;
  var x = 8;
  x = x(8);
  x = x * x;
  var x = x ? x : x;
  x = x;
  x = x * x;
  var x = x ? x : x;
  {
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
  var tmpNullish;
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  tmpNullish = $(2);
  tmpTernaryTest = tmpNullish == null;
  const b = tmpTernaryTest ? toString : tmpNullish;
  b = b;
  tmpTernaryTest_1 = b == null;
  const c = tmpTernaryTest_1 ? length : b;
  let tmpStmtArg = $(c);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
