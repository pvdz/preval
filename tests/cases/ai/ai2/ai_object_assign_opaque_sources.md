# Preval test case

# ai_object_assign_opaque_sources.md

> Ai > Ai2 > Ai object assign opaque sources
>
> Test: Object.assign with opaque target and sources.

## Input

`````js filename=intro
// Expected: Object.assign operation is preserved with opaque arguments.
let target = $('opaque_target_obj');
let source1 = $('opaque_source1_obj');
let source2 = { b: $('val_b') };
let result = Object.assign(target, source1, source2);
$('assign_result', result);
$('assign_target_mutated', target);
`````


## Settled


`````js filename=intro
const target /*:unknown*/ = $(`opaque_target_obj`);
const source1 /*:unknown*/ = $(`opaque_source1_obj`);
const tmpObjLitVal /*:unknown*/ = $(`val_b`);
const source2 /*:object*/ = { b: tmpObjLitVal };
const result /*:object*/ = $Object_assign(target, source1, source2);
$(`assign_result`, result);
$(`assign_target_mutated`, target);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const target = $(`opaque_target_obj`);
const source1 = $(`opaque_source1_obj`);
const tmpObjLitVal = $(`val_b`);
$(`assign_result`, $Object_assign(target, source1, { b: tmpObjLitVal }));
$(`assign_target_mutated`, target);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "opaque_target_obj" );
const b = $( "opaque_source1_obj" );
const c = $( "val_b" );
const d = { b: c };
const e = $Object_assign( a, b, d );
$( "assign_result", e );
$( "assign_target_mutated", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let target = $(`opaque_target_obj`);
let source1 = $(`opaque_source1_obj`);
const tmpObjLitVal = $(`val_b`);
let source2 = { b: tmpObjLitVal };
const tmpMCF = $Object_assign;
let result = $Object_assign(target, source1, source2);
$(`assign_result`, result);
$(`assign_target_mutated`, target);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Object_assign


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'opaque_target_obj'
 - 2: 'opaque_source1_obj'
 - 3: 'val_b'
 - eval returned: ("<crash[ Cannot assign to read only property '0' of object '[object String]' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
