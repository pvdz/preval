# Preval test case

# ai_weakmap_constructor_opaque_iterable.md

> Ai > Ai2 > Ai weakmap constructor opaque iterable
>
> Test: WeakMap constructor with an opaque iterable.

## Input

`````js filename=intro
// Expected: WeakMap construction attempts with opaque iterable.
let k1_obj = $('wm_k1_obj', {});
let k2_obj = $('wm_k2_obj', {name: 'k2'});
let iterable = $('opaque_wm_iterable', [ [k1_obj, $('wm_v1')], [k2_obj, $('wm_v2')] ]);
let wmap = new WeakMap(iterable);
// Cannot directly verify size or contents easily due to WeakMap nature.
// Test relies on it not throwing if iterable is valid-like.
$('weakmap_constructed', wmap.has(k1_obj));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = {};
const k1_obj /*:unknown*/ = $(`wm_k1_obj`, tmpCalleeParam);
const tmpCalleeParam$1 /*:object*/ = { name: `k2` };
const k2_obj /*:unknown*/ = $(`wm_k2_obj`, tmpCalleeParam$1);
const tmpArrElement$5 /*:unknown*/ = $(`wm_v1`);
const tmpArrElement$9 /*:unknown*/ = $(`wm_v2`);
const tmpArrElement /*:array*/ = [k1_obj, tmpArrElement$5];
const tmpArrElement$1 /*:array*/ = [k2_obj, tmpArrElement$9];
const tmpCalleeParam$3 /*:array*/ = [tmpArrElement, tmpArrElement$1];
const iterable /*:unknown*/ = $(`opaque_wm_iterable`, tmpCalleeParam$3);
const wmap /*:object*/ = new WeakMap(iterable);
const tmpMCF /*:unknown*/ = wmap.has;
const tmpCalleeParam$5 /*:unknown*/ = $dotCall(tmpMCF, wmap, `has`, k1_obj);
$(`weakmap_constructed`, tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const k1_obj = $(`wm_k1_obj`, {});
const k2_obj = $(`wm_k2_obj`, { name: `k2` });
const tmpArrElement$5 = $(`wm_v1`);
const tmpArrElement$9 = $(`wm_v2`);
const tmpArrElement = [k1_obj, tmpArrElement$5];
const tmpArrElement$1 = [k2_obj, tmpArrElement$9];
const iterable = $(`opaque_wm_iterable`, [tmpArrElement, tmpArrElement$1]);
const wmap = new WeakMap(iterable);
$(`weakmap_constructed`, wmap.has(k1_obj));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = $( "wm_k1_obj", a );
const c = { name: "k2" };
const d = $( "wm_k2_obj", c );
const e = $( "wm_v1" );
const f = $( "wm_v2" );
const g = [ b, e ];
const h = [ d, f ];
const i = [ g, h ];
const j = $( "opaque_wm_iterable", i );
const k = new WeakMap( j );
const l = k.has;
const m = $dotCall( l, k, "has", b );
$( "weakmap_constructed", m );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = {};
let k1_obj = $(`wm_k1_obj`, tmpCalleeParam);
let tmpCalleeParam$1 = { name: `k2` };
let k2_obj = $(`wm_k2_obj`, tmpCalleeParam$1);
const tmpArrElement$3 = k1_obj;
const tmpArrElement$5 = $(`wm_v1`);
const tmpArrElement = [tmpArrElement$3, tmpArrElement$5];
const tmpArrElement$7 = k2_obj;
const tmpArrElement$9 = $(`wm_v2`);
const tmpArrElement$1 = [tmpArrElement$7, tmpArrElement$9];
let tmpCalleeParam$3 = [tmpArrElement, tmpArrElement$1];
let iterable = $(`opaque_wm_iterable`, tmpCalleeParam$3);
let wmap = new WeakMap(iterable);
const tmpMCF = wmap.has;
let tmpCalleeParam$5 = $dotCall(tmpMCF, wmap, `has`, k1_obj);
$(`weakmap_constructed`, tmpCalleeParam$5);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


BAD@! Found 1 implicit global bindings:

WeakMap


## Runtime Outcome


Should call `$` with:
 - 1: 'wm_k1_obj', {}
 - 2: 'wm_k2_obj', { name: '"k2"' }
 - 3: 'wm_v1'
 - 4: 'wm_v2'
 - 5: 
  'opaque_wm_iterable',
  [
    ['wm_k1_obj', 'wm_v1'],
    ['wm_k2_obj', 'wm_v2'],
  ],

 - eval returned: ('<crash[ Iterator value o is not an entry object ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
