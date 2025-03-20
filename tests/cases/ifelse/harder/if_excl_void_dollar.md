# Preval test case

# if_excl_void_dollar.md

> Ifelse > Harder > If excl void dollar
>
> Eliminate simple tautology

This should decompose into calling $(1) and $(2)

## Input

`````js filename=intro
if (!void $(1)) $(2);
`````


## Settled


`````js filename=intro
$(1);
$(2);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
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
