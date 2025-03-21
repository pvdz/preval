# Preval test case

# base_exl.md

> If test bool > Base exl
>
> A constant that is tested in an `if` must hold when inverted

## Input

`````js filename=intro
function f(x) {
  if (x) {
    $('a', !x);
  } else {
    $('b', !x);
  }
}
f($(0));
f($(1));
`````


## Settled


`````js filename=intro
const tmpCalleeParam$3 /*:unknown*/ = $(0);
if (tmpCalleeParam$3) {
  $(`a`, false);
} else {
  $(`b`, true);
}
const tmpCalleeParam$5 /*:unknown*/ = $(1);
if (tmpCalleeParam$5) {
  $(`a`, false);
} else {
  $(`b`, true);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $(`a`, false);
} else {
  $(`b`, true);
}
if ($(1)) {
  $(`a`, false);
} else {
  $(`b`, true);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( "a", false );
}
else {
  $( "b", true );
}
const b = $( 1 );
if (b) {
  $( "a", false );
}
else {
  $( "b", true );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 'b', true
 - 3: 1
 - 4: 'a', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
