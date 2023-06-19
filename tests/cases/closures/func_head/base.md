# Preval test case

# base.md

> Closures > Func head > Base
>
> The idea is that closures that appear in the tail of a function could also be updated as a return value, reducing the number of closures.

#TODO

## Input

`````js filename=intro
let x = $(5);
function f(){
 $(x); // f(x); $(y);
 ++x;
}

f();
f();
$(x);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  $(x);
  ++x;
};
let x = $(5);
f();
f();
$(x);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  $(x);
  x = x + 1;
  return undefined;
};
let x = $(5);
f();
f();
$(x);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  $(x);
  x = x + 1;
  return undefined;
};
let x = $(5);
f();
f();
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 5
 - 3: 6
 - 4: 7
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same