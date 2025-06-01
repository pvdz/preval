# Preval test case

# ai_assign_from_sequence_effect_var.md

> Ai > Ai1 > Ai assign from sequence effect var
>
> Test: Assignment from a sequence ($('effect'), var) simplifies.

## Input

`````js filename=intro
// Expected: $('effect'); let x = $('x_val'); let y = x; $('final_y', y);
let x_val = $('x_val');
let y;
y = ($('effect'), x_val); // The sequence should result in x_val after $('effect') is evaluated.
$('final_y', y);
`````


## Settled


`````js filename=intro
const x_val /*:unknown*/ = $(`x_val`);
$(`effect`);
$(`final_y`, x_val);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x_val = $(`x_val`);
$(`effect`);
$(`final_y`, x_val);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "x_val" );
$( "effect" );
$( "final_y", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x_val = $(`x_val`);
let y = undefined;
$(`effect`);
y = x_val;
$(`final_y`, x_val);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'x_val'
 - 2: 'effect'
 - 3: 'final_y', 'x_val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
