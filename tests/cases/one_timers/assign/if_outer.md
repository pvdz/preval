# Preval test case

# if_outer.md

> One timers > Assign > If outer
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
    $('c');
  }
  if ($(1)) {
    $('a');
    g();
  } else {
    $('b');
  }
}

x = f(); // This x should not be SSA'd due to the closure
$(x);
$(closure());
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(100);
$(x);
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(`a`);
  $(`c`);
  $(undefined);
  $(undefined);
} else {
  $(`b`);
  $(undefined);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
if ($(1)) {
  $(`a`);
  $(`c`);
  $(undefined);
  $(undefined);
} else {
  $(`b`);
  $(undefined);
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
const b = $( 1 );
if (b) {
  $( "a" );
  $( "c" );
  $( undefined );
  $( undefined );
}
else {
  $( "b" );
  $( undefined );
  $( undefined );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 1
 - 4: 'a'
 - 5: 'c'
 - 6: undefined
 - 7: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
