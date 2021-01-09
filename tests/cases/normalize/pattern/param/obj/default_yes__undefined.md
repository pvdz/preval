# Preval test case

# default_yes__undefined.md

> normalize > pattern >  > param > obj > default_yes__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f({} = $('pass')) {
  return 'ok';
}
$(f(undefined, 10));
`````

## Normalized

`````js filename=intro
function f($tdz$__pattern) {
  {
    let $tdz$__pattern_after_default;
    {
      let ifTestTmp = $tdz$__pattern === undefined;
      if (ifTestTmp) {
        $tdz$__pattern_after_default = $('pass');
      } else {
        $tdz$__pattern_after_default = $tdz$__pattern;
      }
    }
  }
  return 'ok';
}
var tmpArg;
tmpArg = f(undefined, 10);
$(tmpArg);
`````

## Uniformed

`````js filename=intro
function x(x) {
  {
    var x;
    {
      var x = x * x;
      if (x) {
        x = x('str');
      } else {
        x = x;
      }
    }
  }
  return 'str';
}
var x;
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f($tdz$__pattern) {
  let $tdz$__pattern_after_default;
  let ifTestTmp = $tdz$__pattern === undefined;
  if (ifTestTmp) {
    $tdz$__pattern_after_default = $('pass');
  } else {
    $tdz$__pattern_after_default = $tdz$__pattern;
  }
  return 'ok';
}
var tmpArg;
tmpArg = f(undefined, 10);
$(tmpArg);
`````
