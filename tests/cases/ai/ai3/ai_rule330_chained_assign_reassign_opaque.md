# Preval test case

# ai_rule330_chained_assign_reassign_opaque.md

> Ai > Ai3 > Ai rule330 chained assign reassign opaque
>
> Test: Chained assignment with intermediate re-assignment by opaque call.

## Input

`````js filename=intro
// Expected: let a, b; a = b = $('initial'); b = $('overwrite'); $('result', a, b);
let a, b;
a = b = $('initial');
b = $('overwrite');
$('result', a, b);
`````


## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:unknown*/ = $(`initial`);
const tmpSSA_b /*:unknown*/ = $(`overwrite`);
$(`result`, tmpNestedComplexRhs, tmpSSA_b);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`result`, $(`initial`), $(`overwrite`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "initial" );
const b = $( "overwrite" );
$( "result", a, b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
const tmpNestedComplexRhs = $(`initial`);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
b = $(`overwrite`);
$(`result`, a, b);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'initial'
 - 2: 'overwrite'
 - 3: 'result', 'initial', 'overwrite'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
