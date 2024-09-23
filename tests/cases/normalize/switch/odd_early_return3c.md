# Preval test case

# odd_early_return3c.md

> Normalize > Switch > Odd early return3c
>
> Sorting out the branching stuff

Regression was not inlining a single used function

## Input

`````js filename=intro
function a() {
  function f() {
    let x = 1;
    f();
    $(x);
  }
  function g() {
    $('x');
    $('y');
    $('z');
    return $(2);
  }
  return g();
}
$(a);
`````

## Pre Normal


`````js filename=intro
let a = function () {
  debugger;
  let f = function () {
    debugger;
    let x = 1;
    f();
    $(x);
  };
  let g = function () {
    debugger;
    $(`x`);
    $(`y`);
    $(`z`);
    return $(2);
  };
  return g();
};
$(a);
`````

## Normalized


`````js filename=intro
let a = function () {
  debugger;
  let f = function () {
    debugger;
    let x = 1;
    f();
    $(x);
    return undefined;
  };
  let g = function () {
    debugger;
    $(`x`);
    $(`y`);
    $(`z`);
    const tmpReturnArg = $(2);
    return tmpReturnArg;
  };
  const tmpReturnArg$1 = g();
  return tmpReturnArg$1;
};
$(a);
`````

## Output


`````js filename=intro
const a /*:()=>?*/ = function () {
  debugger;
  $(`x`);
  $(`y`);
  $(`z`);
  const tmpReturnArg = $(2);
  return tmpReturnArg;
};
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "x" );
  $( "y" );
  $( "z" );
  const b = $( 2 );
  return b;
};
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
