# Preval test case

# if_test_aliased_known.md

> Tofix > if test aliased known
>
>

## Input

`````js filename=intro
$(100);
const c /*:unknown*/ = $(100);
let a /*:boolean*/ = !c;
if (c) {
  $(a);           // <-- this must be false because a=!c and c=truthy in this branch
} else {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const d /*:unknown*/ = $(100);
    a = !d;
    if (d) {
      break;
    } else {
    }
  }
  $(a);
}
`````


## Settled


`````js filename=intro
$(100);
const c /*:unknown*/ = $(100);
if (c) {
  $(false);
} else {
  let a /*:boolean*/ = false;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const d /*:unknown*/ = $(100);
    a = !d;
    if (d) {
      break;
    } else {
    }
  }
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(100);
if ($(100)) {
  $(false);
} else {
  let a = false;
  while (true) {
    $(100);
    const d = $(100);
    a = !d;
    if (d) {
      break;
    }
  }
  $(a);
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
  let b = false;
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $( 100 );
    const c = $( 100 );
    b = !c;
    if (c) {
      break;
    }
  }
  $( b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(100);
const c = $(100);
let a = !c;
if (c) {
  $(a);
} else {
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    $(100);
    const d = $(100);
    a = !d;
    if (d) {
      break;
    } else {
    }
  }
  $(a);
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
