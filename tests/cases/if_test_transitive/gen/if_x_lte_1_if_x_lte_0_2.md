# Preval test case

# if_x_lte_1_if_x_lte_0_2.md

> If test transitive > Gen > If x lte 1 if x lte 0 2
>
> if_x_lte_1_if_x_lte_0

## Input

`````js filename=intro
const x = $(true);
$('wtf?', x <= 1, x <= 0)
if (x <= 1) {
  if (x <= 0) $('b');
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(true);
const tmpCalleeParam /*:boolean*/ = x <= 1;
const tmpCalleeParam$1 /*:boolean*/ = x <= 0;
$(`wtf?`, tmpCalleeParam, tmpCalleeParam$1);
const tmpIfTest /*:boolean*/ = x <= 1;
if (tmpIfTest) {
  const tmpIfTest$1 /*:boolean*/ = x <= 0;
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
$(`wtf?`, x <= 1, x <= 0);
if (x <= 1) {
  if (x <= 0) {
    $(`b`);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = a <= 1;
const c = a <= 0;
$( "wtf?", b, c );
const d = a <= 1;
if (d) {
  const e = a <= 0;
  if (e) {
    $( "b" );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const x = $(true);
let tmpCalleeParam = x <= 1;
let tmpCalleeParam$1 = x <= 0;
$(`wtf?`, tmpCalleeParam, tmpCalleeParam$1);
const tmpIfTest = x <= 1;
if (tmpIfTest) {
  const tmpIfTest$1 = x <= 0;
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
 - 2: 'wtf?', true, false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
