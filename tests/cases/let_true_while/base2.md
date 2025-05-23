# Preval test case

# base2.md

> Let true while > Base2
>
> A func that is being cleared after being called once is "locked". I guess.

## Input

`````js filename=intro
let y = $(5);
let x = true;
while (x) {
  $(x);
  const z = y - 1;
  y = z;
  x = z;
}
$(x, y);
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $(5);
$(true);
const z /*:number*/ = y - 1;
let tmpClusterSSA_y /*:unknown*/ = z;
let x /*:unknown*/ = z;
if (z) {
  while ($LOOP_UNROLL_10) {
    $(x);
    const z$1 /*:number*/ = tmpClusterSSA_y - 1;
    tmpClusterSSA_y = z$1;
    x = z$1;
    if (z$1) {
    } else {
      break;
    }
  }
  $(x, tmpClusterSSA_y);
} else {
  $(x, tmpClusterSSA_y);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const y = $(5);
$(true);
const z = y - 1;
let tmpClusterSSA_y = z;
let x = z;
if (z) {
  while (true) {
    $(x);
    const z$1 = tmpClusterSSA_y - 1;
    tmpClusterSSA_y = z$1;
    x = z$1;
    if (!z$1) {
      break;
    }
  }
  $(x, tmpClusterSSA_y);
} else {
  $(x, tmpClusterSSA_y);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 5 );
$( true );
const b = a - 1;
let c = b;
let d = b;
if (b) {
  while ($LOOP_UNROLL_10) {
    $( d );
    const e = c - 1;
    c = e;
    d = e;
    if (e) {

    }
    else {
      break;
    }
  }
  $( d, c );
}
else {
  $( d, c );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let y = $(5);
let x = true;
while (true) {
  if (x) {
    $(x);
    const z = y - 1;
    y = z;
    x = z;
  } else {
    break;
  }
}
$(x, y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5
 - 2: true
 - 3: 4
 - 4: 3
 - 5: 2
 - 6: 1
 - 7: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
