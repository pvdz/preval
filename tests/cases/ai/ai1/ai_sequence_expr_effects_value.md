# Preval test case

# ai_sequence_expr_effects_value.md

> Ai > Ai1 > Ai sequence expr effects value
>
> Test: Sequence expression with side effects, final value used.

## Input

`````js filename=intro
// Expected: $('S1'); $('S2'); const $$s3 = $('S3_val'); let x = $$s3; $('use', x);
let x = ($('S1'), $('S2'), $('S3_val'));
$('use', x);
`````


## Settled


`````js filename=intro
$(`S1`);
$(`S2`);
const x /*:unknown*/ = $(`S3_val`);
$(`use`, x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`S1`);
$(`S2`);
$(`use`, $(`S3_val`));
`````


## PST Settled
With rename=true

`````js filename=intro
$( "S1" );
$( "S2" );
const a = $( "S3_val" );
$( "use", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$(`S1`);
$(`S2`);
let x = $(`S3_val`);
$(`use`, x);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'S1'
 - 2: 'S2'
 - 3: 'S3_val'
 - 4: 'use', 'S3_val'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
