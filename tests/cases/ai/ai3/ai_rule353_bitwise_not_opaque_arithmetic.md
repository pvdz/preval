# Preval test case

# ai_rule353_bitwise_not_opaque_arithmetic.md

> Ai > Ai3 > Ai rule353 bitwise not opaque arithmetic
>
> Test: Bitwise NOT on opaque, result in arithmetic with another opaque.

## Input

`````js filename=intro
// Expected: let y = (~$('v1')) + $('v2'); $('r', y);
let val1 = $('val1');
let val2 = $('val2');
let inverted_val1 = ~val1;
$('inverted', inverted_val1);
let final_result = inverted_val1 + val2;
$('final_result', final_result);
`````


## Settled


`````js filename=intro
const val1 /*:unknown*/ = $(`val1`);
const val2 /*:unknown*/ = $(`val2`);
const inverted_val1 /*:number*/ = ~val1;
$(`inverted`, inverted_val1);
const final_result /*:primitive*/ = inverted_val1 + val2;
$(`final_result`, final_result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const val1 = $(`val1`);
const val2 = $(`val2`);
const inverted_val1 = ~val1;
$(`inverted`, inverted_val1);
$(`final_result`, inverted_val1 + val2);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val1" );
const b = $( "val2" );
const c = ~a;
$( "inverted", c );
const d = c + b;
$( "final_result", d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let val1 = $(`val1`);
let val2 = $(`val2`);
let inverted_val1 = ~val1;
$(`inverted`, inverted_val1);
let final_result = inverted_val1 + val2;
$(`final_result`, final_result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val1'
 - 2: 'val2'
 - 3: 'inverted', -1
 - 4: 'final_result', '-1val2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
