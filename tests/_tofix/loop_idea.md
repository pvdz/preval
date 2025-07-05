# Preval test case

# loop_idea.md

> Tofix > loop idea

There are a few ideas in this snippet?

- we can move the assignment of a=!x to inside the if/else, x=false,x=true
  should be careful about infinite loops. i worry this inverses an existing rule.
- we could check ref-tracking to see if a can be read inside the loop. if not then
  the assignment can be moved to before the break. not sure how this works generically.

## Input

`````js filename=intro
const t /*:unknown*/ = $(100);
if (t) {
  $(false);
} else {
  let a /*:boolean*/ = false;
  while ($LOOP_UNROLLS_LEFT_10) {
    $(100);
    const x /*:unknown*/ = $(100);
    a = !x;
    if (x) {
      break;
    } else {
    }
  }
  $(a);
}
`````


## Settled


`````js filename=intro
const t /*:unknown*/ = $(100);
if (t) {
  $(false);
} else {
  let a /*:boolean*/ = false;
  while ($LOOP_UNROLLS_LEFT_10) {
    $(100);
    const x /*:unknown*/ = $(100);
    a = !x;
    if (x) {
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
if ($(100)) {
  $(false);
} else {
  let a = false;
  while (true) {
    $(100);
    const x = $(100);
    a = !x;
    if (x) {
      break;
    }
  }
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
if (a) {
  $( false );
}
else {
  let b = false;
  while ($LOOP_UNROLLS_LEFT_10) {
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
const t = $(100);
if (t) {
  $(false);
} else {
  let a = false;
  while ($LOOP_UNROLLS_LEFT_10) {
    $(100);
    const x = $(100);
    a = !x;
    if (x) {
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
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
