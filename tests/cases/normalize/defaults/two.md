# Preval test case

# two.md

> normalize > defaults > two
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo", b = "bar") { 
  return [a, b]; 
}

$(f());
$(f('x'));
$(f(undefined, 'y'));
$(f('x', 'y'));
`````

## Normalized

`````js filename=intro
function f($tdz$__a, $tdz$__b) {
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  tmpTernaryTest = $tdz$__b === undefined;
  let b = tmpTernaryTest ? 'bar' : $tdz$__b;
  tmpTernaryTest_1 = $tdz$__a === undefined;
  let a = tmpTernaryTest_1 ? 'foo' : $tdz$__a;
  {
    let tmpStmtArg = [a, b];
    return tmpStmtArg;
  }
}
var tmpArg;
var tmpArg_1;
var tmpArg_2;
var tmpArg_3;
tmpArg = f();
$(tmpArg);
tmpArg_1 = f('x');
$(tmpArg_1);
tmpArg_2 = f(undefined, 'y');
$(tmpArg_2);
tmpArg_3 = f('x', 'y');
$(tmpArg_3);
`````

## Uniformed

`````js filename=intro
function x(x, x) {
  var x;
  var x;
  x = x * x;
  var x = x ? 'str' : x;
  x = x * x;
  var x = x ? 'str' : x;
  {
    var x = [x, x];
    return x;
  }
}
var x;
var x;
var x;
var x;
x = x();
x(x);
x = x('str');
x(x);
x = x(x, 'str');
x(x);
x = x('str', 'str');
x(x);
`````

## Output

`````js filename=intro
function f($tdz$__a, $tdz$__b) {
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  tmpTernaryTest = $tdz$__b === undefined;
  let b = tmpTernaryTest ? 'bar' : $tdz$__b;
  tmpTernaryTest_1 = $tdz$__a === undefined;
  let a = tmpTernaryTest_1 ? 'foo' : $tdz$__a;
  let tmpStmtArg = [a, b];
  return tmpStmtArg;
}
var tmpArg;
var tmpArg_1;
var tmpArg_2;
var tmpArg_3;
tmpArg = f();
$(tmpArg);
tmpArg_1 = f('x');
$(tmpArg_1);
tmpArg_2 = f(undefined, 'y');
$(tmpArg_2);
tmpArg_3 = f('x', 'y');
$(tmpArg_3);
`````
