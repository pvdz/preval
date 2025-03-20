# Preval test case

# base_boolean_false.md

> If bool > Base boolean false
>
> When the if-test is the arg to Boolean or bang then the value can be predicted

## Input

`````js filename=intro
const x = $(1);
if (x) {
} else {
  $(Boolean(x)); // $(true)!
}
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(1);
if (x) {
} else {
  $(false);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(1)) {
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {

}
else {
  $( false );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
