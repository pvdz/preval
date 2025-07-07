# Preval test case

# ai_weakset_methods_opaque_values.md

> Ai > Ai2 > Ai weakset methods opaque values
>
> Test: WeakSet methods (add, has, delete) with opaque values.

## Input

`````js filename=intro
// Expected: Methods operate with opaque values, don't throw unexpectedly.
let wset = new WeakSet();
let val1 = $('ws_val1_methods', {});
let val2 = $('ws_val2_methods', function foo(){});

wset.add(val1);
$('ws_has_val1', wset.has(val1));
$('ws_has_val2_unseen', wset.has(val2));

wset.add($('ws_val_temp', [])); // Add another opaque value

let delRes = wset.delete(val1);
$('ws_delete_val1_result', delRes);
$('ws_has_val1_after_delete', wset.has(val1));
`````


## Settled


`````js filename=intro
const wset /*:object*/ /*truthy*/ = new WeakSet();
const tmpCalleeParam /*:object*/ /*truthy*/ = {};
const val1 /*:unknown*/ = $(`ws_val1_methods`, tmpCalleeParam);
const foo /*:()=>undefined*/ = function $pcompiled() {
  debugger;
  return undefined;
};
const val2 /*:unknown*/ = $(`ws_val2_methods`, foo);
const tmpMCF /*:unknown*/ = wset.add;
$dotCall(tmpMCF, wset, `add`, val1);
const tmpMCF$1 /*:unknown*/ = wset.has;
const tmpCalleeParam$3 /*:unknown*/ = $dotCall(tmpMCF$1, wset, `has`, val1);
$(`ws_has_val1`, tmpCalleeParam$3);
const tmpMCF$3 /*:unknown*/ = wset.has;
const tmpCalleeParam$5 /*:unknown*/ = $dotCall(tmpMCF$3, wset, `has`, val2);
$(`ws_has_val2_unseen`, tmpCalleeParam$5);
const tmpMCF$5 /*:unknown*/ = wset.add;
const tmpCalleeParam$7 /*:array*/ /*truthy*/ = [];
const tmpMCP /*:unknown*/ = $(`ws_val_temp`, tmpCalleeParam$7);
$dotCall(tmpMCF$5, wset, `add`, tmpMCP);
const tmpMCF$7 /*:unknown*/ = wset.delete;
const delRes /*:unknown*/ = $dotCall(tmpMCF$7, wset, `delete`, val1);
$(`ws_delete_val1_result`, delRes);
const tmpMCF$9 /*:unknown*/ = wset.has;
const tmpCalleeParam$9 /*:unknown*/ = $dotCall(tmpMCF$9, wset, `has`, val1);
$(`ws_has_val1_after_delete`, tmpCalleeParam$9);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const wset = new WeakSet();
const val1 = $(`ws_val1_methods`, {});
const val2 = $(`ws_val2_methods`, function $pcompiled() {});
wset.add(val1);
$(`ws_has_val1`, wset.has(val1));
$(`ws_has_val2_unseen`, wset.has(val2));
wset.add($(`ws_val_temp`, []));
$(`ws_delete_val1_result`, wset.delete(val1));
$(`ws_has_val1_after_delete`, wset.has(val1));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new WeakSet();
const b = {};
const c = $( "ws_val1_methods", b );
const d = function $pcompiled() {
  debugger;
  return undefined;
};
const e = $( "ws_val2_methods", d );
const f = a.add;
$dotCall( f, a, "add", c );
const g = a.has;
const h = $dotCall( g, a, "has", c );
$( "ws_has_val1", h );
const i = a.has;
const j = $dotCall( i, a, "has", e );
$( "ws_has_val2_unseen", j );
const k = a.add;
const l = [];
const m = $( "ws_val_temp", l );
$dotCall( k, a, "add", m );
const n = a.delete;
const o = $dotCall( n, a, "delete", c );
$( "ws_delete_val1_result", o );
const p = a.has;
const q = $dotCall( p, a, "has", c );
$( "ws_has_val1_after_delete", q );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let wset = new WeakSet();
let tmpCalleeParam = {};
let val1 = $(`ws_val1_methods`, tmpCalleeParam);
let foo = function () {
  debugger;
  return undefined;
};
let tmpCalleeParam$1 = foo;
let val2 = $(`ws_val2_methods`, foo);
const tmpMCF = wset.add;
$dotCall(tmpMCF, wset, `add`, val1);
const tmpMCF$1 = wset.has;
let tmpCalleeParam$3 = $dotCall(tmpMCF$1, wset, `has`, val1);
$(`ws_has_val1`, tmpCalleeParam$3);
const tmpMCF$3 = wset.has;
let tmpCalleeParam$5 = $dotCall(tmpMCF$3, wset, `has`, val2);
$(`ws_has_val2_unseen`, tmpCalleeParam$5);
const tmpMCF$5 = wset.add;
let tmpCalleeParam$7 = [];
const tmpMCP = $(`ws_val_temp`, tmpCalleeParam$7);
$dotCall(tmpMCF$5, wset, `add`, tmpMCP);
const tmpMCF$7 = wset.delete;
let delRes = $dotCall(tmpMCF$7, wset, `delete`, val1);
$(`ws_delete_val1_result`, delRes);
const tmpMCF$9 = wset.has;
let tmpCalleeParam$9 = $dotCall(tmpMCF$9, wset, `has`, val1);
$(`ws_has_val1_after_delete`, tmpCalleeParam$9);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


BAD@! Found 1 implicit global bindings:

WeakSet


## Runtime Outcome


Should call `$` with:
 - 1: 'ws_val1_methods', {}
 - 2: 'ws_val2_methods', '<function>'
 - eval returned: ('<crash[ Invalid value used in weak set ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
