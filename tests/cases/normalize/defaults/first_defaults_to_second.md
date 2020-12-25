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
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  tmpTernaryTest = $tdz$__b === undefined;
  let b = tmpTernaryTest ? 'bar' : $tdz$__b;
  tmpTernaryTest_1 = $tdz$__a === undefined;
  let a = tmpTernaryTest_1 ? b : $tdz$__a;
  return [a, b];
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
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  tmpTernaryTest = $tdz$__b === undefined;
  let b = tmpTernaryTest ? 'bar' : $tdz$__b;
  tmpTernaryTest_1 = $tdz$__a === undefined;
  let a = tmpTernaryTest_1 ? b : $tdz$__a;
  return [a, b];
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
