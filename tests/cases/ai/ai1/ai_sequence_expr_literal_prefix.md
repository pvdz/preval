# Preval test case

# ai_sequence_expr_literal_prefix.md

> Ai > Ai1 > Ai sequence expr literal prefix
>
> Test: Sequence expression with literal prefix where only last expression's value is used.

## Input

`````js filename=intro
// Expected: let x = $('get_val'); $(x);
let x = (123, 'foo', false, $('get_val')); 
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`get_val`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`get_val`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "get_val" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`get_val`);
$(x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'get_val'
 - 2: 'get_val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
