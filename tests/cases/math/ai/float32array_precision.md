# Preval test case

# float32array_precision.md

> Math > Ai > Float32array precision
>
> Float32Array precision loss

## Input

`````js filename=intro
const f32 = new Float32Array(1);
f32[0] = 0.1 + 0.2;
$(f32[0]);
// Should be 0.30000001192092896, not 0.3
`````


## Settled


`````js filename=intro
const f32 /*:object*/ /*truthy*/ = new Float32Array(1);
f32[0] = 0.30000000000000004;
const tmpCalleeParam /*:unknown*/ = f32[0];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f32 = new Float32Array(1);
f32[0] = 0.30000000000000004;
$(f32[0]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new Float32Array( 1 );
a[0] = 0.30000000000000004;
const b = a[ 0 ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f32 = new Float32Array(1);
const tmpAssignComputedObj = f32;
const tmpAssignComputedProp = 0;
const tmpAssignComputedRhs = 0.30000000000000004;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
let tmpCalleeParam = f32[0];
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

Float32Array


## Runtime Outcome


Should call `$` with:
 - 1: 0.30000001192092896
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
