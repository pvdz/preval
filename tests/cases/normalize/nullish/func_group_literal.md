# Preval test case

# global_group_literal.md

> normalize > member_access > global_group_literal
>
> We shouldn't transform member expressions on group ending in a literal

#TODO

## Input

`````js filename=intro
function f() {
  const y = (1, 2, 3)??foo
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
  tmpNullish = 3;
  tmpTernaryTest = tmpNullish == null;
  const y = tmpTernaryTest ? foo : tmpNullish;
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
  x = 8;
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
  tmpNullish = 3;
  tmpTernaryTest = tmpNullish == null;
  const y = tmpTernaryTest ? foo : tmpNullish;
  let tmpStmtArg = $(y);
  return tmpStmtArg;
}
var tmpArg;
tmpArg = f();
$(tmpArg);
`````