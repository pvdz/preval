# Preval test case

# if_outer.md

> One timers > If outer
>
> Functions that are called once should be inlined when possible

## Input

`````js filename=intro
function f() {
  function g() {
    $('c');
  }
  if ($(1)) {
    $('a');
    g();
  } else {
    $('b');
  }
}
f();
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(`a`);
  $(`c`);
} else {
  $(`b`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(`a`);
  $(`c`);
} else {
  $(`b`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( "a" );
  $( "c" );
}
else {
  $( "b" );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 'a'
 - 3: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
