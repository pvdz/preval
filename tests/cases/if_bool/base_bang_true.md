# Preval test case

# base_bang_true.md

> If bool > Base bang true
>
> When the if-test is the arg to Boolean or bang then the value can be predicted

## Input

`````js filename=intro
const x = $(1);
if (x) {
  $(!(x)); // $(true)!
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
  $(false);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( false );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
