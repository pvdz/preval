# Preval test case

# dotcall_alias_ok.md

> Object literal > Inlining > Dotcall alias ok
>
>

## Input

`````js filename=intro
const g = function(){ return 'win'; };
const obj = {f: g};
const alias = obj.f;
$($dotCall(alias, obj, 'f'));
`````


## Settled


`````js filename=intro
$(`win`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`win`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "win" );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'win'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
