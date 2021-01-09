# Preval test case

# first_defaults_to_second.md

> normalize > defaults > first_defaults_to_second
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = b, b = "bar") { 
  return [a, b]; 
}

$(f()); // runtime error
$(f('x')); // [x, bar]
$(f(undefined, 'y')); // runtime error
$(f('x', 'y')); // [x, y]
`````

## Normalized

`````js filename=intro
function f($tdz$__a, $tdz$__b) {
  {
    let b;
    {
      let ifTestTmp = $tdz$__b === undefined;
      if (ifTestTmp) {
        b = 'bar';
      } else {
        b = $tdz$__b;
      }
    }
  }
  {
    let a;
    {
      let ifTestTmp_1 = $tdz$__a === undefined;
      if (ifTestTmp_1) {
        a = b;
      } else {
        a = $tdz$__a;
      }
    }
  }
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
  {
    var x;
    {
      var x = x * x;
      if (x) {
        x = x;
      } else {
        x = x;
      }
    }
  }
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
  let b;
  let ifTestTmp = $tdz$__b === undefined;
  if (ifTestTmp) {
    b = 'bar';
  } else {
    b = $tdz$__b;
  }
  let a;
  let ifTestTmp_1 = $tdz$__a === undefined;
  if (ifTestTmp_1) {
    a = b;
  } else {
    a = $tdz$__a;
  }
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
