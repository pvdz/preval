# Preval test case

# call_string.md

> Normalize > Spread > Call string
>
> Spreading a string results in individual characters

## Input

`````js filename=intro
$(..."foo");
`````


## Settled


`````js filename=intro
$(...`foo`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(...`foo`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( ..."foo" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'f', 'o', 'o'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
