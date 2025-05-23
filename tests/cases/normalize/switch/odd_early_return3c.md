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


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  f();
  $(1);
  return undefined;
};
const a /*:()=>unknown*/ = function () {
  debugger;
  $(`x`);
  $(`y`);
  $(`z`);
  const tmpReturnArg$1 /*:unknown*/ = $(2);
  return tmpReturnArg$1;
};
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  f();
  $(1);
};
$(function () {
  $(`x`);
  $(`y`);
  $(`z`);
  const tmpReturnArg$1 = $(2);
  return tmpReturnArg$1;
});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  a();
  $( 1 );
  return undefined;
};
const b = function() {
  debugger;
  $( "x" );
  $( "y" );
  $( "z" );
  const c = $( 2 );
  return c;
};
$( b );
`````


## Normalized
(This is what phase1 received the first time)

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


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
