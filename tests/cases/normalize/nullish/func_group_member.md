# Preval test case

# global_group_call.md

> normalize > member_access > global_group_call
>
> Counter test to ensure we still process groups that don't end with an ident or literal

## Input

`````js filename=intro
function f() {
  const y = (1, 2, $())??foo
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpNullish;
  var tmpTernaryTest;
  1;
  2;
  tmpNullish = $();
  tmpTernaryTest = tmpNullish == null;
  {
    let y;
    if (tmpTernaryTest) {
      y = foo;
    } else {
      y = tmpNullish;
    }
  }
  {
    let tmpStmtArg = $(y);
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
  8;
  8;
  x = x();
  x = x * x;
  {
    var x;
    if (x) {
      x = x;
    } else {
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
  var tmpNullish;
  var tmpTernaryTest;
  tmpNullish = $();
  tmpTernaryTest = tmpNullish == null;
  let y;
  if (tmpTernaryTest) {
    y = foo;
  } else {
    y = tmpNullish;
  }
  let tmpStmtArg = $(y);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
