# Preval test case

# if.md

> Normalize > Blocks > If
>
> Add blocks to sub-statements

## Input

`````js filename=intro
if ($(1)) $(2);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(2);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(1)) {
  $(2);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
if (a) {
  $( 2 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
