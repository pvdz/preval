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
        b = (a, $(2))?.toString,
        c = (1, b)?.length
  return $(c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  var tmpOptionalChaining_1;
  var tmpTernaryTest_1;
  var tmpTernaryAlternate_1;
  const a = 10;
  a;
  tmpOptionalChaining = $(2);
  tmpTernaryTest = tmpOptionalChaining == null;
  {
    let b;
    if (tmpTernaryTest) {
      b = undefined;
    } else {
      tmpTernaryAlternate = tmpOptionalChaining.toString;
      b = tmpTernaryAlternate;
    }
  }
  1;
  tmpOptionalChaining_1 = b;
  tmpTernaryTest_1 = tmpOptionalChaining_1 == null;
  {
    let c;
    if (tmpTernaryTest_1) {
      c = undefined;
    } else {
      tmpTernaryAlternate_1 = tmpOptionalChaining_1.length;
      c = tmpTernaryAlternate_1;
    }
  }
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
  var x;
  var x;
  var x;
  var x = 8;
  x;
  x = x(8);
  x = x * x;
  {
    var x;
    if (x) {
      x = x;
    } else {
      x = x.x;
      x = x;
    }
  }
  8;
  x = x;
  x = x * x;
  {
    var x;
    if (x) {
      x = x;
    } else {
      x = x.x;
      x = x;
    }
  }
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
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  var tmpOptionalChaining_1;
  var tmpTernaryTest_1;
  var tmpTernaryAlternate_1;
  tmpOptionalChaining = $(2);
  tmpTernaryTest = tmpOptionalChaining == null;
  let b;
  if (tmpTernaryTest) {
    b = undefined;
  } else {
    tmpTernaryAlternate = tmpOptionalChaining.toString;
    b = tmpTernaryAlternate;
  }
  tmpOptionalChaining_1 = b;
  tmpTernaryTest_1 = tmpOptionalChaining_1 == null;
  let c;
  if (tmpTernaryTest_1) {
    c = undefined;
  } else {
    tmpTernaryAlternate_1 = tmpOptionalChaining_1.length;
    c = tmpTernaryAlternate_1;
  }
  let tmpStmtArg = $(c);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
