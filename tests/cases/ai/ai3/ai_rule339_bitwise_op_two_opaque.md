# Preval test case

# ai_rule339_bitwise_op_two_opaque.md

> Ai > Ai3 > Ai rule339 bitwise op two opaque
>
> Test: Bitwise AND between two distinct opaque values.

## Input

`````js filename=intro
// Expected: let x = $('v1') & $('v2'); $('r', x);
let val1 = $('val1');
let val2 = $('val2');
let result_and = val1 & val2;
$('result_and', result_and);
let result_or = val1 | val2;
$('result_or', result_or);
let result_xor = val1 ^ val2;
$('result_xor', result_xor);
`````


## Settled


`````js filename=intro
const val1 /*:unknown*/ = $(`val1`);
const val2 /*:unknown*/ = $(`val2`);
const result_and /*:number*/ = val1 & val2;
$(`result_and`, result_and);
const result_or /*:number*/ = val1 | val2;
$(`result_or`, result_or);
const result_xor /*:number*/ = val1 ^ val2;
$(`result_xor`, result_xor);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const val1 = $(`val1`);
const val2 = $(`val2`);
$(`result_and`, val1 & val2);
$(`result_or`, val1 | val2);
$(`result_xor`, val1 ^ val2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val1" );
const b = $( "val2" );
const c = a & b;
$( "result_and", c );
const d = a | b;
$( "result_or", d );
const e = a ^ b;
$( "result_xor", e );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let val1 = $(`val1`);
let val2 = $(`val2`);
let result_and = val1 & val2;
$(`result_and`, result_and);
let result_or = val1 | val2;
$(`result_or`, result_or);
let result_xor = val1 ^ val2;
$(`result_xor`, result_xor);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val1'
 - 2: 'val2'
 - 3: 'result_and', 0
 - 4: 'result_or', 0
 - 5: 'result_xor', 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
