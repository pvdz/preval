# Preval test case

# ai_rule311_void_assignment_opaque.md

> Ai > Ai3 > Ai rule311 void assignment opaque
>
> Test: void operator on an expression containing an assignment to an opaque variable.

## Input

`````js filename=intro
// Expected: let x; let y = void (x = $('val')); $('x_is', x); $('y_is', y);
let x;
let y = void (x = $('val'));
$('x_is', x);
$('y_is', y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
$(`x_is`, x);
$(`y_is`, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`x_is`, $(`val`));
$(`y_is`, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
$( "x_is", a );
$( "y_is", undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = undefined;
x = $(`val`);
let y = undefined;
$(`x_is`, x);
$(`y_is`, y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'x_is', 'val'
 - 3: 'y_is', undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
