# Preval test case

# ai_rule371_object_isFrozen_isSealed_opaque.md

> Ai > Ai3 > Ai rule371 object isFrozen isSealed opaque
>
> Rule 371: Object.isFrozen and Object.isSealed on opaque objects

## Input

`````js filename=intro
(function() {
  let obj1 = $('get_obj1', { a: 1 });
  let obj2 = $('get_obj2', { b: 2 });
  let obj3 = $('get_obj3', { c: 3 });

  // Preval cannot know if these are frozen/sealed as they are opaque.
  let isFrozen1 = Object.isFrozen(obj1);
  $('isFrozen1', isFrozen1, typeof obj1);

  let isSealed1 = Object.isSealed(obj1);
  $('isSealed1', isSealed1, typeof obj1);

  // Forcing a known non-extensible object via an opaque value to see if Preval handles it.
  // Object.preventExtensions is not out of scope according to the prompt.
  let madeNonExtensible = Object.preventExtensions($('get_non_extensible_obj', {}));
  let isFrozen2 = Object.isFrozen(madeNonExtensible);
  $('isFrozen2_non_ext', isFrozen2);
  let isSealed2 = Object.isSealed(madeNonExtensible);
  $('isSealed2_non_ext', isSealed2);

  // What if the object is known to be just created and plain?
  let plainObj = {};
  let isFrozenPlain = Object.isFrozen(plainObj);
  $('isFrozenPlain', isFrozenPlain);
  let isSealedPlain = Object.isSealed(plainObj);
  $('isSealedPlain', isSealedPlain);

  // Check isExtensible as well, which is related and was used in prior rules (e.g. 296)
  let isExtensibleOpaque = Object.isExtensible(obj1);
  $('isExtensibleOpaque', isExtensibleOpaque);
  let isExtensiblePlain = Object.isExtensible(plainObj);
  $('isExtensiblePlain', isExtensiblePlain);
  let isExtensibleNonExt = Object.isExtensible(madeNonExtensible);
  $('isExtensibleNonExt', isExtensibleNonExt);

})();
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { a: 1 };
const obj1 /*:unknown*/ = $(`get_obj1`, tmpCalleeParam);
const tmpCalleeParam$1 /*:object*/ = { b: 2 };
$(`get_obj2`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:object*/ = { c: 3 };
$(`get_obj3`, tmpCalleeParam$3);
const tmpCalleeParam$5 /*:boolean*/ = $Object_isFrozen(obj1);
const tmpCalleeParam$7 /*:string*/ = typeof obj1;
$(`isFrozen1`, tmpCalleeParam$5, tmpCalleeParam$7);
const tmpCalleeParam$9 /*:boolean*/ = $Object_isSealed(obj1);
const tmpCalleeParam$11 /*:string*/ = typeof obj1;
$(`isSealed1`, tmpCalleeParam$9, tmpCalleeParam$11);
const tmpCalleeParam$13 /*:object*/ = {};
const tmpMCP /*:unknown*/ = $(`get_non_extensible_obj`, tmpCalleeParam$13);
const madeNonExtensible /*:object*/ = $Object_preventExtensions(tmpMCP);
const isFrozen2 /*:boolean*/ = $Object_isFrozen(madeNonExtensible);
$(`isFrozen2_non_ext`, isFrozen2);
const isSealed2 /*:boolean*/ = $Object_isSealed(madeNonExtensible);
$(`isSealed2_non_ext`, isSealed2);
const plainObj /*:object*/ = {};
const isFrozenPlain /*:boolean*/ = $Object_isFrozen(plainObj);
$(`isFrozenPlain`, isFrozenPlain);
const isSealedPlain /*:boolean*/ = $Object_isSealed(plainObj);
$(`isSealedPlain`, isSealedPlain);
const isExtensibleOpaque /*:boolean*/ = $Object_isExtensible(obj1);
$(`isExtensibleOpaque`, isExtensibleOpaque);
const isExtensiblePlain /*:boolean*/ = $Object_isExtensible(plainObj);
$(`isExtensiblePlain`, isExtensiblePlain);
const isExtensibleNonExt /*:boolean*/ = $Object_isExtensible(madeNonExtensible);
$(`isExtensibleNonExt`, isExtensibleNonExt);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj1 = $(`get_obj1`, { a: 1 });
$(`get_obj2`, { b: 2 });
$(`get_obj3`, { c: 3 });
$(`isFrozen1`, $Object_isFrozen(obj1), typeof obj1);
$(`isSealed1`, $Object_isSealed(obj1), typeof obj1);
const madeNonExtensible = $Object_preventExtensions($(`get_non_extensible_obj`, {}));
$(`isFrozen2_non_ext`, $Object_isFrozen(madeNonExtensible));
$(`isSealed2_non_ext`, $Object_isSealed(madeNonExtensible));
const plainObj = {};
$(`isFrozenPlain`, $Object_isFrozen(plainObj));
$(`isSealedPlain`, $Object_isSealed(plainObj));
$(`isExtensibleOpaque`, $Object_isExtensible(obj1));
$(`isExtensiblePlain`, $Object_isExtensible(plainObj));
$(`isExtensibleNonExt`, $Object_isExtensible(madeNonExtensible));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { a: 1 };
const b = $( "get_obj1", a );
const c = { b: 2 };
$( "get_obj2", c );
const d = { c: 3 };
$( "get_obj3", d );
const e = $Object_isFrozen( b );
const f = typeof b;
$( "isFrozen1", e, f );
const g = $Object_isSealed( b );
const h = typeof b;
$( "isSealed1", g, h );
const i = {};
const j = $( "get_non_extensible_obj", i );
const k = $Object_preventExtensions( j );
const l = $Object_isFrozen( k );
$( "isFrozen2_non_ext", l );
const m = $Object_isSealed( k );
$( "isSealed2_non_ext", m );
const n = {};
const o = $Object_isFrozen( n );
$( "isFrozenPlain", o );
const p = $Object_isSealed( n );
$( "isSealedPlain", p );
const q = $Object_isExtensible( b );
$( "isExtensibleOpaque", q );
const r = $Object_isExtensible( n );
$( "isExtensiblePlain", r );
const s = $Object_isExtensible( k );
$( "isExtensibleNonExt", s );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpCallComplexCallee = function () {
  debugger;
  let tmpCalleeParam = { a: 1 };
  let obj1 = $(`get_obj1`, tmpCalleeParam);
  let tmpCalleeParam$1 = { b: 2 };
  let obj2 = $(`get_obj2`, tmpCalleeParam$1);
  let tmpCalleeParam$3 = { c: 3 };
  let obj3 = $(`get_obj3`, tmpCalleeParam$3);
  const tmpMCF = $Object_isFrozen;
  let isFrozen1 = $Object_isFrozen(obj1);
  let tmpCalleeParam$5 = isFrozen1;
  let tmpCalleeParam$7 = typeof obj1;
  $(`isFrozen1`, tmpCalleeParam$5, tmpCalleeParam$7);
  const tmpMCF$1 = $Object_isSealed;
  let isSealed1 = $Object_isSealed(obj1);
  let tmpCalleeParam$9 = isSealed1;
  let tmpCalleeParam$11 = typeof obj1;
  $(`isSealed1`, tmpCalleeParam$9, tmpCalleeParam$11);
  const tmpMCF$3 = $Object_preventExtensions;
  let tmpCalleeParam$13 = {};
  const tmpMCP = $(`get_non_extensible_obj`, tmpCalleeParam$13);
  let madeNonExtensible = $dotCall(tmpMCF$3, $object_constructor, `preventExtensions`, tmpMCP);
  const tmpMCF$5 = $Object_isFrozen;
  let isFrozen2 = $Object_isFrozen(madeNonExtensible);
  $(`isFrozen2_non_ext`, isFrozen2);
  const tmpMCF$7 = $Object_isSealed;
  let isSealed2 = $Object_isSealed(madeNonExtensible);
  $(`isSealed2_non_ext`, isSealed2);
  let plainObj = {};
  const tmpMCF$9 = $Object_isFrozen;
  let isFrozenPlain = $Object_isFrozen(plainObj);
  $(`isFrozenPlain`, isFrozenPlain);
  const tmpMCF$11 = $Object_isSealed;
  let isSealedPlain = $Object_isSealed(plainObj);
  $(`isSealedPlain`, isSealedPlain);
  const tmpMCF$13 = $Object_isExtensible;
  let isExtensibleOpaque = $Object_isExtensible(obj1);
  $(`isExtensibleOpaque`, isExtensibleOpaque);
  const tmpMCF$15 = $Object_isExtensible;
  let isExtensiblePlain = $Object_isExtensible(plainObj);
  $(`isExtensiblePlain`, isExtensiblePlain);
  const tmpMCF$17 = $Object_isExtensible;
  let isExtensibleNonExt = $Object_isExtensible(madeNonExtensible);
  $(`isExtensibleNonExt`, isExtensibleNonExt);
  return undefined;
};
tmpCallComplexCallee();
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Object_isExtensible
- (todo) type trackeed tricks can possibly support static $Object_isFrozen
- (todo) type trackeed tricks can possibly support static $Object_isSealed
- (todo) type trackeed tricks can possibly support static $Object_preventExtensions


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'get_obj1', { a: '1' }
 - 2: 'get_obj2', { b: '2' }
 - 3: 'get_obj3', { c: '3' }
 - 4: 'isFrozen1', true, 'string'
 - 5: 'isSealed1', true, 'string'
 - 6: 'get_non_extensible_obj', {}
 - 7: 'isFrozen2_non_ext', true
 - 8: 'isSealed2_non_ext', true
 - 9: 'isFrozenPlain', false
 - 10: 'isSealedPlain', false
 - 11: 'isExtensibleOpaque', false
 - 12: 'isExtensiblePlain', true
 - 13: 'isExtensibleNonExt', false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
