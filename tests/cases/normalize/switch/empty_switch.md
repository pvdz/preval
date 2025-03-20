# Preval test case

# empty_switch.md

> Normalize > Switch > Empty switch
>
> Do cases spy

## Input

`````js filename=intro
switch ($(1)) {
}
$();
`````


## Settled


`````js filename=intro
$(1);
$();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$();
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$();
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
