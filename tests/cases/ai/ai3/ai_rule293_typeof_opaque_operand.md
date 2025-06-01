# Preval test case

# ai_rule293_typeof_opaque_operand.md

> Ai > Ai3 > Ai rule293 typeof opaque operand
>
> Test: typeof operator with an opaque operand.

## Input

`````js filename=intro
// Expected: Preval preserves the typeof operation. Runtime should reflect the type of the opaque value.
let val = $('val', 123);
let type = $('type', typeof val);
`````


## Settled


`````js filename=intro
const val /*:unknown*/ = $(`val`, 123);
const tmpCalleeParam /*:string*/ = typeof val;
$(`type`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const val = $(`val`, 123);
$(`type`, typeof val);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val", 123 );
const b = typeof a;
$( "type", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let val = $(`val`, 123);
let tmpCalleeParam = typeof val;
let type = $(`type`, tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val', 123
 - 2: 'type', 'string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
