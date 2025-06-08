# Preval test case

# ai_rule296_object_prevent_extensions_opaque_obj.md

> Ai > Ai3 > Ai rule296 object prevent extensions opaque obj
>
> Test: Object.preventExtensions with an opaque object.

## Input

`````js filename=intro
// Expected: Object.preventExtensions(obj); (or equivalent, call preserved)
let obj = $('obj', { a: 1 });
$('result', Object.preventExtensions(obj));
let isExt = $('isExt', Object.isExtensible(obj));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = { a: 1 };
const obj /*:unknown*/ = $(`obj`, tmpCalleeParam);
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = $Object_preventExtensions(obj);
$(`result`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:boolean*/ = $Object_isExtensible(obj);
$(`isExt`, tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $(`obj`, { a: 1 });
$(`result`, $Object_preventExtensions(obj));
$(`isExt`, $Object_isExtensible(obj));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { a: 1 };
const b = $( "obj", a );
const c = $Object_preventExtensions( b );
$( "result", c );
const d = $Object_isExtensible( b );
$( "isExt", d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { a: 1 };
let obj = $(`obj`, tmpCalleeParam);
const tmpMCF = $Object_preventExtensions;
let tmpCalleeParam$1 = $Object_preventExtensions(obj);
$(`result`, tmpCalleeParam$1);
const tmpMCF$1 = $Object_isExtensible;
let tmpCalleeParam$3 = $Object_isExtensible(obj);
let isExt = $(`isExt`, tmpCalleeParam$3);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Object_isExtensible
- (todo) type trackeed tricks can possibly support static $Object_preventExtensions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'obj', { a: '1' }
 - 2: 'result', 'obj'
 - 3: 'isExt', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
