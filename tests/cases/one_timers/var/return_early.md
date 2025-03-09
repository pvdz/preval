# Preval test case

# return_early.md

> One timers > Var > Return early
>
> Functions that are called once should be inlined when possible

## Input

`````js filename=intro
function f() {
  function g() {
    if ($(1)) {
      return $('a');
    }
    $('b');
  }
  g();
  $('c');
}
const x = f();
$(x);
`````

## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(`a`);
  $(`c`);
  $(undefined);
} else {
  $(`b`);
  $(`c`);
  $(undefined);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(`a`);
  $(`c`);
  $(undefined);
} else {
  $(`b`);
  $(`c`);
  $(undefined);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    if ($(1)) {
      return $(`a`);
    }
    $(`b`);
  };
  g();
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
    if (tmpIfTest) {
      const tmpReturnArg = $(`a`);
      return tmpReturnArg;
    } else {
      $(`b`);
      return undefined;
    }
  };
  g();
  $(`c`);
  return undefined;
};
const x = f();
$(x);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "a" );
  $( "c" );
  $( undefined );
}
else {
  $( "b" );
  $( "c" );
  $( undefined );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 1
 - 2: 'a'
 - 3: 'c'
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
