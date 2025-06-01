# Preval test case

# ai_chained_assign_unused_middle.md

> Ai > Ai1 > Ai chained assign unused middle
>
> Test: Chained assignment a = b = $('val'); where b is unused.

## Input

`````js filename=intro
// Expected: let temp = $('val'); let a = temp; $('used_a', a);
let a;
let b;
a = b = $('val');
$('used_a', a); // b is not used
`````


## Settled


`````js filename=intro
const tmpNestedComplexRhs /*:unknown*/ = $(`val`);
$(`used_a`, tmpNestedComplexRhs);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`used_a`, $(`val`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( "used_a", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
const tmpNestedComplexRhs = $(`val`);
b = tmpNestedComplexRhs;
a = tmpNestedComplexRhs;
$(`used_a`, tmpNestedComplexRhs);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'used_a', 'val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
