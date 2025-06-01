# Preval test case

# ai_rule314_obj_opaque_key_assign_access.md

> Ai > Ai4 > Ai rule314 obj opaque key assign access
>
> Test: Object property access using an opaque key after assignment with the same opaque key.

## Input

`````js filename=intro
// Expected: $('key_name'); let obj = {}; obj['key_name'] = 123; $('result', 123);
let obj = {};
let k = $('key_name');
obj[k] = 123;
let val = obj[k];
$('result', val);
`````


## Settled


`````js filename=intro
$(`key_name`);
$(`result`, 123);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`key_name`);
$(`result`, 123);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "key_name" );
$( "result", 123 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let obj = {};
let k = $(`key_name`);
obj[k] = 123;
let val = obj[k];
$(`result`, val);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'key_name'
 - 2: 'result', 123
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
