# Preval test case

# ai_chained_assign_single_use.md

> Ai > Ai1 > Ai chained assign single use
>
> Test: Chained assignments where the intermediate variable is only used once immediately.

## Input

`````js filename=intro
// Expected: const $$0 = $('original'); const a = $$0; const b = a; const c = b; $('use', c);
let a = $('original');
let b = a;
let c = b;
$('use', c);
`````


## Settled


`````js filename=intro
const a /*:unknown*/ = $(`original`);
$(`use`, a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`use`, $(`original`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "original" );
$( "use", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = $(`original`);
let b = a;
let c = b;
$(`use`, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'original'
 - 2: 'use', 'original'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
