# Preval test case

# ai_weakmap_methods_opaque_keys_values.md

> Ai > Ai2 > Ai weakmap methods opaque keys values
>
> Test: WeakMap methods (set, get, has, delete) with opaque keys/values.

## Input

`````js filename=intro
// Expected: Methods operate with opaque keys/values, don't throw unexpectedly.
let wmap = new WeakMap();
let key1 = $('wm_key1_methods', {});
let key2 = $('wm_key2_methods', { id: 'b'});
let val1 = $('wm_val1_methods');

wmap.set(key1, val1);
$('wm_get_key1', wmap.get(key1));
$('wm_has_key1', wmap.has(key1));
$('wm_has_key2_unseen', wmap.has(key2));

wmap.set($('wm_key_temp', {}), $('wm_val_temp')); // Add another opaque key

let delRes = wmap.delete(key1);
$('wm_delete_key1_result', delRes);
$('wm_has_key1_after_delete', wmap.has(key1));
`````


## Settled


`````js filename=intro
const wmap /*:object*/ /*truthy*/ = new WeakMap();
const tmpCalleeParam /*:object*/ /*truthy*/ = {};
const key1 /*:unknown*/ = $(`wm_key1_methods`, tmpCalleeParam);
const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { id: `b` };
const key2 /*:unknown*/ = $(`wm_key2_methods`, tmpCalleeParam$1);
const val1 /*:unknown*/ = $(`wm_val1_methods`);
const tmpMCF /*:unknown*/ = wmap.set;
$dotCall(tmpMCF, wmap, `set`, key1, val1);
const tmpMCF$1 /*:unknown*/ = wmap.get;
const tmpCalleeParam$3 /*:unknown*/ = $dotCall(tmpMCF$1, wmap, `get`, key1);
$(`wm_get_key1`, tmpCalleeParam$3);
const tmpMCF$3 /*:unknown*/ = wmap.has;
const tmpCalleeParam$5 /*:unknown*/ = $dotCall(tmpMCF$3, wmap, `has`, key1);
$(`wm_has_key1`, tmpCalleeParam$5);
const tmpMCF$5 /*:unknown*/ = wmap.has;
const tmpCalleeParam$7 /*:unknown*/ = $dotCall(tmpMCF$5, wmap, `has`, key2);
$(`wm_has_key2_unseen`, tmpCalleeParam$7);
const tmpMCF$7 /*:unknown*/ = wmap.set;
const tmpCalleeParam$9 /*:object*/ /*truthy*/ = {};
const tmpMCP /*:unknown*/ = $(`wm_key_temp`, tmpCalleeParam$9);
const tmpMCP$1 /*:unknown*/ = $(`wm_val_temp`);
$dotCall(tmpMCF$7, wmap, `set`, tmpMCP, tmpMCP$1);
const tmpMCF$9 /*:unknown*/ = wmap.delete;
const delRes /*:unknown*/ = $dotCall(tmpMCF$9, wmap, `delete`, key1);
$(`wm_delete_key1_result`, delRes);
const tmpMCF$11 /*:unknown*/ = wmap.has;
const tmpCalleeParam$11 /*:unknown*/ = $dotCall(tmpMCF$11, wmap, `has`, key1);
$(`wm_has_key1_after_delete`, tmpCalleeParam$11);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const wmap = new WeakMap();
const key1 = $(`wm_key1_methods`, {});
const key2 = $(`wm_key2_methods`, { id: `b` });
wmap.set(key1, $(`wm_val1_methods`));
$(`wm_get_key1`, wmap.get(key1));
$(`wm_has_key1`, wmap.has(key1));
$(`wm_has_key2_unseen`, wmap.has(key2));
wmap.set($(`wm_key_temp`, {}), $(`wm_val_temp`));
$(`wm_delete_key1_result`, wmap.delete(key1));
$(`wm_has_key1_after_delete`, wmap.has(key1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new WeakMap();
const b = {};
const c = $( "wm_key1_methods", b );
const d = { id: "b" };
const e = $( "wm_key2_methods", d );
const f = $( "wm_val1_methods" );
const g = a.set;
$dotCall( g, a, "set", c, f );
const h = a.get;
const i = $dotCall( h, a, "get", c );
$( "wm_get_key1", i );
const j = a.has;
const k = $dotCall( j, a, "has", c );
$( "wm_has_key1", k );
const l = a.has;
const m = $dotCall( l, a, "has", e );
$( "wm_has_key2_unseen", m );
const n = a.set;
const o = {};
const p = $( "wm_key_temp", o );
const q = $( "wm_val_temp" );
$dotCall( n, a, "set", p, q );
const r = a.delete;
const s = $dotCall( r, a, "delete", c );
$( "wm_delete_key1_result", s );
const t = a.has;
const u = $dotCall( t, a, "has", c );
$( "wm_has_key1_after_delete", u );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let wmap = new WeakMap();
let tmpCalleeParam = {};
let key1 = $(`wm_key1_methods`, tmpCalleeParam);
let tmpCalleeParam$1 = { id: `b` };
let key2 = $(`wm_key2_methods`, tmpCalleeParam$1);
let val1 = $(`wm_val1_methods`);
const tmpMCF = wmap.set;
$dotCall(tmpMCF, wmap, `set`, key1, val1);
const tmpMCF$1 = wmap.get;
let tmpCalleeParam$3 = $dotCall(tmpMCF$1, wmap, `get`, key1);
$(`wm_get_key1`, tmpCalleeParam$3);
const tmpMCF$3 = wmap.has;
let tmpCalleeParam$5 = $dotCall(tmpMCF$3, wmap, `has`, key1);
$(`wm_has_key1`, tmpCalleeParam$5);
const tmpMCF$5 = wmap.has;
let tmpCalleeParam$7 = $dotCall(tmpMCF$5, wmap, `has`, key2);
$(`wm_has_key2_unseen`, tmpCalleeParam$7);
const tmpMCF$7 = wmap.set;
let tmpCalleeParam$9 = {};
const tmpMCP = $(`wm_key_temp`, tmpCalleeParam$9);
const tmpMCP$1 = $(`wm_val_temp`);
$dotCall(tmpMCF$7, wmap, `set`, tmpMCP, tmpMCP$1);
const tmpMCF$9 = wmap.delete;
let delRes = $dotCall(tmpMCF$9, wmap, `delete`, key1);
$(`wm_delete_key1_result`, delRes);
const tmpMCF$11 = wmap.has;
let tmpCalleeParam$11 = $dotCall(tmpMCF$11, wmap, `has`, key1);
$(`wm_has_key1_after_delete`, tmpCalleeParam$11);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

WeakMap


## Runtime Outcome


Should call `$` with:
 - 1: 'wm_key1_methods', {}
 - 2: 'wm_key2_methods', { id: '"b"' }
 - 3: 'wm_val1_methods'
 - eval returned: ('<crash[ Invalid value used as weak map key ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
