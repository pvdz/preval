# Preval test case

# ai_noop_arithmetic_opaque.md

> Ai > Ai1 > Ai noop arithmetic opaque
>
> Test: No-op arithmetic (x+0, x*1) with opaque variable.

## Input

`````js filename=intro
// Expected: const $$0 = $('num_or_obj'); let x = $$0; x = x + 0; x = x * 1; $('use', x);
let x = $('num_or_obj');
x = x + 0;
x = x * 1;
$('use', x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`num_or_obj`);
const tmpSSA_x /*:primitive*/ = x + 0;
const tmpClusterSSA_tmpSSA_x /*:number*/ = tmpSSA_x * 1;
$(`use`, tmpClusterSSA_tmpSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`use`, ($(`num_or_obj`) + 0) * 1);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "num_or_obj" );
const b = a + 0;
const c = b * 1;
$( "use", c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`num_or_obj`);
x = x + 0;
x = x * 1;
$(`use`, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'num_or_obj'
 - 2: 'use', NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
