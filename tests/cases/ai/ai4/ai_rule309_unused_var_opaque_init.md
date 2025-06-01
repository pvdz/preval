# Preval test case

# ai_rule309_unused_var_opaque_init.md

> Ai > Ai4 > Ai rule309 unused var opaque init
>
> Test: Unused variable initialized with opaque value.

## Input

`````js filename=intro
// Expected: $('init'); $('after');
let unused = $('init'); 
$('after');
`````


## Settled


`````js filename=intro
$(`init`);
$(`after`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`init`);
$(`after`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "init" );
$( "after" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let unused = $(`init`);
$(`after`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'init'
 - 2: 'after'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
