# Preval test case

# assignment_regression.md

> Const aliasing > Assignment regression
>
> Found while ai-fuzzing

At the time of writing, the result would be $(changed,changed) which is incorrect

## Input

`````js filename=intro
let x /*:unknown*/ = $(`val`);
const a /*:unknown*/ = x;
x = `changed`;
$(a, `changed`);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(x, `changed`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(`val`), `changed`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( a, "changed" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
const a = x;
x = `changed`;
$(a, `changed`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'val', 'changed'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
