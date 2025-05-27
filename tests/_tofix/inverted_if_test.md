# Preval test case

# inverted_if_test.md

> Tofix > inverted if test

Inside the second if-node, we know c must be falsy, we know a must be truthy, but
none of that is observable so I guess that doesn't really matter.
This does lead to a potential new reduction based on that logic, albeit difficult.

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
    a = !d;
    if (a) {
    } else {
      break;
    }
  }
  $(a);
} else {
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
