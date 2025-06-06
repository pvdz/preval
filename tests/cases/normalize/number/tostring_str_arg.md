# Preval test case

# tostring_str_arg.md

> Normalize > Number > Tostring str arg
>
> Reading the toString method from a number. We know what that is.

## Input

`````js filename=intro
const f = (31).toString('20');
$(f);
`````


## Settled


`````js filename=intro
$(`1b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`1b`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "1b" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $number_toString;
const f = `1b`;
$(f);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '1b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
