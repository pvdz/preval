# Preval test case

# ai_redundant_undefined_init.md

> Ai > Ai1 > Ai redundant undefined init
>
> Test: Redundant assignment of undefined to a let variable just after declaration.

## Input

`````js filename=intro
// Expected: let x; $("before", typeof x); $("after", typeof x);
let x; // Implicitly undefined
$("before", typeof x);
x = undefined; // This assignment should be removed
$("after", typeof x);
`````


## Settled


`````js filename=intro
$(`before`, `undefined`);
$(`after`, `undefined`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`before`, `undefined`);
$(`after`, `undefined`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "before", "undefined" );
$( "after", "undefined" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
let tmpCalleeParam = typeof x;
$(`before`, tmpCalleeParam);
x = undefined;
let tmpCalleeParam$1 = typeof x;
$(`after`, tmpCalleeParam$1);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before', 'undefined'
 - 2: 'after', 'undefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
