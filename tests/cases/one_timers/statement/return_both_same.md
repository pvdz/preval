# Preval test case

# return_both_same.md

> One timers > Statement > Return both same
>
> Functions that are called once should be inlined when possible

## Input

`````js filename=intro
function f() {
  function g() {
    if ($(1)) {
      return 'xyz';
    } else {
      return 'xyz';
    }
  }
  $(g());
  $('c');
}
f();
`````

## Settled


`````js filename=intro
$(1);
$(`xyz`);
$(`c`);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(`xyz`);
$(`c`);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    if ($(1)) {
      return `xyz`;
    } else {
      return `xyz`;
    }
  };
  $(g());
  $(`c`);
};
f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    const tmpIfTest = $(1);
    return `xyz`;
  };
  const tmpCalleeParam = g();
  $(tmpCalleeParam);
  $(`c`);
  return undefined;
};
f();
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( "xyz" );
$( "c" );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'xyz'
 - 3: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
