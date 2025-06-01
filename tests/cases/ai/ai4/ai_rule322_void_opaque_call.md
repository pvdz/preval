# Preval test case

# ai_rule322_void_opaque_call.md

> Ai > Ai4 > Ai rule322 void opaque call
>
> Test: void operator with an opaque operand that is a call.

## Input

`````js filename=intro
// Expected: $('side_effect_call'); $('result', undefined);
let x = void $('side_effect_call');
$('result', x);
`````


## Settled


`````js filename=intro
$(`side_effect_call`);
$(`result`, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`side_effect_call`);
$(`result`, undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "side_effect_call" );
$( "result", undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`side_effect_call`);
let x = undefined;
$(`result`, undefined);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'side_effect_call'
 - 2: 'result', undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
