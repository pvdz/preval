# Preval test case

# default_yes__undefined.md

> normalize > pattern >  > param > ident > default_yes__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f(x = 'pass') {
  return x;
}
$(f(undefined, 200));
`````

## Normalized

`````js filename=intro
function f($tdz$__x) {
  {
    let x;
    {
      let ifTestTmp = $tdz$__x === undefined;
      if (ifTestTmp) {
        x = 'pass';
      } else {
        x = $tdz$__x;
      }
    }
  }
  return x;
}
var tmpArg;
tmpArg = f(undefined, 200);
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
        x = 'str';
      } else {
        x = x;
      }
    }
  }
  return x;
}
var x;
x = x(x, 8);
x(x);
`````

## Output

`````js filename=intro
function f($tdz$__x) {
  let x;
  let ifTestTmp = $tdz$__x === undefined;
  if (ifTestTmp) {
    x = 'pass';
  } else {
    x = $tdz$__x;
  }
  return x;
}
var tmpArg;
tmpArg = f(undefined, 200);
$(tmpArg);
`````
