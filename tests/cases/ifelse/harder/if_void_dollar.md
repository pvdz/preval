# Preval test case

# if_void_dollar.md

> Ifelse > Harder > If void dollar
>
> Eliminate simple tautology

This should reduce into $(1)

## Input

`````js filename=intro
if (void $(1)) $(2);
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(1);
const tmpIfTest = undefined;
if (tmpIfTest) {
  $(2);
} else {
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
