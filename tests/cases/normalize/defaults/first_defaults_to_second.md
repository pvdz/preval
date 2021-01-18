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

## Result

Should call `$` with:
["<crash[ Cannot access 'b' before initialization ]>"];

Normalized calls: BAD?!
['<crash[ <ref> is not defined ]>'];

Final output calls: BAD!!
[[['bar', 'bar']], [['x', 'bar']], [['y', 'y']], [['x', 'y']], null];

