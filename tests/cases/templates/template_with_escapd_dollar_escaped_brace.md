# Preval test case

# template_with_escapd_dollar_escaped_brace.md

> Templates > Template with escapd dollar escaped brace
>
> Make sure strings that contain `${` are properly converted to templates without breaking them

## Input

`````js filename=intro
$('$\\{');
`````


## Settled


`````js filename=intro
$(`\$\\{`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`\$\\{`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "$\\{" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`\$\\{`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '$\\{'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
