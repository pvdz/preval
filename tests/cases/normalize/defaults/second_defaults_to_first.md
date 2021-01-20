# Preval test case

# second_defaults_to_first.md

> normalize > defaults > second_defaults_to_first
>
> Rewrite function param defaults to equivalent body code

## Input

`````js filename=intro
function f(a = "foo", b = a) { 
  return [a, b]; 
}

$(f()); // [foo, foo]
$(f('x')); // [x, x]
$(f(undefined, 'y')); // [foo, y]
$(f('x', 'y')); // [x, y]
`````

## Normalized

`````js filename=intro
function f($tdz$__a, $tdz$__b) {
  let b;
  {
    let ifTestTmp = $tdz$__b === undefined;
    if (ifTestTmp) {
      b = a;
    } else {
      b = $tdz$__b;
    }
  }
  let a;
  {
    let ifTestTmp_1 = $tdz$__a === undefined;
    if (ifTestTmp_1) {
      a = 'foo';
    } else {
      a = $tdz$__a;
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
    b = a;
  } else {
    b = $tdz$__b;
  }
  let a;
  let ifTestTmp_1 = $tdz$__a === undefined;
  if (ifTestTmp_1) {
    a = 'foo';
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
[[['foo', 'foo']], [['x', 'x']], [['foo', 'y']], [['x', 'y']], null];

Normalized calls: BAD?!
["<crash[ Cannot access 'a' before initialization ]>"];

Final output calls: BAD!!
["<crash[ Cannot access 'a' before initialization ]>"];

