# Preval test case

# base.md

> Let true while > Base
>
> A func that is being cleared after being called once is "locked". I guess.

## Input

`````js filename=intro
let y = $(5);
let x = true;
while (x) {
  $(x);
  x = --y;
}
$(x, y);
`````


## Settled


`````js filename=intro
const y /*:unknown*/ = $(5);
$(true);
const tmpPostUpdArgIdent /*:number*/ = $coerce(y, `number`);
let tmpClusterSSA_y /*:number*/ = tmpPostUpdArgIdent - 1;
let tmpClusterSSA_x /*:number*/ = tmpClusterSSA_y;
if (tmpClusterSSA_y) {
  while ($LOOP_UNROLL_10) {
    $(tmpClusterSSA_x);
    tmpClusterSSA_y = tmpClusterSSA_y - 1;
    tmpClusterSSA_x = tmpClusterSSA_y;
    if (tmpClusterSSA_x) {
    } else {
      break;
    }
  }
  $(tmpClusterSSA_x, tmpClusterSSA_y);
} else {
  $(tmpClusterSSA_x, tmpClusterSSA_y);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const y = $(5);
$(true);
let tmpClusterSSA_y = $coerce(y, `number`) - 1;
let tmpClusterSSA_x = tmpClusterSSA_y;
if (tmpClusterSSA_y) {
  while (true) {
    $(tmpClusterSSA_x);
    tmpClusterSSA_y = tmpClusterSSA_y - 1;
    tmpClusterSSA_x = tmpClusterSSA_y;
    if (!tmpClusterSSA_x) {
      break;
    }
  }
  $(tmpClusterSSA_x, tmpClusterSSA_y);
} else {
  $(tmpClusterSSA_x, tmpClusterSSA_y);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 5 );
$( true );
const b = $coerce( a, "number" );
let c = b - 1;
let d = c;
if (c) {
  while ($LOOP_UNROLL_10) {
    $( d );
    c = c - 1;
    d = c;
    if (d) {

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
    const tmpPostUpdArgIdent = $coerce(y, `number`);
    y = tmpPostUpdArgIdent - 1;
    x = y;
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
