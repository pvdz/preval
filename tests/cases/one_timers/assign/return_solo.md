# Preval test case

# return_solo.md

> One timers > Assign > Return solo
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
    $('a');
    $('b');
    return $('ab');
  }
  g();
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
$(`a`);
$(`b`);
$(`ab`);
$(`c`);
$(undefined);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$(`a`);
$(`b`);
$(`ab`);
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
    $(`a`);
    $(`b`);
    return $(`ab`);
  };
  g();
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
    $(`a`);
    $(`b`);
    const tmpReturnArg = $(`ab`);
    return tmpReturnArg;
  };
  g();
  $(`c`);
  return undefined;
};
let x = $(100);
const tmpCalleeParam = closure();
$(tmpCalleeParam);
x = f();
$(x);
const tmpCalleeParam$1 = closure();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
$( "a" );
$( "b" );
$( "ab" );
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
 - 3: 'a'
 - 4: 'b'
 - 5: 'ab'
 - 6: 'c'
 - 7: undefined
 - 8: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
