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
    let ifTestTmp$1 = $tdz$__b === undefined;
    if (ifTestTmp$1) {
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
var tmpArg$1;
var tmpArg$2;
var tmpArg$3;
('<hoisted func decl `f`>');
tmpArg = f();
$(tmpArg);
tmpArg$1 = f('x');
$(tmpArg$1);
tmpArg$2 = f(undefined, 'y');
$(tmpArg$2);
tmpArg$3 = f('x', 'y');
$(tmpArg$3);
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
  let ifTestTmp$1 = $tdz$__b === undefined;
  if (ifTestTmp$1) {
    b = a;
  } else {
    b = $tdz$__b;
  }
  let tmpReturnArg = [a, b];
  return tmpReturnArg;
}
var tmpArg;
var tmpArg$1;
var tmpArg$2;
var tmpArg$3;
tmpArg = f();
$(tmpArg);
tmpArg$1 = f('x');
$(tmpArg$1);
tmpArg$2 = f(undefined, 'y');
$(tmpArg$2);
tmpArg$3 = f('x', 'y');
$(tmpArg$3);
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
