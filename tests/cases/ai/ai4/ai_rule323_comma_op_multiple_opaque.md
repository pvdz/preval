# Preval test case

# ai_rule323_comma_op_multiple_opaque.md

> Ai > Ai4 > Ai rule323 comma op multiple opaque
>
> Test: Comma operator with multiple opaque calls, result of last one used.

## Input

`````js filename=intro
// Expected: $('op1'); $('op2'); let x = $('op3'); $('result', x);
let x = ($('op1'), $('op2'), $('op3'));
$('result', x);
`````


## Settled


`````js filename=intro
$(`op1`);
$(`op2`);
const x /*:unknown*/ = $(`op3`);
$(`result`, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`op1`);
$(`op2`);
$(`result`, $(`op3`));
`````


## PST Settled
With rename=true

`````js filename=intro
$( "op1" );
$( "op2" );
const a = $( "op3" );
$( "result", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`op1`);
$(`op2`);
let x = $(`op3`);
$(`result`, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'op1'
 - 2: 'op2'
 - 3: 'op3'
 - 4: 'result', 'op3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
