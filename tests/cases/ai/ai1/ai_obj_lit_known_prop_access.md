# Preval test case

# ai_obj_lit_known_prop_access.md

> Ai > Ai1 > Ai obj lit known prop access
>
> Test: Object literal with a known primitive property accessed immediately.

## Input

`````js filename=intro
// Expected: const $$0 = $('foo'); const obj = { known: 123, other: $$0 }; $('use', 123);
let obj = { known: 123, other: $('foo') };
let val = obj.known;
$('use', val);
`````


## Settled


`````js filename=intro
$(`foo`);
$(`use`, 123);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`foo`);
$(`use`, 123);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "foo" );
$( "use", 123 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = 123;
const tmpObjLitVal$1 = $(`foo`);
let obj = { known: tmpObjLitVal, other: tmpObjLitVal$1 };
let val = obj.known;
$(`use`, val);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - 2: 'use', 123
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
