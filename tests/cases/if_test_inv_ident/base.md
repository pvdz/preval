# Preval test case

# base.md

> If test inv ident > Base
>
> Doing an if-test on a value that was !-inverted means we can just invert
> the if-else and use the invert-arg for it instead.

## Input

`````js filename=intro
let b = true;
$(100);
const c = $(100);
let a = !c;
if (c) {
  b = false;
} else {
}
if (b) {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const d = $(100);
    a = !d;                   // <--
    if (a) {                  // <--
    } else {
      break;
    }
  }
} else {
}
$(a);
`````


## Settled


`````js filename=intro
$(100);
const c /*:unknown*/ = $(100);
if (c) {
  $(false);
} else {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const d /*:unknown*/ = $(100);
    if (d) {
      break;
    } else {
    }
  }
  $(false);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
if ($(100)) {
  $(false);
} else {
  while (true) {
    $(100);
    if ($(100)) {
      break;
    }
  }
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
$( 100 );
const a = $( 100 );
if (a) {
  $( false );
}
else {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 100 );
    const b = $( 100 );
    if (b) {
      break;
    }
  }
  $( false );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
