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
  let a;
  {
    let ifTestTmp = $tdz$__a === undefined;
    if (ifTestTmp) {
      a = 'foo';
    } else {
      a = $tdz$__a;
    }
  }
  let b;
  {
    let ifTestTmp_1 = $tdz$__b === undefined;
    if (ifTestTmp_1) {
      b = a;
    } else {
      b = $tdz$__b;
    }
  }
  {
    let tmpReturnArg = [a, b];
    return tmpReturnArg;
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
  let a;
  let ifTestTmp = $tdz$__a === undefined;
  if (ifTestTmp) {
    a = 'foo';
  } else {
    a = $tdz$__a;
  }
  let b;
  let ifTestTmp_1 = $tdz$__b === undefined;
  if (ifTestTmp_1) {
    b = a;
  } else {
    b = $tdz$__b;
  }
  let tmpReturnArg = [a, b];
  return tmpReturnArg;
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
 - 0: ["foo","foo"]
 - 1: ["x","x"]
 - 2: ["foo","y"]
 - 3: ["x","y"]
 - 4: undefined

Normalized calls: Same

Final output calls: Same
