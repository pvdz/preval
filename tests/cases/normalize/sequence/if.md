# Preval test case

# if.md

> Normalize > Sequence > If
>
> Making sure that breaking up sequences doesn't run into sub-statement trouble here.

## Input

`````js filename=intro
if ($(0)) ($(1), $(2), $(3), $(4), ($(5), $(6)));
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(0);
if (tmpIfTest) {
  $(1);
  $(2);
  $(3);
  $(4);
  $(5);
  $(6);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(0)) {
  $(1);
  $(2);
  $(3);
  $(4);
  $(5);
  $(6);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 0 );
if (a) {
  $( 1 );
  $( 2 );
  $( 3 );
  $( 4 );
  $( 5 );
  $( 6 );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpIfTest = $(0);
if (tmpIfTest) {
  $(1);
  $(2);
  $(3);
  $(4);
  $(5);
  $(6);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
