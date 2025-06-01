# Preval test case

# ai_rule294_comma_operator_multiple_opaque.md

> Ai > Ai3 > Ai rule294 comma operator multiple opaque
>
> Test: Comma operator with multiple opaque expressions.

## Input

`````js filename=intro
// Expected: Preval preserves all opaque calls and the sequence, result is the last opaque value.
let x = $('x', 1);
let y = $('y', 2);
let z = $('z', 3);
let result = $('result', (x, y, z));
`````


## Settled


`````js filename=intro
$(`x`, 1);
$(`y`, 2);
const z /*:unknown*/ = $(`z`, 3);
$(`result`, z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`x`, 1);
$(`y`, 2);
$(`result`, $(`z`, 3));
`````


## PST Settled
With rename=true

`````js filename=intro
$( "x", 1 );
$( "y", 2 );
const a = $( "z", 3 );
$( "result", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`x`, 1);
let y = $(`y`, 2);
let z = $(`z`, 3);
let tmpCalleeParam = z;
let result = $(`result`, z);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x', 1
 - 2: 'y', 2
 - 3: 'z', 3
 - 4: 'result', 'z'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
