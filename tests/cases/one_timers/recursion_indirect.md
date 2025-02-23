# Preval test case

# recursion_indirect.md

> One timers > Recursion indirect
>
> This was triggering a problem in another test. Turns out to be caused by recursion.

The single call was being inlined but that led to an implosion of the function.

## Input

`````js filename=intro
function f() {
  let x = 1;
  const g = function() {
    x = 2;
  };
  if ($) {
    f();
  }
  $(x);
}
// Do not call f(). That did not trigger the path.
// Yes that means this test ends with an empty output. Or should, anyways.
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  const g = function () {
    debugger;
    x = 2;
  };
  if ($) {
    f();
  }
  $(x);
};
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  const g = function () {
    debugger;
    x = 2;
    return undefined;
  };
  if ($) {
    f();
  } else {
  }
  $(x);
  return undefined;
};
`````

## Output


`````js filename=intro
const f /*:()=>*/ = function () {
  debugger;
  if ($) {
    f();
  } else {
  }
  $(1);
  return undefined;
};
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if ($) {
    a();
  }
  $( 1 );
  return undefined;
};
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
