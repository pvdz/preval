# Preval test case

# tostring_num_arg.md

> Normalize > Number > Tostring num arg
>
> Reading the toString method from a number. We know what that is.

## Input

`````js filename=intro
const f = (31).toString(17);
$(f);
`````


## Settled


`````js filename=intro
$(`1e`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`1e`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "1e" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $number_toString;
const f = `1e`;
$(f);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '1e'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
