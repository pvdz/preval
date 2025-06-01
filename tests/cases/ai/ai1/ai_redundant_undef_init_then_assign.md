# Preval test case

# ai_redundant_undef_init_then_assign.md

> Ai > Ai1 > Ai redundant undef init then assign
>
> Test: Redundant var initialization to undefined followed by immediate assignment.

## Input

`````js filename=intro
// Expected: const $$0 = $('val'); const x = $$0; $('use', x);
let x = undefined;
x = $('val');
$('use', x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(`use`, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`use`, $(`val`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( "use", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
x = $(`val`);
$(`use`, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'use', 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
