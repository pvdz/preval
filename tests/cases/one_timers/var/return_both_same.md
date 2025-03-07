# Preval test case

# return_both_same.md

> One timers > Var > Return both same
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
const x = f();
$(x);
`````

## Settled


`````js filename=intro
$(1);
$(`xyz`);
$(`c`);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(`xyz`);
$(`c`);
$(undefined);
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
const x = f();
$(x);
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
const x = f();
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( "xyz" );
$( "c" );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'xyz'
 - 3: 'c'
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
