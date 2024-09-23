# Preval test case

# base.md

> Closures > Func tail > Base
>
> The idea is that closures that appear in the tail of a function could also be updated as a return value, reducing the number of closures.

## Input

`````js filename=intro
let x = 5;
function f(){
 $(x);
 ++x; // `return x + 1; x = f();` sort of deal
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
let x = 5;
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
let x = 5;
f();
f();
$(x);
`````

## Output


`````js filename=intro
const f /*:()=>*/ = function () {
  debugger;
  $(x);
  x = x + 1;
  return undefined;
};
let x = 5;
f();
f();
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( b );
  b = b + 1;
  return undefined;
};
let b = 5;
a();
a();
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 6
 - 3: 7
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
