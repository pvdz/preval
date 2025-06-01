# Preval test case

# dead_store_elimination.md

> Ai > Ai5 > Dead store elimination
>
> Test elimination of immediately overwritten stores

## Input

`````js filename=intro
let x = $("initial");
x = $("final");
$(x);
// Expected output:
// let x = $("final");
// $(x);
`````


## Settled


`````js filename=intro
$(`initial`);
const x /*:unknown*/ = $(`final`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`initial`);
$($(`final`));
`````


## PST Settled
With rename=true

`````js filename=intro
$( "initial" );
const a = $( "final" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`initial`);
x = $(`final`);
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'initial'
 - 2: 'final'
 - 3: 'final'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
