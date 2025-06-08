# Preval test case

# ai_rule295_object_get_own_prop_desc_opaque_obj_prop.md

> Ai > Ai3 > Ai rule295 object get own prop desc opaque obj prop
>
> Test: Object.getOwnPropertyDescriptor with an opaque object and opaque property name.

## Input

`````js filename=intro
// Expected: Object.getOwnPropertyDescriptor(obj, P); (or equivalent, call preserved)
const obj = $('obj', { a: 1 });
let P = $('P', "a");
let descriptor = $('descriptor', Object.getOwnPropertyDescriptor(obj, P));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1 };
const obj /*:unknown*/ = $(`obj`, tmpCalleeParam);
const P /*:unknown*/ = $(`P`, `a`);
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = $Object_getOwnPropertyDescriptor(obj, P);
$(`descriptor`, tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $(`obj`, { a: 1 });
$(`descriptor`, $Object_getOwnPropertyDescriptor(obj, $(`P`, `a`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { a: 1 };
const b = $( "obj", a );
const c = $( "P", "a" );
const d = $Object_getOwnPropertyDescriptor( b, c );
$( "descriptor", d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { a: 1 };
const obj = $(`obj`, tmpCalleeParam);
let P = $(`P`, `a`);
const tmpMCF = $Object_getOwnPropertyDescriptor;
let tmpCalleeParam$1 = $Object_getOwnPropertyDescriptor(obj, P);
let descriptor = $(`descriptor`, tmpCalleeParam$1);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Object_getOwnPropertyDescriptor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'obj', { a: '1' }
 - 2: 'P', 'a'
 - 3: 'descriptor', undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
