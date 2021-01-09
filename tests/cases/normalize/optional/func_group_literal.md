# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
function f() {
  const y = (1, 2, 3)?.foo
  return $(y);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  var tmpOptionalChaining;
  var tmpTernaryTest;
  var tmpTernaryAlternate;
  1;
  2;
  tmpOptionalChaining = 3;
  tmpTernaryTest = tmpOptionalChaining == null;
  const y = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = tmpOptionalChaining.foo), tmpTernaryAlternate);
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
  var x;
  8;
  8;
  x = 8;
  x = x * x;
  var x = x ? x : ((x = x.x), x);
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
  tmpOptionalChaining = 3;
  tmpTernaryTest = tmpOptionalChaining == null;
  const y = tmpTernaryTest ? undefined : ((tmpTernaryAlternate = tmpOptionalChaining.foo), tmpTernaryAlternate);
  let tmpStmtArg = $(y);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````
