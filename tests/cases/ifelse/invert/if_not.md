# Preval test case

# if_not.md

> Ifelse > Invert > If not
>
> Invert the logic

## Input

`````js filename=intro
if (!$(1)) $(2);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
} else {
  $(2);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (!$(1)) {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {

}
else {
  $( 2 );
}
`````


## Todos triggered


None


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
