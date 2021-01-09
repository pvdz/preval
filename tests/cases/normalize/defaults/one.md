# Preval test case

# one.md

> normalize > defaults > one
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo") { 
  return a; 
}

$(f('x'));
$(f());
`````

## Normalized

`````js filename=intro
function f($tdz$__a) {
  {
    let a;
    {
      let ifTestTmp = $tdz$__a === undefined;
      if (ifTestTmp) {
        a = 'foo';
      } else {
        a = $tdz$__a;
      }
    }
  }
  return a;
}
var tmpArg;
var tmpArg_1;
tmpArg = f('x');
$(tmpArg);
tmpArg_1 = f();
$(tmpArg_1);
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
var x;
x = x('str');
x(x);
x = x();
x(x);
`````

## Output

`````js filename=intro
function f($tdz$__a) {
  let a;
  let ifTestTmp = $tdz$__a === undefined;
  if (ifTestTmp) {
    a = 'foo';
  } else {
    a = $tdz$__a;
  }
  return a;
}
var tmpArg;
var tmpArg_1;
tmpArg = f('x');
$(tmpArg);
tmpArg_1 = f();
$(tmpArg_1);
`````
