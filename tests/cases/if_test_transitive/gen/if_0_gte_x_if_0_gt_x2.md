# Preval test case

# if_0_gte_x_if_0_gt_x2.md

> If test transitive > Gen > If 0 gte x if 0 gt x2
>
> if_0_gte_x_if_0_gt_x

## Input

`````js filename=intro
const x = $(true);
if (0 >= x) {
  if (0 > x) $('b');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
const tmpIfTest /*:boolean*/ = 0 >= x;
if (tmpIfTest) {
  const tmpIfTest$1 /*:boolean*/ = 0 > x;
  if (tmpIfTest$1) {
    $(`b`);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(true);
if (0 >= x) {
  if (0 > x) {
    $(`b`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = 0 >= a;
if (b) {
  const c = 0 > a;
  if (c) {
    $( "b" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
const tmpIfTest = 0 >= x;
if (tmpIfTest) {
  const tmpIfTest$1 = 0 > x;
  if (tmpIfTest$1) {
    $(`b`);
  } else {
  }
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
