# Preval test case

# ai_weakset_constructor_opaque_iterable.md

> Ai > Ai2 > Ai weakset constructor opaque iterable
>
> Test: WeakSet constructor with an opaque iterable.

## Input

`````js filename=intro
// Expected: WeakSet construction attempts with opaque iterable.
let val1_obj = $('ws_val1_obj', {});
let val2_obj = $('ws_val2_obj', function(){});
let iterable = $('opaque_ws_iterable', [val1_obj, val2_obj, $('ws_val3_obj', []) ]);
let wset = new WeakSet(iterable);
// Cannot directly verify size or contents easily due to WeakSet nature.
$('weakset_constructed_has1', wset.has(val1_obj));
$('weakset_constructed_has2', wset.has(val2_obj));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ /*truthy*/ = {};
const val1_obj /*:unknown*/ = $(`ws_val1_obj`, tmpCalleeParam);
const tmpCalleeParam$1 /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const val2_obj /*:unknown*/ = $(`ws_val2_obj`, tmpCalleeParam$1);
const tmpCalleeParam$5 /*:array*/ /*truthy*/ = [];
const tmpArrElement$3 /*:unknown*/ = $(`ws_val3_obj`, tmpCalleeParam$5);
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [val1_obj, val2_obj, tmpArrElement$3];
const iterable /*:unknown*/ = $(`opaque_ws_iterable`, tmpCalleeParam$3);
const wset /*:object*/ /*truthy*/ = new WeakSet(iterable);
const tmpMCF /*:unknown*/ = wset.has;
const tmpCalleeParam$7 /*:unknown*/ = $dotCall(tmpMCF, wset, `has`, val1_obj);
$(`weakset_constructed_has1`, tmpCalleeParam$7);
const tmpMCF$1 /*:unknown*/ = wset.has;
const tmpCalleeParam$9 /*:unknown*/ = $dotCall(tmpMCF$1, wset, `has`, val2_obj);
$(`weakset_constructed_has2`, tmpCalleeParam$9);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const val1_obj = $(`ws_val1_obj`, {});
const val2_obj = $(`ws_val2_obj`, function $pcompiled() {});
const tmpArrElement$3 = $(`ws_val3_obj`, []);
const iterable = $(`opaque_ws_iterable`, [val1_obj, val2_obj, tmpArrElement$3]);
const wset = new WeakSet(iterable);
$(`weakset_constructed_has1`, wset.has(val1_obj));
$(`weakset_constructed_has2`, wset.has(val2_obj));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
const b = $( "ws_val1_obj", a );
const c = function $pcompiled() {
  debugger;
  return undefined;
};
const d = $( "ws_val2_obj", c );
const e = [];
const f = $( "ws_val3_obj", e );
const g = [ b, d, f ];
const h = $( "opaque_ws_iterable", g );
const i = new WeakSet( h );
const j = i.has;
const k = $dotCall( j, i, "has", b );
$( "weakset_constructed_has1", k );
const l = i.has;
const m = $dotCall( l, i, "has", d );
$( "weakset_constructed_has2", m );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = {};
let val1_obj = $(`ws_val1_obj`, tmpCalleeParam);
let tmpCalleeParam$1 = function () {
  debugger;
  return undefined;
};
let val2_obj = $(`ws_val2_obj`, tmpCalleeParam$1);
const tmpArrElement = val1_obj;
const tmpArrElement$1 = val2_obj;
let tmpCalleeParam$5 = [];
const tmpArrElement$3 = $(`ws_val3_obj`, tmpCalleeParam$5);
let tmpCalleeParam$3 = [tmpArrElement, tmpArrElement$1, tmpArrElement$3];
let iterable = $(`opaque_ws_iterable`, tmpCalleeParam$3);
let wset = new WeakSet(iterable);
const tmpMCF = wset.has;
let tmpCalleeParam$7 = $dotCall(tmpMCF, wset, `has`, val1_obj);
$(`weakset_constructed_has1`, tmpCalleeParam$7);
const tmpMCF$1 = wset.has;
let tmpCalleeParam$9 = $dotCall(tmpMCF$1, wset, `has`, val2_obj);
$(`weakset_constructed_has2`, tmpCalleeParam$9);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


BAD@! Found 1 implicit global bindings:

WeakSet


## Runtime Outcome


Should call `$` with:
 - 1: 'ws_val1_obj', {}
 - 2: 'ws_val2_obj', '<function>'
 - 3: 'ws_val3_obj', []
 - 4: 'opaque_ws_iterable', ['ws_val1_obj', 'ws_val2_obj', 'ws_val3_obj']
 - eval returned: ('<crash[ Invalid value used in weak set ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
