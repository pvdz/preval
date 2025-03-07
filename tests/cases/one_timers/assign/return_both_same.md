# Preval test case

# return_both_same.md

> One timers > Assign > Return both same
>
> Functions that are called once should be inlined when possible

## Input

`````js filename=intro
let x = $(100);
function closure() {
  // This serves to keep x from being eliminated/SSA'd
  return x;
}
$(closure());

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

x = f(); // This x should not be SSA'd due to the closure
$(x);
$(closure());
`````

## Settled


`````js filename=intro
const x /*:unknown*/ = $(100);
$(x);
$(1);
$(`xyz`);
$(`c`);
$(undefined);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$(1);
$(`xyz`);
$(`c`);
$(undefined);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let closure = function () {
  debugger;
  return x;
};
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
let x = $(100);
$(closure());
x = f();
$(x);
$(closure());
`````

## Normalized


`````js filename=intro
let closure = function () {
  debugger;
  return x;
};
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
let x = $(100);
const tmpCalleeParam$1 = closure();
$(tmpCalleeParam$1);
x = f();
$(x);
const tmpCalleeParam$3 = closure();
$(tmpCalleeParam$3);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
$( 1 );
$( "xyz" );
$( "c" );
$( undefined );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 1
 - 4: 'xyz'
 - 5: 'c'
 - 6: undefined
 - 7: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
