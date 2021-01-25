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
  let a;
  const tmpIfTest = $tdz$__a === undefined;
  if (tmpIfTest) {
    a = b;
  } else {
    a = $tdz$__a;
  }
  let b;
  const tmpIfTest$1 = $tdz$__b === undefined;
  if (tmpIfTest$1) {
    b = 'bar';
  } else {
    b = $tdz$__b;
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
  const tmpIfTest = $tdz$__a === undefined;
  if (tmpIfTest) {
    a = b;
  } else {
    a = $tdz$__a;
  }
  let b;
  const tmpIfTest$1 = $tdz$__b === undefined;
  if (tmpIfTest$1) {
    b = 'bar';
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
 - 0: <crash[ Cannot access 'b' before initialization ]>

Normalized calls: Same

Final output calls: Same
