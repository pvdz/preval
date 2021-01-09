# Preval test case

# default_no_no__obj_123.md

> normalize > pattern >  > param > obj > rest > default_no_no__obj_123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({ ...x } = $({ a: 'fail' })) {
  return x;
}
$(f({ x: 1, b: 2, c: 3 }, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  {
    let $tdz$__pattern_after_default;
    {
      let ifTestTmp = $tdz$__pattern === undefined;
      if (ifTestTmp) {
        tmpArg = { a: 'fail' };
        $tdz$__pattern_after_default = $(tmpArg);
      } else {
        $tdz$__pattern_after_default = $tdz$__pattern;
      }
    }
  }
  let x = objPatternRest($tdz$__pattern_after_default, []);
  return x;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: 1, b: 2, c: 3 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````

## Uniformed

`````js filename=intro
function x(x) {
  var x;
  {
    var x;
    {
      var x = x * x;
      if (x) {
        x = { x: 'str' };
        x = x(x);
      } else {
        x = x;
      }
    }
  }
  var x = x(x, []);
  return x;
}
var x;
var x;
x = { x: 8, x: 8, x: 8 };
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  var tmpArg;
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    tmpArg = { a: 'fail' };
    $tdz$__pattern_after_default = $(tmpArg);
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  let x = objPatternRest($tdz$__pattern_after_default, []);
  return x;
}
var tmpArg_1;
var tmpArg_2;
tmpArg_2 = { x: 1, b: 2, c: 3 };
tmpArg_1 = f(tmpArg_2, 10);
$(tmpArg_1);
`````
